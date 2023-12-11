import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";

import TextInput from "@/mobile/components/TextInput";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Select from "@/mobile/components/Select";
import { SheetProvider } from "@/mobile/hooks/useSheet";

function Create() {
  return (
    <SheetProvider>
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
                <TextInput label="Name" placeholder="Best 'Your Mom' Jokes of All Time"/>
                {/* type, thumbanail, category */}
                <Select label="Visibility" value="Private"/>
                <TextInput style={{ height: 100 }} multiline label="Description"/>
                <Button variant="fill">Create list</Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <StatusBar style="inverted"/>
      </View>
    </SheetProvider>
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
    // justifyContent: "space-between",
    // backgroundColor: "green"
  },
  form: {
    display: "flex",
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