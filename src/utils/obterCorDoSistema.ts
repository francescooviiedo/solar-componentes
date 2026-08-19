/**
 * Retorna a cor padrão associada a um sistema judicial (ex: EPROC, PJE).
 */
export function obterCorDoSistema(sistema?: string | null): string {
  if (!sistema) return "#207840";
  const mapaCores: Record<string, string> = {
    "EPROC-1G": "#4165E7",
    "EPROC-2G": "#23A740",
    "PJE-1G": "#FA8518",
    "PJE-2G": "#6241E7",
  };

  return mapaCores[sistema] || "#207840";
}
