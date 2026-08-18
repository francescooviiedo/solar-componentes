export function formatarNome(input?: string | null): string {
  if (!input) return "";

  const preposicoes = new Set(["da", "de", "do", "das", "dos", "e"]);

  return input
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      if (index > 0 && preposicoes.has(word)) {
        return word;
      }
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}
