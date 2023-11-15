import { useEffect } from "react";
import { StyleSheet } from "react-native";

import View from "../components/View";
import Button from "../components/Button";
import Text from "../components/Text";
import TextInput from "../components/TextInput";

import colors from "../design/colors";
import Separator from "../components/Separator";

export default function Login() {

  useEffect(() => {

  }, []);

  return (
    <View safe style={styles.container}>
      <Text size={50} style={styles.title}>Ratelit 🔥</Text>
      <View style={styles.formContainer}>
        <TextInput
          textContentType="emailAddress"
          inputMode="email"
          label="Email"
          placeholder="jungkook@ratelit.com"
        />
        <TextInput
          secureTextEntry
          label="Password"
          placeholder="password"
        />
        <Button
          variant="fill"
          onPress={() => console.log("hi")}>
          Login
        </Button>
        <Button style={styles.forgotButton}>Forgot password?</Button>
        <Separator>OR</Separator>
        <Button variant="outline">Login with Google</Button>
        <Button variant="outline">Sign up</Button>
        <Text color={colors.neutral[500]} size={13} style={{ paddingTop: 5 }}>
          By continuing, you are agree to our User Agreement
          and acknowledge that you understand the Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  text: {
    color: colors.neutral[100]
  },
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: 40,
    padding: 20
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  forgotButton: {
    alignItems: "flex-end",
  }
});