import { createContext, useContext, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import View from "@/mobile/components/View";
import colors from "@/mobile/design/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface SheetContext {

}

const SheetContext = createContext(undefined);

interface ContainerProps {
  children: React.ReactNode;
}

function Container(props: ContainerProps) {
  const { children } = props;
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
}

function SheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const content = useRef(null);

  const value = useMemo(() => {

  }, []);

  return (
    <SheetContext.Provider value={value}>
      {open &&
        <Container>
          {content.current?.()}
        </Container>
      }
      {children}
    </SheetContext.Provider>
  );
}

interface useSheetParams {
  content: React.ReactNode;
}

function useSheet(params: useSheetParams) {
  const { content } = params;

  const context = useContext(SheetContext);
  if (context == undefined) {
    throw new Error("useSheet must be used inside of Sheet.Provider");
  }

}

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    padding: 0,
    overflow: "visible",
    position: "absolute",
    width: width,
    backgroundColor: "black",
    opacity: 0.5,
    height: height,
    zIndex: 1000
  },
  bar: {
    width: 100,
    height: 2,
    backgroundColor: colors.neutral[500]
  },
  container: {
    position: "absolute",
    backgroundColor: colors.neutral[100],
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10001
  }
});

export {
  useSheet,
  SheetProvider
}