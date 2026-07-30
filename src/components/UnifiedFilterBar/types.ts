export type GenericOption = {
  id: string | number;
  nome: string;
  type: string;
  cor?: string;
  [key: string]: any;
};

export type GenericOptionList = GenericOption[];

export type FilterSchemaItem = {
  urlKey: string;
  label: string;
  inputType: 'select' | 'text' | 'date' | 'switch';
  placement: 'grid' | 'topBar';
  options?: GenericOptionList;
  valueKey?: string;
  width?: string | number;
};

export type FilterSchema = FilterSchemaItem[];
