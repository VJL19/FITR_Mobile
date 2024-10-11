import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "reducers/routeReducer";
import { AppDispatch, RootState } from "store/store";
import avatar from "assets/avatar_default.jpeg";
import { myAccountSchema } from "utils/validations";
import { ScrollView } from "react-native-gesture-handler";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import LoadingIndicator from "components/LoadingIndicator";
import { authslice, useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
const { width, height } = Dimensions.get("window");
const MyAccount = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isError, data, isUninitialized, isFetching, refetch } =
    useGetAccessTokenQuery(undefined, {});

  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();

  useRefetchOnMessage("refresh_user", () => {
    dispatch(authslice.util.invalidateTags(["auth"]));
  });
  useEffect(() => {
    dispatch(setRoute("My Account"));
  }, []);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }
  console.log("hey", data);

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: { imageUrl: data?.user?.ProfilePic },
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start" }}
        onPress={handlePress}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <ImageBackground
            resizeMode="cover"
            source={
              data?.user?.ProfilePic === IMAGE_VALUES.DEFAULT
                ? avatar
                : { uri: data?.user?.ProfilePic }
            }
            style={styles.image}
          ></ImageBackground>
        </View>
      </TouchableOpacity>
      <ScrollView
        style={{
          width: "90%",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Username</Text>
          <Text>{data?.user?.Username}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Email</Text>
          <Text>{data?.user?.Email}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Contact Number</Text>
          <Text>{data?.user?.ContactNumber}</Text>
        </View>
      </ScrollView>
      <View style={{ width: "90%" }}>
        <Button
          color="#ff2e00"
          title="Change account"
          onPress={() =>
            navigation.navigate("DetailedScreens", { screen: "Change Account" })
          }
        />
      </View>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: width,
    height: width * 0.9,
    borderColor: "#ff2e00",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
