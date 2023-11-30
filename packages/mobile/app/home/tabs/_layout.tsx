import { Tabs } from "expo-router";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function Layout() {
  return (
    <Tabs initialRouteName="feed" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="feed" options={{
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return (
              <AntDesign name="home" size={30} color="black" />
            );
          }
        }}
      />
      <Tabs.Screen name="create" options={{
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return (
                <Ionicons name="add-circle-outline" size={35} color="black" />
              );
            }
          }}
      />
      <Tabs.Screen name="profile" options={{
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return (
                <Ionicons name="md-person-outline" size={30} color="black" />
              );
            }
          }}
      />
    </Tabs>
  );
}

export default Layout;