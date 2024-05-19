import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import {
  IAccountSetup,
  IContactDetails,
} from "../../../utils/types/form.types";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";
import { accountDetailsSchema } from "../../../utils/validations";
import CustomTextInput from "../../../components/CustomTextInput";
import DisplayFormError from "../../../components/DisplayFormError";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { RadioGroup } from "react-native-radio-buttons-group";
import avatar from "../../../assets/avatar_default.jpeg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountSetup = () => {
  const route =
    useRoute<RouteProp<DetailedRootStackNavigatorsParamList, "AccountSetup">>();
  const [initialField, setInitialField] = useState<string | undefined>();

  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    LastName,
    FirstName,
    MiddleName,
    Age,
    ContactNumber,
    Email,
    Height,
    Weight,
  } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IAccountSetup>({
    resolver: joiResolver(accountDetailsSchema),
  });

  useEffect(() => {
    const loadFieldState = async () => {
      const value = await AsyncStorage.getItem("accountForm");
      if (value != null) {
        const parseValue = JSON.parse(value);
        setInitialField(parseValue);
      }
    };
    loadFieldState();
  }, []);
  const gender = [
    { id: "1", label: "Male", value: "1" },
    { id: "2", label: "Female", value: "2" },
  ];

  useEffect(() => {
    setValue("LastName", LastName);
    setValue("FirstName", FirstName);
    setValue("MiddleName", MiddleName);
    setValue("Age", Age);
    setValue("ContactNumber", ContactNumber);
    setValue("Email", Email);
    setValue("Height", Height);
    setValue("Weight", Weight);
    if (initialField !== undefined) {
      setValue("Username", initialField?.Username);
      setValue("Password", initialField?.Password);
      setValue("ConfirmPassword", initialField?.ConfirmPassword);
      setValue("Gender", initialField?.Gender);
    }
    console.log("in account setup", initialField);
  }, [initialField]);

  const onSubmit = async (data: IAccountSetup) => {
    try {
      await AsyncStorage.setItem("accountForm", JSON.stringify(data));
    } catch (e) {
      console.log("error in setting async item", e);
    }
    navigation.navigate("DetailedScreens", {
      screen: "TermsAndCondition",
      params: {
        LastName: getValues("LastName"),
        FirstName: getValues("FirstName"),
        MiddleName: getValues("MiddleName"),
        Age: getValues("Age"),
        ContactNumber: getValues("ContactNumber"),
        Email: getValues("Email"),
        Height: getValues("Height"),
        Weight: getValues("Weight"),
        Username: getValues("Username"),
        Password: getValues("Password"),
        ConfirmPassword: getValues("ConfirmPassword"),
        Gender: getValues("Gender"),
      },
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
