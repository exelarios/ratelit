import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ListResponse } from "@ratelit/shared/types";

function List() {
  const parmas = useLocalSearchParams();
  const { id } = parmas;

  const query = useQuery({
    queryKey: ["lists", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/auth/lists?id=${id}`)
      const data = await response.json() as ListResponse;
      if (data.success) {
        throw new Error(data.message);
      }

      return data;
    }
  });

  console.log(parmas);
  return (
    <View>
      <Back/>
      <Text>urmom was here</Text>
    </View>
  );
}

export default List;