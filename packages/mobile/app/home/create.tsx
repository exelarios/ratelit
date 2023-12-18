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
import Select from "@/mobile/components/Select";

import useForm from "@/mobile/hooks/useForm";
import * as validate from "@ratelit/shared/validate";
import { CreateListRequestParams } from "@ratelit/shared/types";
import Animated, { FadeInDown, FadeOutDown} from "react-native-reanimated";

function Create() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateListRequestParams>({
    state: {
      title: "",
      visibility: "",
      description: ""
    },
    zodValidation: validate.createList,
    onSubmit: async (state) => {
      console.log(state);
    }
  });

  const handleOnSelectOnChange = useCallback((value: string) => {
    const output = value.toUpperCase();
    form.handleOnChange("visibility", output);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Button onPress={() => router.back()}>Cancel</Button>
      </View>
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
              <Select
                label="Visibility"
                defaultValue="Private"
                message={form.message?.visibility}
                onChange={handleOnSelectOnChange}
              />
              <TextInput
                multiline
                message={form.message?.description}
                label="Description"
                placeholder="I have been bainstorming your mom jokes since I was in 7th grade. I am fully edcuated in ranking your mom."
              />
              <Button variant="fill" onPress={form.onSubmit}>Create list</Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="inverted"/>
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