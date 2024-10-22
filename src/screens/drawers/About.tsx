import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setRoute } from "reducers/routeReducer";
import bg from "assets/mjeshter_bg.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Foundation";
import DialogBox from "components/DialogBox";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const { width, height } = Dimensions.get("window");
const About = () => {
  const { isError } = useGetAccessTokenQuery();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("About MJeshter"));
  }, []);

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/fitrstorage.appspot.com/o/ProfilePics%2F1718806635225?alt=media&token=90561a2f-f231-40ec-bfe8-a8fa51e89501",
      },
    });
  };
  if (isError) {
    return <CustomError />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.image}>
        <Image source={bg} style={styles.image} />
      </TouchableOpacity>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ padding: 15 }}>
          <View style={styles.iconContainer}>
            <Icon name="location-sharp" size={30} color={"#ff2e00"} />
            <Text style={styles.title}>Address </Text>
          </View>

          <Text style={styles.description}>
            Lot 1 Blk 2 Makim Square Tandang Sora Ave., Brgy Culiat ( in front
            of Culiat High School), Quezon City, Philippines
          </Text>

          <View style={styles.iconContainer}>
            <Icon2 name="telephone" size={30} color={"#ff2e00"} />
            <Text style={styles.title}>Contacts </Text>
          </View>
          <Text style={styles.description}>0995 770 8858</Text>
          <Text style={styles.description}>mjeshter.fg@yahoo.com</Text>
          <View style={styles.iconContainer}>
            <Icon name="time" size={30} color={"#ff2e00"} />
            <Text style={styles.title}>Open Hours </Text>
          </View>
          <Text style={styles.description}>Mon - Sun / 8:00 AM - 10:00 PM</Text>
          <View style={styles.iconContainer}>
            <Icon name="information-circle" size={30} color={"#ff2e00"} />
            <Text style={styles.title}>More Information </Text>
          </View>
          <Text
            style={styles.link}
            onPress={() =>
              DialogBox({
                dialogTitle: "Confirmation",
                dialogDescription:
                  "This action will leave you in this application. Are you sure you want to proceed?",
                async handlePress(args) {
                  Linking.openURL("https://www.facebook.com/mjeshter.fg");
                },
              })
            }
          >
            https://www.facebook.com/mjeshter.fg
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  description: {
    fontSize: 17,
  },
  image: {
    width: width,
    height: width * 0.9,
    resizeMode: "cover",
  },
  link: {
    fontSize: 17,
    color: "blue",
    textDecorationLine: "underline",
  },
});
