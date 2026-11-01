import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Company Website',
  description: 'Your Product, Your Vision, Our Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes writes `class` and `style="color-scheme: ..."` onto <html>
    // from a blocking script before hydration. That mutation is intentional,
    // so the element opts out of the attribute comparison.
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
