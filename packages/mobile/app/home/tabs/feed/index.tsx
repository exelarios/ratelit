import { Fragment, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import List from "@/mobile/components/List";

import { useAuth } from "@/mobile/context/AuthContext";

import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";

import { FeedListQuery } from "./__generated__/FeedListQuery.graphql";

function Topbar() {
  // const auth = useAuth();
  // const { user } = auth.state;

  const handleOnSearch = useCallback(() => {
    router.push("/home/tabs/feed/search");
  }, []);

  return (
    <View style={styles.topbar}>
      {/* <Text style={styles.topbarLabel}>Hello, {user.firstName}</Text> */}
      {/* <View style={styles.topbarActions}> */}
        <Feather onPress={handleOnSearch} name="search" size={20} color="black" />
        <Feather name="bell" size={20} color="black" />
      {/* </View> */}
    </View>
  );
}

const FeedQuery = graphql`
  query FeedListQuery {
    Feed {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`;

// function UserEditableList() {
//   const variables = {
//     email: "derickwok25@gmail.com"
//   }

//   // const data = useLazyLoadQuery<FeedUserEditableListQuery>(UserEditableListQuery, variables);

//   const list = useMemo(() => {
//     const membership = data.User.membership.edges;
//     return membership?.map(({ node }) => {
//       const { list } = node;
//       return (
//         <List variant="large" key={node.list.id} {...list} />
//       );
//     });
//   }, [data.User.membership]);

//   return (
//     <View>
//       <Text>Your List</Text>
//       {list}
//     </View>
//   );
// }

function Feed() {

  const data = useLazyLoadQuery<FeedListQuery>(FeedQuery, {});
  console.log(data);

  const feedList = useMemo(() => {
    return data.Feed.edges?.map(({ node }) => {
      return (
        <List variant="large" key={node.id} {...node}/>
      );
    })
  }, [data.Feed]);

  return (
    <Fragment>
      <View safe style={styles.container}>
        <Topbar/>
        <View style={styles.feed}>
          {feedList}
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 10
  },
  topbar: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: 20,
    flexDirection: "row",
  },
  topbarActions: {
    display: "flex",
    flexDirection: "row",
    columnGap: 30,
  },
  topbarLabel: {
    fontSize: 25,
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default Feed;