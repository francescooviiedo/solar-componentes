import React from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Skeleton } from "@mui/material";
import SkeletonTextBox from "./SkeletonTextBox";

export const skeletonColums: GridColDef[] = [
  {
    field: "date",
    headerName: "Processo/Classe",
    renderCell: () => (
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
    ),
    flex: 1,
    display: "flex",
    minWidth: 250,
  },
  {
    field: "evento",
    headerName: "Vara/Colegiado",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "requerente",
    headerName: "Requerente",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "tipo",
    headerName: "Tipo",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "cadastrado_em",
    headerName: "Data",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "prazo_ciencia",
    headerName: "Prazo",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "situacao",
    headerName: "Situação",
    flex: 1,
    display: "flex",
    minWidth: 5,
    renderCell: () => <SkeletonTextBox />,
  },
  {
    field: "action",
    headerName: "Ações",
    flex: 1,
    display: "flex",
    minWidth: 250,
    type: "actions",
    renderCell: () => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
      </Box>
    ),
  },
];

export default skeletonColums;
