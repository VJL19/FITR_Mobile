import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFormFields,
  setOTPToken,
  useForgotPasswordMutation,
  useSendEmailMutation,
} from "reducers/authReducer";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { IOTP } from "utils/types/form.types";
import { otpSchema } from "utils/validations";
import DisplayAlert from "components/CustomAlert";
const ForgotPasswordConfirmation = () => {
  const [timer, setTimer] = useState(60 * 2);
  const [valid, isValid] = useState(true);

  const [forgotPassword, { data, status, error }] = useForgotPasswordMutation();

  const { OTPToken } = useSelector((state: RootState) => state.authReducer);
  const { Email } = useSelector(
    (state: RootState) => state.authReducer.forgotPasswordInfo
  );
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    reset,
  } = useForm<IOTP>({
    resolver: joiResolver(otpSchema),
  });

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setOTPToken(data?.code));
    }
  }, [status]);

  useEffect(() => {
    if (timer === 0 || timer < 0) {
      setTimer(0);
      isValid(false);
      return;
    }
    const runTimer = setTimeout(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => clearInterval(runTimer);
  }, [timer]);
  console.log("heys", OTPToken);
  const handlePress = (data: IOTP) => {
    if (!valid) {
      DisplayAlert(
        "Error message",
        "Your OTP is expired, please generate again!"
      );
      return;
    }
    if (OTPToken === data.OTPCode) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "Change Password" }],
      });
      navigation.dispatch(resetAction);
      // navigation.replace("DetailedScreens", { screen: "Change Password" });
      // navigation.navigate("DetailedScreens", { screen: "Change Password" });
      DisplayAlert(
        "Success message",
        "OTP is valid. You may now proceed on changing your password!"
      );
      dispatch(clearFormFields());
      reset();
    } else {
      DisplayAlert("Error message", "Entered code does not match!");
    }
  };

  const handleResend = () => {
    forgotPassword({ Email: Email });
    setTimer(60 * 2);
    isValid(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {minutes}:{seconds}
      </Text>
      <Text style={styles.description}>
        Enter the valid generated code send to your email, The generated code is
        valid until 2 minutes. If your code doesn't apppear in mail box check
        the spam.
      </Text>
      <Text style={styles.title}>Please Note:</Text>
      <Text style={styles.description}>
        Never share your OTP code to anyone
      </Text>
      <View style={{ width: "90%" }}>
        <Text style={styles.labelStyle}>OTP Code</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              maxLength={6}
              inputMode="tel"
              error={errors.OTPCode}
              onBlur={onBlur}
              onChange={onChange}
              value={value?.toString()}
              placeholder="Enter the OTP Code"
            />
          )}
          name="OTPCode"
        />
        <DisplayFormError errors={errors.OTPCode} />
        {!valid && (
          <Button title="Resend" color={"#ff2e00"} onPress={handleResend} />
        )}
        <Button
          title="Proceed"
          color={"#ff2e00"}
          onPress={handleSubmit(handlePress)}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
