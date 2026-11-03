import type { DataKey } from 'recharts';

/**
 * Recharts 3 infers data keys from the datum generic. Our public API only
 * knows `keyof TDatum & string`, so this narrows the contract in one place.
 */
export function toDataKey<TDatum extends object>(
  key: keyof TDatum & string,
): DataKey<TDatum> {
  return key as DataKey<TDatum>;
}
