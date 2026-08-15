import { Box, Skeleton } from "@mui/material";

type TableSkeletonMobileProps = {
  count?: number;
};

export default function TableSkeletonMobile({ count = 5 }: Readonly<TableSkeletonMobileProps>) {
  const rowKeys = Array.from({ length: count }, (_, position) => `skeleton-row-${position + 1}`);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {rowKeys.map((rowKey) => (
        <Box
          key={rowKey}
          sx={{
            border: "1px solid #e0e0e0",
            backgroundColor: "white",
            borderRadius: 2,
            p: 2,
            m: 2,
            width: "calc(100% - 32px)",
            maxWidth: 500,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={22} />
        </Box>
      ))}
    </Box>
  );
}
