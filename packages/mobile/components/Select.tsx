import { Fragment, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import Sheet from "@/mobile/components/Sheet";

import { AntDesign } from "@expo/vector-icons";

interface SelectProps extends ViewProps {
  label: string;
  value: string;
  message?: string;
}

function Select(props: SelectProps) {
  const { label, value, message } = props;
  
  const [open, setOpen] = useState(false);

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
      <Sheet open={open} onClose={() => setOpen(false)}>
        <View safe>
          <Text>ur mom</Text>
          <Text>ur mom</Text>
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
})

export default Select;