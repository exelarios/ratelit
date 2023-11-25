import { Slot } from "expo-router";

import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "../context/ToastContext";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <AuthContextProvider>
          <Slot>
          </Slot>
        </AuthContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}