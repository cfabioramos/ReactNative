import * as React from "react";
import { Text, ScrollView, Button, View, StyleSheet, Image, Linking } from "react-native";
import Main from "./MainComponent";
import { Card } from "react-native-elements";
import ContactInformation from "./ContactInformation";

import { NavigationContainer, SafeAreaView } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require(`./${item.image}`)}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function HomePage({ navigation }) {
  const [dishes] = React.useState(DISHES);
  const [promotions] = React.useState(PROMOTIONS);
  const [leaders] = React.useState(LEADERS);
  return (
    <ScrollView>
      <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
      <RenderItem item={promotions.filter((promo) => promo.featured)[0]} />
      <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
      <br />
      <Button onPress={() => navigation.navigate("Main")} title="Go to Main" />
      <Button
        onPress={() => navigation.navigate("ContactUs")}
        title="Go to Contact Us"
      />
    </ScrollView>
  );
}

function CustomDrawerContentComponent(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: "#512DA8",
      height: 140,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
    },
    drawerHeaderText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60,
    },
  });

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('http://reactmastercourse.com')}/>
    </DrawerContentScrollView>
  );
}

function Home() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="ContactUs" component={ContactInformation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Home;
