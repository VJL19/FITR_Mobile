import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import getAccessToken from "actions/homeAction";
import { getPostAction } from "actions/postAction";
import LoadingIndicator from "components/LoadingIndicator";
import Posts from "../view_detailed_screens/Posts/Posts";
import { FlatList } from "react-native-gesture-handler";
import { IPost } from "utils/types/post.types";
import { setRoute } from "reducers/routeReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useGetPostsQuery } from "reducers/postReducer";
import FloatingActionButton from "components/FloatingActionButton";
import CustomError from "components/CustomError";

const MyPosts = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { isError, data: user } = useGetAccessTokenQuery();

  const {
    data,
    error: errorPst,
    isFetching,
    isUninitialized,
  } = useGetPostsQuery(user?.user.UserID, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute("My posts"));
    // console.log("posts err", posterr);
  }, []);
  console.log("posts data", data);
  // console.log("user post", postItems);

  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "Add Post" });
  };

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }

  if (data?.result.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>My posts is empty!</Text>
        <FloatingActionButton handlePress={handlePress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#131313", fontSize: 20, fontWeight: "bold" }}>
          What's on your mind? {user?.user?.FirstName}
        </Text>
      </View>

      <FlatList
        alwaysBounceVertical={true}
        data={data?.result}
        renderItem={({ item }) => <Posts {...item} />}
        keyExtractor={(item: IPost) => item?.PostID?.toString()}
      />

      <FloatingActionButton handlePress={handlePress} />
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
