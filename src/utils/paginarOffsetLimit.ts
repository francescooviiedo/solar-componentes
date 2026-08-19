export interface PaginarOffsetLimitOptions {
  startTransition: (callback: () => void) => void;
  searchParams?: { toString: () => string } | null;
  router: { push: (url: string, options?: { scroll?: boolean }) => void };
  pathname?: string | null;
}

/**
 * Atualiza a paginação manipulando parâmetros offset e limit na URL de forma reativa.
 */
export function paginarOffsetLimit(
  modelo: { page: number; pageSize: number },
  opcoes: PaginarOffsetLimitOptions
) {
  const { startTransition, searchParams, router, pathname } = opcoes;

  startTransition(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    const page = modelo.page + 1;
    const limit = modelo.pageSize;
    const offset = modelo.page * modelo.pageSize;

    params.set("page", page.toString());
    params.set("limit", limit.toString());
    params.set("offset", offset.toString());

    router.push(`${pathname || ""}?${params.toString()}`, { scroll: false });
  });
}
