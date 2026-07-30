export type OpcaoGenerica = {
  id: string | number;
  nome: string;
  tipo: string;
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
};

export type EsquemaFiltro = ItemEsquemaFiltro[];

export type ConfigCampoFiltro = {
  id: string;
  rotulo: string;
  tipo: 'select' | 'text' | 'date';
  opcoes?: ListaOpcoesGenericas;
  largura?: string | number;
};
