import { useEffect, useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";

async function setStorageItemAsync(key: string, value: string) {
  if (!value) {
    await SecureStore.deleteItemAsync(key);
  }

  await SecureStore.setItemAsync(key, value);
}

export default function useSecureStore(key: string) {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(key).then(value => {
      setState(value);
    });
  }, [key]);

  const setValue = useCallback((value: string) => {
    setStorageItemAsync(key, value).then(() => {
      setState(value);
    });
  }, [key]);

  return [state, setValue] as const;
}