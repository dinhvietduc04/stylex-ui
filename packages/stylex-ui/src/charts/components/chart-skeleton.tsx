import * as stylex from '@stylexjs/stylex';
import { Skeleton } from '../../components/skeleton';
import { mergeStylexProps } from '../../lib/stylex-utils';
import type { ChartSkeletonProps } from '../types';

const styles = stylex.create({
  frame: {
    width: '100%',
    minWidth: 0,
  },
});

export function ChartSkeleton({ height = 320, sx }: ChartSkeletonProps) {
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      {...mergeStylexProps({ sx }, styles.frame)}
      style={{ height: resolvedHeight }}
      aria-hidden="true"
    >
      <Skeleton variant="rounded" width="100%" height="100%" />
    </div>
  );
}

ChartSkeleton.displayName = 'ChartSkeleton';
