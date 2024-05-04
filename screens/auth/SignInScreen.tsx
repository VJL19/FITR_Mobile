import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Controller } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../utils/types/user.types";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authAction";
import { AppDispatch, RootState } from "../../store/store";
import CustomTextInput from "../../components/CustomTextInput";
import DisplayFormError from "../../components/DisplayFormError";
import DisplayAlert from "../../components/CustomAlert";
const SignInScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const defaultValue = {
    Username: "",
    Password: "",
  };
  const { message, status, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

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

    dispatch(loginUser(data));
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
    if (status === 400 && isSubmitted) {
      DisplayAlert("Error, message", message);
    }
    if (status === 200 && isSubmitted) {
      DisplayAlert("Success, message", message);
      reset();
    }
  }, [status, message]);
  return (
    <ImageBackground style={styles.container}>
      <View style={styles.opacityBg}>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "90%",
          }}
        >
          <Text
            style={{
              color: "#202020",
              fontSize: 40,
              fontFamily: "Inter-Bold",
              letterSpacing: 1,
            }}
          >
            Sign In
          </Text>
        </View>
        <View style={{ width: "90%" }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <React.Fragment>
                <Text
                  style={{
                    color: "#202020",
                    fontSize: 18,
                    fontFamily: "Inter-Bold",
                    letterSpacing: 1,
                  }}
                >
                  Username
                </Text>
                <CustomTextInput
                  error={errors.Username}
                  placeholder="Enter your Username"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </React.Fragment>
            )}
            name="Username"
          />
          <DisplayFormError errors={errors.Username} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <React.Fragment>
                <Text
                  style={{
                    color: "#202020",
                    fontSize: 18,
                    fontFamily: "Inter-Bold",
                    letterSpacing: 1,
                  }}
                >
                  Password
                </Text>
                <CustomTextInput
                  error={errors.Password}
                  secureTextEntry={true}
                  placeholder="Enter your Password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </React.Fragment>
            )}
            name="Password"
          />
          <DisplayFormError errors={errors.Password} />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            top: 20,
            right: 0,
            left: 0,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <CustomButton
              buttonStyle={styles.btnPrimary}
              textStyle={styles.btnPrimaryText}
              textValue="Sign In"
              onPress={() => handleSubmit(onSubmit)}
            />
          </View>
          <CustomButton
            buttonStyle={styles.btnSecondary}
            textStyle={styles.btnSecondaryText}
            textValue="Sign Up"
            onPress={() =>
              navigation.navigate("AuthStackScreens", { screen: "Sign Up" })
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
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
