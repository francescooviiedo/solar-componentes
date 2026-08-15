import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

type BotoesFormularioProps = Readonly<{
  onSalvar?: () => void | Promise<void>;
  onCancelar?: () => void;
  isSaving?: boolean;
  rotaRetorno: string;
  disabled?: boolean;
}>;

export default function BotoesFormulario({
  onSalvar,
  onCancelar,
  isSaving = false,
  rotaRetorno,
  disabled = false,
}: BotoesFormularioProps) {
  const router = useRouter();

  const handleCancelar = () => {
    if (onCancelar) {
      onCancelar();
    } else {
      router.push(rotaRetorno);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        mt: "16px",
      }}
    >
      {onSalvar && (
        <Button
          onClick={onSalvar}
          disabled={isSaving || disabled}
          startIcon={
            isSaving ? <CircularProgress size={16} color="inherit" /> : undefined
          }
          sx={{
            color: "#FFFFFF",
            borderRadius: "10px",
            backgroundColor: "#207840",
            fontWeight: 700,
            height: "40px",
            width: "80px",
            textTransform: "none",
            fontFamily: "Inter",
            fontSize: "16px",
            "&:disabled": {
              backgroundColor: "rgba(32, 120, 64, 0.6)",
              color: "rgba(255, 255, 255, 0.8)",
            },
            "&:hover": {
              backgroundColor: "#1B6335",
            },
          }}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      )}

      <Button
        onClick={handleCancelar}
        disabled={isSaving}
        sx={{
          color: "#FFFFFF",
          borderRadius: "10px",
          backgroundColor: "#757575",
          fontWeight: 700,
          height: "40px",
          width: "101px",
          textTransform: "none",
          fontFamily: "Inter",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "#616161",
          },
        }}
      >
        Cancelar
      </Button>
    </Box>
  );
}
