

import * as React from "react";
import { Box, Typography, IconButton, MenuItem, Select } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type PaginacaoProps = Readonly<{
  page: number; // 0-indexed
  pageSize: number;
  rowCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}>;

export default function Paginacao({
  page,
  pageSize,
  rowCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginacaoProps) {
  const displayPage = page + 1;
  const totalPages = Math.max(1, Math.ceil(rowCount / pageSize));
  const startRecord = rowCount > 0 ? page * pageSize + 1 : 0;
  const endRecord = Math.min((page + 1) * pageSize, rowCount);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px",
        py: "12px",
        px: "16px",
        borderTop: "1px solid lightgray",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "Inter",
          fontSize: "14px",
          color: "#666666",
        }}
      >
        <span>Registros por página:</span>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          variant="standard"
          disableUnderline
          sx={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 700,
            color: "#666666",
            cursor: "pointer",
            "& .MuiSelect-select": {
              py: 0,
              pr: "20px !important",
            },
          }}
        >
          {pageSizeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Typography sx={{ fontFamily: "Inter", fontSize: "14px", color: "#666666" }}>
        {startRecord}-{endRecord} de {rowCount}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <IconButton
          onClick={() => onPageChange(0)}
          disabled={displayPage === 1}
          size="small"
          sx={{ p: "4px", color: "#666666" }}
        >
          <FirstPageIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page - 1)}
          disabled={displayPage === 1}
          size="small"
          sx={{ p: "4px", color: "#666666" }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={displayPage === totalPages}
          size="small"
          sx={{ p: "4px", color: "#666666" }}
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(totalPages - 1)}
          disabled={displayPage === totalPages}
          size="small"
          sx={{ p: "4px", color: "#666666" }}
        >
          <LastPageIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
