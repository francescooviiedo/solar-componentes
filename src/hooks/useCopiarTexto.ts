import { useState, type MouseEvent } from "react";
import { formatProcessNumber } from "../utils/formatProcessNumber";

export function useCopiarTexto(texto: string, delay = 1500) {
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const textoFormatado = formatProcessNumber(texto);

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(textoFormatado);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), delay);
  };

  return { copiado, handleCopiar };
}

export default useCopiarTexto;
