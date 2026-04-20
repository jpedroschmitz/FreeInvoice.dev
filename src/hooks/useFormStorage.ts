import { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormGetValues, UseFormReset, UseFormWatch } from 'react-hook-form';

import { InvoiceFormValues } from '@/lib/invoice-validation';

const STORAGE_KEY = '@freeinvoice/draft';
const SAVE_DEBOUNCE_MS = 500;
const LOADED_INDICATOR_MS = 2000;

type Stored = { enabled: boolean; form?: InvoiceFormValues };

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'loaded';

type Args = {
  watch: UseFormWatch<InvoiceFormValues>;
  reset: UseFormReset<InvoiceFormValues>;
  getValues: UseFormGetValues<InvoiceFormValues>;
  defaultValues: InvoiceFormValues;
};

function readStorage(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

function writeStorage(value: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage unavailable or quota exceeded
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useFormStorage({ watch, reset, getValues, defaultValues }: Args) {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const stored = readStorage();
    if (!stored?.enabled) return;

    setEnabled(true);
    if (stored.form) {
      reset(stored.form);
      setStatus('loaded');
      loadedTimer.current = setTimeout(() => {
        setStatus((current) => (current === 'loaded' ? 'saved' : current));
      }, LOADED_INDICATOR_MS);
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (!enabled) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      setStatus('saving');
      saveTimer.current = setTimeout(() => {
        writeStorage({ enabled: true, form: values as InvoiceFormValues });
        setStatus('saved');
      }, SAVE_DEBOUNCE_MS);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [watch, enabled]);

  useEffect(() => {
    return () => {
      if (loadedTimer.current) clearTimeout(loadedTimer.current);
    };
  }, []);

  const toggleEnabled = useCallback(
    (next: boolean) => {
      setEnabled(next);
      if (next) {
        writeStorage({ enabled: true, form: getValues() });
        setStatus('saved');
      } else {
        clearStorage();
        setStatus('idle');
      }
    },
    [getValues],
  );

  const clearForm = useCallback(() => {
    reset(defaultValues);
    if (enabled) {
      writeStorage({ enabled: true, form: defaultValues });
      setStatus('saved');
    }
  }, [reset, defaultValues, enabled]);

  return { enabled, setEnabled: toggleEnabled, status, clearForm };
}
