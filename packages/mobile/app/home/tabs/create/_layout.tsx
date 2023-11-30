import { Stack } from "expo-router";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";

function Create() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="modal" options={{
        presentation: "modal"
      }}/>
    </Stack>
  );
}

export default Create;