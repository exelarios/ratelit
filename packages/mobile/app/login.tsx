import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { AntDesign } from '@expo/vector-icons';
import * as validate from "@ratelit/shared/validate";
import { LoginResponse } from "@ratelit/shared/types";

import View from "../components/View";
import Button from "../components/Button";
import Text from "../components/Text";
import TextInput from "../components/TextInput";

import colors from "../design/colors";
import Separator from "../components/Separator";
import useForm from "../hooks/useForm";
import useStorage from "../hooks/useStorage";

type Login = z.infer<typeof validate.login>

export default function Login() {
  // const mutation = useMutation({
  //   mutationFn: (payload) => {
  //     return 
  //   }
  // });

  const [accessToken, setAccessToken] = useStorage("access");
  const [refreshToken, setrefreshToken] = useStorage("access");

  const handleOnLogin = useCallback(async (state: Login) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password
        })
      });

      const body = await response.json() as LoginResponse;

      if (body.success) {
        const tokens = body.payload;
        setAccessToken(tokens.accessToken);
        setrefreshToken(tokens.refreshToken);
      }

      console.log(JSON.stringify(body, null, 2));


      // todo: implement return for input validation from the server.
      // todo: put tokens into secure store

      return body;
    } catch(error) {
      console.log(error);
    }
  }, []);

  const form = useForm<Login>({
    state: {
      email: "",
      password: ""
    },
    zodValidation: validate.login,
    onSubmit: handleOnLogin
  });

  const GoogleLogo = useMemo(() => {
    return (
      <AntDesign name="google" size={24} color="black" />
    );
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
          value={form.value.email}
          message={form.message?.email}
          onChangeText={(text) => form.handleOnChange("email", text)}
        />
        <TextInput
          secureTextEntry
          label="Password"
          placeholder="password"
          value={form.value.password}
          message={form.message?.password}
          onChangeText={(text) => form.handleOnChange("password", text)}
        />
        <Button
          variant="fill"
          onPress={form.onSubmit}>
          Login
        </Button>
        <Button style={styles.forgotButton}>Forgot password?</Button>
        <Separator>OR</Separator>
        <View style={styles.containerSpacing}>
          <Button variant="outline" icon={GoogleLogo}>Login with Google</Button>
          <Button variant="outline">Sign up</Button>
        </View>
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
    gap: 5
  },
  forgotButton: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  containerSpacing: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20
  }
});