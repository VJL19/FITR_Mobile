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

const AccountSetup = () => {
  const { Username, Password, ConfirmPassword, Gender, SubscriptionType } =
    useSelector((state: RootState) => state.authReducer.accountInfo);
  const dispatch: AppDispatch = useDispatch();

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
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1, height: "100%" }}>
        <View style={{ flex: 1, flexDirection: "row", gap: 15 }}>
          {/* {renderNavs} */}
        </View>
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
        <Text style={styles.labelStyle}>Confirm Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              secureTextEntry={true}
              error={errors.ConfirmPassword}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your ConfirmPassword"
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
              containerStyle={{ flex: 1, flexDirection: "row" }}
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
              containerStyle={{ flex: 1, flexDirection: "row" }}
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
