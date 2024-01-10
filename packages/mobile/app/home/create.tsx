import { useCallback, useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import TextInput from "@/mobile/components/TextInput";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import Dropdown from "@/mobile/components/Dropdown";

import useForm from "@/mobile/hooks/useForm";
import * as validate from "@ratelit/shared/validate";
import { ENDPOINT, categories } from "@/mobile/utils/constants";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";
import Back from "@/mobile/components/Back";
import { z } from "zod";

// const items = [
//   {
//     label: "Public",
//     value: "public",
//     icon: "public",
//     description: "Anyone can view this list."
//   },
//   {
//     label: "Private",
//     value: "private",
//     icon: "lock-outline",
//     description: "Only you have access to this list."
//   },
//   {
//     label: "Restricted",
//     value: "restricted",
//     icon: "check-circle-outline",
//     description: "Only approved can view this list."
//   }
// ] as const;

type CreateListParams = z.infer<typeof validate.createList>;

function Create() {
  const auth = useAuth();
  const tokens = auth.state.tokens;
  const toast = useToast();

  const query = {};
  // const query = useMutation({
  //   mutationFn: async (payload) => {

  //     console.log("newlist", payload);

  //     // const data = await response.json() as CreateListResponse;
  //     // if (data.success === false) {
  //     //   throw new Error(data.message);
  //     // }
  //     // console.log(data);

  //   },
  //   onError(error)  {
  //     toast.add({
  //       message: error.message
  //     });
  //   },
  // });

  const form = useForm<CreateListRequestParams>({
    state: {
      title: "",
      visibility: "",
      description: "",
    },
    zodValidation: validate.createList,
    onSubmit: async (state) => {
      query.mutate(state);
    }
  });

  const handleOnSelectOnChange = useCallback((value: string) => {
    const output = value.toUpperCase();
    form.handleOnChange("visibility", output);
  }, []);

  return (
    <View safe style={styles.container}>
      <Back/>
      <Text style={styles.title}>Create a list</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.form}>
              <TextInput
                label="Name"
                placeholder="Best 'Your Mom' Jokes of All Time"
                onChangeText={(text) => form.handleOnChange("title", text)}
                message={form.message?.title}
              />
              <Dropdown
                label="Visibility"
                defaultValue="Select a visibility"
                message={form.message?.visibility}
                onChange={handleOnSelectOnChange}>
                <Dropdown.Item
                  label="Private"
                  value="Private"
                  icon="lock-outline"
                  description="Only you have access to this list."
                />
                <Dropdown.Item
                  label="Public"
                  value="Public"
                  icon="public"
                  description="Anyone can view to this list."
                />
                <Dropdown.Item
                  label="Restricted"
                  value="Restricted"
                  icon="check-circle-outline"
                  description="Only approved can view this list."
                />
              </Dropdown>
              <TextInput
                multiline
                message={form.message?.description}
                label="Description"
                placeholder="I have been bainstorming your mom jokes since I was in 7th grade. I am fully edcuated in ranking your mom."
                onChangeText={(text) => form.handleOnChange("description", text)}
              />
              <Button variant="fill" onPress={form.onSubmit}>Create list</Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <StatusBar style="inverted"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 10
  },
  inner: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  form: {
    display: "flex",
    rowGap: 5,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  back: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default Create;