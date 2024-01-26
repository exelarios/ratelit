import { Tabs, router } from "expo-router";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import View from "@/mobile/components/View";

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import colors from "@/mobile/design/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabType = "screen" | "sheet" | "modal"

type TabButtons = {
  label: string,
  type: TabType,
  path?: string;
  icon: keyof (typeof Ionicons)["glyphMap"];
  active: keyof (typeof Ionicons)["glyphMap"];
}[];

const screens: TabButtons = [
  {
    label: "Feed",
    type: "screen",
    icon: "layers-outline",
    active: "layers"
  },
  {
    label: "Explore",
    type: "screen",
    icon: "search-outline",
    active: "search",
  },
  {
    label: "Notifications",
    type: "screen",
    icon: "notifications-outline",
    active: "notifications-sharp",
  },
  {
    label: "Profile",
    type: "screen",
    icon: "happy-outline",
    active: "happy-sharp"
  },
];

function Tabbar({ state, navigation }: BottomTabBarProps) {
  const currentTab = state.history.at(-1);

  return (
    <View style={styles.bar}>
      {screens.map(({ label, icon, type, path, active }, index) => {
        // todo: fix this to be less ambiguous.
        const currentTabName = currentTab.key.split("-")[0];
        const isActive = currentTabName.includes(label);
        const handleOnPress = () => {
          if (isActive) return;
          router.replace(path || `/Home/tabs/${label}`);
        }

        return (
          <Ionicons
            key={label}
            suppressHighlighting
            onPress={handleOnPress}
            name={isActive ? active : icon}
            size={24}
            color="black"
          />
        );
      })}
    </View>
  );
}

function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, {
      paddingTop: insets.top
    }]}>
      <Tabs
      tabBar={Tabbar}
      initialRouteName="Feed/index"
      screenOptions={{
        headerShown: false,
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  bar: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.neutral[100],
    height: 80
  }
});

export default Layout;