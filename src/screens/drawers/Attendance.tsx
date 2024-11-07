import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import IAttendance from "utils/types/attendance.types";
import { getSecretCode, attendanceUser } from "actions/attendanceAction";
import getCurrentDate, {
  advanceMonthlyEnd,
  advanceSessionEnd,
  formatTime,
} from "utils/helpers/formatDate";
import LoadingIndicator from "components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProp } from "utils/types/navigators/DrawerStackNavigators";
import SubscriptionEnum from "utils/enums/Subscription";
import { setRoute } from "reducers/routeReducer";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  useCheckUserTapRFIDQuery,
  useTapRFIDCardUserMutation,
} from "reducers/attendanceReducer";
import CustomError from "components/CustomError";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Attendance = () => {
  const [toggleScan, setToggleScan] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  const { data, isError, isUninitialized, isFetching } =
    useGetAccessTokenQuery();

  const { user } = data!;
  const { data: IsTapRFID } = useCheckUserTapRFIDQuery(user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const [tapRFID, { data: tapRFIDRes, error }] = useTapRFIDCardUserMutation();

  useEffect(() => {
    dispatch(getSecretCode());
    dispatch(setRoute("Attendance"));
  }, []);

  // const handleBarCodeScanned = async ({
  //   type,
  //   data,
  // }: BarCodeScanningResult) => {
  //   setToggleScan(false);

  //   //validation for secret code stored in qr in admin.
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  //   // dispatch(attendanceUser(userRecord));
  //   // navigation.navigate("HomeDrawer");
  // };

  const handlePress = async () => {
    const arg = {
      UserID: user?.UserID,
      ProfilePic: user?.ProfilePic,
      LastName: user?.LastName,
      FirstName: user?.FirstName,
      SubscriptionType: user?.SubscriptionType,
      DateTapped: getCurrentDate(),
      SubscriptionExpectedEnd:
        IsTapRFID === undefined
          ? advanceMonthlyEnd()
          : IsTapRFID?.user?.SubscriptionExpectedEnd,
      IsPaid: "false",
      TimeIn: formatTime(new Date()),
      TimeOut: "NULL",
    };

    tapRFID(arg);
  };

  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }
  console.log("is IsTapRFID", IsTapRFID === undefined);
  console.log("is IsTapRFID error", error);
  console.log("is IsTapRFID data", IsTapRFID?.user?.SubscriptionExpectedEnd);
  console.log(user);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.33,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,46,0,0.5)",
            true,

            100
          )}
          onPress={() =>
            navigation.navigate("DetailedScreens", {
              screen: "View Attendance History",
            })
          }
        >
          <View style={styles.BoxStyle}>
            <Text style={styles.BoxTextStyle}>Attendance History</Text>
            <View style={{ position: "absolute", top: 0 }}>
              <MaterialCommunityIcons
                name="history"
                color={"#f5f5f5"}
                size={120}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,46,0,0.5)",
            true,

            100
          )}
          onPress={() =>
            navigation.navigate("DetailedScreens", {
              screen: "View RFID Card",
            })
          }
        >
          <View style={styles.BoxStyle}>
            <Text style={styles.BoxTextStyle}>RFID Card</Text>
            <View style={{ position: "absolute", top: 0 }}>
              <MaterialCommunityIcons
                name="card-account-details"
                color={"#f5f5f5"}
                size={120}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* <Button title="Tap RFID" onPress={handlePress} /> */}
      {/* <Text style={styles.textTitle}>Tap Me!</Text>

        {hashData && (
          <View style={{ borderWidth: 15, borderColor: "white" }}>
            <QRCode
              value={hashData}
              size={250}
              color="black"
              backgroundColor="white"
              logoBackgroundColor="transparent"
            />
          </View>
        )}
        </View> */}
      {/* {!IsScanQR?.IsScanQR && (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Select a subscription you wanna inquire in the gym.
          </Text>
          <RadioGroup
            radioButtons={subscription_types}
            selectedId={selectedSubscription}
            onPress={setSelectedSubscription}
            containerStyle={{ flex: 1, flexDirection: "row" }}
          />
        </View>
      )}
      {toggleScan && (
        <View style={{ flex: 1, backgroundColor: "#ccc" }}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={{
              flex: 0.9,
              borderWidth: 2,
              borderColor: "#ff2e00",
            }}
          />
        </View>
      )}

      {IsScanQR?.IsScanQR && (
        <View>
          <Text style={{ fontSize: 20, color: "#f5f5f5" }}>
            You have already tapped the qr code.
          </Text>
        </View>
      )}

      {selectedSubscription !== "" && (
        <Button
          title="Proceed"
          onPress={() => setToggleScan((prev) => !prev)}
          color={"#ff2e00"}
        />
      )} */}
    </View>
  );
};
export default Attendance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#202020",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 0.5,
    color: "red",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#f5f5f5",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#f5f5f5",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    width: 300,
    color: "#F5F5F5",
  },
  BoxStyle: {
    width: 175,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#E12900",
  },
  BoxTextStyle: {
    width: "100%",
    height: 75,
    zIndex: 2,
    opacity: 0.87,
    backgroundColor: "#131313",
    color: "#f5f5f5",
    position: "absolute",
    fontFamily: "Inter-ExtraBold",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageStyle: {
    height: 180,
    resizeMode: "cover",
    width: "auto",
  },
});
