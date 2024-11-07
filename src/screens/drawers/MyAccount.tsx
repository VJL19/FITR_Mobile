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
import {
  authslice,
  useAddExpoNotifTokenMutation,
  useGetAccessTokenQuery,
} from "reducers/authReducer";
import CustomError from "components/CustomError";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import { Switch } from "react-native-paper";
import DisplayAlert from "components/CustomAlert";
import DialogBox from "components/DialogBox";
import { setExpoNotifToken } from "reducers/notificationReducer";
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get("window");
const MyAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const [addExpoToken, { data: expoData, status: expoStat }] =
    useAddExpoNotifTokenMutation();
  const { isError, data, isUninitialized, isFetching } =
    useGetAccessTokenQuery();
  const { expoNotifToken } = useSelector(
    (state: RootState) => state.notification
  );

  const [expoToken, setExpoToken] = useState<string | null>("");
  const [shouldReceiveNotif, setShouldReceivedNotif] = React.useState(
    expoNotifToken && true
  );
  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();

  useRefetchOnMessage("refresh_user", () => {
    dispatch(authslice.util.invalidateTags(["auth"]));
  });
  useEffect(() => {
    dispatch(setRoute("My Account"));
    const loadExpoToken = async () => {
      const token = await SecureStore.getItemAsync("expoNotifToken");
      if (token) {
        setExpoToken(token);
      }
    };
    loadExpoToken();
  }, []);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }

  const onToggleSwitch = () => {
    if (shouldReceiveNotif) {
      DialogBox({
        dialogTitle: "Disable Notification?",
        dialogDescription:
          "Note: Pressing confirm you will not receive notifications from attendance (time-in/time-out), and subscriptions status",
        handlePress: async (args) => {
          addExpoToken({ Email: data?.user?.Email, ExpoNotifToken: null });
          dispatch(setExpoNotifToken(null));
          setShouldReceivedNotif(!shouldReceiveNotif);
        },
      });
    }
    if (!shouldReceiveNotif) {
      DialogBox({
        dialogTitle: "Enable Notification?",
        dialogDescription:
          "Note: Pressing confirm you will receive notifications from attendance (time-in/time-out), and subscriptions status",
        handlePress: async (args) => {
          dispatch(setExpoNotifToken(expoToken));
          addExpoToken({
            Email: data?.user?.Email,
            ExpoNotifToken: expoToken,
          });
          setShouldReceivedNotif(!shouldReceiveNotif);
        },
      });
    }
  };

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
          <Text style={styles.description}>{data?.user?.Username}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.description}>{data?.user?.Email}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Contact Number</Text>
          <Text style={styles.description}>{data?.user?.ContactNumber}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.title}>Receive Notifications?</Text>
          <Switch value={shouldReceiveNotif} onValueChange={onToggleSwitch} />
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
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },
});
