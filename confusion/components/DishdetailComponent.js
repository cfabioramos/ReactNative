import React, { useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { COMMENTS } from "../shared/comments";

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;
  console.log(props.favorite)
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={require(`./${dish.image}`)}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log("Already favorite") : props.onPress()
          }
        />
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function main({ route }) {
  const [comments] = useState(COMMENTS);
  const [favorites, setFavorites] = useState([]);

  const markFavorite = (dishId) => {
    if ( !(favorites.some((el) => el === dishId)) ){
      favorites.push(dishId);
      setFavorites([...favorites])
    }
  } 

  return (
    <ScrollView>
      <RenderDish
        dish={route.params.dish}
        favorite={favorites.some((el) => el === route.params.dish.id)}
        onPress={() => markFavorite(route.params.dish.id)}
      />
      <RenderComments
        comments={comments.filter(
          (comment) => comment.dishId === route.params.dish.id
        )}
      />
    </ScrollView>
  );
}

export default main;
