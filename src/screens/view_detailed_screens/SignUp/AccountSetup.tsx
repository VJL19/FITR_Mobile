import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { IAccountSetup, IContactDetails } from "utils/types/form.types";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { accountDetailsSchema } from "utils/validations";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import LoadingIndicator from "components/LoadingIndicator";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { setAccountInfoFields } from "reducers/authReducer";
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
const AccountSetup = () => {
  const { Username, Password, ConfirmPassword, Gender, SubscriptionType } =
    useSelector((state: RootState) => state.authReducer.accountInfo);
  const dispatch: AppDispatch = useDispatch();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
  const navigation = useNavigation<RootStackNavigationProp>();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IAccountSetup>({
    resolver: joiResolver(accountDetailsSchema),
  });

  useEffect(() => {
    setValue("Username", Username);
    setValue("Password", Password);
    setValue("ConfirmPassword", ConfirmPassword);
    setValue("Gender", Gender);
    setValue("SubscriptionType", SubscriptionType);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      dispatch(setAccountInfoFields(value))
    );
    return () => subscription.unsubscribe();
  }, [watch]);
  const gender = [
    { id: "1", label: "Male", value: "1" },
    { id: "2", label: "Female", value: "2" },
  ];

  const subscription_types = [
    { id: "1", label: "Session", value: "1" },
    { id: "2", label: "Monthly", value: "2" },
  ];

  const onSubmit = async (data: IAccountSetup) => {
    console.log("account setup data", data);
    await SecureStore.setItemAsync("user_name", data.Username);
    await SecureStore.setItemAsync("user_pass", data.Password);
    dispatch(setAccountInfoFields(data));
    navigation.navigate("DetailedScreens", {
      screen: "TermsAndCondition",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={styles.labelStyle}>Username</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Username}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Username"
            />
          )}
          name="Username"
        />
        <DisplayFormError errors={errors.Username} />
        <Text style={styles.labelStyle}>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={isPasswordSecure}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Ionicons name={"lock-closed-outline"} size={28} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name={isPasswordSecure ? "eye-off" : "eye"}
                      size={28}
                    />
                  )}
                  onPress={() => {
                    isPasswordSecure
                      ? setIsPasswordSecure(false)
                      : setIsPasswordSecure(true);
                  }}
                />
              }
              style={{
                marginTop: 20,
                backgroundColor: "#f5f5f5",
                height: 55,
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label={"Password"}
              placeholderTextColor={"#ccc"}
              mode="outlined"
              underlineColorAndroid="transparent"
              error={errors.Password && true}
            />
          )}
          name="Password"
        />
        <DisplayFormError errors={errors.Password} />
        <Text style={styles.labelStyle}>Confirm Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={isConfirmPasswordSecure}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Ionicons name={"lock-closed-outline"} size={28} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name={isConfirmPasswordSecure ? "eye-off" : "eye"}
                      size={28}
                    />
                  )}
                  onPress={() => {
                    isConfirmPasswordSecure
                      ? setIsConfirmPasswordSecure(false)
                      : setIsConfirmPasswordSecure(true);
                  }}
                />
              }
              style={{
                marginTop: 20,
                backgroundColor: "#f5f5f5",
                height: 55,
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label={"Confirm Password"}
              placeholderTextColor={"#ccc"}
              mode="outlined"
              underlineColorAndroid="transparent"
              error={errors.Password && true}
            />
          )}
          name="ConfirmPassword"
        />
        <DisplayFormError errors={errors.ConfirmPassword} />
        <Text style={styles.labelStyle}>Gender</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              radioButtons={gender}
              onPress={onChange}
              selectedId={value}
              layout="row"
            />
          )}
          name="Gender"
        />
        <DisplayFormError errors={errors.Gender} />
        <Text style={styles.labelStyle}>Subscription Type</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              radioButtons={subscription_types}
              onPress={onChange}
              selectedId={value}
              layout="row"
            />
          )}
          name="SubscriptionType"
        />
        <DisplayFormError errors={errors.SubscriptionType} />
      </ScrollView>
      <View>
        {isSubmitting && <LoadingIndicator />}

        <Button
          title="Proceed 3 out of 4"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default AccountSetup;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
