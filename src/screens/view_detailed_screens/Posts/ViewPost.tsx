import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { setPostData, useDeletePostsMutation } from "reducers/postReducer";
import {
  useDeleteCommentsMutation,
  useDeleteLikesMutation,
  useDeleteNotificationsMutation,
  useDeletePostInFeedMutation,
} from "reducers/newsfeedReducer";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "components/DialogBox";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import CustomError from "components/CustomError";
import postDefault from "assets/post_default.webp";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import RenderHTML from "react-native-render-html";
import { storage } from "global/firebaseConfig";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import { ResizeMode, Video } from "expo-av";
import { FIREBASE_VIDEO_FORMATS } from "utils/constants/FILE_EXTENSIONS";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
const { width, height } = Dimensions.get("window");
const ViewPost = () => {
  const {
    isError,
    data: user,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const dispatch: AppDispatch = useDispatch();

  const { postData } = useSelector((state: RootState) => state.post);
  const [metadata, setMetadata] = useState<string | null>("");

  const [deletePost, { data, status: deleteStat, error: deleteErr }] =
    useDeletePostsMutation();
  const [deletePostFeed, { data: feedData, status }] =
    useDeletePostInFeedMutation();

  const [deleteComments, {}] = useDeleteCommentsMutation();
  const [deleteLikes, {}] = useDeleteLikesMutation();
  const [deleteNotifications, {}] = useDeleteNotificationsMutation();

  const {
    PostAuthor,
    PostDate,
    PostDescription,
    PostID,
    PostImage,
    PostTitle,
  } = postData;

  const { isConnected } = useIsNetworkConnected();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { width } = useWindowDimensions();
  const html = `${PostDescription}`;
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
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: PostImage,
      },
    });
  };
  useEffect(() => {
    if (deleteErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (deleteErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      deleteStat === "rejected" &&
      deleteErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", deleteErr?.data?.error?.sqlMessage);
    }
    if (deleteErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", deleteErr?.data?.message);
    }
    if (deleteStat === "fulfilled") {
      try {
        let imageRef = ref(storage, PostImage);
        const deleteImage = async () => {
          await deleteObject(imageRef);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log("success deleting an image");
          console.log("delete in feed", status);
          console.log("delete in feed", feedData);
        };
        deleteImage();
        DisplayAlert("Success message", "Post deleted successfully!");
        navigation.goBack();
      } catch (err) {
        console.log("there was an error in deleting an image", err);
      }
    }
  }, [deleteStat]);

  const handleDelete = async () => {
    DialogBox({
      dialogTitle: "Delete post?",
      dialogDescription:
        "This action cannot be undone and will delete this post.",
      params: PostID,
      async handlePress(args) {
        deletePost(args);
        deletePostFeed(args);
        deleteComments(args);
        deleteLikes(args);
        deleteNotifications(args);
      },
    });
  };

  if (isError) {
    return <CustomError />;
  }
  if (isFetching || isUninitialized) {
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
        <View style={{ padding: 20 }}>
          <Text style={styles.date}>
            Date Posted: {new Date(PostDate.split(" ")[0]).toDateString()}
          </Text>
          <Text style={styles.title}>{PostTitle}</Text>

          <RenderHTML
            contentWidth={width}
            source={{ html }}
            baseStyle={{ fontSize: 21 }}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Button title="Delete Post" onPress={handleDelete} color="#ff2e00" />
      </View>
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 24,
    fontFamily: "Inter-Medium",
  },
  date: {
    fontSize: 18,
  },
  video: { height: width * 0.9, width: width },
  image: { height: width * 0.9, width: width },
});
