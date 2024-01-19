import { useCallback } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

import { graphql, useMutation } from "react-relay";

import TextInput from "@/mobile/components/TextInput";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import Dropdown from "@/mobile/components/Dropdown";

import useForm from "@/mobile/hooks/useForm";
import * as validate from "@ratelit/shared/validate";
import { useToast } from "@/mobile/context/ToastContext";
import Back from "@/mobile/components/Back";

import { CreateListMutation, ListCreateInput } from "./__generated__/CreateListMutation.graphql";

const CreateList = graphql`
  mutation CreateListMutation($input: ListCreateInput!) {
    createList(data: $input) {
      id
      title
      description
      visibility
      categories
      createdAt
    }
  }
`;

function Create() {
  const toast = useToast();

  const [commit, isInFlight] = useMutation<CreateListMutation>(CreateList);

  const form = useForm<ListCreateInput>({
    state: {
      title: "",
      visibility: "PUBLIC",
      categories: [],
      description: "",
    },
    zodValidation: validate.createList,
    onSubmit: async (state) => {
      commit({
        variables: {
          input: {
            title: state.title,
            description: state.description,
            categories: state.categories,
            visibility: state.visibility
          }
        },
        onCompleted(response) {
          const { title } = response.createList;
          toast.add({
            message: `${title} has been created.`
          });
        },
        onError(error) {
          console.error(error);
          toast.add({
            message: error.message
          });
        }
      });
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