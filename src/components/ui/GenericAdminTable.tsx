import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

export type AdminTableColumn<T> = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
};

export type AdminTableAction<T> = {
  icon: "view" | "edit" | "delete";
  onClick: (row: T) => void;
  tooltip?: string;
  loading?: boolean;
  hasPermission?: boolean;
};

type Props<T> = {
  data: T[];
  columns: AdminTableColumn<T>[];
  actions?: AdminTableAction<T>[];
};

export default function GenericAdminTable<T extends { id: number | string }>({
  data,
  columns,
  actions,
}: Readonly<Props<T>>) {
  const getIcon = (type: string) => {
    switch (type) {
      case "view":
        return <VisibilityIcon fontSize="inherit" />;
      case "edit":
        return <EditIcon fontSize="inherit" />;
      case "delete":
        return <DeleteIcon fontSize="inherit" />;
      default:
        return null;
    }
  };

  const renderAction = (action: AdminTableAction<T>, row: T) => {
    const button = (
      <IconButton
        loading={action.loading}
        aria-label={action.icon}
        size="small"
        onClick={() => action.onClick(row)}
      >
        {getIcon(action.icon)}
      </IconButton>
    );

    const withTooltip = action.tooltip ? (
      <Tooltip title={action.tooltip} key={action.icon}>
        {button}
      </Tooltip>
    ) : (
      React.cloneElement(button, { key: action.icon })
    );

    if (action.hasPermission === false) return null;

    return withTooltip;
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"}>
                  {col.label}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="center">Ações</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || "left"}>
                    {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    {actions.map((action) => renderAction(action, row))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
