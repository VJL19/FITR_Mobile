import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllCommentsAction } from "../../../actions/commentAction";
import logo from "../../../assets/fitr_logo3.png";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigationProp } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";

const Postsfeed = ({
  PostTitle,
  PostDescription,
  PostDate,
  PostAuthor,
  NewsfeedID,
  PostIsLike,
  PostImage,
  PostLikes,
}: INewsFeed) => {
  const dispatch: AppDispatch = useDispatch();

  const { comments, message } = useSelector(
    (state: RootState) => state.comment
  );

  const navigation = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    dispatch(getAllCommentsAction(NewsfeedID || 0));
  }, []);

  const handlePress = () => {
    //navigate to another screen and pass params.
    navigation.navigate("DetailedScreens", {
      screen: "View Post Feed",
      params: {
        PostTitle: PostTitle,
        PostDescription: PostDescription,
        PostDate: PostDate,
        PostAuthor: PostAuthor,
        PostIsLike: PostIsLike,
        PostImage: PostImage,
        PostLikes: PostLikes,
        comments: comments,
      },
    });
  };
  console.log("comments", message);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{PostTitle}</Text>
          <Text style={styles.date}>{PostDate.substring(0, 10)}</Text>
        </View>
        <Image
          source={logo}
          style={{ height: 130, width: "50%", opacity: 0.4 }}
        />
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
    height: 150,
    width: 300,
    padding: 15,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#f5f5f5",
    backgroundColor: "#303030",
  },
  title: {
    fontSize: 22,
    color: "#f5f5f5",
    fontWeight: "800",
    fontFamily: "Inter-Bold",
  },
  date: {
    fontSize: 14,
    color: "#f5f5f5",
  },
});
