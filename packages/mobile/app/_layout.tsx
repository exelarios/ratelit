import { Slot } from "expo-router";

import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Slot>
        </Slot>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}