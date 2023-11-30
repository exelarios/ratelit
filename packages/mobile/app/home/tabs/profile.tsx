import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

import { useAuth } from "@/mobile/context/AuthContext";

function Profile() {
  const auth = useAuth();

  const handleLogout = useCallback(() => {
    auth.dispatch({
      type: "CLEAR_SESSION"
    });
  }, []);

  return (
    <View safe style={styles.container}>
      <Text>profile</Text>
      <Button variant="fill" onPress={handleLogout}>logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
});

export default Profile;