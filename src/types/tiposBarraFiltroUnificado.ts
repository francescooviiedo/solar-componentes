export type OpcaoGenerica = {
  id?: string | number | null;
  nome: string;
  tipo?: string;
  type?: string;
  cor?: string;
  [key: string]: any;
};

export type ListaOpcoesGenericas = OpcaoGenerica[];

export type ItemEsquemaFiltro = {
  chaveUrl: string;
  rotulo: string;
  tipoEntrada: 'select' | 'text' | 'date' | 'switch';
  posicao: 'grid' | 'topBar';
  opcoes?: ListaOpcoesGenericas;
  chaveValor?: string;
  largura?: string | number;
  removerNaoNumericos?: boolean;
};

export type EsquemaFiltro = ItemEsquemaFiltro[];

export type ConfigCampoFiltro = {
  id: string;
  rotulo: string;
  tipo: 'select' | 'text' | 'date';
  opcoes?: ListaOpcoesGenericas;
  largura?: string | number;
};
