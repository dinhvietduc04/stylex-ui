import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import * as babel from '@babel/core';
import stylexBabelPlugin from '@stylexjs/babel-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const srcDir = path.join(packageRoot, 'src');
const distDir = path.join(packageRoot, 'dist');
// Staging keeps `dist` fully populated while it is being rewritten, so a
// watching dev server never sees a half-deleted package.
const stageDir = path.join(packageRoot, 'node_modules', '.stylex-build');
// Dedicated incremental state for the declaration emit. It must never be shared
// with the `typecheck` task, otherwise a previous `tsc --noEmit` run makes the
// declaration build believe everything is up to date and it emits nothing.
const declarationsCachePath = path.join(
  packageRoot,
  'node_modules',
  '.cache',
  'tsbuildinfo.build.json',
);

function getAllSourceFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllSourceFiles(fullPath, fileList);
    } else if (
      (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) &&
      !entry.name.endsWith('.d.ts')
    ) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function rewriteRelativeImports(code, sourceFileDir) {
  const resolveSpec = (spec) => {
    if (!spec.startsWith('./') && !spec.startsWith('../')) {
      return spec;
    }
    if (spec.endsWith('.js') || spec.endsWith('.css') || spec.endsWith('.json')) {
      return spec;
    }
    const candidatePath = path.resolve(sourceFileDir, spec);
    if (
      fs.existsSync(candidatePath) &&
      fs.statSync(candidatePath).isDirectory()
    ) {
      return `${spec.replace(/\/$/, '')}/index.js`;
    }
    return `${spec}.js`;
  };

  return code
    .replace(
      /(from\s+['"])(\.\.?\/[^'"]+)(['"])/g,
      (_, prefix, spec, suffix) => `${prefix}${resolveSpec(spec)}${suffix}`,
    )
    .replace(
      /(import\s+['"])(\.\.?\/[^'"]+)(['"])/g,
      (_, prefix, spec, suffix) => `${prefix}${resolveSpec(spec)}${suffix}`,
    );
}

function listRelativeFiles(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listRelativeFiles(full, base, acc);
    } else {
      acc.push(path.relative(base, full));
    }
  }
  return acc;
}

function mirrorDirectory(from, to) {
  const incoming = listRelativeFiles(from);
  const incomingSet = new Set(incoming.map((rel) => rel.replace(/\\/g, '/')));

  for (const rel of incoming) {
    const target = path.join(to, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(from, rel), target);
  }

  for (const rel of listRelativeFiles(to)) {
    if (!incomingSet.has(rel.replace(/\\/g, '/'))) {
      fs.rmSync(path.join(to, rel), { force: true });
    }
  }
}

async function build() {
  if (fs.existsSync(stageDir)) {
    fs.rmSync(stageDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stageDir, { recursive: true });

  const files = getAllSourceFiles(srcDir);
  // Compile .stylex.ts files first so any metadata is ready
  files.sort((a, b) => {
    const aIsStylex = a.includes('.stylex.');
    const bIsStylex = b.includes('.stylex.');
    if (aIsStylex && !bIsStylex) return -1;
    if (!aIsStylex && bIsStylex) return 1;
    return a.localeCompare(b);
  });

  const stylexRules = [];

  for (const file of files) {
    const relPath = path.relative(srcDir, file);
    const outPath = path
      .join(stageDir, relPath)
      .replace(/\.(tsx|ts)$/, '.js');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const sourceCode = fs.readFileSync(file, 'utf8');
    const result = await babel.transformAsync(sourceCode, {
      filename: file,
      babelrc: false,
      configFile: false,
      presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { isTSX: file.endsWith('.tsx'), allExtensions: true }],
      ],
      plugins: [
        [
          stylexBabelPlugin,
          {
            dev: false,
            test: false,
            runtimeInjection: false,
            genConditionalClasses: true,
            treeshakeCompensation: true,
            unstable_moduleResolution: {
              type: 'commonJS',
              rootDir: packageRoot,
            },
          },
        ],
      ],
    });

    if (result?.metadata?.stylex && result.metadata.stylex.length > 0) {
      stylexRules.push(...result.metadata.stylex);
    }

    const finalCode = rewriteRelativeImports(
      result?.code ?? '',
      path.dirname(file),
    );
    fs.writeFileSync(outPath, finalCode, 'utf8');
  }

  const compiledStylexCss =
    stylexRules.length > 0
      ? stylexBabelPlugin.processStylexRules(stylexRules, false)
      : '';

  const baseTokensCssPath = path.join(srcDir, 'tokens', 'tokens.css');
  const baseTokensCss = fs.existsSync(baseTokensCssPath)
    ? fs.readFileSync(baseTokensCssPath, 'utf8')
    : '';

  const combinedCss = [
    '/* @repo/stylex-ui - Compiled StyleX + 3-Tier Design Token Engine */',
    baseTokensCss,
    compiledStylexCss,
  ]
    .filter(Boolean)
    .join('\n\n');

  fs.writeFileSync(path.join(stageDir, 'styles.css'), combinedCss, 'utf8');

  // Generate TypeScript declarations. The incremental state is cleared so the
  // declarations are always written into the freshly created staging directory.
  fs.rmSync(declarationsCachePath, { force: true });
  execSync(`pnpm exec tsc -p tsconfig.build.json --outDir "${stageDir}"`, {
    cwd: packageRoot,
    stdio: 'inherit',
  });

  // Never publish a `dist` that has runtime JS but no type declarations: without
  // `.d.ts` files consumers silently fall back to the compiled JS and every
  // component prop loses its type.
  const declarationEntry = path.join(stageDir, 'index.d.ts');
  if (!fs.existsSync(declarationEntry)) {
    throw new Error(
      `[@repo/stylex-ui] Declaration emit did not produce ${declarationEntry}. Aborting to avoid publishing a dist without types.`,
    );
  }

  mirrorDirectory(stageDir, distDir);
  fs.rmSync(stageDir, { recursive: true, force: true });

  console.log(
    `[@repo/stylex-ui] Built ${files.length} files and generated dist/styles.css (${stylexRules.length} StyleX rule groups).`,
  );
}

build().catch((err) => {
  console.error('[@repo/stylex-ui] Build failed:', err);
  process.exit(1);
});
