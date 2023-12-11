import { StyleSheet } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ListResponse } from "@ratelit/shared/types";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";
import colors from "@/mobile/design/colors";

function List() {
  const auth = useAuth();
  const toast = useToast();
  const tokens = auth.state.tokens;
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lists", listId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/lists?id=${listId}`, {
        headers: {
          "Authorization": `bearer ${tokens.access}`
        }
      });
      const data = await response.json() as ListResponse;
      console.log("LIST", data);
      if (data.success === false) {
        throw new Error(data.message);
      }

      return data.payload;
    }
  });

  if (isLoading) {
    return (
      <View safe>
        <Text> . . . </Text>
      </View>
    );
  }

  return (
    <View>
      <View safe style={styles.thumbnail}>
        <Back/>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: colors.neutral[500],
    paddingTop: 0,
    height: "35%",
    padding: 20
  },
  container: {
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  }
})

export default List;