import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Amplify } from "aws-amplify";
import { awsConfig } from "../aws-config"; // Adjust the path as necessary
import { colors } from "../constants";

Amplify.configure(awsConfig);
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="video/[id]"
        options={{
          // Hide this route
          href: null,
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      {/* <Tabs.Screen
        name="RNTutorial"
        options={{
          // Hide this route
          href: null,
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          headerStyle: {
            backgroundColor: colors.mainBg,
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="home"
                size={45}
                color={focused ? colors.mainText : colors.secondaryText}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="createContent"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: (props) => (
            <View style={{ justifyContent: "center" }}>
              <FontAwesome.Button
                onPress={props.onPress}
                onBlur={props.onBlur}
                size={25}
                name="plus"
                style={{
                  paddingRight: 0,
                  width: 45,
                  backgroundColor: colors.primary,
                  flexDirection: "column",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          title: "Account",
          headerStyle: {
            backgroundColor: colors.mainBg,
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="user"
                size={45}
                color={focused ? colors.mainText : colors.secondaryText}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
