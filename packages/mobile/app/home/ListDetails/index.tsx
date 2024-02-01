import { useMemo } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";

import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";
import colors from "@/mobile/design/colors";

import { ListDetailsQuery } from "./__generated__/ListDetailsQuery.graphql";
import { ListDetailsEditorsFragment$key } from "./__generated__/ListDetailsEditorsFragment.graphql";

type EditorsProps = {
  list: ListDetailsEditorsFragment$key;
};

const EditorsListFragment = graphql`
  fragment ListDetailsEditorsFragment on List {
    editors {
      edges {
        node {
          user {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;

function Editors(props: EditorsProps) {
  const data = useFragment(EditorsListFragment, props.list);

  return (
    <View>
      {data.editors.edges.map(({ node }) => {
        const { id, name, avatar } = node.user;
        return (
          <Image
            key={id}
            style={editorStyles.avatar}
            source={require("@/mobile/assets/icon.png")}
          />
        );
      })}
    </View>
  );
}

const DetailsQuery = graphql`
  query ListDetailsQuery($listId: String!) {
    List(id: $listId) {
      id
      title
      description
      categories
      thumbnail
      createdAt
      visibility
      createdAt
      owner {
        name
      }
      updatedAt
      ...ListDetailsEditorsFragment
    }
  }
`;

function List() {
  const auth = useAuth();
  const user = auth.state.user;

  const toast = useToast();
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  const data = useLazyLoadQuery<ListDetailsQuery>(DetailsQuery, {
    listId: listId as string,
  });

  const { title, description, thumbnail } = data.List;

  return (
    <View>
      <ImageBackground
        style={styles.thumbnail}
        source={{ uri: thumbnail }}
        imageStyle={{
          height: "100%",
          objectFit: "cover",
        }}>
        <View safe style={{ width: "100%", height: "100%" }}>
          <Back />
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
        <Editors list={data.List} />
      </View>
      <StatusBar animated translucent style="inverted" />
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: colors.neutral[500],
    height: "40%",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

const editorStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: colors.neutral[400],
    borderRadius: 100,
  },
});

export default List;
