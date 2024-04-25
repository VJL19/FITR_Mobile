import { View, Text, Alert, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AuthStackNavigationProp,
  AuthStackScreenProp,
} from "../../utils/types/navigators/AuthStackNavigators";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import registerUser from "../../actions/registerAction";

interface IForm {
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Age: number;
  ContactNumber: string;
  Email: string;
  Height: number;
  Weight: number;
  Username: string;
  Password: string;
  ConfirmPassword: string;
  ProfilePic: string;
  Gender: string;
}
const initialFormState: IForm = {
  LastName: "",
  FirstName: "",
  MiddleName: "",
  Age: 0,
  ContactNumber: "",
  Email: "",
  Height: 0,
  Weight: 0,
  Username: "",
  Password: "",
  ConfirmPassword: "",
  ProfilePic: "",
  Gender: "",
};
const SignUpScreen = ({ navigation }: AuthStackScreenProp) => {
  const navigate = useNavigation<AuthStackNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({ defaultValues: initialFormState });

  const onSubmit = (data: IForm) => console.log(data);
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [Age, setAge] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [Username, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ProfilePic, setProfilePic] = useState("");
  const [Gender, setGender] = useState("");
  const hasUnsavedChanges = Boolean(LastName);

  const { status, details } = useSelector((state: RootState) => state.register);

  const dispatch: AppDispatch = useDispatch();

  console.log("status", status);
  console.log("message", details?.error);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // if (!hasUnsavedChanges) {
        //   // If we don't have unsaved changes, then we don't need to do anything
        //   return;
        // }
        // // Prevent default behavior of leaving the screen
        // e.preventDefault();
        // // Prompt the user before leaving the screen
        // Alert.alert(
        //   "Discard changes?",
        //   "You have unsaved changes. Are you sure to discard them and leave the screen?",
        //   [
        //     { text: "Don't leave", style: "cancel", onPress: () => {} },
        //     {
        //       text: "Discard",
        //       style: "destructive",
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
      }),
    [navigation, hasUnsavedChanges]
  );
  return (
    <SafeAreaView>
      <Text>SignUpScreen</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}
      <TextInput
        value={LastName}
        placeholder="Enter your LastName"
        onChangeText={setLastName}
      />
      <TextInput
        value={FirstName}
        placeholder="Enter your FirstName"
        onChangeText={setFirstName}
      />
      <TextInput
        value={MiddleName}
        placeholder="Enter your Middle namme"
        onChangeText={setMiddleName}
      />
      <TextInput
        inputMode="numeric"
        value={Age}
        placeholder="Enter your age"
        onChangeText={setAge}
      />
      <TextInput
        value={ContactNumber}
        placeholder="Enter your contact number"
        onChangeText={setContactNumber}
      />
      <TextInput
        value={Email}
        placeholder="Enter your email"
        onChangeText={setEmail}
      />
      <TextInput
        value={Height}
        placeholder="Enter your height"
        onChangeText={setHeight}
      />
      <TextInput
        value={Weight}
        placeholder="Enter your weight"
        onChangeText={setWeight}
      />
      <TextInput
        value={Username}
        placeholder="Enter your usernamme"
        onChangeText={setUserName}
      />
      <TextInput
        value={Password}
        placeholder="Enter your password"
        onChangeText={setPassword}
      />
      <TextInput
        value={ConfirmPassword}
        placeholder="Enter your confirm password"
        onChangeText={setConfirmPassword}
      />
      <TextInput
        value={ProfilePic}
        placeholder="Enter your profile pic"
        onChangeText={setProfilePic}
      />
      <TextInput
        value={Gender}
        placeholder="Enter your gender"
        onChangeText={setGender}
      />
      <Button
        title="Register"
        color={"#131313"}
        onPress={() => handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;
