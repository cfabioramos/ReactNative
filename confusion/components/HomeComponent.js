import * as React from "react";
import {
  Text,
  ScrollView,
  Button,
  View,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import Main from "./MainComponent";
import { Card } from "react-native-elements";
import ContactInformation from "./ContactInformation";
import { connect, useSelector } from "react-redux";
import { NavigationContainer, SafeAreaView } from "@react-navigation/native";
import Reservation from "./ReservationComponent";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { Loading } from "./LoadingComponent";
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.erreMess}</Text>
      </View>
    );
  } else {
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
}

function HomePage(props) {
  const dishes = useSelector((state) => state.dishes);
  const promotions = useSelector((state) => state.promotions);
  const leaders = useSelector((state) => state.leaders);

  return (
    <ScrollView>
      <RenderItem
        item={dishes.dishes.filter((dish) => dish.featured)[0]}
        isLoading={dishes.isLoading}
        erreMess={dishes.erreMess}
      />
      <RenderItem
        item={promotions.promotions.filter((promo) => promo.featured)[0]}
        isLoading={promotions.isLoading}
        erreMess={promotions.erreMess}
      />
      <RenderItem
        item={leaders.leaders.filter((leader) => leader.featured)[0]}
        isLoading={leaders.isLoading}
        erreMess={leaders.erreMess}
      />
      <br />
      <Button
        onPress={() => props.navigation.navigate("Main")}
        title="Go to Main"
      />
      <Button
        onPress={() => props.navigation.navigate("ContactUs")}
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
        onPress={() => Linking.openURL("http://reactmastercourse.com")}
      />
    </DrawerContentScrollView>
  );
}

function Home(props) {
  const Drawer = createDrawerNavigator();

  React.useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Reservation" component={Reservation} />
        <Drawer.Screen name="ContactUs" component={ContactInformation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default connect(null, mapDispatchToProps)(Home);
