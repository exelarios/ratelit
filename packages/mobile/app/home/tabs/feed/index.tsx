import { Fragment, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Category from "@/mobile/components/Categories";
import ListCard from "@/mobile/components/ListCard";

import { useAuth } from "@/mobile/context/AuthContext";

import { Feather } from '@expo/vector-icons';
import { useQuery } from "@tanstack/react-query";
import { ListResponse } from "@ratelit/shared/types";
import { router } from "expo-router";

function Following() {
  const auth = useAuth();
  const tokens = auth.state.tokens;

  const query = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/lists", {
        method: "GET",
        headers: {
          "Authorization": `bearer ${tokens.access}`
        }
      });

      const data = await response.json() as ListResponse;
      if (data.success === false) {
        throw new Error(data.message);
      }

      return data.payload;
    }
  });

  const lists = useMemo(() => {
    return query.data?.map((list) => {
      return (
        <ListCard key={list.id} {...list}/>
      );
    });
  }, [query.data]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Following</Text>
      {lists}
    </View>
  );
}

function UserList() {
  const auth = useAuth();
  const tokens = auth.state.tokens;

  const query = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/lists", {
        method: "GET",
        headers: {
          "Authorization": `bearer ${tokens.access}`
        }
      });

      const data = await response.json() as ListResponse;
      if (data.success === false) {
        throw new Error(data.message);
      }

      return data.payload;
    }
  });

  const lists = useMemo(() => {
    return query.data?.map((list) => {
      return (
        <ListCard key={list.id} {...list}/>
      );
    });
  }, [query.data]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>My list</Text>
      {lists}
    </View>
  );
}

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

function Feed() {

  return (
    <Fragment>
      <View safe style={styles.container}>
        <Topbar/>
        <UserList/>
        <Following/>
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