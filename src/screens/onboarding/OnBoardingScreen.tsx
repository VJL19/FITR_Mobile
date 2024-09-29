import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setItemStorage } from "utils/helpers/AsyncStorage";

const { width, height } = Dimensions.get("window");
const OnBoardingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleOnDone = async () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "AuthStackScreens" }],
    });
    navigation.dispatch(resetAction);
    await setItemStorage("onboarded", "1");
  };
  const handleOnSkip = async () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "AuthStackScreens" }],
    });
    navigation.dispatch(resetAction);
    await setItemStorage("onboarded", "1");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Onboarding
          containerStyles={{ paddingHorizontal: 15 }}
          onDone={handleOnDone}
          onSkip={handleOnSkip}
          pages={[
            {
              backgroundColor: "#fff",

              image: (
                <LottieView
                  source={require("src/assets/animations/workout_ani.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "WORKOUT PLANNING",
              subtitle:
                "Create and customize your ideal workout routines with the Programs Planner.",
              titleStyles: {
                fontFamily: "Inter-Bold",
              },
              subTitleStyles: {
                lineHeight: 25,
                textAlign: "center",
                fontFamily: "Inter-Medium",
              },
            },
            {
              backgroundColor: "#fe7a5d",

              image: (
                <LottieView
                  source={require("src/assets/animations/tutorial_ani.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "TUTORIAL MODULE",
              titleStyles: {
                fontFamily: "Inter-Bold",
              },
              subtitle:
                "View and watch comprehensive gym equipments, workouts, and exercises in the app",
              subTitleStyles: {
                lineHeight: 25,
                textAlign: "center",
                fontFamily: "Inter-Medium",
              },
            },
            {
              backgroundColor: "#fff",
              image: (
                <LottieView
                  source={require("src/assets/animations/community_ani.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "JOIN WITH THE COMMUNITY",
              titleStyles: {
                fontFamily: "Inter-Bold",
              },
              subtitle:
                "Engage with other people through newsfeed platform, and create your own posts to share with them.",
              // "Stay up-to-date with the latest news and promotions through our Announcement feature, and engage with the community by liking, commenting, and sharing in the interactive News Feed.",
              subTitleStyles: {
                lineHeight: 25,
                textAlign: "center",
                fontFamily: "Inter-Medium",
              },
            },
            {
              backgroundColor: "#fe7a5d",
              image: (
                <LottieView
                  source={require("src/assets/animations/notif_ani.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "REALTIME NOTIFICATIONS",
              titleStyles: {
                fontFamily: "Inter-Bold",
              },

              subtitle:
                "Receive notifications from like, comment, and subscription expiration.",
              subTitleStyles: {
                lineHeight: 25,
                textAlign: "center",
                fontFamily: "Inter-Medium",
              },
            },
            {
              backgroundColor: "#fff",
              image: (
                <LottieView
                  source={require("src/assets/animations/confetti_ani.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: "GET STARTED",
              titleStyles: {
                fontFamily: "Inter-Bold",
              },
              subtitle: "You may explore our FITR application.",
            },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
    backgroundColor: "transparent",
  },
});
