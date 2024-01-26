import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

import View from "@/mobile/components/View";

import { Ionicons } from '@expo/vector-icons';

function Back() {

  const handleGoBack = useCallback(() => {
    const canGoBack = router.canGoBack();
    if (!canGoBack) {
      return;
    }

    router.back();
  }, []);

  return (
    <Ionicons
      suppressHighlighting
      name="chevron-back"
      borderRadius={1000}
      style={styles.icon}
      onPress={handleGoBack}
      size={24}
      color="black"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
  }
});

export default Back;