import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import * as Speech from "expo-speech";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  useAddWorkoutFavoritesMutation,
  useCheckWorkoutFavoriteMutation,
  useRemoveWorkoutFavoriteMutation,
} from "reducers/favoriteReducer";
import LoadingIndicator from "components/LoadingIndicator";
import DisplayAlert from "components/CustomAlert";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ViewWorkout = () => {
  const { workout_data } = useSelector((state: RootState) => state.tutorial);

  const { data } = useGetAccessTokenQuery();
  const [addWorkoutFavorite] = useAddWorkoutFavoritesMutation();
  const [removeWorkoutFavorite] = useRemoveWorkoutFavoriteMutation();
  const [checkWorkoutFavorite, { data: workoutFavorite, status }] =
    useCheckWorkoutFavoriteMutation();

  const {
    WorkOutID,
    WorkOutName,
    WorkOutExplanation,
    WorkOutCategory,
    WorkOutIntensity,
    WorkOutTargetMuscle,
    WorkOutImage,
  } = workout_data;

  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
      },
    });
  };

  const arg = {
    WorkOutID: WorkOutID,
    UserID: data?.user?.UserID,
  };
  const handleSpeak = () => {
    Speech.speak(WorkOutExplanation, { language: "en-US" });
  };

  const handleFavorites = async () => {
    addWorkoutFavorite(arg);
    checkWorkoutFavorite(arg);
    DisplayAlert(
      "Success message",
      "This workout is successfully added to your favorites!"
    );
  };

  const handleDirectTutorial = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Tutorial Youtube",
      params: {
        yt_url: `https://www.youtube.com/results?search_query=how+to+execute+${WorkOutName.toLowerCase()}`,
      },
    });
  };

  const removeFavorites = async () => {
    removeWorkoutFavorite(arg);
    checkWorkoutFavorite(arg);
    DisplayAlert(
      "Success message",
      "This workout is successfully added to your favorites!"
    );
  };

  useEffect(() => {
    checkWorkoutFavorite(arg);
  }, []);

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ width: "50%" }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSpeak}>
            <AntDesign name="sound" size={35} color="#f5f5f5" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleDirectTutorial}
          >
            <AntDesign name="playcircleo" size={35} color="#f5f5f5" />
          </TouchableOpacity>
        </View>
        {workoutFavorite?.result[0]?.isWorkOutFavorite ? (
          <View style={{ width: "50%" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={removeFavorites}
            >
              <MaterialIcons name="favorite" size={35} color="#f5f5f5" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "50%" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleFavorites}
            >
              <MaterialIcons
                name="favorite-outline"
                size={35}
                color="#f5f5f5"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView>
        <View style={{ padding: 15, marginBottom: 25 }}>
          <Text style={styles.title}>{WorkOutName}</Text>
          <Text style={styles.description}>
            {WorkOutExplanation.split(/[,"]+/).join("")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
    width: "100%",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
  },
  description: {
    fontFamily: "Inter-Regular",
    lineHeight: 21,
    fontSize: 15,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    position: "absolute",
    bottom: 5,
    right: 35,
    height: 75,
    backgroundColor: "#ff2e00",
    borderRadius: 100,
    elevation: 20,
  },
});
