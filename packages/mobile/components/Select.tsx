import { Fragment, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import Sheet from "@/mobile/components/Sheet";
import SelectItem from "@/mobile/components/SelectItem";

interface SelectProps extends ViewProps {
  label: string;
  defaultValue?: string;
  value?: string;
  message?: string;
  onChange: (value: string) => void;
}

function Select(props: SelectProps) {
  const { label, value, defaultValue, onChange, message } = props;

  const isControlled = value !== null && value !== undefined;
  const [select, setSelect] = useState(isControlled ? value : defaultValue || "");
  const [open, setOpen] = useState(false);

  const snapPoints = useMemo(() => {
    return ["35%", "75%", "100%"]
  }, []);

  const handleOnSelectItem = useCallback((value: string) => {
    setSelect(value);
    onChange(value);
    setOpen(false);
  }, []);

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <Pressable style={styles.container} onPress={() => setOpen(true)}>
          <Text>{select}</Text>
          <AntDesign name="caretdown" size={17} color={colors.neutral[500]} />
        </Pressable>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Sheet
        open={open}
        snapPoints={snapPoints}
        onClose={() => setOpen(false)}>
        <View safe style={styles.select}>
          <SelectItem
            icon="public"
            label="Public"
            description="Anyone can view to this list."
            onPress={() => handleOnSelectItem("public")}
          />
          <SelectItem
            icon="check-circle-outline"
            label="Restricted"
            description="Only approved can view this list."
            onPress={() => handleOnSelectItem("restricted")}
          />
          <SelectItem
            icon="lock-outline"
            label="Private"
            description="Only you have access to this list."
            onPress={() => handleOnSelectItem("private")}
          />
        </View>
      </Sheet>
    </Fragment>
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
  label: {
    fontWeight: "600",
    color: colors.neutral[700]
  },
  select: {
    display: "flex",
    flexDirection: "column",
    gap: 25
  }
})

export default Select;