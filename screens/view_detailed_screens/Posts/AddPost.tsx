import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IPost } from "../../../utils/types/post.types";
import { postSchema } from "../../../utils/validations";
import CustomTextInput from "../../../components/CustomTextInput";
import DisplayFormError from "../../../components/DisplayFormError";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import getAccessToken from "../../../actions/homeAction";
import getCurrentDate from "../../../utils/helpers/formatDate";
import { getPostAction, postUserAction } from "../../../actions/postAction";
import { useNavigation } from "@react-navigation/native";
import DisplayAlert from "../../../components/CustomAlert";
import postDefault from "../../../assets/post_default.webp";
import { ScrollView } from "react-native-gesture-handler";
import {
  createPostInFeedAction,
  getAllPostsAction,
} from "../../../actions/newsfeedAction";

const defaultValue = {
  PostTitle: "",
  PostDescription: "",
};
const AddPost = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { message, status, postItems } = useSelector(
    (state: RootState) => state.post
  );

  const { result } = useSelector((state: RootState) => state.newsfeed);

  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(getAllPostsAction());
  }, []);

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
    const { UserID, FirstName, LastName } = user;

    console.log(data);
    const fullName = FirstName + " " + LastName;
    setValue("UserID", UserID);
    setValue("PostImage", "mydefault_poster.png");
    setValue("PostTitle", data.PostTitle);
    setValue("PostDescription", data.PostDescription);
    setValue("PostDate", getCurrentDate());
    setValue("PostAuthor", fullName);

    const postData = {
      UserID: UserID,
      PostImage: "mydefault_poster.png",
      PostTitle: data.PostTitle,
      PostDate: getCurrentDate(),
      PostDescription: data.PostDescription,
      PostAuthor: fullName,
    };

    const newsfeedData = {
      ...postData,
      PostID: postItems.length === 0 ? 1 : result?.[0].NewsfeedID! + 1,
    };
    dispatch(postUserAction(postData));
    dispatch(getPostAction(user.UserID));
    dispatch(createPostInFeedAction(newsfeedData));
    console.log("post message", result?.[0].NewsfeedID!);
    DisplayAlert("Success message", message);
    reset();
    if (status === 200 && !isLoading) {
      // navigation.goBack();
    }
  };
  return (
    <ScrollView>
      <Image source={postDefault} style={{ height: 200, width: 345 }} />

      <View style={{ marginTop: 25 }}>
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

              <TextInput
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter the description"
                placeholderTextColor={"#202020"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderWidth: 1,
                  height: 300,
                  borderRadius: 8,
                  padding: 15,
                  color: "#202020",
                  borderColor: errors.PostDescription ? "#d9534f" : "#202020",
                  marginBottom: 10,
                  fontSize: 16,
                }}
              />
            </React.Fragment>
          )}
          name="PostDescription"
        />
      </View>

      <DisplayFormError errors={errors.PostDescription} />

      <Button
        title="Add Post"
        color={"#ff2e00"}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
