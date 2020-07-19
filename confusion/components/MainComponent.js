import React, { useEffect } from "react";
import { View, Platform, Button } from "react-native";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { connect } from 'react-redux';

function Main(props) {
  const Stack = createStackNavigator();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : ExpoStatusBar.statusBarHeight,
      }}
    >
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
          options={{
            title: "Menu",
            headerLeft: () => (
              <Icon
                name="menu"
                size={24}
                color="white"
                onPress={() => props.navigation.toggleDrawer()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Dishdetail"
          component={Dishdetail}
          options={{ title: "Dish details" }}
        />
      </Stack.Navigator>
      <Button onPress={() => navigation.navigate("Home")} title="Go to Home" />
    </View>
  );
}

export default connect()(Main);
