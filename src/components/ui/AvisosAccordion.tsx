import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type AvisosAccordionItem = {
  id?: string | number;
  numero?: string | number;
  processo?: {
    numero?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export type AvisosAccordionProps = {
  avisos?: AvisosAccordionItem[];
  defaultExpanded?: boolean;
  title?: string;
  renderItem?: (item: AvisosAccordionItem) => React.ReactNode;
};

export function AvisosAccordion({
  avisos,
  defaultExpanded = false,
  title,
  renderItem,
}: Readonly<AvisosAccordionProps>) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-avisos-content"
        id="panel-avisos-header"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ m: 1, fontWeight: "bold" }}>
            {title ?? "Processos que serão redistribuídos"}
          </Typography>

          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "10px",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {avisos?.length ?? 0}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          {avisos?.map((aviso, idx) => {
            if (renderItem) {
              return <React.Fragment key={aviso.id ?? idx}>{renderItem(aviso)}</React.Fragment>;
            }
            return (
              <Box
                key={aviso.id ?? idx}
                sx={{
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  borderRadius: 2,
                  p: 2,
                  m: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  Aviso: {aviso.numero}
                </Typography>
                <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>
                  Processos:{" "}
                  <Box
                    component="span"
                    sx={{ color: "text.primary", fontWeight: 500 }}
                  >
                    {aviso.processo?.numero || "Número não disponível"}
                  </Box>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default AvisosAccordion;
