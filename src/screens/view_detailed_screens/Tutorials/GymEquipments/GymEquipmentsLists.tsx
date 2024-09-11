import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setGymEquipmentData } from "reducers/tutorialReducer";
import { AppDispatch } from "store/store";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import dynamicColor from "utils/helpers/dynamicStyles";
import { IGymEquipment } from "utils/types/gym_equipment.types";

const GymEquipmentsLists = ({
  GymEquipmentID,
  GymEquipmentName,
  GymEquipmentCategory,
  GymEquipmentIntensity,
  GymEquipmentTargetMuscle,
  GymEquipmentImage,
  GymEquipmentDescription,
  GymEquipmentInstructions,
}: IGymEquipment) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  const handlePress = () => {
    const arg = {
      GymEquipmentID: GymEquipmentID,
      GymEquipmentName: GymEquipmentName,
      GymEquipmentDescription: GymEquipmentDescription,
      GymEquipmentIntensity: GymEquipmentIntensity,
      GymEquipmentTargetMuscle: GymEquipmentTargetMuscle,
      GymEquipmentCategory: GymEquipmentCategory,
      GymEquipmentImage: GymEquipmentImage,
      GymEquipmentInstructions: GymEquipmentInstructions,
    };
    dispatch(setGymEquipmentData(arg));
    navigation.navigate("DetailedScreens", { screen: "View Gym Equipment" });
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(
          "rgba(255,46,0,0.5)",
          true,
          100
        )}
        onPress={handlePress}
      >
        <View style={styles.BoxStyle}>
          <Text numberOfLines={1} style={styles.BoxTextStyle}>
            {GymEquipmentName}
          </Text>
          <ImageBackground
            source={{
              uri: GymEquipmentImage,
            }}
            style={styles.imageStyle}
            resizeMode="cover"
          >
            <View
              style={{
                padding: 12,
                backgroundColor: dynamicColor(GymEquipmentIntensity),
                alignSelf: "flex-start",
              }}
            >
              <Text style={styles.text}>{GymEquipmentIntensity}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default memo(GymEquipmentsLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },

  BoxStyle: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
  },
  BoxTextStyle: {
    width: "100%",
    height: 55,
    backgroundColor: "#131313",
    color: "#f5f5f5",
    position: "absolute",
    fontFamily: "Inter-ExtraBold",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageStyle: {
    height: 200,
    resizeMode: "cover",
    width: "100%",
    zIndex: -2,
  },
  text: {
    color: "#f5f5f5",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
