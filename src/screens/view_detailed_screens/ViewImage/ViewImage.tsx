import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { DetailedRootStackScreenProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import bg from "assets/mjeshter_bg.jpg";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const ViewImage = ({ route }: DetailedRootStackScreenProp) => {
  const deviceWidth = Dimensions.get("screen").width;
  const deviceHeight = Dimensions.get("screen").height;
  // console.log(route?.params.imageUrl);
  return (
    <ReactNativeZoomableView
      maxZoom={10}
      minZoom={1}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
    >
      <ImageBackground
        source={{ uri: route?.params.imageUrl }}
        resizeMode="cover"
        style={{ height: deviceHeight, width: deviceWidth }}
      />
    </ReactNativeZoomableView>
  );
};

export default ViewImage;

const styles = StyleSheet.create({});
