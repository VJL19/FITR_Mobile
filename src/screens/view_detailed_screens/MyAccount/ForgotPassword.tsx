import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { IEmail, IOTP } from "utils/types/form.types";
import { emailSchema, otpSchema } from "utils/validations";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import {
  setForgotPasswordFields,
  setOTPToken,
  useForgotPasswordMutation,
} from "reducers/authReducer";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<IEmail>({
    resolver: joiResolver(emailSchema),
  });

  const { OTPToken } = useSelector((state: RootState) => state.authReducer);
  const navigation = useNavigation<RootStackNavigationProp>();

  const [forgotPassword, { data, status, error }] = useForgotPasswordMutation();

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: IEmail) => {
    forgotPassword({ Email: data.Email });
  };
  console.log("forgot password data", data);
  console.log("forgot password status", status);
  console.log("forgot password error", error);

  useEffect(() => {
    if (status === "rejected" && isSubmitted) {
      DisplayAlert("Error message", error?.data?.message);
    }
    if (status === "fulfilled" && isSubmitted) {
      DisplayAlert("Success message", data?.message);
      console.log("email input", getValues("Email"));
      dispatch(setOTPToken(data?.code));
      dispatch(
        setForgotPasswordFields({
          Username: data?.result?.[0].Username,
          Email: getValues("Email"),
        })
      );
      navigation.navigate("DetailedScreens", {
        screen: "Forgot Password Confirmation",
      });
      // reset();
    }
  }, [status]);

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.labelStyle}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Email}
              onBlur={onBlur}
              onChange={onChange}
              value={value?.toString()}
              placeholder="Enter your associated Email"
            />
          )}
          name="Email"
        />
        <DisplayFormError errors={errors.Email} />
      </View>

      <View style={{ width: "90%" }}>
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          color={"#ff2e00"}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
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
