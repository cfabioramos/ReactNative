import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

function RenderDish({ route }) {

  const { dish } = route.params;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={require(`./${dish.image}`)}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

export default RenderDish;
