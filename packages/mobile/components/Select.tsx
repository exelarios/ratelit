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
  placeholder?: string;
  message?: string;
  onChange: (value: string) => void;
}

interface ItemProps {
  label: string;
  value: string;
  icon: any;
  description: string;
}

const items: ItemProps[] = [
  {
    label: "Public",
    value: "Public",
    icon: "public",
    description: "Anyone can view to this list."
  },
  {
    label: "Restricted",
    value: "Restricted",
    icon: "check-circle-outline",
    description: "Only approved can view this list."
  },
  {
    label: "Private",
    value: "Private",
    icon: "lock-outline",
    description: "Only you have access to this list."
  }
]

function Select(props: SelectProps) {
  const { label, value, defaultValue, placeholder, onChange, message } = props;
  // todo: think of how to handle defaultValue and placeholder; should they co-exist?

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
        <View style={styles.select}>
          {items?.map((props: ItemProps) => {
            const { label, value, description, icon } = props;
            return (
              <SelectItem
                active={value === select}
                key={label}
                icon={icon}
                label={label}
                description={description}
                onPress={() => handleOnSelectItem(value)}
              />
            );
          })}
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
    paddingHorizontal: 10,
    flexDirection: "column",
  }
})

export default Select;