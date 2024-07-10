import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
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

const ChangePassword = () => {
  const {
    control,
    formState: { errors, isSubmitted },
    handleSubmit,
  } = useForm<IChangePassword>({ resolver: joiResolver(changePasswordSchema) });

  const [changePassword, { data, status, error }] = useChangePasswordMutation();

  const { Email, Username } = useSelector(
    (state: RootState) => state.authReducer.forgotPasswordInfo
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    if (status === "rejected" && isSubmitted) {
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
    <View>
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
