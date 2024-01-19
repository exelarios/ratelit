import { TextInput, FlatList, StyleSheet } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Feather } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import List from "@/mobile/components/List";
import Category from "@/mobile/components/Categories";

import colors from "@/mobile/design/colors";

import { ExploreListQuery } from "./__generated__/ExploreListQuery.graphql";
import { Suspense } from "react";

const ExploreQuery = graphql`
  query ExploreListQuery {
    Feed {
      edges {
        node {
          id
          ...ListFragment
        }
      }
    }
  }
`;

function Header() {
  return (
    <View style={styles.heading}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.search}>
        <Feather name="search" size={20} color={colors.neutral[600]} />
        <TextInput placeholder="search"/>
      </View>
      <Category/>
    </View>
  );
}

function Footer() {
  return (
    <View>
      <Text>You have reached the bottom of the list.</Text>
    </View>
  );
}

function Explore() {
  const data = useLazyLoadQuery<ExploreListQuery>(ExploreQuery, {});

  // console.log(JSON.stringify(data, null, 2));

  return (
    <Suspense fallback={<Text>loading . . . </Text>}>
      <View style={styles.wrapper}>
        <FlatList
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          data={data.Feed.edges}
          contentContainerStyle={styles.feed}
          keyExtractor={node => node.node.id}
          renderItem={({ item }) =>
            <List variant="large" list={item.node}/>
          }
        />
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 15
  },
  search: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.neutral[200]
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  feed: {
    display: "flex",
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 10
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  }
});

export default Explore;