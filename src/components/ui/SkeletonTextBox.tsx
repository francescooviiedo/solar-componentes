import React from 'react';
import { Box, Skeleton } from '@mui/material';

export type PropsSkeletonTextBox = {
  fontSize?: string | number;
  width?: string | number;
};

export function SkeletonTextBox({ fontSize = '1rem', width = '100%' }: Readonly<PropsSkeletonTextBox>) {
  return (
    <Box sx={{ width }}>
      <Skeleton variant="text" sx={{ fontSize }} />
    </Box>
  );
}

export default SkeletonTextBox;
