import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { IPost } from "utils/types/post.types";
import { joiResolver } from "@hookform/resolvers/joi";
import { postSchema } from "utils/validations";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import DisplayAlert from "components/CustomAlert";
import getCurrentDate from "utils/helpers/formatDate";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setMetadata, useEditPostMutation } from "reducers/postReducer";
import { useCameraFns } from "utils/helpers/useCameraFns";
import { uploadImage } from "utils/helpers/uploadImage";
import CustomError from "components/CustomError";
import CustomModal from "components/CustomModal";
import postDefault from "assets/post_default.webp";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import RichTextEdidor from "components/RichTextEdidor";
import RichToolBar from "components/RichToolBar";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import { storage } from "global/firebaseConfig";
import { Video, ResizeMode } from "expo-av";
import { FIREBASE_VIDEO_FORMATS } from "utils/constants/FILE_EXTENSIONS";
import { useKeyboardVisible } from "hooks/useKeyboardVisible";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const EditPost = () => {
  const { PostTitle, PostImage, PostDescription, PostID } = useSelector(
    (state: RootState) => state.post.postData
  );

  const { isKeyboardVisible } = useKeyboardVisible();
  const metadata = useSelector((state: RootState) => state.post.metadata);
  const { image, pickImage, pickCameraImage, removePhoto, setImage } =
    useCameraFns({ allowsEditing: true });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const _editor = createRef();
  const { isError, data: user } = useGetAccessTokenQuery();
  const defaultValue = {
    PostTitle: "",
    PostDescription: "",
  };
  const [editPost, { data: editResult, error: postErr, status }] =
    useEditPostMutation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isLoading, errors, isSubmitted, isSubmitting },
  } = useForm<IPost>({
    defaultValues: defaultValue,
    resolver: joiResolver(postSchema),
  });

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // setValue("PostImage", PostImage);
    setImage(PostImage);
    setValue("PostTitle", PostTitle);
    setValue("PostDescription", PostDescription);
  }, []);

  const mediaRef = ref(storage, PostImage);

  const { isConnected } = useIsNetworkConnected();

  useEffect(() => {
    if (postErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (postErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      status === "rejected" &&
      postErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", postErr?.data?.error?.sqlMessage);
    }
    if (status === "fulfilled") {
      try {
        let imageRef = ref(storage, PostImage);

        const deleteImage = async () => {
          await deleteObject(imageRef);
          console.log("success deleting an image");
        };
        deleteImage();
        DisplayAlert("Success message", "Post edited successfully!");
        navigation.navigate("DashboardScreen");
        reset();
      } catch (err) {
        console.log("there was an error in deleting an image", err);
      }
    }
    if (postErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", postErr?.data?.message);
    }
  }, [status]);

  useEffect(() => {
    if (PostImage === IMAGE_VALUES.DEFAULT) {
      return;
    }
    getMetadata(mediaRef)
      .then((metaData) => {
        dispatch(setMetadata(metaData?.contentType));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  const onSubmit = async (data: IPost) => {
    const { UserID, FirstName, LastName, Username } = user?.user!;

    const url = await uploadImage(
      image,
      "Posts/",
      "image",
      loading,
      setLoading
    );
    console.log(data);
    const fullName = FirstName + " " + LastName;
    setValue("PostID", PostID);
    setValue("PostImage", "default_poster.png");
    setValue("PostTitle", data.PostTitle);
    setValue("PostDescription", data.PostDescription);
    setValue("PostDate", getCurrentDate());
    setValue("PostAuthor", fullName);
    setValue("Username", Username);

    const postData = {
      UserID: UserID,
      PostID: PostID,
      PostImage: url === undefined ? "default_poster.png" : url,
      PostTitle: data.PostTitle,
      PostDate: getCurrentDate(),
      PostDescription: data.PostDescription,
      PostAuthor: fullName,
      Username: Username,
    };

    editPost(postData);
    // console.log("add posts", data);
    // dispatch(getPostAction(user.UserID));

    console.log("edit pressed", editResult?.message);
    // console.log("post message", result?.[0].NewsfeedID!);
  };
  if (isError) {
    return <CustomError />;
  }

  console.log("edit status", status);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {FIREBASE_VIDEO_FORMATS.includes(metadata) ? (
            <Video
              source={{ uri: PostImage }}
              style={{ height: 290, width: "100%" }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          ) : (
            <Image
              source={
                image === IMAGE_VALUES.DEFAULT ? postDefault : { uri: image }
              }
              style={{ height: 250, width: "100%" }}
            />
          )}
          <View style={{ position: "absolute", top: "45%", left: "45%" }}>
            <CustomModal
              modalTitle="Upload a photo or video"
              handleCamera={pickCameraImage}
              handleGallery={pickImage}
              handleRemove={removePhoto}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>

        <View style={{ marginTop: 25, padding: 15 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <React.Fragment>
                <Text
                  style={{
                    color: "#202020",
                    fontSize: 18,
                    fontFamily: "Inter-Bold",
                    letterSpacing: 1,
                  }}
                >
                  Title
                </Text>
                <CustomTextInput
                  error={errors.PostTitle}
                  placeholder="Enter your title of the post"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </React.Fragment>
            )}
            name="PostTitle"
          />
          <DisplayFormError errors={errors.PostTitle} />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <React.Fragment>
                <Text
                  style={{
                    color: "#202020",
                    fontSize: 18,
                    fontFamily: "Inter-Bold",
                    letterSpacing: 1,
                  }}
                >
                  Description
                </Text>

                <RichTextEdidor
                  initialContentHTML={PostDescription}
                  _editor={_editor}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </React.Fragment>
            )}
            name="PostDescription"
          />
          <DisplayFormError errors={errors.PostDescription} />
        </View>
      </ScrollView>
      <View style={{ width: "95%", alignSelf: "center", marginBottom: 15 }}>
        <RichToolBar _editor={_editor} />

        {!isKeyboardVisible && (
          <Button
            disabled={isKeyboardVisible || isSubmitting}
            title="Proceed"
            color={"#ff2e00"}
            onPress={handleSubmit(onSubmit, (error: FieldErrors<IPost>) =>
              console.log(error)
            )}
          />
        )}
      </View>
    </View>
  );
};

export default EditPost;

const styles = StyleSheet.create({});
