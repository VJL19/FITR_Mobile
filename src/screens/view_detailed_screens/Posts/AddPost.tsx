import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { createRef, useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IPost } from "utils/types/post.types";
import { postSchema } from "utils/validations";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import getCurrentDate from "utils/helpers/formatDate";
import { useNavigation } from "@react-navigation/native";
import DisplayAlert from "components/CustomAlert";
import postDefault from "assets/post_default.webp";
import { ScrollView } from "react-native-gesture-handler";
import { useAddPostMutation } from "reducers/postReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomModal from "components/CustomModal";
import { useCameraFns } from "utils/helpers/useCameraFns";
import { uploadImage } from "utils/helpers/uploadImage";
import CustomError from "components/CustomError";
import LoadingIndicator from "components/LoadingIndicator";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import RichTextEdidor from "components/RichTextEdidor";
import RichToolBar from "components/RichToolBar";

const AddPost = () => {
  const { data: user } = useGetAccessTokenQuery();
  const { image, pickImage, pickCameraImage, removePhoto } = useCameraFns({
    allowsEditing: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postUser, { data: postResult, status, isError, error }] =
    useAddPostMutation();

  const _editor = createRef();
  const defaultValue = {
    PostTitle: "",
    PostDescription: "",
  };

  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isLoading, errors, isSubmitted },
  } = useForm<IPost>({
    defaultValues: defaultValue,
    resolver: joiResolver(postSchema),
  });

  const onSubmit = async (data: IPost) => {
    const { UserID, FirstName, LastName, Username } = user?.user!;

    const url = await uploadImage(
      image,
      "Posts/",
      "image",
      loading,
      setLoading
    );
    console.log("your post image url is", url);
    const fullName = FirstName + " " + LastName;
    setValue("UserID", UserID);
    setValue("PostImage", "default_poster.png");
    setValue("PostTitle", data.PostTitle);
    setValue("PostDescription", data.PostDescription);
    setValue("PostDate", getCurrentDate());
    setValue("PostAuthor", fullName);
    setValue("Username", Username);

    const postData = {
      UserID: UserID,
      PostImage: url === IMAGE_VALUES.DEFAULT ? IMAGE_VALUES.DEFAULT : url,
      PostTitle: data.PostTitle,
      PostDate: getCurrentDate(),
      PostDescription: data.PostDescription,
      PostAuthor: fullName,
      Username: Username,
    };

    postUser(postData);
    // console.log("add posts", data);
    // dispatch(getPostAction(user.UserID));

    // console.log("post message", result?.[0].NewsfeedID!);

    DisplayAlert("Success message", "Post added successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigation.goBack();
    reset();
    removePhoto();
    console.log("hey", image);
  };

  console.log("post res", postResult?.message);
  console.log("post status", postResult?.status);
  console.log("post err", error);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            resizeMode="cover"
            source={
              image === IMAGE_VALUES.DEFAULT ? postDefault : { uri: image }
            }
            style={{ height: 250, width: "100%" }}
          />
          <View style={{ position: "absolute", top: "45%", left: "45%" }}>
            <CustomModal
              modalTitle="Upload a photo"
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
                  _editor={_editor}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </React.Fragment>
            )}
            name="PostDescription"
          />
        </View>

        <DisplayFormError errors={errors.PostDescription} />
      </ScrollView>
      <View style={{ width: "90%", alignSelf: "center", marginBottom: 10 }}>
        <RichToolBar _editor={_editor} />
        <Button
          title="Confirm"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit, (error: FieldErrors<IPost>) =>
            console.log(error)
          )}
        />
      </View>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
