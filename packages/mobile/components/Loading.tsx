import { useCallback } from "react";
import { StyleSheet } from "react-native";

import Button from "@/mobile/components/Button";
import View from "@/mobile/components/View";
import Logo from "@/mobile/components/Logo";
import { useAuth } from "@/mobile/context/AuthContext";

function Loading() {
  const auth = useAuth();
  
  const handleOnLogout = useCallback(() => {
    auth.dispatch({
      type: "CLEAR_SESSION"
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={handleOnLogout}>
        <Logo/>
      </Button>
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