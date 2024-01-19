import { Suspense, useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Button from "@/mobile/components/Button";
import { useAuth } from "@/mobile/context/AuthContext";
import List from "@/mobile/components/List";

import { FeedUserEditableListQuery } from "./__generated__/FeedUserEditableListQuery.graphql";
import { FeedUserEditableListFragment$key } from "./__generated__/FeedUserEditableListFragment.graphql";
import { useToast } from "@/mobile/context/ToastContext";

const UserEditableListQuery = graphql`
  query FeedUserEditableListQuery($email: String!, $count: Int!, $cusor: ID) {
    User(email: $email) {
      ...FeedUserEditableListFragment
    }
  }
`;

const UserEditableListFragment = graphql`
  fragment FeedUserEditableListFragment on User
  @refetchable(queryName: "UserEditablePaginationFragment") {
    membership(first: $count, after: $cusor)
    @connection(key: "UserEditableList_membership") {
      edges {
        node {
          id
          ...ListFragment
        }
      }
    }
  }
`;

interface ExploreListProps {
  user: FeedUserEditableListFragment$key;
}

function ExploreList(props: ExploreListProps) {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const list = usePaginationFragment(UserEditableListFragment, props.user);

  const handleOnRefresh = useCallback(() => {
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
    <FlatList
      data={list.data.membership.edges}
      refreshing={isLoading}
      onRefresh={handleOnRefresh}
      contentContainerStyle={styles.feed}
      renderItem={({ item }) => <List variant="large" list={item.node}/>}
      keyExtractor={node => node.node.id}
    />
  );
}

function Explore() {
  const auth = useAuth();
  const user = auth.state.user;

  const data = useLazyLoadQuery<FeedUserEditableListQuery>(UserEditableListQuery, {
    email: user.email,
    count: 10
  });

  const plus = useMemo(() => {
    return (
      <Ionicons name="add-sharp" size={24} color="black" />
    );
  }, []);

  return (
    <Suspense fallback={<Text>loading . . . </Text>}>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Button
            icon={plus}
            fontWeight="500"
            onPress={() => router.push("/Home/Create")}>
            Create a list
          </Button>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>Your List</Text>
          <ExploreList user={data.User}/>
        </View>
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  feed: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 10
  },
  topbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  list: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 10
  },
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default Explore;