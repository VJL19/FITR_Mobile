import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React, { useEffect, useInsertionEffect, useState } from "react";
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
  newsfeedslice,
  useCheckLikePostMutation,
  useGetAllCommentsQuery,
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
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import { postslice } from "reducers/postReducer";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import CustomError from "components/CustomError";
import firebase from "firebase/app";

const { width, height } = Dimensions.get("window");
const DetailedPostFeed = () => {
  const [likePost, { data: likeData, error: likeErr, status: likeStat }] =
    useLikePostInFeedMutation();
  const [unLikePost, { error: unlikeErr, status: unlikeStat }] =
    useUnlikePostInFeedMutation();
  const [notificationLike, {}] = useNotifyLikePostInFeedMutation();
  const [removeNotificationLike, {}] = useRemoveNotificationLikeMutation();
  const [checkPostIsLike, { data: result, isLoading }] =
    useCheckLikePostMutation();
  const { data, isError, isFetching, isUninitialized } =
    useGetAccessTokenQuery();

  const { user } = data!;
  useRefetchOnMessage("refresh_post", () => {
    dispatch(newsfeedslice.util.invalidateTags(["newsfeed"]));
    dispatch(postslice.util.invalidateTags(["posts"]));
  });

  const dispatch: AppDispatch = useDispatch();

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

  const {
    data: comments,
    status,
    error: commentErr,
  } = useGetAllCommentsQuery(NewsfeedID, { refetchOnMountOrArgChange: true });

  const fullName = `${user.FirstName} ${user.LastName}`;

  const notify_arg = {
    UserID: UserID,
    PostID: PostID,
    NotificationAuthor: fullName,
    Username: Username,
    NotificationDate: getCurrentDate(),
    PostTitle: PostTitle,
  };

  console.log("status", status);

  const { isConnected } = useIsNetworkConnected();
  useEffect(() => {
    checkPostIsLike(arg);
  }, []);

  const mediaRef = ref(storage, PostImage);

  useEffect(() => {
    if (PostImage === IMAGE_VALUES.DEFAULT) {
      return;
    } else {
      getMetadata(mediaRef)
        .then((metaData) => {
          setMetadata(metaData?.contentType);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (likeErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (likeErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      likeStat === "rejected" &&
      likeErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", likeErr?.data?.error?.sqlMessage);
    }
    if (likeErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", likeErr?.data?.message);
    }
    if (likeStat === "fulfilled") {
      notificationLike(notify_arg);
      console.log("LIKE POST !", likeErr);
      console.log("LIKE POST !", likeData);
      DisplayAlert("Success message", "Like post successfully!");
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigation.goBack();
      };
      delayRedirect();
    }
  }, [likeStat]);

  useEffect(() => {
    if (unlikeErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (unlikeErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      unlikeStat === "rejected" &&
      unlikeErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", unlikeErr?.data?.error?.sqlMessage);
    }
    if (unlikeErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", unlikeErr?.data?.message);
    }
    if (unlikeStat === "fulfilled") {
      removeNotificationLike({ Username: user.Username, PostID: PostID });
      DisplayAlert("Success message", "Unlike post successfully");
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigation.goBack();
      };
      delayRedirect();
    }
  }, [unlikeStat]);

  const handleUnlike = () => {
    unLikePost(arg);
  };

  const handleLike = async () => {
    likePost(arg);
  };
  const handleComment = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Comment on Post",
    });
  };

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: PostImage,
      },
    });
  };

  if (isError) {
    return <CustomError />;
  }

  if (commentErr?.status === HTTP_ERROR.BAD_REQUEST) {
    return <CustomError />;
  }
  if (status === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {FIREBASE_VIDEO_FORMATS.includes(metadata) ? (
          <Video
            source={{ uri: PostImage }}
            style={styles.video}
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
              style={styles.image}
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
        <View style={{ padding: 10 }}>
          <Text style={styles.date}>
            Posted Date: {new Date(PostDate.split(" ")[0]).toDateString()}
          </Text>
          <Text style={styles.title}>{PostTitle}</Text>
          <RenderHTML
            contentWidth={width}
            source={{ html }}
            baseStyle={styles.description}
          />
          <Text style={styles.description}>Posted By: {PostAuthor}</Text>

          {comments?.result.length !== 0 && (
            <Text style={styles.title}>Comments</Text>
          )}
          {comments?.result.length === 0 && (
            <Text style={styles.title}>No Comments</Text>
          )}
          <FlatList
            horizontal={true}
            alwaysBounceVertical={true}
            data={comments?.result}
            renderItem={({ item }: { item: IComments }) => (
              <Comments {...item} />
            )}
            keyExtractor={(item) => item.CommentID?.toString()}
          />
        </View>
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
    fontSize: 28,
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 21,
    fontFamily: "Inter-Medium",
  },
  date: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
  },
  image: { height: width * 1.1, width: width },
  video: { height: width * 1.1, width: width },
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
