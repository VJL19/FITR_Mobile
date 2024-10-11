import { StyleSheet, Text, View, Pressable, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
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
import SearchBar from "components/SearchBar";

const MyPosts = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { isError, data: user } = useGetAccessTokenQuery();
  const [searchPost, setSearchPost] = useState("");
  const [queryPost, setQueryPost] = useState<IPost[] | []>();

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

  useEffect(() => {
    setQueryPost(data?.result);
  }, [data?.result]);
  console.log("posts data", data);
  // console.log("user post", postItems);

  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "Add Post" });
  };

  const handleChange = (text: string) => {
    const formattedQuery = text.toLowerCase();

    if (formattedQuery) {
      const filteredPost = data?.result.filter((post) =>
        post.PostTitle.toLowerCase().includes(formattedQuery)
      );

      setQueryPost(filteredPost);
    } else {
      setQueryPost(data?.result);
    }
    setSearchPost(formattedQuery);
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
        <Text
          style={{ fontSize: 23, fontWeight: "bold", fontFamily: "Inter-Bold" }}
        >
          What's on your mind? {user?.user?.FirstName}
        </Text>
        <FloatingActionButton handlePress={handlePress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, width: "100%" }}>
        <SearchBar
          value={searchPost}
          placeholder="Search post"
          handleChangeText={handleChange}
        />
      </View>
      <FlatList
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        alwaysBounceVertical={true}
        data={queryPost}
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
