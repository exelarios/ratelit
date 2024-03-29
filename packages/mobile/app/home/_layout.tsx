import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@/mobile/context/AuthContext";

import Text from "@/mobile/components/Text";
import Loading from "@/mobile/components/Loading";

export default function AppLayout() {
  const auth = useAuth();
  const { user, isLoading } = auth.state;

  if (isLoading) {
    return <Loading/>
  }

  if (!user) {
    return (
      <Redirect href="/"/>
    );
  }

  /*
  Tabs:
  - Home
    - This allows the user to search for lists.
    - A feed of their follows
  - Create
    - A quick button to create a new ratelit list.
  - Profile
    - everything that concerns the user.
  */
  return (
    <Stack
      initialRouteName="tabs/feed/index"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="tabs"/>
      <Stack.Screen name="ListDetails/index"/>
      <Stack.Screen name="Article/index"/>
      <Stack.Screen name="Create"/>
    </Stack>
  );
}