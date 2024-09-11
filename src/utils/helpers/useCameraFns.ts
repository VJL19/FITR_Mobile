import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { setMetadata } from "reducers/postReducer";

export const useCameraFns = ({
  allowsEditing,
  isProfilePhoto,
}: {
  allowsEditing: boolean;
  isProfilePhoto?: boolean;
}) => {
  const [image, setImage] = useState<string | null | undefined>(
    IMAGE_VALUES.DEFAULT
  );

  const dispatch: AppDispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: isProfilePhoto
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.All,
      allowsEditing: allowsEditing,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(setMetadata(""));
    }
  };

  const removePhoto = async () => {
    setImage(IMAGE_VALUES.DEFAULT);
    dispatch(setMetadata(""));
  };

  const pickCameraImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(setMetadata(""));
    }
  };
  return { image, pickImage, removePhoto, pickCameraImage, setImage };
};
