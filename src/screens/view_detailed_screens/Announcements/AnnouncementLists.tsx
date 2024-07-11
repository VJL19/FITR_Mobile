import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IAnnouncements } from "utils/types/announcement.types";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { setAnnouncementData } from "reducers/announcementReducer";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const AnnouncementLists = ({
  AnnouncementID,
  AnnouncementImage,
  AnnouncementTitle,
  AnnouncementDescription,
  AnnouncementDate,
}: IAnnouncements) => {
  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    const arg = {
      AnnouncementID: AnnouncementID,
      AnnouncementImage: AnnouncementImage,
      AnnouncementTitle: AnnouncementTitle,
      AnnouncementDescription: AnnouncementDescription,
      AnnouncementDate: AnnouncementDate,
    };
    dispatch(setAnnouncementData(arg));
    navigation.navigate("DetailedScreens", { screen: "View Announcement" });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground
        imageStyle={{
          borderRadius: 10,
          backgroundColor: "rgb(255,0,0)",
        }}
        style={styles.box}
        source={{
          uri: AnnouncementImage,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.45)",
            flexDirection: "column",
            padding: 15,
            gap: 25,
            borderRadius: 10,
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {AnnouncementTitle}
          </Text>
          <Text style={styles.date}>
            {new Date(AnnouncementDate).toDateString()}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AnnouncementLists;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 160,
    width: 300,
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    color: "#f5f5f5",
  },
  date: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f5f5f5",
  },
});
