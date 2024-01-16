import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

import colors from "@/mobile/design/colors";

const categories = {
  "food": "🍕",
  "tech": "📟",
  "clothing": "👕",
  "games": "🎮",
  "books": "📚",
  "movies": "🎬",
  "sports": "⚽️",
  "colors": "🎨",
  "financial": "💰",
  "education": "🏫"
}

function Category() {
  const list = useMemo(() => {
    return Object.entries(categories).map(([name, icon]) => {
      return (
        <Pressable key={name} style={styles.item}>
          <Text style={styles.icon}>{icon}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>{name}</Text>
        </Pressable>
      );
    });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={styles.container}>
      {list}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontWeight: "bold"
  },
  item: {
    columnGap: 10,
    display: "flex",
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.neutral[300],
    backgroundColor: colors.neutral[200]
  }
});

export default Category;