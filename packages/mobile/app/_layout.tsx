import { ErrorBoundary, Stack } from "expo-router";

import { AuthContextProvider } from "@/mobile/context/AuthContext";
import { ToastContextProvider } from "@/mobile/context/ToastContext";
import RelayProvider from "@/mobile/context/RelayContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function Root() {

  return (
    <ToastContextProvider>
      <RelayProvider>
        <AuthContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" options={{
              animation: "none"
            }}/>
          </Stack>
        </AuthContextProvider>
      </RelayProvider>
    </ToastContextProvider>
  );
}