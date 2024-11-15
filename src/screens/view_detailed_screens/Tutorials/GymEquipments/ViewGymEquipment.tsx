import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import * as Speech from "expo-speech";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";

const { width, height } = Dimensions.get("window");
const ViewGymEquipment = () => {
  const { gym_data } = useSelector((state: RootState) => state.tutorial);
  const [isSpeak, setIsSpeak] = useState<boolean>(false);

  const { data } = useGetAccessTokenQuery();

  const {
    GymEquipmentID,
    GymEquipmentImage,
    GymEquipmentDescription,
    GymEquipmentInstructions,
    GymEquipmentCategory,
    GymEquipmentIntensity,
    GymEquipmentName,
    GymEquipmentTargetMuscle,
    GymEquipmentTutorialVideos,
  } = gym_data;

  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    function stopSpeech() {
      Speech.stop();
    }
    navigation.addListener("blur", stopSpeech);
    navigation.addListener("beforeRemove", stopSpeech);

    return () => {
      navigation.removeListener("blur", stopSpeech);
      navigation.removeListener("beforeRemove", stopSpeech);
    };
  }, [navigation]);
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: GymEquipmentImage,
      },
    });
  };

  const handleSpeak = () => {
    Speech.speak(GymEquipmentInstructions, {
      language: "en-US",
      onStart: () => {
        setIsSpeak(true);
      },

      onDone: () => {
        setIsSpeak(false);
      },
      onStopped: () => {
        setIsSpeak(false);
      },
    });
  };

  const handleDirectTutorial = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Tutorial Youtube",
      params: {
        yt_url: `https://www.youtube.com/results?search_query=how+to+use+${GymEquipmentName.toLowerCase()} in gym`,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: GymEquipmentImage,
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <TouchableOpacity
          disabled={isSpeak && true}
          style={styles.buttonStyle}
          onPress={handleSpeak}
        >
          <AntDesign name="sound" size={35} color="#f5f5f5" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleDirectTutorial}
        >
          <AntDesign name="playcircleo" size={35} color="#f5f5f5" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 15, marginBottom: 25 }}>
          <Text style={styles.title}>{GymEquipmentName}</Text>
          <Text style={styles.subTitle}>
            {GymEquipmentCategory.toUpperCase()}
          </Text>
          <Text style={styles.subTitle}>
            {GymEquipmentTargetMuscle.toUpperCase()}
          </Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {GymEquipmentDescription.split(/[,"]+/).join("")}
          </Text>
          <Text style={styles.title}>How To Use</Text>
          <Text style={styles.description}>
            {GymEquipmentInstructions.split(/[,"]+/).join("")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewGymEquipment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: width * 1.1,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
  },
  subTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
  },
  description: {
    fontFamily: "Inter-Regular",
    lineHeight: 21,
    fontSize: 15,
  },

  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    bottom: 5,
    height: 80,
    backgroundColor: "#ff2e00",
    borderRadius: 100,
    elevation: 20,
  },
});
