"use client";

import * as React from "react";
import { useGridApiContext, useGridRootProps } from "@mui/x-data-grid";
import Paginacao from "./Paginacao";

export default function PaginacaoDataGrid() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  const page = rootProps.paginationModel?.page ?? 0;
  const pageSize = rootProps.paginationModel?.pageSize ?? 10;
  const rowCount = rootProps.rowCount ?? 0;

  return (
    <Paginacao
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      onPageChange={(newPage) => apiRef.current.setPage(newPage)}
      onPageSizeChange={(newPageSize) => apiRef.current.setPageSize(newPageSize)}
      pageSizeOptions={(rootProps.pageSizeOptions as number[]) || [10, 20, 50, 100]}
    />
  );
}