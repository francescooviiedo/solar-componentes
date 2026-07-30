import { Box, Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { OpcaoGenerica, ListaOpcoesGenericas } from "../../types/tiposBarraFiltroUnificado";

type Props = {
  nome: string,
  opcoes: ListaOpcoesGenericas,
  valor: OpcaoGenerica | null,
  aoMudar: (event: SyntheticEvent<Element, Event>, novoValor: OpcaoGenerica | null) => void
  desabilitado?: boolean
  largura?: number | string
  semRotulo?: boolean
};

export default function AutocompleteFiltro({ nome, opcoes, valor, aoMudar, desabilitado = false, largura = '100%', semRotulo = false }: Readonly<Props>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        component="label"
        htmlFor={nome}
        hidden={semRotulo}
        sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
      >
        {nome}
      </Box>
      <Autocomplete
        size="small"
        sx={{ width: largura }}
        options={opcoes}
        id={nome}
        getOptionLabel={opcao => opcao.nome}
        getOptionKey={opcao => String(opcao.id)}
        value={valor || null}
        disabled={desabilitado}
        onChange={aoMudar}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={nome}
            sx={{ bgcolor: "white" }}
          />
        )}
      />
    </Box>
  );
}
