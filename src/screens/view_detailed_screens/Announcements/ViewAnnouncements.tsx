import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import postDefault from "assets/post_default.webp";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";

const ViewAnnouncements = () => {
  const {
    AnnouncementDate,
    AnnouncementDescription,
    AnnouncementID,
    AnnouncementImage,
    AnnouncementTitle,
  } = useSelector((state: RootState) => state.announcement.announcementData);

  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: { imageUrl: AnnouncementImage },
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Image
          resizeMode="contain"
          source={
            AnnouncementImage === IMAGE_VALUES.DEFAULT
              ? postDefault
              : { uri: AnnouncementImage }
          }
          style={{ height: 290, width: "100%" }}
        />
      </TouchableOpacity>
      <Text>{AnnouncementTitle}</Text>
      <Text>{AnnouncementDescription}</Text>
      <Text>{AnnouncementDate}</Text>
    </View>
  );
};

export default ViewAnnouncements;

const styles = StyleSheet.create({});
