import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";

import { LoginResponse } from "@ratelit/shared/types";

import { AntDesign } from '@expo/vector-icons';
import * as validate from "@ratelit/shared/validate";

import View from "../components/View";
import Button from "../components/Button";
import Text from "../components/Text";
import TextInput from "../components/TextInput";

import colors from "../design/colors";
import Separator from "../components/Separator";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
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

      const body = await response.json() as LoginResponse;
      if (!body.success) {
        toast.add({
          type: "warning",
          message: body.message
        });
        throw new Error(body.message);
      }
      
      return body.payload;
    } catch(error) {
      // if user isn't found
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, []);

  const handleOnLogin = async (credentials: Login) => {
    try {
      const tokens = await sendCredentials(credentials);

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
      console.log(error);
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
    toast.add({
      message: "urmom was here" + Math.random()
    });
  }

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
