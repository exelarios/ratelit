import { Fragment, useMemo, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import Sheet from "@/mobile/components/Sheet";
import SelectItem from "@/mobile/components/SelectItem";

interface SelectProps extends ViewProps {
  label: string;
  value: string;
  message?: string;
}

function Select(props: SelectProps) {
  const { label, value, message } = props;
  
  const [open, setOpen] = useState(false);

  const snapPoints = useMemo(() => {
    return ["25%", "50%", "75%", "100%"]
  }, []);

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <Pressable style={styles.container} onPress={() => setOpen(true)}>
          <Text>{value}</Text>
          <AntDesign name="caretdown" size={17} color={colors.neutral[500]} />
        </Pressable>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Sheet open={open} snapPoints={snapPoints} onClose={() => setOpen(false)}>
        <View safe style={styles.select}>
          <SelectItem
            icon="public"
            label="Public"
            description="Anyone can view to this list."
          />
          <SelectItem
            icon="check-circle-outline"
            label="Restricted"
            description="Only approved can view this list."
          />
          <SelectItem
            icon="lock-outline"
            label="Private"
            description="Only you have access to this list."
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
  },
})

export default Select;