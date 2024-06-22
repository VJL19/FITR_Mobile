import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
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
import LoadingIndicator from "components/LoadingIndicator";
import CustomModal from "components/CustomModal";
import { useCameraFns } from "utils/helpers/useCameraFns";
import CustomError from "components/CustomError";
import { uploadImage } from "utils/helpers/uploadImage";

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
  const { image, pickImage, pickCameraImage, removePhoto } = useCameraFns();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: user, isError, refetch } = useGetAccessTokenQuery();
  const [
    changeAccount,
    { error, data: dataChangeAcc, status, isError: isChangeErr },
  ] = useChangeAccountMutation();
  const navigation = useNavigation<RootStackNavigationProp>();
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
    // if (status === "rejected" && isSubmitted) {
    //   DisplayAlert("Error, message", error?.data?.error?.sqlMessage);
    // }
    if (status === "fulfilled" && isSubmitted) {
      dispatch(setToken(dataChangeAcc?.accessToken));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync(
          "accessToken",
          dataChangeAcc?.accessToken!
        );
      };
      setTokenAsync();
      DisplayAlert("Success message", dataChangeAcc?.message);
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
    };
    changeAccount(arg);
    if (status === "fulfilled" && isSubmitted) {
      dispatch(setToken(dataChangeAcc?.accessToken));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync(
          "accessToken",
          dataChangeAcc?.accessToken!
        );
      };
      setTokenAsync();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      DisplayAlert("Success message", dataChangeAcc?.message);
      navigation.navigate("DashboardScreen");
    }

    if (status === "rejected" && isSubmitted) {
      DisplayAlert("Error, message", error?.data?.error?.sqlMessage);
    }
    refetch();
    // navigation.popToTop();
  };
  console.log("form", isSubmitted);
  console.log("change account res", status);
  console.log("change account data", dataChangeAcc);
  console.log("change account error", error);

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
    <ScrollView>
      <View>
        <Image
          source={image === undefined ? avatar : { uri: image }}
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
        <ScrollView style={{ width: "100%" }}>
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
          <Text style={styles.labelStyle}>Confirm Password</Text>
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
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
