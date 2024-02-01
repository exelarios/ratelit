import React, { useMemo } from "react";
import { Image } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import { Ionicons } from '@expo/vector-icons';
import { useLazyLoadQuery } from "react-relay";
import { useLocalSearchParams } from "expo-router";
import { ArticleListQuery } from "./__generated__/ArticleListQuery.graphql";
import formatTime from "@/mobile/utils/formatTime";
import Back from "@/mobile/components/Back";
import { ArticleQuery, styles } from ".";

export function Article() {
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  const data = useLazyLoadQuery<ArticleListQuery>(ArticleQuery, {
    listId: listId as string
  });

  const { title, description, thumbnail, isFollowing, owner, createdAt } = data.List;

  const createdTimestamp = useMemo(() => {
    return formatTime(new Date(createdAt));
  }, [createdAt]);

  return (
    <View safe>
      <View style={{ paddingHorizontal: 20 }}>
        <Back />
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail} />
        <View style={styles.content}>
          <View style={styles.heading}>
            <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
            <Ionicons
              suppressHighlighting
              name={isFollowing ? "bookmark" : "bookmark-outline"}
              size={24} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text
            numberOfLines={2}
            style={[styles.text, styles.description]}>
            {description}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{createdTimestamp}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}
