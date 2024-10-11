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
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";

const { width, height } = Dimensions.get("window");
const ViewExercise = () => {
  const { exercise_data } = useSelector((state: RootState) => state.tutorial);

  const { data } = useGetAccessTokenQuery();
  const [addExerciseFavorite, { status: addStat, error: addErr }] =
    useAddExerciseFavoritesMutation();
  const [removeExerciseFavorite, { status: removeStat, error: removeErr }] =
    useRemoveExerciseFavoriteMutation();
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
  const { isConnected } = useIsNetworkConnected();
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

  //handle cancel the text-to-speech when user press back navigation
  useEffect(() => {
    function stopSpeech() {
      Speech.stop();
    }
    navigation.addListener("blur", stopSpeech);

    return () => navigation.removeListener("blur", stopSpeech);
  }, [navigation]);

  useEffect(() => {
    if (removeErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (removeErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      removeStat === "rejected" &&
      removeErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", removeErr?.data?.error?.sqlMessage);
    }
    if (removeStat === "fulfilled") {
      checkExerciseFavorite(arg);
      DisplayAlert(
        "Success message",
        "This exercise is successfully removed to your favorites!"
      );
    }
  }, [removeStat]);

  useEffect(() => {
    if (addErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (addErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      addStat === "rejected" &&
      addErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", addErr?.data?.error?.sqlMessage);
    }
    if (addStat === "fulfilled") {
      checkExerciseFavorite(arg);
      DisplayAlert(
        "Success message",
        "This exercise is successfully added to your favorites!"
      );
    }
  }, [addStat]);

  const handleSpeak = () => {
    Speech.speak(ExerciseExplanation, { language: "en-US" });
  };

  const handleFavorites = async () => {
    addExerciseFavorite(arg);
  };

  const handleDirectTutorial = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Tutorial Youtube",
      params: {
        yt_url: `https://www.youtube.com/results?search_query=how+to+execute+${ExerciseName.toLowerCase()}`,
      },
    });
  };

  const removeFavorites = async () => {
    removeExerciseFavorite(arg);
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
          width: "100%",
        }}
      >
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSpeak}>
          <AntDesign name="sound" size={30} color="#f5f5f5" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleDirectTutorial}
        >
          <AntDesign name="playcircleo" size={30} color="#f5f5f5" />
        </TouchableOpacity>
        {exerciseFavorite?.result[0]?.isExerciseFavorite ? (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={removeFavorites}
          >
            <MaterialIcons name="favorite" size={30} color="#f5f5f5" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleFavorites}
          >
            <MaterialIcons name="favorite-outline" size={30} color="#f5f5f5" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={{ padding: 15, marginBottom: 25 }}>
          <Text style={styles.title}>{ExerciseName}</Text>
          <Text style={styles.subTitle}>{ExerciseCategory.toUpperCase()}</Text>
          <Text style={styles.subTitle}>
            {ExerciseTargetMuscle.toUpperCase()}
          </Text>
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
