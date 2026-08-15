import { Box, Collapse, Button, useMediaQuery, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onSearch: () => void;
  onClear: () => void;
  children: ReactNode;
  searchUnificada: ReactNode;
  isAbsolute?: boolean;
  containerGap?: number | string;
  onClose?: () => void;
};

export function FilterLayout({
  isOpen,
  isPending,
  onSearch,
  onClear,
  children,
  searchUnificada,
  isAbsolute = false,
  containerGap = 4,
  onClose,
}: Readonly<Props>) {
  const isMobileOrTablet = useMediaQuery("(max-width:900px)");

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => { if (isOpen && onClose) onClose(); }}>
      <Box sx={{ position: "relative" }}>
        {searchUnificada}
        <Collapse
          in={isOpen}
          orientation="vertical"
          sx={{
            position: isAbsolute ? "absolute" : "relative",
            width: "100%",
            zIndex: isAbsolute ? 1300 : "auto",
            left: 0,
            pointerEvents: isAbsolute ? "none" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: "24px",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: containerGap,
              background: "#F2F2F2",
              width: "100%",
              maxWidth: 1100,
              mx: "auto",
              borderRadius: "10px",
              boxShadow: isAbsolute ? "0px 4px 6px rgba(0,0,0,0.30), 0px 10px 20px rgba(0,0,0,0.30), 0px 20px 40px rgba(0,0,0,0.30)" : "none",
              border: isAbsolute ? "1px solid #207840" : "none",
              mt: isAbsolute ? 0 : 2,
              pointerEvents: "auto",
            }}
          >
            {children}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: isMobileOrTablet ? "center" : "flex-end",
                //aqui
                gap: 3,
                width: "100%",
                mt: 0,
                alignItems: "center",
              }}
            >
              <Button
                onClick={onSearch}
                startIcon={<SearchIcon />}
                loading={isPending}
                sx={{ borderRadius: 2 }}
              >
                Pesquisar
              </Button>
              <Button
                onClick={onClear}
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                {isAbsolute ? "Limpar" : "limpar"}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </ClickAwayListener>
  );
}
