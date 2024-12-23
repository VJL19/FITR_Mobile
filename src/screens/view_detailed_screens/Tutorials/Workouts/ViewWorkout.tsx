import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import PagerView from "react-native-pager-view";

const { width, height } = Dimensions.get("window");

const ViewWorkout = () => {
  const { workout_data } = useSelector((state: RootState) => state.tutorial);

  const { data } = useGetAccessTokenQuery();
  const [isSpeak, setIsSpeak] = useState<boolean>(false);
  const [addWorkoutFavorite, { error: addErr, status: addStat }] =
    useAddWorkoutFavoritesMutation();
  const [removeWorkoutFavorite, { error: removeErr, status: removeStat }] =
    useRemoveWorkoutFavoriteMutation();
  const [checkWorkoutFavorite, { data: workoutFavorite, status }] =
    useCheckWorkoutFavoriteMutation();
  const { isConnected } = useIsNetworkConnected();

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
  const handlePress = (index: number) => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/${index}.jpg`,
      },
    });
  };

  const arg = {
    WorkOutID: WorkOutID,
    UserID: data?.user?.UserID,
  };

  const handleSpeak = () => {
    Speech.speak(WorkOutExplanation, {
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

  //handle cancel the text-to-speech when user press back navigation
  useEffect(() => {
    function stopSpeech() {
      Speech.stop();
      setIsSpeak(false);
    }
    navigation.addListener("beforeRemove", stopSpeech);
    navigation.addListener("blur", stopSpeech);

    return () => {
      navigation.removeListener("beforeRemove", stopSpeech);
      navigation.addListener("blur", stopSpeech);
    };
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
      checkWorkoutFavorite(arg);
    }
    if (removeErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", removeErr?.data?.message);
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
      checkWorkoutFavorite(arg);
    }
    if (addErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", addErr?.data?.message);
    }
  }, [addStat]);
  const handleFavorites = async () => {
    addWorkoutFavorite(arg);
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
  };

  useEffect(() => {
    checkWorkoutFavorite(arg);
  }, []);

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={{ width: width, height: width * 1.1 }}>
        <PagerView initialPage={0} style={{ flex: 1, alignSelf: "stretch" }}>
          <View key="1">
            <TouchableOpacity onPress={() => handlePress(0)}>
              <Image
                source={{
                  uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View key="2">
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Image
                source={{
                  uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/1.jpg`,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </PagerView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.buttonStyle}
          disabled={isSpeak && true}
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
        {workoutFavorite?.result[0]?.isWorkOutFavorite ? (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={removeFavorites}
          >
            <MaterialIcons name="favorite" size={35} color="#f5f5f5" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleFavorites}
          >
            <MaterialIcons name="favorite-outline" size={35} color="#f5f5f5" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={{ padding: 15, marginBottom: 25 }}>
          <Text style={styles.title}>{WorkOutName}</Text>
          <Text style={styles.subTitle}>{WorkOutCategory.toUpperCase()}</Text>
          <Text style={styles.subTitle}>
            {WorkOutTargetMuscle.toUpperCase()}
          </Text>
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
