'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ListaOpcoesGenericas, OpcaoGenerica, EsquemaFiltro } from '../../types/tiposBarraFiltroUnificado';

export function useFiltroUnificado(
  esquema: EsquemaFiltro,
  aoPesquisarCallback?: () => void,
  aoLimparCallback?: () => void,
  aoAtualizarUrl?: (url: string) => void
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filtrosAtivos, setFiltrosAtivos] = useState<Record<string, OpcaoGenerica | string | boolean | null>>({});
  const [filtrosUnificadosAtivos, setFiltrosUnificadosAtivos] = useState<ListaOpcoesGenericas>([]);
  const [estaAberto, setEstaAberto] = useState(false);

  useEffect(() => {
    const novosFiltrosAtivos: Record<string, OpcaoGenerica | string | boolean | null> = {};
    const novosFiltrosUnificadosAtivos: ListaOpcoesGenericas = [];

    esquema.forEach(item => {
      const val = searchParams.get(item.chaveUrl);

      if (item.tipoEntrada === 'switch') {
        novosFiltrosAtivos[item.chaveUrl] = val === 'true';
      } else if (val) {
        if (item.tipoEntrada === 'select') {
          let opcaoEncontrada: OpcaoGenerica | undefined = undefined;
          if (item.opcoes) {
            if (item.chaveValor) {
              opcaoEncontrada = item.opcoes.find(opt => String(opt[item.chaveValor!]) === val);
            } else {
              opcaoEncontrada = item.opcoes.find(opt => String(opt.enum ?? opt.id ?? opt.nome) === val || String(opt.id) === val || String(opt.nome) === val);
            }
          }

          if (opcaoEncontrada) {
            const optGenerica = { ...opcaoEncontrada, tipo: item.chaveUrl, type: item.chaveUrl };
            novosFiltrosAtivos[item.chaveUrl] = optGenerica;
            novosFiltrosUnificadosAtivos.push(optGenerica);
          } else {
            novosFiltrosAtivos[item.chaveUrl] = val;
            novosFiltrosUnificadosAtivos.push({ id: val, nome: val, tipo: item.chaveUrl, type: item.chaveUrl });
          }
        } else {
          novosFiltrosAtivos[item.chaveUrl] = val;
          const nomeRotulo = item.rotulo ? `${item.rotulo}: ${val}` : val;
          novosFiltrosUnificadosAtivos.push({ id: val, nome: nomeRotulo, tipo: item.chaveUrl, type: item.chaveUrl });
        }
      } else {
        novosFiltrosAtivos[item.chaveUrl] = null;
      }
    });

    setFiltrosAtivos(novosFiltrosAtivos);
    setFiltrosUnificadosAtivos(novosFiltrosUnificadosAtivos);
  }, [searchParams, esquema]);

  const aoPesquisar = () => {
    if (aoPesquisarCallback) aoPesquisarCallback();

    const params = new URLSearchParams(searchParams.toString());

    esquema.forEach(item => params.delete(item.chaveUrl));

    esquema.forEach(item => {
      if (item.tipoEntrada === 'switch') {
        const val = filtrosAtivos[item.chaveUrl];
        if (val === true) {
          params.set(item.chaveUrl, 'true');
        }
      }
    });

    filtrosUnificadosAtivos.forEach(filtro => {
      const filtroTipo = filtro.tipo ?? filtro.type; const item = esquema.find(s => s.chaveUrl === filtroTipo);
      if (item) {
        if (item.tipoEntrada === 'select') {
          const val = item.chaveValor ? filtro[item.chaveValor] : (filtro.enum ?? filtro.id ?? filtro.nome);
          if (val !== undefined && val !== null) {
            params.set(item.chaveUrl, String(val));
          }
        } else {
          let val = filtro.id as string;
          if (item.removerNaoNumericos) {
            val = val.replace(/\D/g, '');
          }
          params.set(item.chaveUrl, val);
        }
      }
    });

    setEstaAberto(false);
    const url = `${pathname}?${params.toString()}`;
    if (aoAtualizarUrl) {
      aoAtualizarUrl(url);
    } else {
      router.push(url, { scroll: false });
    }
  };

  const aoLimpar = () => {
    if (aoLimparCallback) aoLimparCallback();

    setFiltrosAtivos({});
    setFiltrosUnificadosAtivos([]);
    setEstaAberto(false);

    const params = new URLSearchParams();
    params.set("situacao", "20");
    params.set("page_size", "10");
    const url = `${pathname}?${params.toString()}`;
    if (aoAtualizarUrl) {
      aoAtualizarUrl(url);
    } else {
      router.push(url, { scroll: false });
    }
  };

  const lidarComMudancaFiltro = (chaveUrl: string, valor: OpcaoGenerica | string | boolean | null) => {
    setFiltrosAtivos(prev => ({ ...prev, [chaveUrl]: valor }));

    const item = esquema.find(s => s.chaveUrl === chaveUrl);
    if (item && item.tipoEntrada !== 'switch') {
      let novaUnificada = filtrosUnificadosAtivos.filter(f => f.tipo !== chaveUrl);
      if (valor) {
        if (typeof valor === 'object' && valor !== null) {
          novaUnificada.push({ ...valor as OpcaoGenerica, tipo: chaveUrl });
        } else if (typeof valor === 'string') {
          novaUnificada.push({ id: valor, nome: valor, tipo: chaveUrl });
        }
      }
      setFiltrosUnificadosAtivos(novaUnificada);
    }
  };

  const lidarComMudancaFiltroUnificado = (novoValor: ListaOpcoesGenericas) => {
    if (novoValor.length === 0 && filtrosUnificadosAtivos.length > 0) {
      aoLimpar();
      return;
    }

    const valorDeduplicado: ListaOpcoesGenericas = [];
    for (let i = novoValor.length - 1; i >= 0; i--) {
      const item = novoValor[i];
      const itemTipo = item.tipo ?? item.type; if (!valorDeduplicado.some(existente => (existente.tipo ?? existente.type) === itemTipo)) { valorDeduplicado.unshift({ ...item, tipo: itemTipo, type: itemTipo }); }
    }

    setFiltrosUnificadosAtivos(valorDeduplicado);

    const novaGrade = { ...filtrosAtivos };

    esquema.forEach(item => {
      if (item.tipoEntrada !== 'switch') {
        novaGrade[item.chaveUrl] = null;
      }
    });

    valorDeduplicado.forEach(val => {
      const valTipo = val.tipo ?? val.type; const item = esquema.find(s => s.chaveUrl === valTipo);
      if (item) {
        if (item.tipoEntrada === 'select') {
          novaGrade[item.chaveUrl] = val;
        } else {
          novaGrade[item.chaveUrl] = val.id as string;
        }
      }
    });
    setFiltrosAtivos(novaGrade);
  };

  return {
    filtrosAtivos,
    filtrosUnificadosAtivos,
    estaAberto,
    setEstaAberto,
    aoPesquisar,
    aoLimpar,
    lidarComMudancaFiltro,
    lidarComMudancaFiltroUnificado,
  };
}
