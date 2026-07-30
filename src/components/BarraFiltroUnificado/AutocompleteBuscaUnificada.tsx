import {
  Box,
  Autocomplete,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  createFilterOptions,
} from "@mui/material";
import { styled, lighten, darken } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { SyntheticEvent, useState } from "react";
import { ListaOpcoesGenericas, OpcaoGenerica, EsquemaFiltro } from "../../types/tiposBarraFiltroUnificado";

const CabecalhoGrupo = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const ItensGrupo = styled("ul")({
  padding: 0,
});

function redimensionarString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

type Props = {
  opcoes: ListaOpcoesGenericas;
  valor: ListaOpcoesGenericas | null;
  aoMudar: (
    event: SyntheticEvent<Element, Event>,
    novoValor: ListaOpcoesGenericas,
  ) => void;
  aoMudarTexto?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  estaAberto: boolean;
  setEstaAberto: (estaAberto: boolean) => void;
  aoClicarIcone: () => void;
  adornosInvertidos?: boolean;
  desabilitado?: boolean;
  esquema?: EsquemaFiltro;
};

const filtroOption = createFilterOptions<OpcaoGenerica>();

export default function AutocompleteBuscaUnificada({
  opcoes,
  valor,
  aoMudar,
  aoMudarTexto,
  estaAberto,
  setEstaAberto,
  aoClicarIcone,
  adornosInvertidos = false,
  desabilitado = false,
  esquema = [],
}: Readonly<Props>) {
  const [listaAberta, setListaAberta] = useState(false);
  const [valorEntrada, setValorEntrada] = useState("");

  const aoBuscar = () => {
    setListaAberta(false);

    if (valorEntrada.trim() !== "" && esquema) {
      const itensTexto = esquema.filter((item) => item.tipoEntrada === "text");
      if (itensTexto.length === 1) {
        const itemTexto = itensTexto[0];
        const existe = (valor || []).some(
          (v) => v.tipo === itemTexto.chaveUrl && String(v.id) === valorEntrada.trim()
        );
        if (!existe) {
          const optCustomizada: OpcaoGenerica = {
            id: valorEntrada.trim(),
            nome: `${itemTexto.rotulo}: ${valorEntrada.trim()}`,
            tipo: itemTexto.chaveUrl,
          };
          const novoValor = [
            ...(valor || []).filter((v) => v.tipo !== itemTexto.chaveUrl),
            optCustomizada,
          ];
          aoMudar({} as SyntheticEvent, novoValor);
        }
        setValorEntrada("");
      }
    }

    aoClicarIcone();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Autocomplete
        multiple
        options={opcoes}
        disabled={desabilitado}
        size="small"
        sx={{ width: "100%", maxWidth: 800, marginRight: 2, borderRadius: 5 }}
        groupBy={(opcao) => opcao.tipo}
        getOptionLabel={(opcao) => opcao.nome}
        getOptionKey={(opcao) => String(opcao.id) + opcao.tipo}
        value={valor || []}
        inputValue={valorEntrada}
        onInputChange={(event, novoValorEntrada) => {
          setValorEntrada(novoValorEntrada);
          if (aoMudarTexto && event) {
            aoMudarTexto(event as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        filterOptions={(opcoes, params) => {
          const filtrados = filtroOption(opcoes, params);
          const { inputValue } = params;

          if (inputValue.trim() !== "" && esquema) {
            const itensTexto = esquema.filter((item) => item.tipoEntrada === "text");
            if (itensTexto.length > 0) {
              itensTexto.forEach((itemTexto) => {
                filtrados.push({
                  id: inputValue.trim(),
                  nome: `${itemTexto.rotulo}: ${inputValue.trim()}`,
                  tipo: itemTexto.chaveUrl,
                });
              });
            }
          }

          return filtrados;
        }}
        popupIcon={true}
        clearIcon={false}
        onChange={(event, novoValor) => {
          setValorEntrada("");
          aoMudar(event, novoValor);
        }}
        open={listaAberta}
        onOpen={() => setListaAberta(true)}
        onClose={() => setListaAberta(false)}
        renderTags={(valor, getTagProps) =>
          valor.map((opcao, index) => (
            <Chip
              icon={
                opcao.cor ? (
                  <LocalOfferIcon sx={{ color: opcao.cor }} />
                ) : undefined
              }
              sx={{
                borderColor: opcao.cor ?? "primary",
                "& .MuiChip-deleteIcon": {
                  color: opcao.cor,
                  "&:hover": {
                    color: opcao.cor,
                  },
                },
                "& .MuiChip-icon": {
                  color: opcao.cor,
                },
                ...(opcao.cor && {
                  color: opcao.cor,
                }),
              }}
              color={opcao.cor ? "default" : "primary"}
              variant="outlined"
              label={
                opcao.nome.length > 32
                  ? redimensionarString(opcao.nome, 32)
                  : opcao.nome
              }
              {...getTagProps({ index })}
              key={opcao.nome + index}
            />
          ))
        }
        renderGroup={(params) => (
          <li key={params.key}>
            <CabecalhoGrupo>
              {params.group.charAt(0).toUpperCase() + params.group.slice(1)}
            </CabecalhoGrupo>
            <ItensGrupo>{params.children}</ItensGrupo>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Pesquisar"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !listaAberta) {
                aoBuscar();
              }
            }}
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                height: "auto !important",
                minHeight: "50px",
                "& fieldset": { borderColor: "#207840", borderWidth: "1px" },
                "&:hover fieldset": { borderColor: "#207840" },
                "&.Mui-focused fieldset": { borderColor: "#207840" },
                borderRadius: "10px",
                color: "black",
                ...(adornosInvertidos && {
                  pl: "48px !important",
                  pr: "48px !important",
                }),
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <InputAdornment
                    position={adornosInvertidos ? "end" : "start"}
                    sx={adornosInvertidos ? { position: "absolute", right: 14, top: 25, transform: "translateY(-50%)" } : {}}
                  >
                    <IconButton
                      sx={adornosInvertidos ? {} : { mr: -8 }}
                      disabled={desabilitado}
                      onClick={() => (adornosInvertidos ? setEstaAberto(!estaAberto) : aoBuscar())}
                      color={adornosInvertidos && estaAberto ? "primary" : "default"}
                    >
                      {adornosInvertidos ? (
                        <TuneIcon sx={{ color: "#207840" }} />
                      ) : (
                        <SearchIcon sx={{ color: "#207840" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                  {params.InputProps.endAdornment}
                </>
              ),
              startAdornment: (
                <>
                  <InputAdornment
                    position={adornosInvertidos ? "start" : "end"}
                    sx={adornosInvertidos ? { position: "absolute", left: 14, top: 25, transform: "translateY(-50%)", zIndex: 1 } : {}}
                  >
                    <IconButton
                      onClick={() => (adornosInvertidos ? aoBuscar() : setEstaAberto(!estaAberto))}
                      disabled={desabilitado}
                      color={!adornosInvertidos && estaAberto ? "primary" : "default"}
                    >
                      {adornosInvertidos ? (
                        <SearchIcon sx={{ color: "#207840" }} />
                      ) : (
                        <TuneIcon sx={{ color: "#207840" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
