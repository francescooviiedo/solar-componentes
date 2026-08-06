import { TableRow, TableCell, Skeleton } from "@mui/material";

const ROW_HEIGHT = 96;
const SKELETON_ROWS_COUNT = 10;

const cellConfigs = [
  { key: "preview", align: "center" as const, sx: { verticalAlign: "middle", p: 1 }, skeleton: <Skeleton variant="rectangular" width="100%" height={ROW_HEIGHT - 16} /> },
  { key: "col-1", align: "center" as const, sx: { verticalAlign: "middle" }, skeleton: <Skeleton width="80%" height={24} /> },
  { key: "col-2", align: "center" as const, sx: { verticalAlign: "middle" }, skeleton: <Skeleton width="70%" height={24} /> },
  { key: "col-3", align: "center" as const, sx: { verticalAlign: "middle" }, skeleton: <Skeleton width="60%" height={24} /> },
  { key: "col-4", align: "center" as const, sx: { verticalAlign: "middle" }, skeleton: <Skeleton width="60%" height={24} /> },
  { key: "actions", align: "center" as const, sx: { verticalAlign: "middle" }, skeleton: <Skeleton variant="circular" width={40} height={40} /> },
];

export const skeletonRows = (
  <>
    {Array.from({ length: SKELETON_ROWS_COUNT }).map((_, idx) => (
      <TableRow
        key={`skeleton-row-${idx + 1}`}
        sx={{
          height: ROW_HEIGHT,
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        {cellConfigs.map((cell) => (
          <TableCell key={cell.key} align={cell.align} sx={cell.sx}>
            {cell.skeleton}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);