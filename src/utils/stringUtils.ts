export function resizeString(str?: string | null, value: number = 20): string {
  if (!str) return "";
  if (str.length <= value) return str;
  return `${str.slice(0, value)}...`;
}

export const formatString = (value?: string | null): string => {
  if (!value) return "";
  return value.replace(
    /^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/,
    "$1-$2.$3.$4.$5.$6"
  );
};

export const removeFormatting = (value?: string | null): string => {
  return value ? value.replaceAll(/\D/g, "") : "";
};
