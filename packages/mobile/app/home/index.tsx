import { useCallback } from "react";
import View from "../../components/View";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useAuth } from "../../context/AuthContext";

function Home() {
  const auth = useAuth();

  const handleLogout = useCallback(() => {
    auth.dispatch({
      type: "CLEAR_SESSION"
    });
  }, []);

  return (
    <View safe>
      <Text>logged in</Text>
      <Button variant="fill" onPress={handleLogout}>logout</Button>
    </View>
  );
}

export default Home;