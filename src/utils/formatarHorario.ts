/**
 * formatarHorario("2025-02-19T12:18:43.496000") → "12:18"
 */
export function formatarHorario(dataString?: string): string {
  if (!dataString) return "";

  const data = new Date(dataString);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Remove segundos, compatível com "dd/MM/yyyy HH:mm:ss" e ISO
 */
export function formatarDataHoraSemSegundos(value?: string): string {
  if (!value) return "";
  const m = /^(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2})/.exec(value);
  return m ? `${m[1]} ${m[2]}` : value;
}
