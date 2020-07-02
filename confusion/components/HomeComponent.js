import * as React from "react";
import { Button, View } from "react-native";
import Main from "./MainComponent";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

function HomePage({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Main")} title="Go to Main" />
    </View>
  );
}

function Home() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Main" component={Main} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Home;
