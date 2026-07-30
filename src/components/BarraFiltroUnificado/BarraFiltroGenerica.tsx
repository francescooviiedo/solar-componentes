'use client';

import React from 'react';
import { Box, TextField, useMediaQuery } from '@mui/material';
import { LayoutFiltro } from './LayoutFiltro';
import AutocompleteBuscaUnificada from './AutocompleteBuscaUnificada';
import AutocompleteFiltro from './AutocompleteFiltro';
import { ConfigCampoFiltro, ListaOpcoesGenericas, OpcaoGenerica } from '../../types/tiposBarraFiltroUnificado';

export type PropsBarraFiltroGenerica = {
  // Config
  campos: ConfigCampoFiltro[];
  opcoesUnificadas: ListaOpcoesGenericas;

  // State
  filtrosGradeAtivos: Record<string, OpcaoGenerica | string | null>;
  filtrosUnificadosAtivos: ListaOpcoesGenericas;
  estaAberto: boolean;
  estaPendente?: boolean;
  desabilitado?: boolean;
  extraBarraSuperior?: React.ReactNode;

  // Handlers
  setEstaAberto: (estaAberto: boolean) => void;
  aoPesquisar: () => void;
  aoLimpar: () => void;
  aoMudarFiltroGrade: (idCampo: string, valor: OpcaoGenerica | string | null) => void;
  aoMudarFiltroUnificado: (novoValor: ListaOpcoesGenericas) => void;
  aoMudarTextoUnificado?: (texto: string) => void;
};

export function BarraFiltroGenerica({
  campos,
  opcoesUnificadas,
  filtrosGradeAtivos,
  filtrosUnificadosAtivos,
  estaAberto,
  estaPendente = false,
  desabilitado = false,
  extraBarraSuperior,
  setEstaAberto,
  aoPesquisar,
  aoLimpar,
  aoMudarFiltroGrade,
  aoMudarFiltroUnificado,
  aoMudarTextoUnificado,
}: Readonly<PropsBarraFiltroGenerica>) {
  const ehMobileOuTablet = useMediaQuery("(max-width:900px)");

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "calc(100% + 48px)",
            mx: "-24px",
            mt: "-24px",
            gap: 2,
            bgcolor: "#D8D8D8",
            padding: "24px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            flexDirection: ehMobileOuTablet ? "column" : "row",
            boxSizing: "border-box",
          }}
        >
          {extraBarraSuperior}
          
          <AutocompleteBuscaUnificada
            opcoes={opcoesUnificadas}
            valor={filtrosUnificadosAtivos}
            aoMudar={(e, novoValor) => aoMudarFiltroUnificado(novoValor)}
            aoMudarTexto={(e) => {
               if (aoMudarTextoUnificado) aoMudarTextoUnificado(e.target.value);
            }}
            estaAberto={estaAberto}
            setEstaAberto={setEstaAberto}
            aoClicarIcone={aoPesquisar}
            adornosInvertidos={true}
            desabilitado={desabilitado}
          />
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
        {campos.map((campo) => {
          if (campo.tipo === 'select') {
            return (
              <AutocompleteFiltro
                key={campo.id}
                nome={campo.rotulo}
                opcoes={campo.opcoes ?? []}
                valor={(filtrosGradeAtivos[campo.id] as OpcaoGenerica) || null}
                aoMudar={(e, novoValor) => aoMudarFiltroGrade(campo.id, novoValor)}
                largura={campo.largura}
              />
            );
          }

          if (campo.tipo === 'text' || campo.tipo === 'date') {
            return (
              <Box key={campo.id} sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component="label"
                  htmlFor={campo.id}
                  sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
                >
                  {campo.rotulo}
                </Box>
                <TextField
                  id={campo.id}
                  type={campo.tipo}
                  size="small"
                  placeholder={campo.rotulo}
                  variant="outlined"
                  sx={{ width: campo.largura ?? "100%", bgcolor: "white" }}
                  onChange={(e) => aoMudarFiltroGrade(campo.id, e.target.value)}
                  value={(filtrosGradeAtivos[campo.id] as string) ?? ""}
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
