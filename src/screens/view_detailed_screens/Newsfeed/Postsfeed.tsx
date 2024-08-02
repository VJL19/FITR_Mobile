import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { getAllCommentsAction } from "actions/commentAction";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { INewsFeed } from "utils/types/newsfeed.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { setCommentData } from "reducers/commentReducer";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import avatar from "assets/avatar_default.jpeg";
import {
  useGetTotalCommentsQuery,
  useGetTotalLikesQuery,
} from "reducers/newsfeedReducer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const Postsfeed = ({
  PostTitle,
  PostDescription,
  PostDate,
  PostAuthor,
  NewsfeedID,
  PostImage,
  UserID,
  Username,
  PostID,
  ProfilePic,
}: INewsFeed) => {
  const { data } = useGetAccessTokenQuery();
  const { user } = data!;

  const { data: total_likes } = useGetTotalLikesQuery(NewsfeedID, {
    refetchOnMountOrArgChange: true,
  });
  const { data: total_comments } = useGetTotalCommentsQuery(NewsfeedID, {
    refetchOnMountOrArgChange: true,
  });

  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();
  const handlePress = () => {
    //navigate to another screen and pass params.

    const arg = {
      PostTitle: PostTitle,
      PostDescription: PostDescription,
      PostDate: PostDate,
      PostAuthor: PostAuthor,
      PostImage: PostImage,
      NewsfeedID: NewsfeedID,
      UserID: UserID,
      Username: user.Username,
      PostID: PostID,
    };
    dispatch(setCommentData(arg));

    navigation.navigate("DetailedScreens", {
      screen: "View Post Feed",
    });
  };

  const totalComments = total_comments?.result?.[0].commentCounts;
  const totalLikes = total_likes?.result?.[0].likeCounts;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.box}>
        <View style={{ width: "20%" }}>
          <Image
            source={
              ProfilePic === IMAGE_VALUES.DEFAULT ? avatar : { uri: ProfilePic }
            }
            style={styles.image}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>
            {PostAuthor}
          </Text>

          <Text style={styles.username}>@{Username}</Text>
          <Text style={styles.date}>
            {new Date(PostDate?.substring(0, 10)).toDateString()}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <AntDesign name="like2" size={25} color="gray" />
            <Text style={{ color: "gray" }}>{totalLikes}</Text>
            <FontAwesome name="comments-o" size={25} color="gray" />
            <Text style={{ color: "gray" }}>{totalComments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Postsfeed;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 120,
    width: 300,
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 22,
    color: "#202020",
    fontWeight: "800",
    fontFamily: "Inter-Bold",
  },
  date: {
    fontSize: 14,
    color: "#202020",
  },
  image: {
    resizeMode: "cover",
    width: "auto",
    borderWidth: 1.5,
    height: 60,
    borderRadius: 150,
    borderColor: "#ff2e00",
  },
  username: {
    color: "gray",
  },
});
