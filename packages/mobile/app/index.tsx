import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useMutation, graphql } from "react-relay";

import { AntDesign } from '@expo/vector-icons';
import * as validate from "@ratelit/shared/validate";

import { router } from "expo-router";

import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import TextInput from "@/mobile/components/TextInput";
import Logo from "@/mobile/components/Logo";
import Loading from "@/mobile/components/Loading";

import colors from "@/mobile/design/colors";
import Separator from "@/mobile/components/Separator";
import useForm from "@/mobile/hooks/useForm";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";
import store from "@/mobile/utils/token";

import type { LoginInput, appMutation } from "./__generated__/appMutation.graphql";

const UserLoginMutation = graphql`
  mutation appMutation($input: LoginInput!) {
    login(input: $input) {
      access
      refresh
      user {
        firstName
        lastName
        email
        id
        avatar
      }
    }
  }
`;

export default function Login() {
  const { dispatch, state } = useAuth();
  const { isLoading } = state;
  const toast = useToast();

  const [commitMutation, isInFlight] = useMutation<appMutation>(UserLoginMutation);

  const handleOnLogin = async (credentials: LoginInput) => {
    commitMutation({
      variables: {
        input: {
          email: credentials.email,
          password: credentials.password
        }
      },
      cacheConfig: {
        metadata: {
          token: false
        }
      },
      onCompleted: async (data) => {
        console.log("onCompleted:Login", data.login);

        await store.setAccess(data.login.access);
        await store.setRefresh(data.login.refresh);

        dispatch({
          type: "LOGIN",
          payload: {
            user: data.login.user
          }
        });

        router.replace("/Home");
      },
      onError(error) {
        toast.add({
          type: "warning",
          message: error.message
        });
      },
    });
  };

  const form = useForm<LoginInput>({
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

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <View safe style={styles.container}>
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
          <Button variant="outline" disabled={isInFlight} onPress={handleOnRegister}>Sign up</Button>
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
