import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  page: number;
  count: number;
  currentResults: number;
  totalPages?: number;
  itemsPerPage?: number;
  inputPage: string;
  compact?: boolean;
  onGoToPage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onInputPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputPageSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function TabelaPaginacao({
  page,
  count,
  currentResults,
  totalPages = 1,
  itemsPerPage = 10,
  inputPage,
  compact = false,
  onGoToPage,
  onPrev,
  onNext,
  onInputPageChange,
  onInputPageSubmit,
}: Readonly<Props>) {
  const estimatedTotalPages = totalPages > 0 ? totalPages : Math.max(1, page);
  const startRecord = currentResults > 0 ? Math.max(1, (page - 1) * itemsPerPage + 1) : 0;
  const endRecord = startRecord > 0 ? startRecord + currentResults - 1 : 0;

  const fontSize = compact ? "11px" : "14px";
  const isNextDisabled = currentResults === 0 || currentResults < itemsPerPage;
  const isLastDisabled = currentResults < itemsPerPage;

  return (
    <Box
      sx={{
        px: 2,
        p: 1,
        borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Record count */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          p: 0.5,
          borderRadius: "20px",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "primary.main", fontWeight: 600, fontSize, letterSpacing: "0.2px" }}
        >
          {count > 0 ? `${startRecord}-${endRecord}` : "0"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize }}>
          de
        </Typography>
        <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 700, fontSize }}>
          {count}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize }}>
          {count === 1 ? "registro" : "registros"}
        </Typography>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "white",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          px: 0.75,
          p: 0.25,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Tooltip title="Primeira página">
          <span>
            <IconButton
              onClick={() => onGoToPage(1)}
              disabled={page === 1}
              size="small"
              aria-label="Primeira página"
              sx={{
                color: page === 1 ? "rgba(0,0,0,0.2)" : "primary.main",
                borderRadius: "6px",
                width: 28,
                height: 28,
                "&:hover": { bgcolor: "rgba(25,118,210,0.08)" },
              }}
            >
              <FirstPageIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Página anterior">
          <span>
            <IconButton
              onClick={onPrev}
              disabled={page === 1}
              size="small"
              aria-label="Página anterior"
              sx={{
                color: page === 1 ? "rgba(0,0,0,0.2)" : "primary.main",
                borderRadius: "6px",
                width: 28,
                height: 28,
                "&:hover": { bgcolor: "rgba(25,118,210,0.08)" },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            mx: 0.5,
            px: 1,
            borderLeft: "1px solid rgba(0,0,0,0.08)",
            borderRight: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize, whiteSpace: "nowrap" }}
          >
            Pag.
          </Typography>
          <TextField
            size="small"
            value={inputPage}
            onChange={onInputPageChange}
            onKeyPress={onInputPageSubmit}
            placeholder={page.toString()}
            sx={{
              width: "40px",
              "& .MuiOutlinedInput-root": {
                height: "24px",
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "6px",
                "& input": { padding: "2px 6px", textAlign: "center", color: "primary.main" },
                "& fieldset": { borderColor: "rgba(25,118,210,0.3)" },
                "&:hover fieldset": { borderColor: "primary.main" },
              },
            }}
          />
          {estimatedTotalPages > 1 && (
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize, whiteSpace: "nowrap" }}
            >
              / {estimatedTotalPages}
            </Typography>
          )}
        </Box>

        <Tooltip title="Próxima página">
          <span>
            <IconButton
              onClick={onNext}
              disabled={isNextDisabled}
              size="small"
              aria-label="Próxima página"
              sx={{
                color: isNextDisabled ? "rgba(0,0,0,0.2)" : "primary.main",
                borderRadius: "6px",
                width: 28,
                height: 28,
                "&:hover": { bgcolor: "rgba(25,118,210,0.08)" },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>

        {totalPages > 1 && (
          <Tooltip title="Última página">
            <span>
              <IconButton
                onClick={() => onGoToPage(estimatedTotalPages)}
                disabled={isLastDisabled}
                size="small"
                aria-label="Última página"
                sx={{
                  color: isLastDisabled ? "rgba(0,0,0,0.2)" : "primary.main",
                  borderRadius: "6px",
                  width: 28,
                  height: 28,
                  "&:hover": { bgcolor: "rgba(25,118,210,0.08)" },
                }}
              >
                <LastPageIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
