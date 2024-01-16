import { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { graphql, useLazyLoadQuery } from "react-relay";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Button from "@/mobile/components/Button";
import { useAuth } from "@/mobile/context/AuthContext";
import List from "@/mobile/components/List";
import { router } from "expo-router";

import { FeedUserEditableListQuery } from "./__generated__/FeedUserEditableListQuery.graphql";

const UserEditableListQuery = graphql`
  query FeedUserEditableListQuery($email: String!) {
    User(email: $email) {
      membership {
        edges {
          node {
            list {
              id
              title
              owner
              description
            }
          }
        }
      }
    }
  }
`; 

function Explore() {
  const auth = useAuth();
  const user = auth.state.user;

  const data = useLazyLoadQuery<FeedUserEditableListQuery>(UserEditableListQuery, {
    email: user.email
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
      <View style={styles.list}>
        <Text style={styles.title}>Your List</Text>
        <FlatList
          data={data.User.membership.edges}
          contentContainerStyle={styles.feed}
          renderItem={({ item }) => <List variant="large" {...item.node.list} />}
          keyExtractor={node => node.node.list.id}
        /> 
      </View>
    </View>
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