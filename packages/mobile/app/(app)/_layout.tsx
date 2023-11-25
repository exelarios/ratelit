import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

import Text from "../../components/Text";
import View from "../../components/View";

export default function AppLayout() {
  const auth = useAuth();
  const { user, isLoading } = auth.state;

  if (isLoading) {
    return <Text>Loading . . . </Text>
  }

  if (!user) {
    return (
      <Redirect href="/login"/>
    );
  }

  return (
    <View safe>
      <Text>logged in</Text>
    </View>
  )
}