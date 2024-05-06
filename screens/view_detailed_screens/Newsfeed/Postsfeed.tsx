import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllCommentsAction } from "../../../actions/commentAction";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";
import { INewsFeed } from "../../../utils/types/newsfeed.types";
import getAccessToken from "../../../actions/homeAction";

const Postsfeed = ({
  PostTitle,
  PostDescription,
  PostDate,
  PostAuthor,
  NewsfeedID,
  PostImage,
  UserID,
  Username,
}: INewsFeed) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authReducer);
  useEffect(() => {
    dispatch(getAccessToken());
  }, []);

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = () => {
    //navigate to another screen and pass params.
    navigation.navigate("DetailedScreens", {
      screen: "View Post Feed",
      params: {
        PostTitle: PostTitle,
        PostDescription: PostDescription,
        PostDate: PostDate,
        PostAuthor: PostAuthor,
        PostImage: PostImage,
        NewsfeedID: NewsfeedID,
        UserID: UserID,
        Username: user.Username,
      },
    });
  };

  const userName =
    user.FirstName + " " + user.LastName === PostAuthor && user.Username;

  console.log(Username);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{PostTitle}</Text>

          <Text>@{userName}</Text>
          <Text style={styles.date}>{PostDate?.substring(0, 10)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Postsfeed;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 120,
    width: 300,
    padding: 15,
    marginTop: 15,
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
});
