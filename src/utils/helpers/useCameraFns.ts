import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";

export const useCameraFns = ({ allowsEditing }: { allowsEditing: boolean }) => {
  const [image, setImage] = useState<string | null | undefined>(
    IMAGE_VALUES.DEFAULT
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: allowsEditing,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removePhoto = async () => {
    setImage(IMAGE_VALUES.DEFAULT);
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
    }
  };
  return { image, pickImage, removePhoto, pickCameraImage, setImage };
};
