import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Link } from "expo-router";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";

type ListProps = {
  id: string;
  title: string;
  variant?: "small" | "large"
}

function List(props: ListProps) {
  const { id, title, variant = "small" } = props;

  if (variant === "large") {
    return (
      <Link
        style={styles.wrapper}
        href={{
          pathname: "/home/list",
          params: {
            listId: id
          }
        }}>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}>
        </LinearGradient>
      </Link>
    );
  }

  return (
    <Link 
      style={styles.wrapper}
      href={{
      pathname: "/home/list",
      params: {
        listId: id
      }
    }}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </Link>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
  },
  gradient: {
    borderRadius: 10,
    width: 150,
    height: 150,
    backgroundColor: colors.neutral[200],
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.neutral[100],
    marginVertical: 3,
  }
});

export default List;