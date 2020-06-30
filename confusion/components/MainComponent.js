import React from "react";
import { View, Platform } from "react-native";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function Main() {
  const Stack = createStackNavigator();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : ExpoStatusBar.statusBarHeight,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ title: "Menu" }}
          />
          <Stack.Screen name="Dishdetail" component={Dishdetail} options={{ title: "Dish details" }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Main;
