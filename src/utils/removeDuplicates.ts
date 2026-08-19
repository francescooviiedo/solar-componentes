/**
 * Remove duplicate items from an array by a given key or by object value.
 */
export function removeDuplicates<T>(list: T[], keySelector?: (item: T) => unknown): T[] {
  if (!Array.isArray(list)) return [];
  if (!keySelector) {
    return Array.from(new Set(list));
  }
  const seen = new Set();
  return list.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Remove duplicate document items by a `codigo` property (generic version of legacy removeDupTipoDoc).
 */
export function removeDupTipoDoc<T extends { codigo: string | number }>(listaTipoDocumento: T[]): T[] {
  return removeDuplicates(listaTipoDocumento, (doc) => doc?.codigo);
}
