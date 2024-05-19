import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import IForm, { IAccountSetup } from "utils/types/form.types";
import { formSchema } from "utils/validations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import registerUser from "actions/registerAction";

const TermsAndConditions = () => {
  const route =
    useRoute<
      RouteProp<DetailedRootStackNavigatorsParamList, "TermsAndCondition">
    >();
  const dispatch: AppDispatch = useDispatch();
  const [IsChecked, setIsChecked] = useState<boolean>();

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
    Username,
    Password,
    ConfirmPassword,
    Gender,
  } = route.params;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IForm>({
    resolver: joiResolver(formSchema),
  });

  const { status, details, isLoading } = useSelector(
    (state: RootState) => state.register
  );
  useEffect(() => {
    //if the status code of request is 400, then alert something!

    if (status === 200 && isSubmitted) {
      Alert.alert("Success message", details, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
      const deleteItems = async () => {
        await AsyncStorage.multiRemove(["form", "contactForm", "accountForm"]);
      };
      deleteItems();
    }
    if (status === 400 && isSubmitted) {
      Alert.alert("Error message", details, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
    }
  }, [status, details]);
  useEffect(() => {
    setValue("LastName", LastName);
    setValue("FirstName", FirstName);
    setValue("MiddleName", MiddleName);
    setValue("Age", Age);
    setValue("ContactNumber", ContactNumber);
    setValue("Email", Email);
    setValue("Height", Height);
    setValue("Weight", Weight);
    setValue("Username", Username);
    setValue("Password", Password);
    setValue("ConfirmPassword", ConfirmPassword);
    setValue("Gender", Gender);
  }, []);

  const onSubmit = async (data: IForm) => {
    const newObj: IForm = {
      ...data,
      Gender: data.Gender === "1" ? "Male" : "Female",
      ProfilePic: "avatar_default.jpeg",
    };
    dispatch(registerUser(newObj));
    // navigation.navigate("AuthStackScreens", { screen: "Sign In" });
    console.log("status", status);
    console.log("details", details);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note:</Text>
      <View>
        <Text style={styles.description}>
          The management is not liable to any personal or bodily injury, for not
          following safety rules in connection with gym activities.
        </Text>
        <Text style={styles.description}>
          By checking the agree means you are registering account and agreeing
          to terms and conditions stated above.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <Checkbox
          value={IsChecked}
          onValueChange={setIsChecked}
          color={IsChecked ? "#ff2e00" : undefined}
        />
        <Text>Agree</Text>
      </View>

      <View style={{ width: "90%" }}>
        <Button
          title="Register"
          onPress={handleSubmit(onSubmit)}
          disabled={!IsChecked}
        />
      </View>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
