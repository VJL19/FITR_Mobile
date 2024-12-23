import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import postDefault from "assets/post_default.webp";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import RenderHTML from "react-native-render-html";
import { storage } from "global/firebaseConfig";
import { getMetadata, ref } from "@firebase/storage";
import { FIREBASE_VIDEO_FORMATS } from "utils/constants/FILE_EXTENSIONS";
import { WebView } from "react-native-webview";
import { ResizeMode, Video } from "expo-av";

const { width, height } = Dimensions.get("window");
const ViewAnnouncements = () => {
  const {
    AnnouncementDate,
    AnnouncementDescription,
    AnnouncementID,
    AnnouncementImage,
    AnnouncementTitle,
  } = useSelector((state: RootState) => state.announcement.announcementData);

  const navigation = useNavigation<RootStackNavigationProp>();
  const [metadata, setMetadata] = useState<string | undefined>("");

  const { width } = useWindowDimensions();
  const html = `${AnnouncementDescription}`;
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: { imageUrl: AnnouncementImage },
    });
  };

  const mediaRef = ref(storage, AnnouncementImage);

  useEffect(() => {
    if (AnnouncementImage === IMAGE_VALUES.DEFAULT) {
      return;
    }
    getMetadata(mediaRef)
      .then((metaData) => {
        setMetadata(metaData?.contentType);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  console.log(AnnouncementImage);

  return (
    <View>
      <ScrollView>
        {FIREBASE_VIDEO_FORMATS.includes(metadata) ? (
          // <WebView
          //   style={{
          //     height: 300,
          //     width: "100%",
          //     justifyContent: "center",
          //     alignItems: "center",
          //   }}
          //   javaScriptEnabled={true}
          //   domStorageEnabled={true}
          //   scrollEnabled={false}
          //   allowsFullscreenVideo={true}
          //   allowsInlineMediaPlayback={true}
          //   mediaPlaybackRequiresUserAction={true}
          //   scalesPageToFit={true}
          //   source={{
          //     html: `<html>
          //           <style>
          //             video {
          //               transform-origin: top left;
          //               transform: scale(3);
          //               height: 50vh;
          //             }
          //           </style>
          //         <body>
          //           <video
          //           controls
          //           style={{
          //             objectFit: "contain",
          //             position: "absolute",
          //             top: "0",
          //             left: "0",
          //             height: "100%",
          //             width: "100%",
          //           }}
          //           loop
          //           autoPlay
          //           playsInline
          //           disablePictureInPicture
          //           src="${AnnouncementImage}"
          //         />
          //         </body>
          //     </html>`,
          //   }}
          // />
          <Video
            source={{ uri: AnnouncementImage }}
            style={styles.videoStyle}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Image
              resizeMode="contain"
              source={
                AnnouncementImage === IMAGE_VALUES.DEFAULT
                  ? postDefault
                  : { uri: AnnouncementImage }
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        )}
        <View style={{ padding: 15 }}>
          <Text style={styles.date}>
            Posted Date:{" "}
            {new Date(AnnouncementDate.split(" ")[0]).toDateString()}
          </Text>
          <Text style={styles.title}>{AnnouncementTitle}</Text>
          <RenderHTML contentWidth={width} source={{ html }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewAnnouncements;

const styles = StyleSheet.create({
  imageStyle: { height: width * 1.1, width: width },
  videoStyle: { height: width * 1.1, width: width },
  title: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
  },
  date: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
  },
});
