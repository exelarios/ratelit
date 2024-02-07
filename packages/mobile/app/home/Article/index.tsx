import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Ionicons } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Back from "@/mobile/components/Back";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";

import useFollowListMutation from "@/mobile/hooks/useFollowListMutation";
import { ArticleListQuery } from "./__generated__/ArticleListQuery.graphql";

const windowWidth = Dimensions.get("window").width;

const ArticleQuery = graphql`
  query ArticleListQuery($listId: String!) {
    List(id: $listId) {
      id
      title
      description
      thumbnail
      isFollowing
      createdAt
      updatedAt
      isAuthor
      items {
        name
        description
      }
      owner {
        name
        avatar
      }
    }
  }
`;

function Article() {
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  const [commitFollowList, isInFlight] = useFollowListMutation();
  const data = useLazyLoadQuery<ArticleListQuery>(ArticleQuery, {
    listId: listId as string
  });

  const { id, title, description, thumbnail, isFollowing, isAuthor, owner, updatedAt, items } = data.List;

  const updatedTimestamp = useMemo(() => {
    const date = new Date(updatedAt);
    return Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }, [updatedAt]);

  const listings = useMemo(() => {
    return items.map((item) => {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
          />
        </View>
      );
    });
  }, [items]);

  return (
    <View safe>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Back/>
        </View>
        <View style={styles.container}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
          />
          <View style={styles.content}>
            <View style={styles.heading}>
              <Text style={[styles.text, styles.location]}>San Gabriel, CA</Text>
              <Ionicons
                disabled={isInFlight}
                onPress={() => commitFollowList(id, {
                  title,
                  isAuthor,
                  isFollowing
                })}
                suppressHighlighting
                name={isFollowing ? "bookmark" : "bookmark-outline"}
                size={24}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={{ rowGap: 10 }}>
              <View>
                <Text style={styles.label}>Last updated</Text>
                <Text style={[styles.text, styles.date]}>{updatedTimestamp}</Text>
              </View>
              <View style={{ rowGap: 5 }}>
                <Text style={styles.label}>Authors</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                  <Image source={{ uri: owner.avatar }} style={styles.avatar}/>
                  <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
                </View>
              </View>
              <Text
                style={[styles.text, styles.description]}>
                {description}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
          </View>
        </View>
        <View style={styles.divider}/>
        {listings}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20
  },
  content: {
    paddingVertical: 10
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  timestamp: {
    color: colors.neutral[400],
    fontSize: 12
  },
  divider: {
    height: 1,
    margin: 10,
    backgroundColor: colors.neutral[300]
  },
  title: {
    fontSize: 35,
    fontFamily: "Georgia",
    fontWeight: "bold",
    marginBottom: 10
  },
  text: {
    color: "black"
  },
  label: {
    fontSize: 15,
    fontFamily: "Georgia",
  },
  date: {
    fontSize: 20,
    fontFamily: "Georgia",
    fontStyle: "italic"
  },
  location: {
    fontFamily: "Georgia",
  },
  owner: {
    fontSize: 15,
    fontFamily: "Georgia",
  },
  description: {
    paddingVertical: 10,
    color: colors.neutral[500]
  },
  close: {
    color: colors.neutral[600]
  },
  avatar: {
    borderRadius: 50,
    width: 30,
    aspectRatio: 1
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10
  }
});

export default Article;