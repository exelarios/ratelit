import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { graphql, useFragment } from "react-relay";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";

import { ListFragment$key } from "./__generated__/ListFragment.graphql";

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type ArticleProps = {
  list: ListFragment$key;
}

const ListFragment = graphql`
  fragment ListFragment on List {
    id
    title
    thumbnail
    isFollowing
    categories
    description
    owner {
      name
    }
    updatedAt
  }
`;

function Article(props: ArticleProps) {
  const data = useFragment(ListFragment, props.list);
  const { title, description, thumbnail, owner } = data;

  return (
    <View>
      <Image
        source={{ uri: thumbnail }}
        style={styles.thumbnail}
        placeholder={blurhash}
      />
      <Text style={[styles.text, styles.owner]}>{owner.name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.text, styles.description]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    color: "black"
  },
  owner: {
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10
  }
});

export default Article;