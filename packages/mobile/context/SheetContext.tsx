import { createContext, useCallback } from "react";

const SheetContext = createContext(undefined);

function useSheet() {

  const containerProps = useCallback(() => {

  }, []);

  const triggerProps = useCallback(() => {

  }, []);

  return {
    containerProps,
    triggerProps
  }
}

export default useSheet;