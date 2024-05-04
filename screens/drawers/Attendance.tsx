import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { BarCodeScanningResult } from "expo-camera";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import IAttendance from "../../utils/types/attendance.types";
import getAccessToken from "../../actions/homeAction";
import {
  getSecretCode,
  attendanceUser,
  checkUserScanQr,
} from "../../actions/attendanceAction";
import getCurrentDate, {
  advanceMonthlyEnd,
  advanceSessionEnd,
} from "../../utils/helpers/formatDate";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackNavigationProp } from "../../utils/types/navigators/DrawerStackNavigators";
import DropdownComponent from "../../components/DropdownComponent";
import SubscriptionEnum from "../../utils/enums/Subscription";
import { setRoute } from "../../reducers/routeReducer";

const Attendance = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [toggleScan, setToggleScan] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const navigation = useNavigation<DrawerStackNavigationProp>();
  // const [userRecord, setUserRecord] = useState<IAttendance>({
  //   UserID: 0,
  //   ProfilePic: "",
  //   LastName: "",
  //   FirstName: "",
  //   SubscriptionType: selectedSubscription,
  //   SubscriptionExpectedEnd: new Date().toLocaleString(),
  //   DateScanned: new Date().toLocaleString(),
  //   IsPaid: false,
  //   IsScanQR: false,
  // });

  const subscription_types = [
    { label: "Session", value: "1" },
    { label: "Monthly", value: "2" },
  ];

  const dispatch: AppDispatch = useDispatch();
  const { status, error, message, secretCode, IsScanQR, isLoading } =
    useSelector((state: RootState) => state.attendance);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

  // console.log("secret code", secretCode);
  console.log("is Scan Qr", IsScanQR);
  console.log("message att", message);
  console.log("status att", status);
  // console.log("error att", error);
  // console.log("current att", user);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // const userRecord = {
  //   UserID: user.UserID,
  //   ProfilePic: user.ProfilePic,
  //   LastName: user.LastName,
  //   FirstName: user.FirstName,
  //   SubscriptionType: selectedSubscription == "1" ? "Session" : "Monthly",
  //   DateScanned: getCurrentDate(),
  //   IsPaid: "false",
  //   IsScanQR: "true",
  // };

  console.log(selectedSubscription);
  useEffect(() => {
    dispatch(getSecretCode());
    dispatch(getAccessToken());
    dispatch(checkUserScanQr(user));
    dispatch(setRoute("Attendance"));
  }, []);

  const userRecord: IAttendance = {
    UserID: user.UserID,
    ProfilePic: user.ProfilePic,
    LastName: user.LastName,
    FirstName: user.FirstName,
    SubscriptionType:
      selectedSubscription == "1"
        ? SubscriptionEnum.Session
        : SubscriptionEnum.Monthly,
    DateScanned: getCurrentDate(),
    SubscriptionExpectedEnd:
      selectedSubscription == "1" ? advanceSessionEnd() : advanceMonthlyEnd(),
    IsPaid: false,
    IsScanQR: true,
  };
  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarCodeScanningResult) => {
    setScanned(true);
    setToggleScan(false);

    //validation for secret code stored in qr in admin.
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(attendanceUser(userRecord));
    navigation.navigate("HomeDrawer");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isAuthenticated) {
    return (
      <View>
        <Text>You are not authenticated! Please Login Again!</Text>
      </View>
    );
  }
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textTitle}>Scan Me!</Text>
        {IsScanQR === "false" && (
          <Text style={styles.description}>
            Please select between the types of subscription you wanna inquire in
            the gym.
          </Text>
        )}
      </View>
      {IsScanQR === "false" && (
        <DropdownComponent
          data={subscription_types}
          value={selectedSubscription}
          handleChange={setSelectedSubscription}
        />
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

      {IsScanQR === "true" && (
        <View>
          <Text style={{ fontSize: 20, color: "#f5f5f5" }}>
            You have already scanned the qr code.
          </Text>
        </View>
      )}

      {selectedSubscription !== "" && (
        <Button
          title="Proceed"
          onPress={() => setToggleScan((prev) => !prev)}
          color={"#ff2e00"}
        />
      )}
    </View>
  );
};
export default Attendance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#F5F5F5",
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
});
