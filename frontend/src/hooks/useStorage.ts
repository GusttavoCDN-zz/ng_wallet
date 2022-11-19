/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from 'react';

function useStorage(key: string, defaultValue: any, storageObject: Storage) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    storageObject.removeItem(key);
  }, [key, storageObject]);

  return [value, setValue, remove];
}

export function useLocalStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}
