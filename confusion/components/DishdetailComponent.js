import React, { useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { COMMENTS } from "../shared/comments";
import { connect, useSelector } from "react-redux";
import { postFavorite } from '../redux/ActionCreators';

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

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function DishDetail(props) {
  const [comments] = useState(COMMENTS);
  const favorites = useSelector(state => state.favorites)

  const markFavorite = (dishId) => {
    props.postFavorite(dishId);
  }

  console.log('Dish: ')
  console.log(props.route.params.dish)

  return (
    <ScrollView>
      <RenderDish
        dish={props.route.params.dish}
        favorite={favorites.some((el) => el === props.route.params.dish.id)}
        onPress={() => markFavorite(props.route.params.dish.id)}/>
      <RenderComments
        comments={comments.filter(
          (comment) => comment.dishId === props.route.params.dish.id
        )}/>
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
