import View from "@/mobile/components/View";
import Text from "@/mobile/components/Text";
import Back from "@/mobile/components/Back";
import { useLocalSearchParams } from "expo-router";

function List() {
  const parmas = useLocalSearchParams();
  console.log(parmas);
  return (
    <View>
      <Back/>
      <Text>urmom was here</Text>
    </View>
  );
}

export default List;