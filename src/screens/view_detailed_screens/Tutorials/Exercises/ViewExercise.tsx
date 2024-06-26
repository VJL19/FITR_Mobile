import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import * as Speech from "expo-speech";
import {
  useAddExerciseFavoritesMutation,
  useCheckExerciseFavoriteMutation,
  useRemoveExerciseFavoriteMutation,
} from "reducers/favoriteReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";

const ViewExercise = () => {
  const { exercise_data } = useSelector((state: RootState) => state.tutorial);

  const { data } = useGetAccessTokenQuery();
  const [addExerciseFavorite] = useAddExerciseFavoritesMutation();
  const [removeExerciseFavorite] = useRemoveExerciseFavoriteMutation();
  const [checkExerciseFavorite, { data: exerciseFavorite, status }] =
    useCheckExerciseFavoriteMutation();
  const {
    ExerciseID,
    ExerciseImage,
    ExerciseExplanation,
    ExerciseCategory,
    ExerciseIntensity,
    ExerciseTargetMuscle,
    ExerciseName,
  } = exercise_data;

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: `https://ik.imagekit.io/yuhonas/${ExerciseImage}/0.jpg`,
      },
    });
  };
  const arg = {
    ExerciseID: ExerciseID,
    UserID: data?.user?.UserID,
  };
  useEffect(() => {
    checkExerciseFavorite(arg);
  }, []);

  const handleSpeak = () => {
    Speech.speak(ExerciseExplanation, { language: "en-US" });
  };

  const handleFavorites = async () => {
    addExerciseFavorite(arg);
    checkExerciseFavorite(arg);
    DisplayAlert(
      "Success message",
      "This exercise is successfully added to your favorites!"
    );
  };

  const removeFavorites = async () => {
    removeExerciseFavorite(arg);
    checkExerciseFavorite(arg);
    DisplayAlert(
      "Success message",
      "This exercise is successfully removed to your favorites!"
    );
  };

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: `https://ik.imagekit.io/yuhonas/${ExerciseImage}/0.jpg`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ width: "50%" }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSpeak}>
            <AntDesign name="sound" size={35} color="#f5f5f5" />
          </TouchableOpacity>
        </View>
        {exerciseFavorite?.result[0]?.isExerciseFavorite ? (
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
          <Text style={styles.title}>{ExerciseName}</Text>
          <Text style={styles.description}>
            {ExerciseExplanation.split(/[,"]+/).join("")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewExercise;

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
