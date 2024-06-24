import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { IContactDetails } from "utils/types/form.types";
import { joiResolver } from "@hookform/resolvers/joi";
import { contactDetailsSchema } from "utils/validations";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import LoadingIndicator from "components/LoadingIndicator";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { setContactInfoFields } from "reducers/authReducer";

const ContactInformation = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { ContactNumber, Email, Height, Weight, Address } = useSelector(
    (state: RootState) => state.authReducer.contactInfo
  );
  const dispatch: AppDispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    watch,
    reset,
  } = useForm<IContactDetails>({
    resolver: joiResolver(contactDetailsSchema),
  });

  useEffect(() => {
    setValue("ContactNumber", ContactNumber);
    setValue("Address", Address);
    setValue("Email", Email);
    setValue("Height", Height);
    setValue("Weight", Weight);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      dispatch(setContactInfoFields(value))
    );
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = async (data: IContactDetails) => {
    console.log("contact data", data);

    dispatch(setContactInfoFields(data));
    navigation.navigate("DetailedScreens", {
      screen: "AccountSetup",
    });
  };
  const arr: INavigate[] = [
    { id: 1, navigateTo: "Sign Up" },
    { id: 2, navigateTo: "ContactInformation" },
    { id: 3, navigateTo: "AccountSetup" },
    { id: 4, navigateTo: "TermsAndCondition" },
  ];

  interface INavigate {
    id: number;
    navigateTo: string;
  }

  const handleNavigate = (e: INavigate) => {
    if (e.id === 1) {
      navigation.goBack();
    } else if (e.id === 2) {
    } else if (e.id === 3) {
    }
  };

  const renderNavs = arr.map((e) => (
    <TouchableOpacity key={e.id} onPress={() => handleNavigate(e)}>
      <View
        style={{
          padding: 25,
          height: 15,
          width: 40,
          backgroundColor: "#ff2e00",
          borderRadius: 200,
        }}
      >
        <Text>{e.id}</Text>
      </View>
    </TouchableOpacity>
  ));
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1, height: "100%" }}>
        <View style={{ flex: 1, flexDirection: "row", gap: 15 }}>
          {/* {renderNavs} */}
        </View>
        <Text style={styles.labelStyle}>Contact Number</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="tel"
              error={errors.ContactNumber}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Contact Number"
            />
          )}
          name="ContactNumber"
        />
        <DisplayFormError errors={errors.ContactNumber} />
        <Text style={styles.labelStyle}>Address</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Address}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Address"
            />
          )}
          name="Address"
        />
        <DisplayFormError errors={errors.Address} />
        <Text style={styles.labelStyle}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Email}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Email"
            />
          )}
          name="Email"
        />
        <DisplayFormError errors={errors.Email} />
        <Text style={styles.labelStyle}>Height</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Height}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Height"
            />
          )}
          name="Height"
        />
        <DisplayFormError errors={errors.Height} />
        <Text style={styles.labelStyle}>Weight</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              inputMode="numeric"
              error={errors.Weight}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Weight"
            />
          )}
          name="Weight"
        />
        <DisplayFormError errors={errors.Weight} />
      </ScrollView>
      <View>
        {isSubmitting && <LoadingIndicator />}

        <Button
          title="Proceed 2 out of 4"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit, (error) => console.log(error))}
        />
      </View>
    </View>
  );
};

export default ContactInformation;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
