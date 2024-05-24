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
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import Ionicon from "react-native-vector-icons/Ionicons";
import { joiResolver } from "@hookform/resolvers/joi";
import { IChangeAccount } from "utils/types/user.types";
import { myAccountSchema } from "utils/validations";
import { setRoute } from "reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import * as ImagePicker from "expo-image-picker";
import avatar from "assets/avatar_default.jpeg";
import uploadImageAction from "actions/uploadImageAction";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "global/firebaseConfig";
import {
  setToken,
  useChangeAccountMutation,
  useGetAccessTokenQuery,
  useLoginUserMutation,
} from "reducers/authReducer";
import DisplayAlert from "components/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import * as SecureStore from "expo-secure-store";

const initialState: IChangeAccount = {
  Username: "",
  Email: "",
  ContactNumber: "",
  Password: "",
  ConfirmPassword: "",
  UserID: 0,
};

const ChangeAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const [image, setImage] = useState<string | null | undefined>();
  const [ProfilePic, setProfilePic] = useState<string | undefined>();

  const { data: user, isError, refetch } = useGetAccessTokenQuery();
  const [changeAccount, { error, data, status }] = useChangeAccountMutation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [imageUploaded, setImageUploaded] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IChangeAccount>({
    defaultValues: initialState,
    resolver: joiResolver(myAccountSchema),
  });

  // const {
  //   message,
  //   isLoading: imageLoading,
  //   error,
  //   status,
  // } = useSelector((state: RootState) => state.uploadImage);

  useEffect(() => {
    dispatch(setRoute("My Account"));
  }, []);

  useEffect(() => {
    if (status === "rejected" && isSubmitted) {
      DisplayAlert("Error, message", error?.data?.error?.sqlMessage);
    }
    if (status === "fulfilled" && isSubmitted) {
      dispatch(setToken(data?.accessToken));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", data?.accessToken!);
      };
      setTokenAsync();
      DisplayAlert("Success, message", data?.message);
    }
  }, [status, data?.message]);

  const onSubmit = async (data: IChangeAccount) => {
    await uploadImage(ProfilePic, "image");
    const arg = {
      ...data,
      ProfilePic: ProfilePic,
      UserID: user?.user?.UserID,
      LastName: user?.user?.LastName,
      FirstName: user?.user?.FirstName,
      MiddleName: user?.user?.MiddleName,
      Height: user?.user?.Height,
      Weight: user?.user?.Weight,
      Gender: user?.user?.Gender,
    };
    if (imageUploaded) {
      changeAccount(arg);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Profile pic", ProfilePic);
      // navigation.popToTop();
      refetch();
    }
  };
  console.log("change account res", status);
  console.log("change account data", data);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setProfilePic(result.assets[0].uri);
      // setBase64(result.assets[0].base64);
    }
  };

  const uploadImage = async (uri: string, fileType: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, "ProfilePics/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        //if the upload image is error
        (error) => {
          console.log("Image upload error!", error);
        },
        //if the upload image is sucess
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadUrl) => {
              setImageUploaded(true);
              setProfilePic(downloadUrl);
              console.log("Image available at!", downloadUrl);
            })
            .catch((err) => console.log("error", err));
        }
      );
    } catch (err) {
      console.log("errpr", err);
    }
  };

  if (isError) {
    return (
      <View>
        <Text>You are not authenticated</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View>
        <Image
          source={image === undefined ? avatar : { uri: image }}
          style={styles.image}
        />
        <View style={{ position: "absolute", top: "65%", left: "40%" }}>
          <Ionicon
            name="camera-outline"
            size={35}
            color="#ff2e00"
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
        <Button
          title="Save info"
          onPress={handleSubmit(onSubmit, (error) =>
            console.log("error", error)
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ChangeAccount;

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "#ff2e00",
  },
});
