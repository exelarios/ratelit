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
import { FeedFollowingListFragment$key } from "./__generated__/FeedFollowingListFragment.graphql";
import { useToast } from "@/mobile/context/ToastContext";

const UserQuery = graphql`
  query FeedUserEditableListQuery($email: String!, $count: Int!, $followingCursor: ID, $editableCursor: ID) {
    User(email: $email) {
      ...FeedUserEditableListFragment
      ...FeedFollowingListFragment
    }
  }
`;

const UserEditableListFragment = graphql`
  fragment FeedUserEditableListFragment on User
  @refetchable(queryName: "UserEditablePaginationFragment") {
    editableList(first: $count, after: $editableCursor)
    @connection(key: "User_editableList") {
      edges {
        node {
          id
          ...ListFragment
        }
      }
    }
  }
`;

const UserFollowingListFragment = graphql`
  fragment FeedFollowingListFragment on User
  @refetchable(queryName: "UserFollowingPaginationFragment") {
    followingList(first: $count, after: $followingCursor)
    @connection(key: "User_followingList") {
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

function EditableList(props: ExploreListProps) {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const list = usePaginationFragment(UserEditableListFragment, props.user);

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
    <Suspense fallback={<Text>loading . . . </Text>}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        data={list.data.editableList.edges}
        refreshing={isLoading}
        onRefresh={handleOnRefresh}
        contentContainerStyle={styles.editable}
        renderItem={({ item }) => <List variant="small" list={item.node}/>}
        keyExtractor={node => node.node.id}
      />
    </Suspense>
  );
}

interface FollowingListProps {
  user: FeedFollowingListFragment$key;
}

function FollowingList(props: FollowingListProps) {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const list = usePaginationFragment(UserFollowingListFragment, props.user);

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
    <Suspense fallback={<Text>loading . . . </Text>}>
      <FlatList
        data={list.data.followingList.edges}
        refreshing={isLoading}
        onRefresh={handleOnRefresh}
        contentContainerStyle={styles.following}
        renderItem={({ item }) => <List list={item.node}/>}
        keyExtractor={node => node.node.id}
      />
    </Suspense>
  );
}

function Explore() {
  const auth = useAuth();
  const user = auth.state.user;

  const data = useLazyLoadQuery<FeedUserEditableListQuery>(UserQuery, {
    email: user.email,
    count: 10,
  });

  const plus = useMemo(() => {
    return (
      <Ionicons name="add-sharp" size={24} color="black" />
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Button
          icon={plus}
          fontWeight="500"
          onPress={() => router.push("/Home/Create")}>
          Create a list
        </Button>
      </View>
      <View style={{ gap: 15 }}>
        <View style={styles.section}>
          <Text style={styles.title}>Your List</Text>
          <EditableList user={data.User}/>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Your Following</Text>
          <FollowingList user={data.User}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  following: {
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
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  editable: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10
  },
  list: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Explore;