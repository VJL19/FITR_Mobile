import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import getAccessToken from "../../actions/homeAction";
import { getPostAction } from "../../actions/postAction";
import LoadingIndicator from "../../components/LoadingIndicator";
import Posts from "../view_detailed_screens/Posts/Posts";
import { FlatList } from "react-native-gesture-handler";
import { IPost } from "../../utils/types/post.types";
import { setRoute } from "../../reducers/routeReducer";

const MyPosts = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { user } = useSelector((state: RootState) => state.authReducer);
  const { postItems, isLoading, message, status } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(getPostAction(user.UserID));
    dispatch(setRoute("My posts"));
  }, []);
  console.log("user post", postItems);

  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "Add Post" });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#f5f5f5", fontSize: 20, fontWeight: "bold" }}>
          What's on your mind? {user.FirstName}
        </Text>
      </View>

      <FlatList
        alwaysBounceVertical={true}
        data={postItems}
        renderItem={({ item }) => <Posts {...item} />}
        keyExtractor={(item: IPost) => item.PostID}
      />

      <Pressable
        onPress={handlePress}
        style={{
          alignSelf: "flex-end",
          width: "20%",
          borderRadius: 50,
          borderWidth: 1,
          height: 70,
          backgroundColor: "#ff2e00",
          position: "absolute",
          top: "80%",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 40, color: "#f5f5f5" }}>+</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#202020",
  },
});
