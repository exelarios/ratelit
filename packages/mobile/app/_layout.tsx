import { Stack } from "expo-router";

import { AuthContextProvider } from "@/mobile/context/AuthContext";
import { ToastContextProvider } from "@/mobile/context/ToastContext";
import RelayProvider from "@/mobile/context/RelayContext";

export default function Root() {
  return (
    <ToastContextProvider>
      <RelayProvider>
        <AuthContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{
              animation: "none"
            }}/>
          </Stack>
        </AuthContextProvider>
      </RelayProvider>
    </ToastContextProvider>
  );
}