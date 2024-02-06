import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { graphql, useFragment } from "react-relay";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";

import { ListFragment$key } from "./__generated__/ListFragment.graphql";

type ListProps = {
  list: ListFragment$key;
  variant?: "large" | "small";
}

const ListFragment = graphql`
  fragment ListFragment on List {
    id
    title
    thumbnail
    isFollowing
    categories
    description
    updatedAt
    owner {
      name
    }
  }
`;

function List(props: ListProps) {
  const { variant = "large" } = props;
  const data = useFragment(ListFragment, props.list);
  const { id, title, isFollowing, thumbnail, owner, description } = data;

  return (
    <ImageBackground
      source={{ uri: thumbnail }}
      resizeMode="center"
      imageStyle={{ borderRadius: 10, objectFit: "cover" }}
      style={[styles.wrapper, variant === "small" && { width: 150, height: 250 }]}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}>
        <Link
          href={{
            pathname: "/Home/Article",
            params: {
              listId: id
            }
          }}>
            <View style={styles.container}>
              <View style={[styles.col, { justifyContent: "flex-end" }]}>
                {variant !== "small" &&
                  <Ionicons
                    name={isFollowing ? "bookmark-sharp" : "bookmark-outline"}
                    size={24}
                    color="white"
                  />
                }
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <Text numberOfLines={1} style={[styles.text, styles.description]}>{description}</Text>
              </View>
            </View>
        </Link>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: "bold",
    fontFamily: "Georgia",
    color: colors.neutral[100],
    marginVertical: 3,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  wrapper: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    color: colors.neutral["100"]
  },
  owner: {
    fontWeight: "500"
  },
  description: {
    fontSize: 12,
  }
});

export default List;