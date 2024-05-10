import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import IForm, { IAccountSetup } from "../../../utils/types/form.types";
import { formSchema } from "../../../utils/validations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";

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
    // await AsyncStorage.multiRemove(["s"])
    console.log(newObj);
  };
  return (
    <View>
      <Text>Terms and Conditions: </Text>
      <Text>
        The management is not liable to any personal or bodily injury, for not
        following safety rules in connection with gym activities.
      </Text>
      <Text>Note:</Text>
      <Text>
        By checking the agree means you are registering account and agreeing to
        terms and conditions stated above.
      </Text>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <Checkbox
          value={IsChecked}
          onValueChange={setIsChecked}
          color={IsChecked ? "#ff2e00" : undefined}
        />
        <Text>Agree</Text>
      </View>

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={!IsChecked}
      />
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
