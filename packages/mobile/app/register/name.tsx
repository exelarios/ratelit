import { StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";
import TextInput from "@/mobile/components/TextInput";
import Back from "@/mobile/components/Back";
import Logo from "@/mobile/components/Logo";
import { router } from "expo-router";

function Register() {
  return (
    <View safe style={styles.container}>
      <Back/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Logo/>
              <Text style={styles.heading}>Create your account</Text>
              <Text style={styles.subheading}>Register your ratelit account and start collaborating on a rating and share your list.</Text>
            </View>
            <View style={styles.form}>
              <TextInput label="First name" placeholder="Jung"/>
              <TextInput label="Last name" placeholder="Kook"/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Button variant="fill" onPress={() => router.push("/register/email")}>Next</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  header: {
    display: "flex",
    width: "100%",
    marginVertical: 15,
    marginBottom: 30,
    flexDirection: "column",
    // backgroundColor: "red",
    gap: 6,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
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
  }
});

export default Register;