import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";

import { TokensResponse } from "@ratelit/shared/types";

import { AntDesign } from '@expo/vector-icons';
import * as validate from "@ratelit/shared/validate";

import { router } from "expo-router";

import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import TextInput from "@/mobile/components/TextInput";
import Logo from "@/mobile/components/Logo";

import colors from "@/mobile/design/colors";
import Separator from "@/mobile/components/Separator";
import useForm from "@/mobile/hooks/useForm";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";

import { ENDPOINT } from "@/mobile/utils/constants";

type Login = z.infer<typeof validate.login>

/*

1. Login views renders, checks if SecureStore exists tokens
  a. tokens exist and valid, redirects protected views.
  b. tokens doesn't exist and not valid
      1. promots the user to log in via credentials 
      2. In AuthContext call setAuth({ access, refresh })
      3. Inside of setAuth(), we push the tokens into SecureStore
*/

export default function Login() {
  const { dispatch } = useAuth();
  const toast = useToast();

  const sendCredentials = useCallback(async (payload: Login) => {
      const response = await fetch(`${ENDPOINT}/api/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      });

      return await response.json() as TokensResponse;
  }, []);

  const handleOnLogin = async (credentials: Login) => {
    try {
      const data = await sendCredentials(credentials);

      // Seems to be a lint issue where I can't express falsify through exclamation mark.
      // https://www.reddit.com/r/typescript/comments/t0jpbc/why_doesnt_typescript_treat_respsuccess_as_an/
      if (data.success === false) {
        switch(data.code) {
          case "INVALID_PAYLOAD":
            // send the issues with the validation back to the form to be displayed.
            return data.message;
          case "INCORRECT_PASSWORD":
            throw new Error(data.message);
          default:
            throw new Error(data.message);
        }
      }
      
      const tokens = data.payload;

      dispatch({
        type: "SET_TOKENS",
        payload: {
          access: tokens.accessToken,
          refresh: tokens.refreshToken
        }
      });

      // todo: implement return for input validation from the server.
      // todo: put tokens into secure store
    } catch(error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.add({
          type: "warning",
          message: error.message
        })
      }
    }
  };

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

  const handleOnRegister = () => {
    router.push("/register");
  }

  return (
    <View safe style={styles.container}>
      {/* <Text size={50} style={styles.title}>Ratelit 🔥</Text> */}
      <View style={{ paddingVertical: 20, justifyContent: "center", display: "flex", flexDirection: "row" }}>
        <Logo/>
      </View>
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
          <Button variant="outline" onPress={handleOnRegister}>Sign up</Button>
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
