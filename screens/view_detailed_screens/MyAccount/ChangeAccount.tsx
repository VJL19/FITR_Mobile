import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "../../../components/CustomTextInput";
import DisplayFormError from "../../../components/DisplayFormError";
import Ionicon from "react-native-vector-icons/Ionicons";
import { joiResolver } from "@hookform/resolvers/joi";
import { IChangeAccount } from "../../../utils/types/user.types";
import { myAccountSchema } from "../../../utils/validations";
import getAccessToken from "../../../actions/homeAction";
import { setRoute } from "../../../reducers/routeReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import * as ImagePicker from "expo-image-picker";
import avatar from "../../../assets/avatar_default.jpeg";

const initialState: IChangeAccount = {
  Username: "",
  Email: "",
  ContactNumber: "",
  Password: "",
  ConfirmPassword: "",
};

const ChangeAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const [image, setImage] = useState<string | undefined>();
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IChangeAccount>({
    defaultValues: initialState,
    resolver: joiResolver(myAccountSchema),
  });
  useEffect(() => {
    dispatch(setRoute("My Account"));
    dispatch(getAccessToken());
  }, []);
  const onSubmit = (data: IChangeAccount) => {
    console.log(data);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    console.log("result", result);
  };

  return (
    <View>
      <View>
        <Image
          source={image === undefined ? avatar : { uri: image }}
          style={styles.image}
        />
        <View style={{ position: "absolute", top: "55%", left: "25%" }}>
          <Ionicon
            name="camera"
            size={35}
            color="#202020"
            onPress={pickImage}
          />
        </View>
      </View>
      <ScrollView style={{ width: "90%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.Username}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Enter your Username"
            />
          )}
          name="Username"
        />
        <DisplayFormError errors={errors.Username} />
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              error={errors.ContactNumber}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              inputMode="tel"
              placeholder="Enter your ContactNumber"
            />
          )}
          name="ContactNumber"
        />
        <DisplayFormError errors={errors.ContactNumber} />
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
      </ScrollView>

      <View style={{ width: "90%" }}>
        <Button title="Save info" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default ChangeAccount;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "#ff2e00",
  },
});
