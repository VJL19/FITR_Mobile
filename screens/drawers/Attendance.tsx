import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { BarCodeScanningResult } from "expo-camera";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import IAttendance from "../../utils/types/attendance.types";
import getAccessToken from "../../actions/homeAction";
import attendanceUser from "../../actions/attendanceAction";
import formatDate from "../../utils/helpers/formatDate";

const Attendance = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [toggleScan, setToggleScan] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [userRecord, setUserRecord] = useState<IAttendance>({
    UserID: 0,
    ProfilePic: "",
    LastName: "",
    FirstName: "",
    SubscriptionType: selectedSubscription,
    DateScanned: new Date().toLocaleString(),
    IsPaid: false,
    IsScanQR: false,
  });

  const dispatch: AppDispatch = useDispatch();
  const { status, error, message } = useSelector(
    (state: RootState) => state.attendance
  );

  const { user } = useSelector((state: RootState) => state.authReducer);

  console.log("status", status);
  console.log("message", message);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    dispatch(getAccessToken());
    setUserRecord({
      UserID: user.UserID,
      ProfilePic: user.ProfilePic,
      LastName: user.LastName,
      FirstName: user.FirstName,
      SubscriptionType: selectedSubscription == "1" ? "Session" : "Monthly",
      DateScanned: formatDate(new Date()),
      IsPaid: false,
      IsScanQR: false,
    });
  }, []);
  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarCodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(attendanceUser(userRecord));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const subscription_types = [
    { label: "Session", value: "1" },
    { label: "Monthly", value: "2" },
  ];

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textTitle}>Scan Me!</Text>
        <Text style={styles.description}>
          Please select between the types of subscription you wanna inquire in
          the gym.
        </Text>
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={subscription_types}
        maxHeight={200}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        value={selectedSubscription}
        onChange={(item) => {
          setSelectedSubscription(item.value);
        }}
      />
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
      <Button
        title={`${toggleScan ? "Untoggle" : "Toggle"} Camera`}
        onPress={() => setToggleScan((prev) => !prev)}
        color={"#ff2e00"}
      />
      {scanned && <Text>No more scan again!</Text>}
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
