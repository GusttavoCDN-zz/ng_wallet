/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from 'react';

type StorageResponse<T> = [T, React.Dispatch<React.SetStateAction<T>>, () => void];
export function useLocalStorage<T = any>(key: string, defaultValue?: T): StorageResponse<T> {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    window.localStorage.removeItem(key);
  }, [key]);

  return [value as T, setValue, remove];
}
