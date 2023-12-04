import { StyleSheet } from "react-native";

import TextInput from "@/mobile/components/TextInput";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

function Create() {
  return (
    <View safe style={styles.container}>
      <TextInput label="Name"/>
      <TextInput multiline label="Description"/>
      <Button variant="fill">Create</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

export default Create;