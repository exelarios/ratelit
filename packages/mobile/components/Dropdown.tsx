import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Select, { SelectItemProps, useSelect } from "@/mobile/components/Select";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import colors from "../design/colors";

interface DropdownProps extends React.ComponentProps<typeof Select> {

}

function Dropdown(props: DropdownProps) {
  const { label, onChange, children, ...otherProps } = props;
  return (
    <Select label={label} onChange={onChange} {...otherProps}>
      {children}
    </Select>
  );
}

export interface ItemProps extends SelectItemProps {
  icon: keyof (typeof MaterialIcons.glyphMap);
  description: string;
}

function Item(props: ItemProps) {
  const { selectedItem, onSelect } = useSelect();
  const { icon, label, value, description, ...otherProps } = props;
  
  const handleOnPress = useCallback(() => {
    onSelect(value);
  }, [value]);

  const isActive = selectedItem === value;
  
  return (
    <Pressable
      {...otherProps}
      onPress={handleOnPress}
      style={[styles.container, isActive && styles.active]}>
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
    borderRadius: 10,
    padding: 10,
    gap: 10
  },
  active: {
    backgroundColor: colors.neutral[200]
  },
  label: {
    fontWeight: "bold",
    color: colors.neutral[700]
  },
  description: {
    color: colors.neutral[600]
  }
});

Dropdown.Item = Item;

export default Dropdown;