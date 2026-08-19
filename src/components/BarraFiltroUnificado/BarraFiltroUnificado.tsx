'use client';

import React from 'react';
import { Box, TextField, useMediaQuery, Switch, Typography, FormLabel } from '@mui/material';
import { LayoutFiltro } from './LayoutFiltro';
import AutocompleteBuscaUnificada from './AutocompleteBuscaUnificada';
import AutocompleteFiltro from './AutocompleteFiltro';
import { EsquemaFiltro, ListaOpcoesGenericas, OpcaoGenerica } from '../../types/tiposBarraFiltroUnificado';
import { useFiltroUnificado } from './useFiltroUnificado';

export type PropsBarraFiltroUnificado = {
  esquema: EsquemaFiltro;
  estaPendente?: boolean;
  desabilitado?: boolean;
  aoPesquisarCallback?: () => void;
  aoLimparCallback?: () => void;
  aoAtualizarUrl?: (url: string) => void;
  prefixoBarraSuperior?: React.ReactNode;
  sufixoBarraSuperior?: React.ReactNode;
  ocultarEntradaBusca?: boolean;
  placeholderBuscaCustomizado?: React.ReactNode;
  elementosAcimaBusca?: React.ReactNode;
  corFundoBusca?: string;
};

export function BarraFiltroUnificado({
  esquema,
  estaPendente = false,
  desabilitado = false,
  aoPesquisarCallback,
  aoLimparCallback,
  aoAtualizarUrl,
  prefixoBarraSuperior,
  sufixoBarraSuperior,
  ocultarEntradaBusca = false,
  placeholderBuscaCustomizado,
  elementosAcimaBusca,
  corFundoBusca,
}: Readonly<PropsBarraFiltroUnificado>) {
  const ehMobileOuTablet = useMediaQuery("(max-width:900px)");

  const {
    filtrosAtivos,
    filtrosUnificadosAtivos,
    estaAberto,
    setEstaAberto,
    aoPesquisar,
    aoLimpar,
    lidarComMudancaFiltro,
    lidarComMudancaFiltroUnificado,
  } = useFiltroUnificado(esquema, aoPesquisarCallback, aoLimparCallback, aoAtualizarUrl);

  const opcoesUnificadas: ListaOpcoesGenericas = [];
  esquema.forEach(item => {
    if (item.tipoEntrada === 'select' && item.opcoes) {
      item.opcoes.forEach(opt => {
        const estaAtivo = filtrosUnificadosAtivos.some(f => (f.tipo === item.chaveUrl || f.type === item.chaveUrl) && String(item.chaveValor ? f[item.chaveValor] : (f.id ?? f.nome)) === String(item.chaveValor ? opt[item.chaveValor] : (opt.id ?? opt.nome)));
        if (!estaAtivo) {
          opcoesUnificadas.push({ ...opt, tipo: item.chaveUrl, type: item.chaveUrl });
        }
      });
    }
  });

  return (
    <LayoutFiltro
      estaAberto={estaAberto}
      estaPendente={estaPendente}
      aoPesquisar={aoPesquisar}
      aoLimpar={aoLimpar}
      aoFechar={() => setEstaAberto(false)}
      ehAbsoluto={true}
      espacamentoContainer="24px"
      buscaUnificada={
        <Box>
          {elementosAcimaBusca}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "calc(100% + 32px)", sm: "calc(100% + 48px)" },
              mx: { xs: "-16px", sm: "-24px" },
              mt: elementosAcimaBusca ? 0 : { xs: "-16px", sm: "-24px" },
              gap: 2,
              bgcolor: corFundoBusca ?? "#D8D8D8",
              padding: { xs: "16px", sm: "24px" },
              borderTopLeftRadius: elementosAcimaBusca ? 0 : "8px",
              borderTopRightRadius: "8px",
              flexDirection: ehMobileOuTablet ? "column" : "row",
              boxSizing: "border-box",
            }}
          >
          {prefixoBarraSuperior}
          {esquema.filter(item => item.posicao === 'topBar').map(item => {
            if (item.tipoEntrada === 'switch') {
              const val = (filtrosAtivos[item.chaveUrl] as boolean) || false;
              return (
                <Box key={item.chaveUrl} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel component="legend">
                    <Typography color={val ? "warning" : 'textDisabled'}>{item.rotulo}</Typography>
                  </FormLabel>
                  <Switch
                    value={val}
                    checked={val}
                    color="warning"
                    onChange={(e) => lidarComMudancaFiltro(item.chaveUrl, e.target.checked)}
                  />
                </Box>
              );
            }
            return null;
          })}

          {ocultarEntradaBusca ? (
            placeholderBuscaCustomizado
          ) : (
            <AutocompleteBuscaUnificada
              opcoes={opcoesUnificadas}
              valor={filtrosUnificadosAtivos}
              aoMudar={(event, novoValor) => lidarComMudancaFiltroUnificado(novoValor)}
              estaAberto={estaAberto}
              setEstaAberto={setEstaAberto}
              aoClicarIcone={aoPesquisar}
              adornosInvertidos={true}
              desabilitado={desabilitado}
              esquema={esquema}
            />
          )}
          {sufixoBarraSuperior}
        </Box>
      </Box>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          rowGap: "24px",
          columnGap: "24px",
          width: "100%",
        }}
      >
        {esquema.filter(item => item.posicao === 'grid').map((campo) => {
          if (campo.tipoEntrada === 'select') {
            return (
              <AutocompleteFiltro
                key={campo.chaveUrl}
                nome={campo.rotulo}
                opcoes={campo.opcoes ?? []}
                valor={(filtrosAtivos[campo.chaveUrl] as OpcaoGenerica) || null}
                aoMudar={(e, novoValor) => lidarComMudancaFiltro(campo.chaveUrl, novoValor)}
                largura={campo.largura}
              />
            );
          }

          if (campo.tipoEntrada === 'text' || campo.tipoEntrada === 'date') {
            return (
              <Box key={campo.chaveUrl} sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component="label"
                  htmlFor={campo.chaveUrl}
                  sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
                >
                  {campo.rotulo}
                </Box>
                <TextField
                  id={campo.chaveUrl}
                  type={campo.tipoEntrada}
                  size="small"
                  placeholder={campo.rotulo}
                  variant="outlined"
                  sx={{ width: campo.largura ?? "100%", bgcolor: "white" }}
                  onChange={(e) => lidarComMudancaFiltro(campo.chaveUrl, e.target.value)}
                  value={(filtrosAtivos[campo.chaveUrl] as string) ?? ""}
                />
              </Box>
            );
          }

          return null;
        })}
      </Box>
    </LayoutFiltro>
  );
}
