import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
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

  const [deletePost, { data }] = useDeletePostsMutation();
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

  const handleDelete = async () => {
    let imageRef = ref(storage, PostImage);

    try {
      await deleteObject(imageRef);
      console.log("success");
    } catch (err) {
      console.log("there was an error in deleting an image");
    }
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
        DisplayAlert("Success message", "Post deleted successfully!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("delete in feed", status);
        console.log("delete in feed", feedData);
        navigation.goBack();
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
        <Text>{PostID}</Text>
        <Text>{PostTitle}</Text>
        <RenderHTML contentWidth={width} source={{ html }} />
        <Text>{PostDate}</Text>
      </ScrollView>
      <Button title="Delete Post" onPress={handleDelete} />
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
    fontSize: 25,
    fontWeight: "bold",
  },
});
