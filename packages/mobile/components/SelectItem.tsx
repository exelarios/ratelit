import React from "react";

import { Pressable, PressableProps, StyleSheet } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/mobile/design/colors";

interface ItemProps extends PressableProps {
  icon: keyof (typeof MaterialIcons.glyphMap);
  label: string;
  description: string;
}

function Item(props: ItemProps) {
  const { icon, label, description, ...otherProps } = props;
  return (
    <Pressable style={styles.container} {...otherProps}>
      <MaterialIcons name={icon} size={30} color={colors.neutral[700]} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  label: {
    fontWeight: "bold",
    color: colors.neutral[700]
  },
  description: {
    color: colors.neutral[600]
  }
});

export default Item;