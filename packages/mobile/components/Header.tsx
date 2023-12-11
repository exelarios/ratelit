import { StyleSheet, ViewProps } from "react-native";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";

interface HeaderProps extends ViewProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <View safe style={styles.header}>
      <Back/>
      <Text style={styles.text}>{title}</Text>
      <View style={{ width: 24.3, height: 30 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20
  },
});

export default Header;