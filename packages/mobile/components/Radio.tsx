import { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Select, { SelectItemProps, useSelect } from "@/mobile/components/Select";

import Button from "@/mobile/components/Button";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";

import colors from "@/mobile/design/colors";
import { Feather } from '@expo/vector-icons';

type RadioProps = React.ComponentProps<typeof Select>;

function Radio(props: RadioProps) {
  const { label, onChange, children, ...otherProps } = props;
  return (
    <Select label={label} onChange={onChange} {...otherProps}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{label}</Text>
      <ScrollView>
        {children}
      </ScrollView>
    </Select>
  );
}

export interface ItemProps extends SelectItemProps {
  icon: string;
}

function Item(props: ItemProps) {
  const { selectedItem, onSelect } = useSelect();
  const { icon, label, value, ...otherProps } = props;
  
  const handleOnPress = useCallback(() => {
    onSelect(value);
  }, [value]);

  const isActive = selectedItem === value;
  
  return (
    <Button
      {...otherProps}
      onPress={handleOnPress}
      style={[styles.container, isActive && styles.active]}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10 }}>
        <Text style={{ fontSize: 30 }}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      {isActive ?
        <Feather
          name="check-circle"
          style={{ marginEnd: 10 }}
          size={24}
          color={colors.neutral[800]}
        />
        :
        <Feather 
          name="circle"
          style={{ marginEnd: 10 }}
          size={24}
          color={colors.neutral[800]}
        />
      }
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 10,
    gap: 10
  },
  active: {
    backgroundColor: colors.neutral[200]
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.neutral[700]
  },
  description: {
    color: colors.neutral[600]
  }
});

Radio.Item = Item;

export default Radio;