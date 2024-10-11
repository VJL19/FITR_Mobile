import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { changePasswordSchema } from "utils/validations";
import { IChangePassword } from "utils/types/form.types";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useChangePasswordMutation } from "reducers/authReducer";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";

const ChangePassword = () => {
  const {
    control,
    formState: { errors, isSubmitted },
    handleSubmit,
  } = useForm<IChangePassword>({ resolver: joiResolver(changePasswordSchema) });
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const [changePassword, { data, status, error }] = useChangePasswordMutation();

  const { isConnected } = useIsNetworkConnected();

  const { Email, Username } = useSelector(
    (state: RootState) => state.authReducer.forgotPasswordInfo
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (status === "rejected" && error?.status !== NETWORK_ERROR.FETCH_ERROR) {
      DisplayAlert("Error message", "Something went wrong.");
    }
    if (status === "fulfilled" && isSubmitted) {
      DisplayAlert("Success message", data?.message);

      navigation.navigate("AuthStackScreens", { screen: "Sign In" });
    }
  }, [status]);

  const onSubmit = async (data: IChangePassword) => {
    const arg = {
      Email: Email,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
    };
    changePassword(arg);
  };

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ padding: 15 }}>
      <Text style={styles.labelStyle}>Username</Text>
      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            secureTextEntry={true}
            error={errors.Password}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Enter your Username"
            readOnly={true}
          />
        )}
        name="Password"
      /> */}
      <Text>{Username}</Text>
      <Text style={styles.labelStyle}>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={isPasswordSecure}
            left={
              <TextInput.Icon
                icon={() => <Ionicons name={"lock-closed-outline"} size={28} />}
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
                icon={() => <Ionicons name={"lock-closed-outline"} size={28} />}
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

      <View>
        <Button
          title="Submit"
          color="#ff2e00"
          onPress={handleSubmit(onSubmit, (error) => console.log(error))}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
