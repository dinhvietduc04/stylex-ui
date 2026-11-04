'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { globalTokens } from '../tokens/global.stylex';
import { semanticTokens } from '../tokens/semantic.stylex';
import { componentTokens } from '../tokens/component.stylex';
import { mergeStylexProps } from '../lib/stylex-utils';

export type TableDensity = 'comfortable' | 'compact';

const TableDensityContext = React.createContext<TableDensity>('comfortable');

const styles = stylex.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: componentTokens.tableRadius,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: componentTokens.tableBorder,
    backgroundColor: componentTokens.tableBg,
  },
  scroll: {
    width: '100%',
    overflowX: 'auto',
    outline: 'none',
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: semanticTokens.borderFocus,
      outlineOffset: '-2px',
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    textAlign: 'left',
    color: semanticTokens.textPrimary,
  },
  header: {
    backgroundColor: componentTokens.tableHeaderBg,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: componentTokens.tableBorder,
  },
  headCell: {
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeXs,
    fontWeight: globalTokens.fontWeightSemibold,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: componentTokens.tableHeaderText,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  headCellCompact: {
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
  },
  bodyRow: {
    backgroundColor: componentTokens.tableBg,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: componentTokens.tableDivider,
    transitionProperty: 'background-color',
    transitionDuration: globalTokens.durationNormal,
  },
  bodyRowHoverable: {
    transitionProperty: 'background-color',
    transitionDuration: globalTokens.durationNormal,
    ':hover': {
      backgroundColor: componentTokens.tableRowHoverBg,
    },
    ':focus-within': {
      backgroundColor: componentTokens.tableRowHoverBg,
    },
  },
  bodyRowSelected: {
    backgroundColor: componentTokens.tableRowSelectedBg,
    ':hover': {
      backgroundColor: componentTokens.tableRowSelectedBg,
    },
    ':focus-within': {
      backgroundColor: componentTokens.tableRowSelectedBg,
    },
  },
  cell: {
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    verticalAlign: 'middle',
    color: semanticTokens.textPrimary,
  },
  cellCompact: {
    paddingTop: globalTokens.space2,
    paddingBottom: globalTokens.space2,
    paddingLeft: globalTokens.space3,
    paddingRight: globalTokens.space3,
  },
  caption: {
    captionSide: 'bottom',
    paddingTop: globalTokens.space3,
    paddingBottom: globalTokens.space3,
    paddingLeft: globalTokens.space4,
    paddingRight: globalTokens.space4,
    fontFamily: globalTokens.fontSans,
    fontSize: globalTokens.fontSizeSm,
    lineHeight: globalTokens.lineHeightNormal,
    color: semanticTokens.textDisabled,
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  footer: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: componentTokens.tableDivider,
    backgroundColor: componentTokens.tableFooterBg,
  },
  emptyCell: {
    padding: 0,
  },
  emptyRow: {
    borderBottomWidth: 0,
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  footer?: React.ReactNode;
  /** Accessible name for the horizontally scrollable region. */
  label?: string;
  /**
   * Minimum height for the scrollable table area. Use it to keep a
   * pagination footer anchored when the last page has fewer rows.
   */
  minHeight?: string | number;
  sx?: StyleXStyles;
  containerSx?: StyleXStyles;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      density = 'comfortable',
      footer,
      label,
      minHeight,
      sx: customSx,
      containerSx,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <TableDensityContext.Provider value={density}>
      <div {...stylex.props(styles.container, containerSx)}>
        <div
          role={label ? 'region' : undefined}
          aria-label={label}
          tabIndex={label ? 0 : undefined}
          {...stylex.props(styles.scroll)}
          style={minHeight !== undefined ? { minHeight } : undefined}
        >
          <table
            ref={ref}
            {...mergeStylexProps(
              { className, style, sx: customSx },
              styles.table,
            )}
            {...props}
          >
            {children}
          </table>
        </div>
        {footer ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
      </div>
    </TableDensityContext.Provider>
  ),
);
Table.displayName = 'Table';

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  sx?: StyleXStyles;
}

/**
 * Renders `<thead><tr>`. Pass `TableHead` elements directly as children.
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ sx: customSx, className, style, children, ...props }, ref) => (
  <thead
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx }, styles.header)}
    {...props}
  >
    <tr>{children}</tr>
  </thead>
));
TableHeader.displayName = 'TableHeader';

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  sx?: StyleXStyles;
}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ sx: customSx, className, style, ...props }, ref) => (
  <tbody
    ref={ref}
    {...mergeStylexProps({ className, style, sx: customSx })}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hoverable?: boolean;
  sx?: StyleXStyles;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      hoverable = true,
      sx: customSx,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      {...mergeStylexProps(
        { className, style, sx: customSx },
        styles.bodyRow,
        hoverable ? styles.bodyRowHoverable : undefined,
        selected ? styles.bodyRowSelected : undefined,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  sx?: StyleXStyles;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { align = 'left', scope = 'col', sx: customSx, className, style, ...props },
    ref,
  ) => {
    const density = React.useContext(TableDensityContext);

    return (
      <th
        ref={ref}
        scope={scope}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.headCell,
          density === 'compact' ? styles.headCellCompact : undefined,
          align === 'center' ? styles.alignCenter : undefined,
          align === 'right' ? styles.alignRight : undefined,
        )}
        {...props}
      />
    );
  },
);
TableHead.displayName = 'TableHead';

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  sx?: StyleXStyles;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = 'left', sx: customSx, className, style, ...props }, ref) => {
    const density = React.useContext(TableDensityContext);

    return (
      <td
        ref={ref}
        {...mergeStylexProps(
          { className, style, sx: customSx },
          styles.cell,
          density === 'compact' ? styles.cellCompact : undefined,
          align === 'center' ? styles.alignCenter : undefined,
          align === 'right' ? styles.alignRight : undefined,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = 'TableCell';

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  visuallyHidden?: boolean;
  sx?: StyleXStyles;
}

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(
  (
    { visuallyHidden = false, sx: customSx, className, style, ...props },
    ref,
  ) => (
    <caption
      ref={ref}
      {...mergeStylexProps(
        { className, style, sx: customSx },
        visuallyHidden ? styles.srOnly : styles.caption,
      )}
      {...props}
    />
  ),
);
TableCaption.displayName = 'TableCaption';

export interface TableEmptyProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number;
  sx?: StyleXStyles;
  cellSx?: StyleXStyles;
}

/**
 * Use inside `TableBody`. Renders a non-hoverable row spanning every column.
 */
export const TableEmpty = React.forwardRef<
  HTMLTableRowElement,
  TableEmptyProps
>(
  (
    { colSpan, sx: customSx, cellSx, className, style, children, ...props },
    ref,
  ) => (
    <TableRow
      ref={ref}
      hoverable={false}
      className={className}
      style={style}
      sx={customSx ? [styles.emptyRow, customSx] : styles.emptyRow}
      {...props}
    >
      <TableCell
        colSpan={colSpan}
        sx={cellSx ? [styles.emptyCell, cellSx] : styles.emptyCell}
      >
        {children}
      </TableCell>
    </TableRow>
  ),
);
TableEmpty.displayName = 'TableEmpty';
