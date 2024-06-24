import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import IForm, { IPersonalDetails } from "utils/types/form.types";
import { formSchema, personalDetailsSchema } from "utils/validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { clearFormFields, setPersonalInfoFields } from "reducers/authReducer";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const SignUpScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();

  const [showPicker, setShowPicker] = useState(false);

  const { LastName, FirstName, MiddleName, Age, Birthday } = useSelector(
    (state: RootState) => state.authReducer.personalInfo
  );
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IPersonalDetails>({
    resolver: joiResolver(personalDetailsSchema),
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setValue("LastName", LastName);
    setValue("FirstName", FirstName);
    setValue("Age", Age);
    setValue("MiddleName", MiddleName);
    setValue("Birthday", Birthday);
  }, []);

  const onSubmit = async (data: IPersonalDetails) => {
    // const newObj: IForm = {
    //   ...data,
    //   Gender: data.Gender === "1" ? "Male" : "Female",
    //   ProfilePic: "avatar_default.jpeg",
    // };

    // console.log(data.Gender);
    // const ext = newObj?.ProfilePic?.split(".");
    // console.log(ext?.[ext?.length - 1]);
    console.log("data", data);

    dispatch(setPersonalInfoFields(data));

    navigation.navigate("DetailedScreens", {
      screen: "ContactInformation",
    });
    // dispatch(registerUser(newObj));
    // navigation.navigate("DashboardScreen");
    // reset();
    // await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const { type } = event;
    if (type == "set") {
      const currentDate = selectedDate;
      setValue("Birthday", currentDate!.toDateString());

      if (Platform.OS === "android") {
        toggleDatePicker();
        setValue("Birthday", currentDate!.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (
          getValues("LastName")?.length >= 1 ||
          getValues("FirstName")?.length >= 1 ||
          getValues("MiddleName")?.length >= 1 ||
          getValues("Age")?.length >= 1
        ) {
          e.preventDefault();
          // Prompt the user before leaving the screen
          Alert.alert(
            "Are you sure?",
            "The values in the fields will not be saved. Are you sure to discard them and leave the screen?",
            [
              { text: "Don't leave", style: "cancel", onPress: () => {} },
              {
                text: "Ok",
                style: "destructive",
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: async () => {
                  navigation.dispatch(e.data.action);
                  dispatch(clearFormFields());
                },
              },
            ]
          );
        }
      }),
    [navigation]
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ScrollView
        style={{ flex: 1, height: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {showPicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={onChangeDate}
            display="calendar"
          />
        )}
        <Text style={styles.labelStyle}>Last Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.LastName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Last name"
            />
          )}
          name="LastName"
        />
        <DisplayFormError errors={errors.LastName} />
        <Text style={styles.labelStyle}>First Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.FirstName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your First name"
            />
          )}
          name="FirstName"
        />
        <DisplayFormError errors={errors.FirstName} />
        <Text style={styles.labelStyle}>Middle Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.MiddleName}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Middle name"
            />
          )}
          name="MiddleName"
        />
        <DisplayFormError errors={errors.MiddleName} />
        <Text style={styles.labelStyle}>Age</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Age}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Age"
            />
          )}
          name="Age"
        />
        <DisplayFormError errors={errors.Age} />
        <Text style={styles.labelStyle}>Date of birth</Text>
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                // <CustomTextInput
                //   inputMode="numeric"
                //   error={errors.Age}
                //   onBlur={onBlur}
                //   onChange={onChange}
                //   value={value}
                //   placeholder="Enter your Birthday"
                // />

                <CustomTextInput
                  isEditable={false}
                  inputMode="text"
                  error={errors.Birthday}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Enter your birthday"
                />
              )}
              name="Birthday"
            />
          </Pressable>
        )}
        <DisplayFormError errors={errors.Birthday} />
      </ScrollView>
      <View>
        {isSubmitting && <LoadingIndicator />}

        <Button
          title="Proceed 1 out of 4"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit, (err) => console.log(err))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputStyle: {
    borderWidth: 1,
    paddingLeft: 15,
  },
  btnPrimary: {
    borderRadius: 5,
    height: 45,
    backgroundColor: "#FF2E00",
  },
  btnPrimaryText: {
    textAlign: "center",
    color: "#f5f5f5",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "#ff2e00",
  },
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
