import { Slot } from "expo-router";

import { AuthContextProvider } from "../context/AuthContext";

export default function Root() {
  return (
    <AuthContextProvider>
      <Slot>
      </Slot>
    </AuthContextProvider>
  );
}