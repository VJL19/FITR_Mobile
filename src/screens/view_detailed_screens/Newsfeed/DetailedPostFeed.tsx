import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { FlatList } from "react-native-gesture-handler";
import { IComments } from "utils/types/newsfeed.types";
import Comments from "./Comments";
import LoadingIndicator from "components/LoadingIndicator";
import DisplayAlert from "components/CustomAlert";
import getCurrentDate from "utils/helpers/formatDate";
import {
  useCheckLikePostMutation,
  useGetAllCommentsMutation,
  useLikePostInFeedMutation,
  useNotifyLikePostInFeedMutation,
  useRemoveNotificationLikeMutation,
  useUnlikePostInFeedMutation,
} from "reducers/newsfeedReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import postDefault from "assets/post_default.webp";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RenderHTML from "react-native-render-html";
import { Video, ResizeMode } from "expo-av";
import { FIREBASE_VIDEO_FORMATS } from "utils/constants/FILE_EXTENSIONS";
import { getMetadata, ref } from "firebase/storage";
import { storage } from "global/firebaseConfig";

const DetailedPostFeed = () => {
  const [likePost, { data: likeData, error }] = useLikePostInFeedMutation();
  const [unLikePost, {}] = useUnlikePostInFeedMutation();
  const [notificationLike, {}] = useNotifyLikePostInFeedMutation();
  const [removeNotificationLike, {}] = useRemoveNotificationLikeMutation();
  const [checkPostIsLike, { data: result, isLoading }] =
    useCheckLikePostMutation();
  const { data, isError, isFetching, isUninitialized } =
    useGetAccessTokenQuery();

  const { user } = data!;

  const [getAllComments, { data: comments, status }] =
    useGetAllCommentsMutation();

  const [metadata, setMetadata] = useState<string | null>("");

  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    PostTitle,
    PostDescription,
    PostImage,
    PostDate,
    PostAuthor,
    NewsfeedID,
    UserID,
    Username,
    PostID,
  } = useSelector((state: RootState) => state.comment.commentData);

  const { width } = useWindowDimensions();
  const html = `${PostDescription}`;
  const arg = {
    UserID: user.UserID,
    NewsfeedID: NewsfeedID,
  };

  const comment_arg = {
    NewsfeedID: NewsfeedID,
  };

  const fullName = `${user.FirstName} ${user.LastName}`;

  const notify_arg = {
    UserID: UserID,
    PostID: PostID,
    NotificationAuthor: fullName,
    Username: Username,
    NotificationDate: getCurrentDate(),
    PostTitle: PostTitle,
  };
  useEffect(() => {
    checkPostIsLike(arg);
    getAllComments(comment_arg);
  }, []);

  const mediaRef = ref(storage, PostImage);

  useEffect(() => {
    if (PostImage === IMAGE_VALUES.DEFAULT) {
      return;
    }
    getMetadata(mediaRef)
      .then((metaData) => {
        setMetadata(metaData?.contentType);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const handleUnlike = () => {
    unLikePost(arg);
    removeNotificationLike({ Username: user.Username, PostID: PostID });
    DisplayAlert("Success message", "Unlike post successfully");
    navigation.goBack();
  };

  const handleLike = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    likePost(arg);
    notificationLike(notify_arg);
    console.log("LIKE POST !", error);
    console.log("LIKE POST !", likeData);
    DisplayAlert("Success message", "Like post successfully!");
    navigation.goBack();
  };
  const handleComment = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Comment on Post",
    });
  };

  if (isError) {
    return (
      <View>
        <Text>You are not authenticated!</Text>
      </View>
    );
  }
  if (status === "pending") {
    return <LoadingIndicator />;
  }

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: PostImage,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {FIREBASE_VIDEO_FORMATS.includes(metadata) ? (
          <Video
            source={{ uri: PostImage }}
            style={{ height: 290, width: "100%" }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Image
              resizeMode="contain"
              source={
                PostImage === IMAGE_VALUES.DEFAULT
                  ? postDefault
                  : { uri: PostImage }
              }
              style={{ height: 290, width: "100%" }}
            />
          </TouchableOpacity>
        )}

        {fullName == PostAuthor || (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {result?.result[0]?.PostIsLike ? (
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleUnlike}
                >
                  <AntDesign name="like1" size={35} color="#f5f5f5" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleLike}
                >
                  <AntDesign name="like2" size={35} color="#f5f5f5" />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ width: "50%" }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleComment}
              >
                <FontAwesome name="comment" size={35} color="#f5f5f5" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text>{PostTitle}</Text>
        <RenderHTML contentWidth={width} source={{ html }} />
        <Text>{PostAuthor}</Text>
        <Text>{PostDate}</Text>

        {comments?.result.length !== 0 && (
          <Text style={styles.title}>Comments</Text>
        )}
        <FlatList
          horizontal={true}
          alwaysBounceVertical={true}
          data={comments?.result}
          renderItem={({ item }: { item: IComments }) => <Comments {...item} />}
          keyExtractor={(item) => item.CommentID?.toString()}
        />
      </ScrollView>
    </View>
  );
};
export default DetailedPostFeed;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    fontSize: 21,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    position: "absolute",
    bottom: 5,
    right: 35,
    height: 75,
    backgroundColor: "#ff2e00",
    borderRadius: 100,
    elevation: 20,
  },
});
