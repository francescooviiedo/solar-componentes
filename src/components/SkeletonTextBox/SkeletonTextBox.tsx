import React from 'react';
import { Box, Skeleton } from '@mui/material';

type Props = {
  fontSize?: string | number;
  width?: string | number;
};

export function SkeletonTextBox({ fontSize = '1rem', width = '100%' }: Readonly<Props>) {
  return (
    <Box sx={{ width }}>
      <Skeleton variant="text" sx={{ fontSize }} />
    </Box>
  );
}
