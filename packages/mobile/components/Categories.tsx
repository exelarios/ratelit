import { Fragment, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

import colors from "@/mobile/design/colors";

const categories = {
  "food": "🍕",
  "tech": "📟",
  "wear": "👕",
  "games": "🎮",
  "books": "📚",
  "movies": "🎬",
  "sports": "⚽️",
  "colors": "🎨",
  "financial": "💰",
  "edu": "🏫"
}

function Category() {
  const list = useMemo(() => {
    return Object.entries(categories).map(([name, icon]) => {
      return (
        <Button key={name} style={styles.item}>
          <Text style={styles.icon}>{icon}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>{name}</Text>
        </Button>
      );
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Categories</Text>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {list}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingVertical: 20
  },
  container: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  icon: {
    fontSize: 40,
  },
  label: {
    fontWeight: "bold"
  },
  item: {
    padding: 20,
    width: 100,
    gap: 5,
    alignItems: "center",
    height: 100,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.neutral[300],
    backgroundColor: colors.neutral[200]
  }
});

export default Category;