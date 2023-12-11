import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="search" options={{
        navigationBarHidden: true,
      }}/>
    </Stack>
  );
}

export default Layout;