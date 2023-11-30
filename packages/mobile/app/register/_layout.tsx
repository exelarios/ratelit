import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="name"/>
    </Stack>
  );
}

export default Layout;