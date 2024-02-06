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
import colors from "@/mobile/design/colors";
import { TabOptions } from "@ratelit/shared/types";

import { FeedUserListQuery } from "./__generated__/FeedUserListQuery.graphql";
import { FeedListFragment$key } from "./__generated__/FeedListFragment.graphql";
import { useToast } from "@/mobile/context/ToastContext";

const UserQuery = graphql`
  query FeedUserListQuery($email: String!, $count: Int!, $cursor: ID, $tabOption: ListTabOptions) {
    User(email: $email) {
      ...FeedListFragment
    }
  }
`;

const UserListFragemnt = graphql`
  fragment FeedListFragment on User
  @refetchable(queryName: "UserListPaginationFragment") {
    list(first: $count, after: $cursor, tabOption: $tabOption)
    @connection(key: "User_list") {
      edges {
        node {
          id
          ...ListFragment
        }
      }
    }
  }
`;

interface FollowingListProps {
  tab: TabOptions;
  user: FeedListFragment$key;
}

function FollowingList(props: FollowingListProps) {
  const { tab } = props;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const list = usePaginationFragment(UserListFragemnt, props.user);

  const handleOnRefresh = useCallback(() => {
    setLoading(true);
    list.refetch({
      first: 10,
      TabOptions: tab
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
        data={list.data.list.edges}
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
  const [currentTab, setCurrentTab] = useState<TabOptions>(TabOptions.All);

  const data = useLazyLoadQuery<FeedUserListQuery>(UserQuery, {
    email: user.email,
    count: 10,
    tabOption: currentTab
  });

  const plus = useMemo(() => {
    return (
      <Ionicons name="add-sharp" size={24} color="black" />
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your List</Text>
      <View style={styles.topbar}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button
            onPress={() => setCurrentTab(TabOptions.All)}
            style={[styles.button, currentTab === TabOptions.All && styles.active]}>
            All
          </Button>
          <Button
            onPress={() => setCurrentTab(TabOptions.Following)}
            style={[styles.button, currentTab === TabOptions.Following && styles.active]}>
            Watchlist
          </Button>
          <Button
            onPress={() => setCurrentTab(TabOptions.Author)}
            style={[styles.button, currentTab === TabOptions.Author && styles.active]}>
            Author
          </Button>
        </View>
        <Button
          icon={plus}
          fontWeight="500"
          onPress={() => router.push("/Home/Create")}>
          Create a list
        </Button>
      </View>
      <FollowingList tab={currentTab} user={data.User}/>
    </View>
  );
}

const styles = StyleSheet.create({
  following: {
    paddingTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 10
  },
  topbar: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  active: {
    backgroundColor: colors.teal[300],
    borderRadius: 10,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 10
  }
});

export default Explore;