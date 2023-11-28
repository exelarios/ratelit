import { Stack } from "expo-router";

import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "../context/ToastContext";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <AuthContextProvider>
          <Stack screenOptions={{ headerShown: false }}/>
        </AuthContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}