import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import IForm, { IAccountSetup } from "utils/types/form.types";
import { formSchema } from "utils/validations";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { useRegisterUserMutation } from "reducers/registerReducer";
import * as SecureStore from "expo-secure-store";
import {
  clearFormFields,
  setAuthenticated,
  setToken,
} from "reducers/authReducer";

const TermsAndConditions = () => {
  const [IsChecked, setIsChecked] = useState<boolean>();

  const [
    registerUser,
    { isSuccess, isLoading, status, error, data: res, isError },
  ] = useRegisterUserMutation();
  const navigation = useNavigation<RootStackNavigationProp>();

  const { LastName, FirstName, MiddleName, Age } = useSelector(
    (state: RootState) => state.authReducer.personalInfo
  );
  const { ContactNumber, Email, Height, Weight } = useSelector(
    (state: RootState) => state.authReducer.contactInfo
  );

  const { Username, Password, ConfirmPassword, Gender } = useSelector(
    (state: RootState) => state.authReducer.accountInfo
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IForm>({
    resolver: joiResolver(formSchema),
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        navigation.navigate("AuthStackScreens", { screen: "Sign In" });
      }
    };
    loadToken();
  }, [navigation]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    //if the status code of request is 400, then alert something!

    if (status === "rejected" && isSubmitted) {
      Alert.alert("Error message", error?.data?.error?.sqlMessage, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
    }
    if (status === "fulfilled" && isSubmitted) {
      Alert.alert("Success message", "Successfully! register", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
      dispatch(clearFormFields());
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", res?.accessToken!);
      };
      setTokenAsync();
      dispatch(setAuthenticated());
      dispatch(setToken(res?.accessToken));
      navigation.navigate("AuthStackScreens", { screen: "Sign In" });
    }
  }, [status, error]);
  useEffect(() => {
    setValue("LastName", LastName);
    setValue("FirstName", FirstName);
    setValue("MiddleName", MiddleName);
    setValue("Age", Age);
    setValue("ContactNumber", ContactNumber);
    setValue("Email", Email);
    setValue("Height", Height);
    setValue("Weight", Weight);
    setValue("Username", Username);
    setValue("Password", Password);
    setValue("ConfirmPassword", ConfirmPassword);
    setValue("Gender", Gender);
  }, []);

  const onSubmit = async (data: IForm) => {
    const newObj: IForm = {
      ...data,
      Gender: data.Gender === "1" ? "Male" : "Female",
      ProfilePic: "avatar_default.jpeg",
    };
    // dispatch(registerUser(newObj));

    await new Promise((resolve) => setTimeout(resolve, 1500));

    registerUser(newObj);
    // if (!isError) {
    //   navigation.navigate("AuthStackScreens", { screen: "Sign In" });
    //   const removeAllFields = async () => {
    //     await AsyncStorage.multiRemove(["form", "contactForm", "accountForm"]);
    //     removeAllFields();
    //   };
    // }
  };
  console.log("status", status);
  console.log("error", error?.data?.error?.sqlMessage);
  console.log("TOKEN", res?.accessToken);
  console.log("status", status);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note:</Text>
      <View>
        <Text style={styles.description}>
          The management is not liable to any personal or bodily injury, for not
          following safety rules in connection with gym activities.
        </Text>
        <Text style={styles.description}>
          By checking the agree means you are registering account and agreeing
          to terms and conditions stated above.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <Checkbox
          value={IsChecked}
          onValueChange={setIsChecked}
          color={IsChecked ? "#ff2e00" : undefined}
        />
        <Text>Agree</Text>
      </View>

      <View style={{ width: "90%" }}>
        {!isLoading && (
          <Button
            title="Register"
            onPress={handleSubmit(onSubmit)}
            disabled={!IsChecked}
          />
        )}
        {isLoading && (
          <View
            style={{
              padding: 25,
              width: 110,
              borderRadius: 8,
              alignSelf: "center",
              backgroundColor: "#131313",
            }}
          >
            <ActivityIndicator size="large" color="#f5f5f5" />
          </View>
        )}
      </View>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "justify",
  },
});
