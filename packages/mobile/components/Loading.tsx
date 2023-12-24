import { StyleSheet } from "react-native";

import View from "@/mobile/components/View";
import Logo from "@/mobile/components/Logo";

function Loading() {
  return (
    <View style={styles.container}>
      <Logo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
});

export default Loading;