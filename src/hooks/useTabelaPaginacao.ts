import { useState } from "react";

export type UseTabelaPaginacaoProps<T> = {
  payload: T;
  setPayload: React.Dispatch<React.SetStateAction<T>>;
  initialPage?: number;
  itemsPerPage?: number;
};

export function useTabelaPaginacao<T extends object>({
  payload,
  setPayload,
  initialPage = 1,
  itemsPerPage = 10,
}: Readonly<UseTabelaPaginacaoProps<T>>) {
  const [page, setPage] = useState<number>(initialPage);
  const [inputPage, setInputPage] = useState<string>("");

  function goToPage(targetPage: number) {
    const validPage = Math.max(1, targetPage);
    setPage(validPage);

    const newPayload = { ...payload } as Record<string, unknown>;

    // Handle both 'page' based APIs and 'offset' based APIs
    if ("page" in payload) {
      newPayload.page =
        typeof (payload as { page?: unknown }).page === "string"
          ? String(validPage)
          : validPage;
    }

    if ("offset" in payload) {
      const limit = Number(
        (payload as { limit?: unknown }).limit ?? itemsPerPage
      );
      const newOffset = (validPage - 1) * limit;
      newPayload.offset =
        typeof (payload as { offset?: unknown }).offset === "string"
          ? String(newOffset)
          : newOffset;
    }

    setPayload(newPayload as unknown as T);
  }

  function handlePagination(next: boolean) {
    goToPage(next ? page + 1 : page - 1);
  }

  function handleInputPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputPage(event.target.value);
  }

  function handleInputPageSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const targetPage = Number.parseInt(inputPage, 10);
      if (!Number.isNaN(targetPage) && targetPage >= 1) {
        goToPage(targetPage);
      }
      setInputPage("");
    }
  }

  return {
    page,
    setPage,
    inputPage,
    setInputPage,
    goToPage,
    handlePagination,
    handleInputPageChange,
    handleInputPageSubmit,
  };
}

export default useTabelaPaginacao;
