import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

import { useAuth } from "@/mobile/context/AuthContext";

function Profile() {
  const auth = useAuth();
  const user = auth.state.user;

  const handleLogout = useCallback(() => {
    auth.dispatch({
      type: "CLEAR_SESSION"
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.createdAt}</Text>
      <Text>{user.id}</Text>
      <Button onPress={handleLogout}>logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
});

export default Profile;