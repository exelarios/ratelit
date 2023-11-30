import { Stack } from "expo-router";

import { AuthContextProvider } from "@/mobile/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "@/mobile/context/ToastContext";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <AuthContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{
              animation: "none"
            }}/>
          </Stack>
        </AuthContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}