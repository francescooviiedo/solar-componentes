export function separarItensPorId<T extends { id: number | string }>(
  allItems: T[],
  selectedIds?: (number | string)[],
): { available: T[]; selected: T[] } {
  if (!selectedIds || selectedIds.length === 0) {
    return { available: allItems, selected: [] };
  }
  const idSet = new Set(selectedIds.map(String));
  const selected = allItems.filter((item) => idSet.has(String(item.id)));
  const available = allItems.filter((item) => !idSet.has(String(item.id)));
  return { available, selected };
}
