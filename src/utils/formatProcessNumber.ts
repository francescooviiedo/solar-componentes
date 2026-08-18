export function formatProcessNumber(numero?: string | null): string {
  if (!numero) return "";
  return numero.replace(
    /^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/,
    "$1-$2.$3.$4.$5.$6"
  );
}
