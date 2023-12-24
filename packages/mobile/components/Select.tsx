import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewProps } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import Sheet from "@/mobile/components/Sheet";

export interface SelectItemProps extends PressableProps {
  label: string;
  value: string;
  active?: boolean;
}

interface SelectProps extends ViewProps {
  label: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  children: React.ReactNode;
  sheetContainerStyle?: StyleProp<ViewProps>
  message?: string;
  onChange: (value: string) => void;
}

interface SelectContext {
  selectedItem: string;
  onSelect: (value: string) => void;
}

const SelectContext = createContext<SelectContext | undefined>(undefined);

export function useSelect() {
  const context = useContext(SelectContext);
  if (context == undefined) {
    throw new Error("SelectContext must be used within SelectContext.Provider");
  }

  return context;
}

function Select(props: SelectProps) {
  const { label, value, defaultValue, children, sheetContainerStyle, placeholder, onChange, message } = props;
  // todo: think of how to handle defaultValue and placeholder; should they co-exist?

  // const isControlled = value !== null || value !== undefined;
  const [hasSelected, setHasSelected] = useState(false);

  const [select, setSelect] = useState(value || "");
  const [open, setOpen] = useState(false);

  const snapPoints = useMemo(() => {
    return ["25%", "50%"]
  }, []);

  const handleOnSelectItem = useCallback((value: string) => {
    setHasSelected(true);
    setSelect(value);
    onChange(value);
    setOpen(false);
  }, []);

  const context = useMemo(() => {
    return {
      selectedItem: select,
      onSelect: handleOnSelectItem
    }
  }, [select, value]);

  return (
    <SelectContext.Provider value={context}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <Pressable style={styles.container} onPress={() => setOpen(true)}>
          <Text style={!hasSelected && styles.value}>{hasSelected ? select : defaultValue}</Text>
          <AntDesign name="caretdown" size={17} color={colors.neutral[500]} />
        </Pressable>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Sheet
        open={open}
        snapPoints={snapPoints}
        onClose={() => setOpen(false)}>
        <View style={[styles.select, sheetContainerStyle]}>
          {children}
        </View>
      </Sheet>
    </SelectContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  container: {
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.neutral[200],
    minHeight: 50,
    padding: 10
  },
  message: {
    color: colors.red[400]
  },
  value: {
    color: colors.neutral[500]
  },
  label: {
    fontWeight: "600",
    color: colors.neutral[700]
  },
  select: {
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "column",
  }
})

export default Select;