'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GenericOptionList, GenericOption, FilterSchema } from './types';

export function useUnifiedFilter(schema: FilterSchema, onSearchCallback?: () => void, onClearCallback?: () => void, onUrlUpdate?: (url: string) => void) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [activeFilters, setActiveFilters] = useState<Record<string, GenericOption | string | boolean | null>>({});
  const [activeUnificadaFilters, setActiveUnificadaFilters] = useState<GenericOptionList>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sync URL to State
  useEffect(() => {
    const newActiveFilters: Record<string, GenericOption | string | boolean | null> = {};
    const newActiveUnificadaFilters: GenericOptionList = [];

    schema.forEach(item => {
      const val = searchParams.get(item.urlKey);
      
      if (item.inputType === 'switch') {
        newActiveFilters[item.urlKey] = val === 'true';
      } else if (val) {
        if (item.inputType === 'select') {
          let foundOption: GenericOption | undefined = undefined;
          if (item.options) {
            foundOption = item.options.find(opt => String(opt.id) === val || String(opt.nome) === val || String(opt.enum) === val);
          }

          if (foundOption) {
            const genericOpt = { ...foundOption, type: item.urlKey };
            newActiveFilters[item.urlKey] = genericOpt;
            newActiveUnificadaFilters.push(genericOpt);
          } else {
             // fallback
             newActiveFilters[item.urlKey] = val;
             newActiveUnificadaFilters.push({ id: val, nome: val, type: item.urlKey });
          }
        } else {
          // text or date
          newActiveFilters[item.urlKey] = val;
          const labelName = item.label ? `${item.label}: ${val}` : val;
          newActiveUnificadaFilters.push({ id: val, nome: labelName, type: item.urlKey });
        }
      } else {
         newActiveFilters[item.urlKey] = null;
      }
    });

    setActiveFilters(newActiveFilters);
    setActiveUnificadaFilters(newActiveUnificadaFilters);
  }, [searchParams, schema]);

  // Handle Search Execution
  const onSearch = () => {
    if (onSearchCallback) onSearchCallback();

    const params = new URLSearchParams(searchParams.toString());
    
    // Clear managed params first
    schema.forEach(item => params.delete(item.urlKey));

    // For switch, apply directly from activeFilters
    schema.forEach(item => {
       if (item.inputType === 'switch') {
          const val = activeFilters[item.urlKey];
          if (val === true) {
             params.set(item.urlKey, 'true');
          }
       }
    });

    // Re-apply from UnificadaFilters (which handles select, text, date)
    activeUnificadaFilters.forEach(filter => {
      const item = schema.find(s => s.urlKey === filter.type);
      if (item) {
        if (item.inputType === 'select') {
           params.set(item.urlKey, filter.enum || filter.id || filter.nome);
        } else {
           params.set(item.urlKey, filter.id as string);
        }
      }
    });

    setIsOpen(false);
    const url = `${pathname}?${params.toString()}`;
    if (onUrlUpdate) {
      onUrlUpdate(url);
    } else {
      router.push(url, { scroll: false });
    }
  };

  const onClear = () => {
    if (onClearCallback) onClearCallback();

    setActiveFilters({});
    setActiveUnificadaFilters([]);
    setIsOpen(false);

    // Keep some default params based on old logic, though this should ideally be passed in
    const params = new URLSearchParams();
    params.set("situacao", "20");
    params.set("page_size", "10");
    const url = `${pathname}?${params.toString()}`;
    if (onUrlUpdate) {
      onUrlUpdate(url);
    } else {
      router.push(url, { scroll: false });
    }
  };

  const handleFilterChange = (urlKey: string, value: GenericOption | string | boolean | null) => {
    setActiveFilters(prev => ({ ...prev, [urlKey]: value }));

    const item = schema.find(s => s.urlKey === urlKey);
    if (item && item.inputType !== 'switch') {
       // Sync with Unificada
       let newUnificada = activeUnificadaFilters.filter(f => f.type !== urlKey);
       if (value) {
         if (typeof value === 'object' && value !== null) {
           newUnificada.push({ ...value as GenericOption, type: urlKey });
         } else if (typeof value === 'string') {
           newUnificada.push({ id: value, nome: value, type: urlKey });
         }
       }
       setActiveUnificadaFilters(newUnificada);
    }
  };

  const handleUnificadaFilterChange = (newValue: GenericOptionList) => {
    if (newValue.length === 0 && activeUnificadaFilters.length > 0) {
      onClear();
      return;
    }
    setActiveUnificadaFilters(newValue);

    // Sync down to Grid filters
    const newGrid = { ...activeFilters };
    
    // Clear old unificada types that aren't switch
    schema.forEach(item => {
       if (item.inputType !== 'switch') {
          newGrid[item.urlKey] = null;
       }
    });

    newValue.forEach(val => {
        const item = schema.find(s => s.urlKey === val.type);
        if (item) {
           if (item.inputType === 'select') {
             newGrid[item.urlKey] = val;
           } else {
             newGrid[item.urlKey] = val.id as string;
           }
        }
    });
    setActiveFilters(newGrid);
  };

  return {
    activeFilters,
    activeUnificadaFilters,
    isOpen,
    setIsOpen,
    onSearch,
    onClear,
    handleFilterChange,
    handleUnificadaFilterChange
  };
}
