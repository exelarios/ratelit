import { Fragment, useCallback, useMemo, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextLayoutEventData, Dimensions, ScrollView } from "react-native";
import { Image } from "expo-image";
import { graphql, useFragment, useMutation } from "react-relay";
import { Ionicons } from '@expo/vector-icons';

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import formatTime from "@/mobile/utils/formatTime";

import { ArticleFragment$key } from "./__generated__/ArticleFragment.graphql";
import { Link } from "expo-router";
import { ArticleFollowListMutation } from "./__generated__/ArticleFollowListMutation.graphql";
import { useToast } from "../context/ToastContext";
import { ArticleFragment_updateable$key } from "./__generated__/ArticleFragment_updateable.graphql";

type ArticleProps = {
  list: ArticleFragment$key;
  updateable: ArticleFragment_updateable$key
}

const ArticleFragment = graphql`
  fragment ArticleFragment on List {
    id
    title
    thumbnail
    isFollowing
    categories
    description
    updatedAt
    createdAt
    role
    owner {
      name
    }
    items {
      id
      name
      description
    }
  }
`;

const FollowListMuatation = graphql`
  mutation ArticleFollowListMutation($listId: ID!) {
    FollowList(listId: $listId) {
      role
    }
  }
`;

const windowWidth = Dimensions.get("window").width;

function Article(props: ArticleProps) {
  const toast = useToast();
  const data = useFragment(ArticleFragment, props.list);
  const [followingMutation, isInFlight] = useMutation<ArticleFollowListMutation>(FollowListMuatation);
  const { id, title, description, thumbnail, owner, isFollowing, createdAt } = data;

  const createdTimestamp = useMemo(() => {
    return formatTime(new Date(createdAt));
  }, [createdAt]);

  const handleOnFollowingMutation = useCallback(() => {
    followingMutation({
      variables: {
        listId: id
      },
      onCompleted: () => {
        toast.add({
          message: isFollowing ? `You are no longer following ${title}` : `You are now following ${title}`,
        });
      },
      onError(error) {
        console.log(error);
        toast.add({
          message: error?.source.errors[0].message || error.message
        });
      },
      updater: (store) => {
        const fragment = graphql`
          fragment ArticleFragment_updateable on List @updatable {
            isFollowing
            role
          }
        `;

        const { updatableData } = store.readUpdatableFragment(fragment, props.updateable);
        updatableData.isFollowing = !updatableData.isFollowing;
      }
    })
  }, [data]);

  return (
    <Fragment>
      <View
        style={styles.section}>
        <View style={styles.section}>
          <View style={styles.divider}/>
          <Link
            href={{
              pathname: "/Home/Article",
              params: {
                listId: id
              }
            }}>
            <View style={styles.container}>
              <Image
                source={{ uri: thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.content}>
                <View style={styles.heading}>
                  <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
                  <Ionicons
                    disabled={isInFlight}
                    suppressHighlighting
                    onPress={handleOnFollowingMutation}
                    name={isFollowing ? "bookmark" : "bookmark-outline"}
                    size={24}
                  />
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
          </Link>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  section: {
    width: windowWidth
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
    height: 0.5,
    marginBottom: 20,
    backgroundColor: colors.neutral[400]
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