import { Box, Typography, Button, Paper } from '@mui/material';

export interface HelloSolarProps {
  title?: string;
  message?: string;
  onAction?: () => void;
}

export function HelloSolar({
  title = "Componente Solar",
  message = "Este componente veio diretamente do pacote externo solar-componentes!",
  onAction,
}: HelloSolarProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: 500,
        mx: 'auto',
        my: 4,
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#38bdf8', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          {message}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onAction || (() => alert('Ação executada do componente solar-componentes!'))}
        sx={{
          mt: 2,
          backgroundColor: '#0284c7',
          '&:hover': {
            backgroundColor: '#0369a1',
          },
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
          py: 1,
        }}
      >
        Clique para Testar
      </Button>
    </Paper>
  );
}
