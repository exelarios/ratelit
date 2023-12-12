import { useCallback, useMemo } from "react";
import { Tabs, router } from "expo-router";

import View from "@/mobile/components/View";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import colors from "@/mobile/design/colors";
import Button from "@/mobile/components/Button";

type TabType = "screen" | "sheet" | "modal"

type TabButtons = {
  label: string,
  type: TabType,
  path?: string;
  icon: React.ReactNode
}[];

const icons: TabButtons = [
  {
    label: "feed",
    type: "screen",
    icon: <AntDesign name="home" size={30} color="black" />
  },
  {
    label: "create",
    type: "sheet",
    path: "/home/create",
    icon: <Ionicons name="add-circle-outline" size={35} color="black" />
  },
  {
    label: "profile",
    type: "screen",
    icon: <Ionicons name="md-person-outline" size={30} color="black" />
  },
];

function Tabbar({ state, navigation }) {
  return (
    <View style={styles.bar}>
      {icons.map(({ label, icon, type, path }, index) => {
        const handleOnPress = () => {
          switch(type) {
            case "sheet":
              router.push(path || `/home/tabs/${label}`);
            default:
              router.push(path || `/home/tabs/${label}`);
              break;
          }
        }

        return (
          <Button 
            key={label}
            onPress={handleOnPress}>
            {icon}
          </Button>
        );
      })}
    </View>
  );
}

function Layout() {
  return (
    <Tabs
      initialRouteName="feed"
      tabBar={Tabbar}
      screenOptions={{ headerShown: false }}
    />
  );
}

const styles = StyleSheet.create({
  bar: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.neutral[200],
    height: 80
  }
});

export default Layout;