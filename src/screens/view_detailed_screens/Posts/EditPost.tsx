import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
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
import { useEditPostMutation } from "reducers/postReducer";

const EditPost = () => {
  const { PostTitle, PostImage, PostDescription, PostID } = useSelector(
    (state: RootState) => state.post.postData
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  const { isError, data: user } = useGetAccessTokenQuery();
  const defaultValue = {
    PostTitle: "",
    PostDescription: "",
  };
  const [editPost, { data: editResult }] = useEditPostMutation();

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

  useEffect(() => {
    // setValue("PostImage", PostImage);
    setValue("PostTitle", PostTitle);
    setValue("PostDescription", PostDescription);
  }, []);
  const onSubmit = async (data: IPost) => {
    const { UserID, FirstName, LastName, Username } = user?.user!;

    console.log(data);
    const fullName = FirstName + " " + LastName;
    setValue("PostID", PostID);
    setValue("PostImage", "mydefault_poster.png");
    setValue("PostTitle", data.PostTitle);
    setValue("PostDescription", data.PostDescription);
    setValue("PostDate", getCurrentDate());
    setValue("PostAuthor", fullName);
    setValue("Username", Username);

    const postData = {
      UserID: UserID,
      PostID: PostID,
      PostImage: "mydefault_poster.png",
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

    DisplayAlert("Success message", "Post edited successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigation.navigate("DashboardScreen");
    reset();
  };
  if (isError) {
    return (
      <View>
        <Text>You are not authenticated!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={PostImage} style={{ height: 200, width: 345 }} />

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
                placeholderTextColor={"#c2c2c2"}
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
        title="Proceed"
        color={"#ff2e00"}
        onPress={handleSubmit(onSubmit, (error: FieldErrors<IPost>) =>
          console.log(error)
        )}
      />
    </ScrollView>
  );
};

export default EditPost;

const styles = StyleSheet.create({});
