import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Image, Dimensions, ScrollView, NativeSyntheticEvent, TextLayoutEventData } from "react-native";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import { Ionicons } from '@expo/vector-icons';
import { graphql, useLazyLoadQuery } from "react-relay";
import { useLocalSearchParams } from "expo-router";
import { ArticleListQuery } from "./__generated__/ArticleListQuery.graphql";
import formatTime from "@/mobile/utils/formatTime";
import Back from "@/mobile/components/Back";

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
      items {
        name
        description
      }
      owner {
        name
      }
    }
  }
`;

function Article() {
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  const data = useLazyLoadQuery<ArticleListQuery>(ArticleQuery, {
    listId: listId as string
  });

  const { title, description, thumbnail, isFollowing, owner, createdAt, items } = data.List;

  const createdTimestamp = useMemo(() => {
    return formatTime(new Date(createdAt));
  }, [createdAt]);

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
              <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
              <Ionicons
                suppressHighlighting
                name={isFollowing ? "bookmark" : "bookmark-outline"}
                size={24}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text
              style={[styles.text, styles.description]}>
              {description}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.timestamp}>{createdTimestamp}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 5
  },
  text: {
    color: "black"
  },
  owner: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.neutral[600]
  },
  description: {
    color: colors.neutral[500]
  },
  close: {
    color: colors.neutral[600]
  },
  thumbnail: {
    width: "100%",
    // height: 250,
    aspectRatio: 1,
    borderRadius: 10
  }
});

export default Article;