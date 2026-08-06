import { Box, Tooltip, Typography, Chip } from "@mui/material";
import type { ReactNode } from "react";

type ProcessoHeaderVariant = "default" | "full" | "grade";

type Props = Readonly<{
  numero: string;
  sistemaSemSigla: string;
  corDoChip: string;
  isPainel?: boolean;
  leftAddon?: ReactNode;
  variant?: ProcessoHeaderVariant;
}>;

export default function ProcessoHeader({
  numero,
  sistemaSemSigla,
  corDoChip,
  isPainel = false,
  leftAddon,
}: Props) {

  return (
    <>
      {isPainel ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 1,
            marginBottom: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
              width: "100%",
            }}
          >
            <Chip
              label={sistemaSemSigla}
              size="small"
              sx={{
                backgroundColor: corDoChip,
                color: "#FFF",
                fontWeight: "bold",
                fontSize: "10px",
                padding: "4px 10px",
              }}
            />
            {leftAddon ? <Box sx={{ display: "flex" }}>{leftAddon}</Box> : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Tooltip title="Número do Aviso">
              <Typography
                variant="caption"
                fontWeight="bold"
                marginRight={2}
                noWrap
                sx={{ whiteSpace: "nowrap", letterSpacing: "-0.2px", fontSize: "11px" }}
              >
                {numero}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: "8px",
          }}
        >
          <Tooltip title="Número do Aviso">
            <Typography fontSize={13} variant="caption" fontWeight="bold" marginRight={2}>
              {numero}
            </Typography>
          </Tooltip>
          <Chip
            label={sistemaSemSigla}
            size="small"
            sx={{
              backgroundColor: corDoChip,
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "12px",
              padding: "4px 10px",
            }}
          />
          {leftAddon ? <Box sx={{ display: "flex" }}>{leftAddon}</Box> : null}
        </Box>
      )}
    </>
  );
}
