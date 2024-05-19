import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import IForm, { IPersonalDetails } from "utils/types/form.types";
import { formSchema, personalDetailsSchema } from "utils/validations";
import { joiResolver } from "@hookform/resolvers/joi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import LoadingIndicator from "components/LoadingIndicator";

const SignUpScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();
  const [initialField, setInitialField] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    reset,
  } = useForm<IPersonalDetails>({
    resolver: joiResolver(personalDetailsSchema),
  });

  useEffect(() => {
    const loadFormFields = async () => {
      try {
        const value = await AsyncStorage.getItem("form");
        if (value != null) {
          const parseValue = JSON.parse(value);
          setInitialField(parseValue);
        }
      } catch (e) {
        console.log("error in getting the item", e);
      }
    };
    loadFormFields();
  }, []);

  useEffect(() => {
    if (initialField !== undefined) {
      setValue("LastName", initialField?.LastName);
      setValue("FirstName", initialField?.FirstName);
      setValue("Age", initialField?.Age);
      setValue("MiddleName", initialField?.MiddleName);
    }
  }, [initialField]);

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

    try {
      await AsyncStorage.setItem("form", JSON.stringify(data));
    } catch (e) {
      console.log("error in setting the item", e);
    }
    navigation.navigate("DetailedScreens", {
      screen: "ContactInformation",
      params: {
        LastName: getValues("LastName"),
        FirstName: getValues("FirstName"),
        MiddleName: getValues("MiddleName"),
        Age: getValues("Age"),
      },
    });
    // dispatch(registerUser(newObj));
    // navigation.navigate("DashboardScreen");
    // reset();
    // await new Promise((resolve) => setTimeout(resolve, 2500));
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
            "Discard signup?",
            "The values in the fiels will not be saved. Are you sure to discard them and leave the screen?",
            [
              { text: "Don't leave", style: "cancel", onPress: () => {} },
              {
                text: "Discard",
                style: "destructive",
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: async () => {
                  navigation.dispatch(e.data.action);
                  await AsyncStorage.multiRemove([
                    "form",
                    "contactForm",
                    "accountForm",
                  ]);
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
          flex: 1,
          justifyContent: "center",
        }}
      >
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
      </ScrollView>
      <View>
        {isSubmitting && <LoadingIndicator />}

        <Button
          title="Proceed 1 out of 4"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit)}
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
