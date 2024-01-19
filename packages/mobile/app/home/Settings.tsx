import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import { StyleSheet } from "react-native";

function Settings() {
  return (
    <View>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Settings;