import { StyleSheet } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  }
})

export default Notifications;