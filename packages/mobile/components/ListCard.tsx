import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { Link } from "expo-router";
import { List } from "@ratelit/shared/types";

import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";

type ListProps = List;

function ListCard(props: ListProps) {
  const { title, editors, id } = props;

  const owner = useMemo(() => {
    return editors?.filter((editor) => editor.role === "OWNER")[0];
  }, [editors]);

  return (
    <Link 
      style={styles.wrapper}
      href={{
      pathname: "/home/list",
      params: {
        listId: id
      }
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>By {owner.user.firstName} {owner.user.lastName}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
  },
  container: {
    borderRadius: 10,
    width: 150,
    padding: 10,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: colors.neutral[200]
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 3
  }
});

export default ListCard;