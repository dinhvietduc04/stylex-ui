import type { Product } from '@repo/api-contracts';

import type { ProductFormValues } from './product-form.schema';

export function productToFormValue(
  product?: Product | null,
): ProductFormValues {
  if (!product) {
    return { name: '', description: '', price: 0, status: 'active' };
  }

  return {
    name: product.name,
    description: product.description,
    price: product.price,
    status: product.status,
  };
}
