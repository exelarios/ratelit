import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import View from "../components/View";
import Text from "../components/Text";
import colors from "../design/colors";
import { AntDesign } from '@expo/vector-icons'; 

interface ToastMessage {
  timestamp: number;
  type?: "success" | "warning" | "error";
  message: string;
}

interface ToastContext {
  add: (payload: Omit<ToastMessage, "timestamp">) => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context == undefined) {
    throw new Error("useToast must be used within a ToastContext.Provider");
  }

  return context;
}

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<ToastMessage[]>([]);

  const onAddQueue = useCallback((payload: Omit<ToastMessage, "timestamp">) => {
    const newMessage = {
      timestamp: Date.now(),
      type: payload?.type || "warning",
      ...payload
    }

    setQueue((q) => [newMessage, ...q]);

    setTimeout(() => {
      setQueue((q) => q.filter(message => message.timestamp !== newMessage.timestamp));
    }, 5000);
  }, []);

  const value = useMemo(() => {
    return {
      add: onAddQueue
    }
  }, []);

  const messages = useMemo(() => {
    return queue.map((payload, index) => {
      const { type, message } = payload;
      return (
        <View key={index} style={styles.container}>
          <AntDesign name="exclamationcircleo" size={22} color={colors.neutral[600]}/>
          <Text style={styles.message}>{message}</Text>
        </View>
      );
    });
  }, [queue]);

  return (
    <ToastContext.Provider value={value}>
      <View style={styles.portal}>
        {messages}
      </View>
      {children} 
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  portal: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    top: 70,
    width: "100%",
    zIndex: 10000,
  },
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 100,
    marginHorizontal: "5%",
    borderWidth: 1.5,
    borderColor: colors.neutral[600],
    backgroundColor: colors.neutral[100]
  },
  message: {
    fontWeight: "500",
    fontSize: 15,
    color: colors.neutral[600]
  }
});