import {
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import { useForm } from "react-hook-form";
import { ILoginForm } from "utils/types/user.types";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import DisplayAlert from "components/CustomAlert";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import logo from "assets/fitr_logo4.png";
import {
  setOTPToken,
  setToken,
  setUserEmail,
  useGetAccessTokenQuery,
  useLoginUserMutation,
  useSendEmailMutation,
} from "reducers/authReducer";
import { getToken1 } from "actions/authAction";
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
import LoadingIndicator from "components/LoadingIndicator";

const SignInScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const defaultValue = {
    Username: "",
    Password: "",
  };
  // const { accessToken } = useSelector((state: RootState) => state.authReducer);

  const [
    loginUser,
    { isLoading: rtkLoading, status, data: res, error, isSuccess },
  ] = useLoginUserMutation();

  const dispatch: AppDispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitted },
    control,
  } = useForm<ILoginForm>({
    defaultValues: defaultValue,
    resolver: joiResolver(loginSchema),
  });

  // console.log("status", status);
  // console.log("message", message);
  const onSubmit = async (data: ILoginForm) => {
    // console.log("in sign in screen", data);
    await SecureStore.setItemAsync("user_name", data.Username);
    await SecureStore.setItemAsync("user_pass", data.Password);
    await loginUser(data);
  };

  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, error: emailErr },
  ] = useSendEmailMutation();

  const handleForgotPassword = () => {
    navigation.navigate("DetailedScreens", { screen: "Forgot Password" });
  };

  // useEffect(() => {
  // if (!auth) {
  //   navigation.navigate("AuthStackScreens", { screen: "Sign In" });
  // }
  // }, []);
  // useEffect(() => {
  //   navigation.addListener("focus", async () => {
  //     if (status === 400 || status === 200) {
  //       if (isAuthenticated) {
  //         navigation.replace("DashboardScreen");
  //       }
  //     }
  //     console.log("run", isAuthenticated);
  //   });
  // }, []);

  useEffect(() => {
    if (error?.data?.status === 401) {
      sendOTPEmail({ Email: error?.data?.email });
    }
    if (status === "rejected" && isSubmitted) {
      DisplayAlert("Error, message", error?.data?.details);
    }
    if (status === "fulfilled" && isSubmitted) {
      DisplayAlert("Success, message", res?.details);
      console.log("rtk res", res?.accessToken);
      dispatch(setToken(res?.accessToken));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", res?.accessToken!);
      };
      setTokenAsync();
      reset();
    }
  }, [status, res?.details]);

  useEffect(() => {
    if (emailStat === "fulfilled") {
      dispatch(setOTPToken(emailCode?.code));
      dispatch(setUserEmail(error?.data?.email));
      const deplayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.navigate("DetailedScreens", {
          screen: "Registration Confirmation",
        });
      };
      deplayRedirect();
    }
  }, [emailStat]);

  if (emailStat === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground style={styles.container}>
      <ScrollView
        style={{ width: "90%" }}
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#202020",
              fontSize: 45,
              fontFamily: "Inter-Bold",
              letterSpacing: 1,
              textAlign: "left",
            }}
          >
            Sign In
          </Text>
          <Image
            source={logo}
            style={{ height: 270, width: 270, alignSelf: "center" }}
          />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => <Ionicons name={"person-outline"} size={28} />}
                />
              }
              style={{
                backgroundColor: "#f5f5f5",
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label={"Username"}
              placeholderTextColor={"#ccc"}
              underlineColorAndroid="transparent"
              mode="outlined"
            />
          )}
          name="Username"
        />
        <DisplayFormError errors={errors.Username} />
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
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label={"Password"}
              placeholderTextColor={"#ccc"}
              mode="outlined"
              underlineColorAndroid="transparent"
            />
          )}
          name="Password"
        />
        <DisplayFormError errors={errors.Password} />
      </ScrollView>
      <View style={{ flex: 1, alignSelf: "flex-end", marginRight: 25 }}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          right: 0,
          left: 0,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <CustomButton
            buttonStyle={styles.btnPrimary}
            textStyle={styles.btnPrimaryText}
            textValue="SIGN IN"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <CustomButton
          buttonStyle={styles.btnSecondary}
          textStyle={styles.btnSecondaryText}
          textValue="SIGN UP"
          onPress={() =>
            navigation.navigate("AuthStackScreens", { screen: "Sign Up" })
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opacityBg: {
    flex: 1,
    opacity: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnPrimary: {
    width: "90%",
    backgroundColor: "#FF2E00",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 4,
    shadowColor: "#000000",
  },
  btnPrimaryText: { color: "#F5F5F5", fontWeight: "800", fontSize: 18 },
  btnSecondary: {
    width: "90%",
    backgroundColor: "#202020",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 4,
    shadowColor: "#000000",
  },
  btnSecondaryText: {
    color: "#f5f5f5",
    fontWeight: "800",
    fontSize: 18,
  },
});

export default SignInScreen;
