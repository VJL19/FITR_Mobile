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
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";

const ViewImage = ({ route }: DetailedRootStackScreenProp) => {
  const deviceWidth = Dimensions.get("screen").width;
  const deviceHeight = Dimensions.get("screen").height;
  // console.log(route?.params.imageUrl);

  const navigation = useNavigation();
  return (
    <ReactNativeZoomableView
      maxZoom={10}
      minZoom={1}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
    >
      {route?.params?.imageUrl === IMAGE_VALUES.DEFAULT ? (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}
          >
            There are no images to view :)
          </Text>
          <Icon
            name="close-circle"
            size={50}
            color="#d9534f"
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : (
        <ImageBackground
          source={{ uri: route?.params.imageUrl }}
          resizeMode="contain"
          style={{ height: deviceHeight, width: deviceWidth }}
        >
          <View style={{ marginTop: 25, alignSelf: "flex-end" }}>
            <Icon
              name="close-circle"
              size={50}
              color="#d9534f"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ImageBackground>
      )}
    </ReactNativeZoomableView>
  );
};

export default ViewImage;

const styles = StyleSheet.create({});
