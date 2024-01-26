import { useCallback, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { graphql, useMutation } from "react-relay";

import TextInput from "@/mobile/components/TextInput";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import Dropdown from "@/mobile/components/Dropdown";
import Back from "@/mobile/components/Back";

import useForm from "@/mobile/hooks/useForm";
import * as validate from "@ratelit/shared/validate";
import { useToast } from "@/mobile/context/ToastContext";
import colors from "@/mobile/design/colors";

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
  const [photo, setPhoto] = useState("");

  const [commit, isInFlight] = useMutation<CreateListMutation>(CreateList);

  const form = useForm<ListCreateInput>({
    state: {
      title: "",
      visibility: "PUBLIC",
      categories: [],
      description: "",
      thumbnail: null
    },
    zodValidation: validate.createList,
    onSubmit: async (state) => {
      commit({
        variables: {
          input: {
            title: state.title,
            description: state.description,
            thumbnail: state.thumbnail,
            categories: state.categories,
            visibility: state.visibility
          },
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

  const handleOnImagePicker = useCallback(async () => {
    // If the fileSize is less than 300kb, we won't compress the image.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [5, 5],
      quality: 1,
      selectionLimit: 1
    });

    if (result.canceled) {
      return;
    }

    let image = result.assets[0];

    if (!image.fileSize) {
      toast.add({
        message: "We couldn't read your image, please choose a different image"
      });
      return;
    }

    // If the image is over 300kb, we will compress the image.
    const needCompression = (image.fileSize / 1000) > 300;
    
    if (needCompression) {
      const thumbnail = await ImageManipulator.manipulateAsync(image.uri, [], {
        base64: true,
        compress: 0.2,
        format: ImageManipulator.SaveFormat.JPEG
      });

      image = thumbnail;
    }

    setPhoto(image.uri);

    // We make a fetch to grab the file type.
    const response = await fetch(image.uri, {
      method: "GET",
    });

    // Blobs aren't support with RN expo thus, we are required to
    // send the image's data as base64 rather a blob.
    const blob = await response.blob();

    form.handleOnChange("thumbnail", {
      encoding: image.base64,
      type: blob.type
    });
  }, [form]);

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
              <ImageBackground
                source={photo ? { uri: photo } : null}
                style={[styles.thumbnail, photo ? { borderWidth: 0 } : null]}
                imageStyle={{ borderRadius: 10 }}>
                <Button
                  onPress={handleOnImagePicker}>
                  {!photo ? "Pick an image from camera roll" : null}
                </Button>
              </ImageBackground>
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
  },
  thumbnail: {
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: colors.neutral[400],
    height: 120
  }
});

export default Create;