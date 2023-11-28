import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

import Text from "../../components/Text";

export default function AppLayout() {
  const auth = useAuth();
  const { user, isLoading } = auth.state;

  if (isLoading) {
    return <Text>Loading . . . </Text>
  }

  if (!user) {
    return (
      <Redirect href="/"/>
    );
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}/>
  );
}