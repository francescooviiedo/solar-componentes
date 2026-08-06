import { Box, Tooltip, Badge, IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import type { MouseEvent } from "react";

type Props = Readonly<{
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  iconSize?: number;
}>;

export default function BotaoHistoricoDistribuicao({
  onClick,
  iconSize = 20,
}: Props) {
  return (
    <Tooltip title="Histórico de Distribuição" arrow>
      <Box
        sx={{
          position: "relative",
          marginLeft: "10px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 26,
            height: 26,
            borderRadius: "8px",
            backgroundColor: "rgba(99, 102, 241, 0.08)",
            animation: "subtle-pulse 3s ease-in-out infinite",
            "@keyframes subtle-pulse": {
              "0%, 100%": {
                opacity: 0.08,
                transform: "scale(1)",
              },
              "50%": {
                opacity: 0.12,
                transform: "scale(1.05)",
              },
            },
          }}
        />

        <Badge
        >
          <IconButton
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClick(e);
            }}
            size="small"
            sx={{
              position: "relative",
              width: 26,
              height: 26,
              minWidth: 26,
              minHeight: 26,
              backgroundColor: "#f8fafc",
              color: "#475569",
              border: "1px solid #e2e8f0",
              borderRadius: "7px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "#f1f5f9",
                color: "#334155",
                borderColor: "#cbd5e1",
                transform: "translateY(-1px)",
                boxShadow: "0 2px 6px rgba(99, 102, 241, 0.15)",
                "&::after": {
                  opacity: 1,
                },
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "7px",
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)",
                opacity: 0,
                transition: "opacity 0.2s ease",
                zIndex: -1,
              },
              "& .MuiSvgIcon-root": {
                transition: "transform 0.2s ease",
              },
              "&:hover .MuiSvgIcon-root": {
                transform: "scale(1.1)",
              },
            }}
          >
            <HistoryIcon
              fontSize="small"
              sx={{
                fontSize: iconSize,
                transition: "all 0.2s ease",
              }}
            />
          </IconButton>
        </Badge>

        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 2,
            borderRadius: "1px",
            background:
              "linear-gradient(90deg, transparent, #6366f1, transparent)",
            opacity: 0,
            transition: "opacity 0.2s ease",
            ".MuiTooltip-popper:hover &": {
              opacity: 0.6,
            },
          }}
        />
      </Box>
    </Tooltip>
  );
}
