'use client';

import { Box, Collapse, Button, useMediaQuery, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactNode } from "react";

type PropsLayoutFiltro = {
  estaAberto: boolean;
  estaPendente: boolean;
  aoPesquisar: () => void;
  aoLimpar: () => void;
  children: ReactNode;
  buscaUnificada: ReactNode;
  ehAbsoluto?: boolean;
  espacamentoContainer?: number | string;
  aoFechar?: () => void;
};

export function LayoutFiltro({
  estaAberto,
  estaPendente,
  aoPesquisar,
  aoLimpar,
  children,
  buscaUnificada,
  ehAbsoluto = false,
  espacamentoContainer = 4,
  aoFechar,
}: Readonly<PropsLayoutFiltro>) {
  const ehMobileOuTablet = useMediaQuery("(max-width:900px)");

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => { if (estaAberto && aoFechar) aoFechar(); }}>
      <Box sx={{ position: "relative" }}>
        {buscaUnificada}
        <Collapse
          in={estaAberto}
          orientation="vertical"
          sx={{
            position: ehAbsoluto ? "absolute" : "relative",
            width: "100%",
            zIndex: ehAbsoluto ? 1300 : "auto",
            left: 0,
            pointerEvents: ehAbsoluto ? "none" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: "24px",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: espacamentoContainer,
              background: "#F2F2F2",
              width: "100%",
              maxWidth: 1100,
              mx: "auto",
              borderRadius: "10px",
              boxShadow: ehAbsoluto ? "0px 4px 6px rgba(0,0,0,0.30), 0px 10px 20px rgba(0,0,0,0.30), 0px 20px 40px rgba(0,0,0,0.30)" : "none",
              border: ehAbsoluto ? "1px solid #207840" : "none",
              mt: ehAbsoluto ? 0 : 2,
              pointerEvents: "auto",
            }}
          >
            {children}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: ehMobileOuTablet ? "center" : "flex-end",
                gap: 3,
                width: "100%",
                mt: 0,
                alignItems: "center",
              }}
            >
              <Button
                onClick={aoPesquisar}
                startIcon={<SearchIcon />}
                disabled={estaPendente}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                {estaPendente ? 'Pesquisando...' : 'Pesquisar'}
              </Button>
              <Button
                onClick={aoLimpar}
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                {ehAbsoluto ? "Limpar" : "limpar"}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </ClickAwayListener>
  );
}
