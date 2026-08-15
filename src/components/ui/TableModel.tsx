import React from 'react';
import { Box, IconButton, Typography, Skeleton } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

export type GenericMobileCardItem = {
  label: string;
  value: React.ReactNode;
  isHeader?: boolean;
  color?: string;
};

export type TableModelProps<T> = {
  listing?: T[];
  isPending: boolean;
  type?: "avisos" | "manifestacoes" | string;
  handleOpenModal?: (item: any) => void;
  handleOpenModalManifestacao?: (item: any) => void;
  height?: string;
  setPayload?: React.Dispatch<React.SetStateAction<any>>;
  payload?: any;
  highlightColor?: string;
  count?: number;
  renderItem?: (item: T) => React.ReactNode;
  emptyText?: string;
};

export function TableSkeletonMobile({ count = 3 }: { count?: number }) {
  return (
    <Box sx={{ width: "100%", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={80} sx={{ borderRadius: 2 }} />
      ))}
    </Box>
  );
}

export function GenericMobileCard({ items }: { items: GenericMobileCardItem[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {items.map((item, i) => (
        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant={item.isHeader ? "subtitle2" : "caption"}
            color={item.color ?? "text.secondary"}
            fontWeight={item.isHeader ? 700 : 400}
          >
            {item.label}:
          </Typography>
          <Typography
            variant={item.isHeader ? "subtitle2" : "body2"}
            color={item.color ?? "text.primary"}
            fontWeight={item.isHeader ? 700 : 500}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function TabelaModel<T = any>({
  listing,
  isPending,
  type = "avisos",
  handleOpenModal,
  handleOpenModalManifestacao,
  height = "55vh",
  highlightColor,
  payload,
  setPayload,
  count,
  renderItem,
  emptyText,
}: Readonly<TableModelProps<T>>) {
  const hasPagination = payload !== undefined && setPayload !== undefined && count !== undefined;
  
  let currentPage = 1;
  let totalPages = 1;

  if (hasPagination) {
    const p = payload as any;
    if (type === "avisos") {
      currentPage = p.page ?? 1;
      const pageSize = p.page_size ?? 10;
      totalPages = Math.ceil((count ?? 0) / pageSize);
    } else {
      const limit = Number.parseInt(p.limit ?? "10");
      const offset = Number.parseInt(p.offset ?? "0");
      currentPage = Math.floor(offset / limit) + 1;
      totalPages = Math.ceil((count ?? 0) / limit);
    }
  }

  if (totalPages === 0) totalPages = 1;

  const handlePrevPage = () => {
    if (!hasPagination) return;
    if (currentPage <= 1) return;
    
    setPayload?.((prev: any) => {
      if (type === "avisos") {
        return { ...prev, page: currentPage - 1 };
      } else {
        const limit = Number.parseInt(prev.limit ?? "10");
        return { ...prev, offset: String((currentPage - 2) * limit) };
      }
    });
  };

  const handleNextPage = () => {
    if (!hasPagination) return;
    if (currentPage >= totalPages) return;
    
    setPayload?.((prev: any) => {
      if (type === "avisos") {
        return { ...prev, page: currentPage + 1 };
      } else {
        const limit = Number.parseInt(prev.limit ?? "10");
        return { ...prev, offset: String(currentPage * limit) };
      }
    });
  };

  let renderContent = null;

  if (isPending) {
    renderContent = <TableSkeletonMobile count={3} />;
  } else if (!listing || listing.length === 0) {
    renderContent = (
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          backgroundColor: "white",
          borderRadius: 2,
          p: 4,
          m: 2,
          width: "calc(100% - 32px)",
          maxWidth: 500,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {emptyText ?? (type === "avisos" ? "Nenhum aviso encontrado." : "Nenhuma manifestação encontrada.")}
        </Typography>
      </Box>
    );
  } else {
    renderContent = listing.map((row: any, index: number) => {
      let content = null;

      if (renderItem) {
        content = renderItem(row);
      } else if (type === "avisos" && ("numero" in row)) {
        const items = [
          { label: "Aviso", value: row.numero, isHeader: true, color: "primary.main" },
          { label: "Numero Processo", value: row.processo?.numero }
        ];
        content = <GenericMobileCard items={items} />;
      } else if ("tipo" in row) {
        const items = [
          { label: "ID da Manifestação", value: String(row.id), isHeader: true, color: highlightColor || "info.main" },
          { label: "Tipo", value: row.tipo },
          { label: "Ação", value: row.processo?.numero_exibicao || row.processo?.numero }
        ];
        content = <GenericMobileCard items={items} />;
      }

      const key = row.id ? row.id : (row.numero ? `${row.numero}-${row.processo?.numero ?? index}` : index);

      return (
        <Box
          onClick={() => {
            if (type === "avisos" && handleOpenModal) {
              handleOpenModal(row);
              return;
            }
            if (handleOpenModalManifestacao) {
              handleOpenModalManifestacao(row);
            }
          }}
          key={key}
          sx={{
            border: "1px solid #e0e0e0",
            backgroundColor: "white",
            borderRadius: 2,
            p: 2,
            m: 2,
            width: "calc(100% - 32px)",
            maxWidth: 500,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "0.2s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            },
          }}
        >
          {content}
        </Box>
      );
    });
  }

  return (
    <Box
      sx={{
        height,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {renderContent}
      </Box>

      {hasPagination && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            py: 1,
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            width: "100%",
            bgcolor: "white",
          }}
        >
          <IconButton onClick={handlePrevPage} disabled={currentPage <= 1}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {currentPage} de {totalPages}
          </Typography>
          <IconButton onClick={handleNextPage} disabled={currentPage >= totalPages}>
            <ChevronRight />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export const TableModel = TabelaModel;
export default TabelaModel;
