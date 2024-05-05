import {
  View,
  Text,
  Alert,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import IForm from "../../utils/types/form.types";
import registerUser from "../../actions/registerAction";
import { formSchema } from "../../utils/validations";
import { joiResolver } from "@hookform/resolvers/joi";
import LoadingIndicator from "../../components/LoadingIndicator";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import * as ImagePicker from "expo-image-picker";
import DropdownComponent from "../../components/DropdownComponent";
import CustomTextInput from "../../components/CustomTextInput";
import DisplayFormError from "../../components/DisplayFormError";

const initialFormState: IForm = {
  LastName: "",
  FirstName: "",
  MiddleName: "",
  Age: "",
  ContactNumber: "",
  Email: "",
  Height: "",
  Weight: "",
  Username: "",
  Password: "",
  ConfirmPassword: "",
  ProfilePic: "profile_pic.jpeg",
  Gender: "",
};
const SignUpScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IForm>({
    defaultValues: initialFormState,
    resolver: joiResolver(formSchema),
  });

  const gender = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];

  const hasUnsavedChanges = Boolean();

  const { status, details } = useSelector((state: RootState) => state.register);

  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (data: IForm) => {
    const newObj: IForm = {
      ...data,
      Gender: data.Gender === "1" ? "Male" : "Female",
    };

    console.log("data", newObj);

    // dispatch(registerUser(data));
    // navigation.navigate("DashboardScreen");
    // reset();
    // await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  console.log("status", status);
  console.log("details", details?.error);

  useEffect(() => {
    //if the status code of request is 400, then alert something!

    if (status === 400 && isSubmitted) {
      Alert.alert("Alert Title", details?.message, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
    }
  }, [status, details]);
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // if (!hasUnsavedChanges) {
        //   // If we don't have unsaved changes, then we don't need to do anything
        //   return;
        // }
        // // Prevent default behavior of leaving the screen
        // e.preventDefault();
        // // Prompt the user before leaving the screen
        // Alert.alert(
        //   "Discard changes?",
        //   "You have unsaved changes. Are you sure to discard them and leave the screen?",
        //   [
        //     { text: "Don't leave", style: "cancel", onPress: () => {} },
        //     {
        //       text: "Discard",
        //       style: "destructive",
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
      }),
    [navigation, hasUnsavedChanges]
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  console.log("hey", image === undefined);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/avatar_default.jpeg")}
            style={styles.image}
          />
        )}
      </View>
      <ScrollView style={{ padding: 25, flex: 1, height: "100%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.LastName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Last name"
            />
          )}
          name="LastName"
        />
        <DisplayFormError errors={errors.LastName} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.FirstName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your First name"
            />
          )}
          name="FirstName"
        />
        <DisplayFormError errors={errors.FirstName} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.MiddleName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Middle name"
            />
          )}
          name="MiddleName"
        />
        <DisplayFormError errors={errors.MiddleName} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Age}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Age"
            />
          )}
          name="Age"
        />
        <DisplayFormError errors={errors.Age} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="tel"
              error={errors.ContactNumber}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Contact number"
            />
          )}
          name="ContactNumber"
        />
        <DisplayFormError errors={errors.ContactNumber} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="email"
              error={errors.Email}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Email"
            />
          )}
          name="Email"
        />
        <DisplayFormError errors={errors.Email} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Height}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Height in cm"
            />
          )}
          name="Height"
        />
        <DisplayFormError errors={errors.Height} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Weight}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Weight in kg"
            />
          )}
          name="Weight"
        />
        <DisplayFormError errors={errors.Weight} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Username}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your username"
            />
          )}
          name="Username"
        />
        <DisplayFormError errors={errors.Username} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              secureTextEntry={true}
              error={errors.Password}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Password"
            />
          )}
          name="Password"
        />
        <DisplayFormError errors={errors.Password} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              secureTextEntry={true}
              error={errors.ConfirmPassword}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Confirm Password"
            />
          )}
          name="ConfirmPassword"
        />
        <DisplayFormError errors={errors.ConfirmPassword} />

        <View style={{ marginBottom: 25, padding: 5 }}>
          <Text>Gender</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DropdownComponent
                data={gender}
                value={value}
                handleChange={onChange}
              />
            )}
            name="Gender"
          />
          <DisplayFormError errors={errors.Gender} />
        </View>
      </ScrollView>
      <View style={{ padding: 15 }}>
        {isSubmitting && <LoadingIndicator />}

        {!isSubmitting && (
          <Button
            title="Sign Up"
            color={"#ff2e00"}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInputStyle: {
    borderWidth: 1,
    paddingLeft: 15,
  },
  btnPrimary: {
    borderRadius: 5,
    height: 45,
    backgroundColor: "#FF2E00",
  },
  btnPrimaryText: {
    textAlign: "center",
    color: "#f5f5f5",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "#ff2e00",
  },
});

export default SignUpScreen;
