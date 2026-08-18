import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Skeleton,
} from "@mui/material";
import { ReactNode, RefObject } from "react";
import TabelaPaginacao from "./TabelaPaginacao";

type Column = {
  label: string | ReactNode;
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify';
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
};

type Props = {
  columns: Column[];
  loading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
  children: ReactNode;
  containerRef?: RefObject<HTMLDivElement | null>;
  isGrade: boolean;
  page: number;
  count: number;
  currentResults: number;
  totalPages: number;
  itemsPerPage: number;
  inputPage: string | number;
  onGoToPage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onInputPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputPageSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function GenericTableBase({
  columns,
  loading,
  isEmpty,
  emptyMessage,
  children,
  containerRef,
  isGrade,
  page,
  count,
  currentResults,
  totalPages,
  itemsPerPage,
  inputPage,
  onGoToPage,
  onPrev,
  onNext,
  onInputPageChange,
  onInputPageSubmit,
}: Readonly<Props>) {
  let tableBodyContent;

  if (loading && currentResults === 0) {
    tableBodyContent = (
      <TableBody>
        {Array.from({ length: 10 }).map((_, idx) => (
          <TableRow
            key={`skeleton-row-${idx}`}
            sx={{
              height: 96,
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {columns.map((c, cIdx) => (
              <TableCell key={cIdx} align={c.align || "center"} sx={{ verticalAlign: "middle" }}>
                <Skeleton width="70%" height={24} sx={{ mx: "auto" }} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  } else if (isEmpty) {
    tableBodyContent = (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              {emptyMessage}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    tableBodyContent = (
      <TableBody>
        {children}
      </TableBody>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, width: "100%" }}>
      <TableContainer
        ref={containerRef}
        sx={{
          flex: 1,
          minHeight: 0,
          maxHeight: "100%",
          maxWidth: "100%",
          minWidth: 0,
          width: "100%",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0,0,0,0.02)",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.1)",
            borderRadius: 3,
            "&:hover": { background: "rgba(0,0,0,0.15)" },
          },
        }}
      >
        <Table
          stickyHeader
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            width: "100%",
            "& th, & td": {
              borderRight: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              "&:first-of-type": {
                borderLeft: "1px solid #e0e0e0",
              },
            },
            "& th": {
              borderTop: "1px solid #e0e0e0",
            },
          }}
        >
          <TableHead sx={{ background: "#DDDDDD" }}>
            <TableRow>
              {columns.map((c, index) => (
                <TableCell
                  key={typeof c.label === 'string' ? c.label : index}
                  align={c.align || "center"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    bgcolor: "#DDDDDD",
                    minWidth: c.minWidth,
                    maxWidth: c.maxWidth,
                    width: c.width,
                    zIndex: 2,
                  }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {tableBodyContent}
        </Table>
      </TableContainer>

      <TabelaPaginacao
        page={page}
        count={count}
        currentResults={currentResults}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        inputPage={inputPage.toString()}
        compact={isGrade}
        onGoToPage={onGoToPage}
        onPrev={onPrev}
        onNext={onNext}
        onInputPageChange={onInputPageChange}
        onInputPageSubmit={onInputPageSubmit}
      />
    </Box>
  );
}
