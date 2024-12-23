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
import { joiResolver } from "@hookform/resolvers/joi";
import { IChangeAccount } from "utils/types/user.types";
import { myAccountSchema } from "utils/validations";
import { setRoute } from "reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import * as ImagePicker from "expo-image-picker";
import avatar from "assets/avatar_default.jpeg";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "global/firebaseConfig";
import {
  setToken,
  useChangeAccountMutation,
  useGetAccessTokenQuery,
  useLoginUserMutation,
} from "reducers/authReducer";
import DisplayAlert from "components/CustomAlert";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import * as SecureStore from "expo-secure-store";
import LoadingIndicator from "components/LoadingIndicator";
import CustomModal from "components/CustomModal";
import { useCameraFns } from "utils/helpers/useCameraFns";
import CustomError from "components/CustomError";
import { uploadImage } from "utils/helpers/uploadImage";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

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
  const { image, pickImage, pickCameraImage, removePhoto } = useCameraFns({
    allowsEditing: true,
    isProfilePhoto: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: user, isError, refetch } = useGetAccessTokenQuery();
  const [changeAccount, { error, data: dataChangeAcc, status }] =
    useChangeAccountMutation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IChangeAccount>({
    defaultValues: initialState,
    resolver: joiResolver(myAccountSchema),
  });

  const { isConnected } = useIsNetworkConnected();

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
    // if (status === "rejected" && isSubmitted) {
    //   DisplayAlert("Error, message", error?.data?.error?.sqlMessage);
    // }

    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (status === "rejected" && error?.status !== NETWORK_ERROR?.FETCH_ERROR) {
      DisplayAlert("Error, message", error?.data?.error?.sqlMessage);
    }
    if (error?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error, message", error?.data?.message);
    }
    if (status === "fulfilled" && isSubmitted) {
      let imageRef = ref(storage, user?.user?.ProfilePic);

      try {
        const deleteImage = async () => {
          await deleteObject(imageRef);
        };
        deleteImage();
        console.log("success");
      } catch (err) {
        console.log("there was an error in deleting an image");
      }
      dispatch(setToken(dataChangeAcc?.accessToken));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync(
          "accessToken",
          dataChangeAcc?.accessToken!
        );
      };
      setTokenAsync();
      DisplayAlert("Success message", dataChangeAcc?.message);

      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "DashboardScreen" }],
        });
        navigation.dispatch(resetAction);
      };
      delayRedirect();
      refetch();
      reset();
    }
  }, [status, dataChangeAcc?.message]);

  const onSubmit = async (data: IChangeAccount) => {
    const url = await uploadImage(
      image,
      "ProfilePics",
      "image",
      loading,
      setLoading
    );
    const arg = {
      ...data,
      ProfilePic: url,
      UserID: user?.user?.UserID,
      LastName: user?.user?.LastName,
      FirstName: user?.user?.FirstName,
      MiddleName: user?.user?.MiddleName,
      Height: user?.user?.Height,
      Weight: user?.user?.Weight,
      Gender: user?.user?.Gender,
      Address: user?.user?.Address,
      Birthday: user?.user?.Birthday,
      SubscriptionType: user?.user?.SubscriptionType,
    };
    changeAccount(arg);

    // navigation.popToTop();
  };
  console.log("form", isSubmitted);
  console.log("change account res", status);
  console.log("change account data", dataChangeAcc);
  console.log("change account error", error);

  console.log(user?.user?.ProfilePic);

  // const uploadImage = async (uri: string, fileType: string) => {
  //   try {
  //     if (uri === undefined) return;
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     setLoading(true);

  //     const storageRef = ref(storage, "ProfilePics/" + new Date().getTime());
  //     const uploadTask = uploadBytesResumable(storageRef, blob);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       //if the upload image is error
  //       (error) => {
  //         console.log("Image upload error!", error);
  //       }
  //       // //if the upload image is sucess
  //       // () => {
  //       //   getDownloadURL(uploadTask.snapshot.ref)
  //       //     .then(async (downloadUrl) => {
  //       //       setImageUploaded(true);
  //       //       setImage(downloadUrl);

  //       //       const arg = {
  //       //         ...accountData,
  //       //         ProfilePic: downloadUrl,
  //       //       };
  //       //       changeAccount(arg);
  //       //       console.log("Image available at!", downloadUrl);
  //       //     })
  //       //     .catch((err) => console.log("error", err));
  //       // }
  //     );
  //     await uploadTask;

  //     let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

  //     return downloadURL;
  //   } catch (err) {
  //     console.log("error", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View>
          <Image
            source={image === IMAGE_VALUES.DEFAULT ? avatar : { uri: image }}
            style={styles.image}
          />
          <View style={{ position: "absolute", top: "65%", left: "40%" }}>
            <CustomModal
              modalTitle="Upload profile picture"
              handleCamera={pickCameraImage}
              handleGallery={pickImage}
              handleRemove={removePhoto}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", padding: 15 }}>
          <ScrollView
            style={{ width: "100%" }}
            keyboardShouldPersistTaps={"handled"}
          >
            <Text style={styles.labelStyle}>Username</Text>
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
            <Text style={styles.labelStyle}>Contact Number</Text>
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
            <Text style={styles.labelStyle}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry={isPasswordSecure}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name={"lock-closed-outline"} size={28} />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={isPasswordSecure ? "eye-off" : "eye"}
                          size={28}
                        />
                      )}
                      onPress={() => {
                        isPasswordSecure
                          ? setIsPasswordSecure(false)
                          : setIsPasswordSecure(true);
                      }}
                    />
                  }
                  style={{
                    marginTop: 20,
                    backgroundColor: "#f5f5f5",
                    height: 55,
                  }}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  label={"Password"}
                  placeholderTextColor={"#ccc"}
                  mode="outlined"
                  underlineColorAndroid="transparent"
                  error={errors.Password && true}
                />
              )}
              name="Password"
            />
            <DisplayFormError errors={errors.Password} />
            <Text style={styles.labelStyle}>Confirm Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry={isConfirmPasswordSecure}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name={"lock-closed-outline"} size={28} />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={isConfirmPasswordSecure ? "eye-off" : "eye"}
                          size={28}
                        />
                      )}
                      onPress={() => {
                        isConfirmPasswordSecure
                          ? setIsConfirmPasswordSecure(false)
                          : setIsConfirmPasswordSecure(true);
                      }}
                    />
                  }
                  style={{
                    marginTop: 20,
                    backgroundColor: "#f5f5f5",
                    height: 55,
                  }}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  label={"Confirm Password"}
                  placeholderTextColor={"#ccc"}
                  mode="outlined"
                  underlineColorAndroid="transparent"
                  error={errors.Password && true}
                />
              )}
              name="ConfirmPassword"
            />
            <DisplayFormError errors={errors.ConfirmPassword} />
          </ScrollView>
        </View>
      </ScrollView>
      <View style={{ width: "95%", alignSelf: "center", marginBottom: 15 }}>
        <Button
          title="Save info"
          color="#ff2e00"
          onPress={handleSubmit(onSubmit, (error) =>
            console.log("error", error)
          )}
        />
      </View>
    </View>
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
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
