import { Suspense, useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { Feather, Ionicons } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Article from "@/mobile/components/Article";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";

import colors from "@/mobile/design/colors";

import { ExploreListQuery } from "./__generated__/ExploreListQuery.graphql";
import { ExploreFeedFragment$key } from "./__generated__/ExploreFeedFragment.graphql";

const ExploreQuery = graphql`
  query ExploreListQuery($email: String!, $count: Int!, $cursor: ID) {
    User(email: $email) {
      ...ExploreFeedFragment
    }
  }
`;

const ExploreFeedFragment = graphql`
  fragment ExploreFeedFragment on User
  @refetchable(queryName: "ExploreFeedPaginationFragment") {
    feed(first: $count, after: $cursor)
    @connection(key: "ExploreFeedLists_feed") {
      edges {
      node {
        id
        ...ArticleFragment
        ...ArticleFragment_updateable
      }
    }
    }
  }
`;

function Header() {
  return (
    <View style={styles.heading}>
      <Text style={styles.title}>Explore</Text>
      <Ionicons 
        suppressHighlighting
        name="search"
        size={24}
        color="black"
      />
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

interface ExploreListProps {
  feed: ExploreFeedFragment$key;
}

function ExploreList(props: ExploreListProps) {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const list = usePaginationFragment(ExploreFeedFragment, props.feed);

  const handleOnRefresh = useCallback(() => {
    setLoading(true);
    list.refetch({
      first: 10
    }, {
      onComplete(error) {
        if (error) {
          console.log(error);
          toast.add({
            message: error.message
          });
        }
        setLoading(false);
      },
      fetchPolicy: "store-and-network"
    });
  }, [list]);

  return (
    <Suspense
      fallback={<Text>loading . . . </Text>}>
      <FlatList
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        refreshing={isLoading}
        onRefresh={handleOnRefresh}
        data={list.data.feed.edges}
        contentContainerStyle={styles.feed}
        keyExtractor={node => node.node.id}
        renderItem={({ item }) =>
          <Article list={item.node} updateable={item.node}/>
        }
      />
    </Suspense>
  );
}

function Explore() {
  const auth = useAuth();
  const user = auth.state.user;

  const data = useLazyLoadQuery<ExploreListQuery>(ExploreQuery, {
    email: user.email,
    count: 10,
  });

  return (
    <View style={styles.wrapper}>
      <ExploreList feed={data.User}/>
    </View>
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
    fontSize: 20,
    fontWeight: "bold"
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 10
  },
  heading: {
    display: "flex",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  }
});

export default Explore;