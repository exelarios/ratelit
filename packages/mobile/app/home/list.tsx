import { StyleSheet } from "react-native";
import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";
import { useLocalSearchParams } from "expo-router";
import { ListResponse } from "@ratelit/shared/types";
import { useAuth } from "@/mobile/context/AuthContext";
import { useToast } from "@/mobile/context/ToastContext";
import colors from "@/mobile/design/colors";

import { ENDPOINT } from "@/mobile/utils/constants";

function List() {
  const auth = useAuth();
  const toast = useToast();
  const tokens = auth.state.tokens;
  const parmas = useLocalSearchParams();
  const { listId } = parmas;

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["lists", listId],
  //   queryFn: async () => {
  //     const response = await fetch(`${ENDPOINT}/api/lists?id=${listId}`, {
  //       headers: {
  //         "Authorization": `bearer ${tokens.access}`
  //       }
  //     });
  //     const payload = await response.json() as ListResponse;
  //     console.log("LIST", data);
  //     if (payload.success === false) {
  //       throw new Error(payload.message);
  //     }

  //     return payload.data;
  //   }
  // });

  if ("dgd") {
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
        <Text style={styles.title}>yes</Text>
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