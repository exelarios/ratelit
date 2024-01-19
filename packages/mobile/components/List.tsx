import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { graphql, useFragment } from "react-relay";
import { Link } from "expo-router";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import { ListFragment$key } from "./__generated__/ListFragment.graphql";

type ListProps = {
  list: ListFragment$key;
  variant: "large" | "small";
}

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1579282940892-6152e6e80c52?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ListFragment = graphql`
  fragment ListFragment on List {
    id
    title
  }
`;

function List(props: ListProps) {
  const { variant = "small" } = props;

  const data = useFragment(ListFragment, props.list);

  const { id, title } = data;

  if (variant === "large") {
    return (
      <ImageBackground
        source={{ uri: SAMPLE_IMAGE }}
        resizeMode="center"
        imageStyle={{ borderRadius: 10}}
        style={large.wrapper}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={large.gradient}>
          <Link
            href={{
              pathname: "/Home/ListDetails",
              params: {
                listId: id
              }
            }}>
              <View style={large.container}>
                <View style={[large.col, { justifyContent: "flex-end" }]}>

                </View>
                <View style={large.col}>
                  <Text style={styles.title}>{title}</Text>
                </View>
              </View>
          </Link>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <Link 
      style={styles.wrapper}
      href={{
      pathname: "/Home/list",
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

const large = StyleSheet.create({
  gradient: {
    width: "100%",
    height: 150,
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
});

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