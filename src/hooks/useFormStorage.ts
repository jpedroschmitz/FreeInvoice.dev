import { useEffect, useState } from 'react';

import { InvoiceFormValues } from '@/app/validation';

const STORAGE_KEY = '@freeinvoice-form-data';

export function useFormStorage(
  getValues: () => InvoiceFormValues,
  reset: (values?: Partial<InvoiceFormValues>) => void,
  defaultValues: Partial<InvoiceFormValues>
) {
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setHasSavedData(saved !== null);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleSave = () => {
    try {
      const data = getValues();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasSavedData(true);
    } catch {
      // localStorage unavailable
    }
  };

  const handleLoad = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as InvoiceFormValues;
        reset(parsed);
      }
    } catch {
      // corrupted or unavailable
    }
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedData(false);
      reset(defaultValues);
    } catch {
      // localStorage unavailable
    }
  };

  return { hasSavedData, handleSave, handleLoad, handleClear };
}
