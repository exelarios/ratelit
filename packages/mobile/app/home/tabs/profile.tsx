import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { graphql, useLazyLoadQuery, usePreloadedQuery } from "react-relay";
import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";
import Button from "@/mobile/components/Button";

import { useAuth } from "@/mobile/context/AuthContext";
import { ProfileUserEditableListQuery } from "./__generated__/ProfileUserEditableListQuery.graphql";
import List from "@/mobile/components/List";

const UserEditableListQuery = graphql`
  query ProfileUserEditableListQuery($email: String!) {
    User(email: $email) {
      membership {
        edges {
          node {
            list {
              id
              title
            }
          }
        }
      }
    }
  }
`; 

function UserEditableList() {
  const auth = useAuth();
  const user = auth.state.user;

  const variables = {
    email: user.email
  }

  const data = useLazyLoadQuery<ProfileUserEditableListQuery>(UserEditableListQuery, variables);

  const list = useMemo(() => {
    const membership = data.User.membership.edges;
    return membership?.map(({ node }) => {
      const { list } = node;
      return (
        <List key={node.list.id} {...list} />
      );
    });
  }, [data.User.membership]);

  return (
    <View>
      <Text>Your List</Text>
      {list}
    </View>
  );
}

function Profile() {
  const auth = useAuth();

  const handleLogout = useCallback(() => {
    auth.dispatch({
      type: "CLEAR_SESSION"
    });
  }, []);

  return (
    <View safe style={styles.container}>
      <Text>profile</Text>
      <UserEditableList/>
      <Button onPress={handleLogout}>logout</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
});

export default Profile;