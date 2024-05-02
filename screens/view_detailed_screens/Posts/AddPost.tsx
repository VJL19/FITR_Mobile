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

const defaultValue = {
  PostTitle: "",
};
const AddPost = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { message, status } = useSelector((state: RootState) => state.post);

  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessToken());
  }, []);

  const { UserID, FirstName, LastName } = user;
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
  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data: IPost) => {
    const { UserID, FirstName, LastName } = user;

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
    dispatch(postUserAction(postData));
    DisplayAlert("Successs, message", message);
    reset();
    if (status === 200 && !isLoading) {
      navigation.goBack();
    }
  };
  return (
    <ScrollView>
      <Text>AddPost</Text>
      <Image source={postDefault} style={{ height: 200, width: 345 }} />

      <View style={{ marginTop: 25 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#f5f5f5",
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
                  color: "#f5f5f5",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Title
              </Text>

              <TextInput
                placeholder="Enter the description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderWidth: 1,
                  height: 55,
                  borderRadius: 8,
                  paddingLeft: 15,
                  color: "#f5f5f5",
                  borderColor: error ? "#d9534f" : "#f5f5f5",
                  marginBottom: 10,
                  fontSize: 16,
                }}
                placeholderTextColor={"#f5f5f5"}
              />
            </React.Fragment>
          )}
          name=""
        />
      </View>

      <DisplayFormError errors={errors.} />

      <Button
        title="Add Post"
        color={"#ff2e00"}
        onPress={handleSubmit(onSubmit, onInvalid)}
      />
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
