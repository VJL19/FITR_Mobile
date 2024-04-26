import {
  View,
  Text,
  Alert,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IForm>({
    defaultValues: initialFormState,
    resolver: joiResolver(formSchema),
  });

  const hasUnsavedChanges = Boolean();

  const { status, details } = useSelector((state: RootState) => state.register);

  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (data: IForm) => {
    // console.log("data", data);

    dispatch(registerUser(data));
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 25 }}>SignUpScreen</Text>
      <ScrollView style={{ padding: 25, flex: 1, height: "100%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.LastName && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
              placeholder="Enter your Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="LastName"
        />
        {errors.LastName && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.LastName.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.FirstName && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
              placeholder="Enter your First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="FirstName"
        />
        {errors.FirstName && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.FirstName.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your Middle Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.MiddleName && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="MiddleName"
        />
        {errors.MiddleName && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.MiddleName.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="numeric"
              placeholder="Enter your Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Age && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Age"
        />
        {errors.Age && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Age.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="tel"
              placeholder="Enter your Contact number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.ContactNumber && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="ContactNumber"
        />
        {errors.ContactNumber && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.ContactNumber.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="email"
              placeholder="Enter your Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Email && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Email"
        />
        {errors.Email && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Email.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="numeric"
              placeholder="Enter your Height in cm"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Height && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Height"
        />
        {errors.Height && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Height.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="numeric"
              placeholder="Enter your Weight in kg"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Weight && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Weight"
        />
        {errors.Weight && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Weight.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Username && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Username"
        />
        {errors.Username && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Username.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={true}
              placeholder="Enter your Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Password && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="Password"
        />
        {errors.Password && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.Password.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={true}
              placeholder="Enter your ConfirmPassword"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.ConfirmPassword && "red",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          )}
          name="ConfirmPassword"
        />
        {errors.ConfirmPassword && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {errors.ConfirmPassword.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your Gender"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 55,
                borderRadius: 8,
                paddingLeft: 15,
                borderColor: errors.Gender && "red",
                marginBottom: 25,
                fontSize: 16,
              }}
            />
          )}
          name="Gender"
        />
        {errors.Gender && (
          <Text style={{ color: "red", fontSize: 13, marginBottom: 25 }}>
            {errors.Gender.message}
          </Text>
        )}
      </ScrollView>
      <View style={{ padding: 15 }}>
        {isSubmitting && <LoadingIndicator />}

        {!isSubmitting && (
          <Button
            title="Sign Up"
            color={"#ff2e00"}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
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
});

export default SignUpScreen;
