import { useReducer, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

function useAsyncState(initialValue = null) {
  return useReducer((state, action) => {
    return [false, action];
  }, [false, initialValue]);
}

async function setStorageItemAsync(key: string, value: string | null) {
  if (!value) {
    await SecureStore.deleteItemAsync(key);
  }

  await SecureStore.setItemAsync(key, value);
}

export default function useStorage(key: string) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    SecureStore.getItemAsync(key).then(value => {
      setState(value);
    })
  }, [key]);

  const setValue = useCallback((value: string | null) => {
    setStorageItemAsync(key, value).then(() => {
      setState(value);
    });
  }, [key]);

  return [state, setValue];
}