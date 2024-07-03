import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
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
  setOTPToken,
  setToken,
  useSendEmailMutation,
} from "reducers/authReducer";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import DialogBox from "components/DialogBox";
import LoadingIndicator from "components/LoadingIndicator";

const TermsAndConditions = () => {
  const [IsChecked, setIsChecked] = useState<boolean>();

  const [
    registerUser,
    { isSuccess, isLoading, status, error, data: res, isError },
  ] = useRegisterUserMutation();
  const navigation = useNavigation<RootStackNavigationProp>();

  const { LastName, FirstName, MiddleName, Age, Birthday } = useSelector(
    (state: RootState) => state.authReducer.personalInfo
  );
  const { ContactNumber, Email, Height, Weight, Address } = useSelector(
    (state: RootState) => state.authReducer.contactInfo
  );

  const { Username, Password, ConfirmPassword, Gender, SubscriptionType } =
    useSelector((state: RootState) => state.authReducer.accountInfo);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IForm>({
    resolver: joiResolver(formSchema),
  });

  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, error: emailErr },
  ] = useSendEmailMutation();

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
      // dispatch(clearFormFields());
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", res?.accessToken!);
      };
      setTokenAsync();
      sendOTPEmail({ Email: Email });
      dispatch(setAuthenticated());
      dispatch(setToken(res?.accessToken));

      // navigation.navigate("DetailedScreens", {screen: "Registration Confirmation"});
    }
  }, [status, error]);

  useEffect(() => {
    if (emailStat === "fulfilled") {
      dispatch(setOTPToken(emailCode?.code));
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "Registration Confirmation" }],
      });
      navigation.dispatch(resetAction);
    }
  }, [emailStat]);
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
    setValue("Address", Address);
    setValue("Birthday", Birthday);
    setValue("SubscriptionType", SubscriptionType);
  }, []);

  const onSubmit = async (data: IForm) => {
    DialogBox({
      dialogTitle: "Proceed to registration?",
      dialogDescription:
        "By clicking OK you are hereby agreeing to the terms and conditions state in the application.",
      async handlePress(args) {
        const newObj: IForm = {
          ...data,
          Gender: data.Gender === "1" ? "Male" : "Female",
          SubscriptionType:
            data.SubscriptionType === "1" ? "Session" : "Monthly",
          ProfilePic: IMAGE_VALUES.DEFAULT,
        };
        registerUser(newObj);

        // registerUser(newObj);
        // if (!isError) {
        //   navigation.navigate("AuthStackScreens", { screen: "Sign In" });
        //   const removeAllFields = async () => {
        //     await AsyncStorage.multiRemove(["form", "contactForm", "accountForm"]);
        //     removeAllFields();
        //   };
        // }
      },
    });
  };

  if (emailStat === "pending") {
    return <LoadingIndicator />;
  }
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
        <Button
          title="Register"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit)}
          disabled={!IsChecked}
        />
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
