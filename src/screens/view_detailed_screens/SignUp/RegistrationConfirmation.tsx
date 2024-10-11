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
  setAuthenticated,
  setOTPToken,
  setToken,
  useActivateUserAccountMutation,
  useLoginUserMutation,
  useSendEmailMutation,
} from "reducers/authReducer";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { IOTP } from "utils/types/form.types";
import { otpSchema } from "utils/validations";
import DisplayAlert from "components/CustomAlert";
import * as SecureStore from "expo-secure-store";
import { OtpInput } from "react-native-otp-entry";
import LoadingIndicator from "components/LoadingIndicator";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";

const RegistrationConfirmation = () => {
  const [timer, setTimer] = useState(60 * 2);
  const [valid, isValid] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, error: emailErr },
  ] = useSendEmailMutation();

  const [activateAccount, { status: activateStatus, error: activateErr }] =
    useActivateUserAccountMutation();

  const [
    loginUser,
    { res: loginRes, data: loginData, status, error: loginErr },
  ] = useLoginUserMutation();

  const { OTPToken } = useSelector((state: RootState) => state.authReducer);
  const { Email } = useSelector(
    (state: RootState) => state.authReducer.contactInfo
  );

  const accessToken = useSelector(
    (state: RootState) => state.authReducer.accessToken
  );

  const { isConnected } = useIsNetworkConnected();

  const email2 = useSelector((state: RootState) => state.authReducer.email);
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
    const getStoredCredentials = async () => {
      let _username = await SecureStore.getItemAsync("user_name");
      let _userpass = await SecureStore.getItemAsync("user_pass");
      if (_username) {
        setUsername(_username);
      }
      if (_userpass) {
        setPassword(_userpass);
      }
    };
    getStoredCredentials();
  }, []);

  useEffect(() => {
    if (emailErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (emailErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      emailStat === "rejected" &&
      emailErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", emailErr?.data?.details);
    }
    if (emailStat === "fulfilled") {
      dispatch(setOTPToken(emailCode?.code));
      setTimer(60 * 2);
      isValid(true);
    }
  }, [emailStat]);

  useEffect(() => {
    if (activateErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (activateErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      activateStatus === "rejected" &&
      activateErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", activateErr?.data?.details);
    }
    if (activateStatus === "fulfilled") {
      loginUser({ Username: username, Password: password });
    }
  }, [activateStatus]);

  useEffect(() => {
    if (loginErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (loginErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      status === "rejected" &&
      loginErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", loginErr?.data?.details);
    }
    if (status === "fulfilled") {
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", loginData?.accessToken!);
      };

      const deplayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await SecureStore.deleteItemAsync("user_name");
        await SecureStore.deleteItemAsync("user_pass");
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "DashboardScreen" }],
        });
        navigation.dispatch(resetAction);
      };
      dispatch(setToken(loginData?.accessToken));
      dispatch(setAuthenticated());
      setTokenAsync();
      deplayRedirect();
    }
  }, [status, loginData?.details]);
  console.log("login stat", status);
  console.log("hey", OTPToken);
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
  const handlePress = (data: IOTP) => {
    if (!valid) {
      DisplayAlert(
        "Error message",
        "Your OTP is expired, please generate again!"
      );
      return;
    }
    if (OTPToken === data.OTPCode) {
      DisplayAlert(
        "Success message",
        "Successfully complete the registration!"
      );
      activateAccount({ Email: Email || email2 });

      dispatch(clearFormFields());

      reset();
    } else {
      DisplayAlert("Error message", "Entered code does not match!");
    }
  };

  const handleResend = () => {
    sendOTPEmail({ Email: Email || email2 });
  };

  console.log("user current emails", Email);

  if (emailStat === "pending") {
    return <LoadingIndicator />;
  }
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
            <OtpInput
              numberOfDigits={6}
              focusColor={"#ff2e00"}
              onTextChange={onChange}
              onFilled={(text) => {
                const data = {
                  OTPCode: +text,
                };
                console.log(data.OTPCode);
                handlePress(data);
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              onBlur={onBlur}
              value={value?.toString()}
            />
          )}
          name="OTPCode"
        />
        <DisplayFormError errors={errors.OTPCode} />
        {!valid && (
          <Button title="Resend" color={"#ff2e00"} onPress={handleResend} />
        )}
      </View>
    </View>
  );
};

export default RegistrationConfirmation;

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
