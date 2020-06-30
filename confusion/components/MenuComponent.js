import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes"

function Menu({ navigation }) {

  const [dishes] = useState(DISHES);

  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        onPress={() => navigation.navigate('Dishdetail', {dish: item}) }
        leftAvatar={{ source: require(`./${item.image}`) }}
      />
    );
  };

  return (
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Menu;