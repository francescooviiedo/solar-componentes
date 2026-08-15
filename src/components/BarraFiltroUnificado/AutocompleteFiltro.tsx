import { Box, Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { OpcaoGenerica, ListaOpcoesGenericas } from "../../types/tiposBarraFiltroUnificado";

export type PropsAutocompleteFiltro = {
  nome?: string;
  name?: string;
  opcoes?: ListaOpcoesGenericas;
  options?: ListaOpcoesGenericas;
  valor?: OpcaoGenerica | null;
  value?: OpcaoGenerica | null;
  aoMudar?: (event: SyntheticEvent<Element, Event>, novoValor: any) => void;
  onChange?: (event: SyntheticEvent<Element, Event>, novoValor: any) => void;
  desabilitado?: boolean;
  disabled?: boolean;
  disable?: boolean;
  largura?: number | string;
  width?: number | string;
  semRotulo?: boolean;
  noLabel?: boolean;
};

export default function AutocompleteFiltro(props: Readonly<PropsAutocompleteFiltro>) {
  const nomeLabel = props.nome ?? props.name ?? '';
  const opcoesLista = props.opcoes ?? props.options ?? [];
  const valorAtual = props.valor !== undefined ? props.valor : (props.value !== undefined ? props.value : null);
  const mudou = props.aoMudar ?? props.onChange;
  const isDisabled = props.desabilitado ?? props.disabled ?? props.disable ?? false;
  const larguraFinal = props.largura ?? props.width ?? '100%';
  const semRotuloFinal = props.semRotulo ?? props.noLabel ?? false;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        component="label"
        htmlFor={nomeLabel}
        hidden={semRotuloFinal}
        sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
      >
        {nomeLabel}
      </Box>
      <Autocomplete
        size="small"
        sx={{ width: larguraFinal }}
        options={opcoesLista}
        id={nomeLabel}
        getOptionLabel={opcao => (typeof opcao === 'string' ? opcao : opcao?.nome ?? '')}
        getOptionKey={opcao => (typeof opcao === 'string' ? opcao : String(opcao?.id ?? opcao?.nome))}
        value={valorAtual}
        disabled={isDisabled}
        onChange={mudou}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={nomeLabel}
            sx={{ bgcolor: "white" }}
          />
        )}
      />
    </Box>
  );
}
