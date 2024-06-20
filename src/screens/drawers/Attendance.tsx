import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import IAttendance from "utils/types/attendance.types";
import getAccessToken from "actions/homeAction";
import {
  getSecretCode,
  attendanceUser,
  checkUserScanQr,
} from "actions/attendanceAction";
import getCurrentDate, {
  advanceMonthlyEnd,
  advanceSessionEnd,
} from "utils/helpers/formatDate";
import LoadingIndicator from "components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import {
  DrawerStackNavigationProp,
  DrawerStackParamList,
} from "utils/types/navigators/DrawerStackNavigators";
import DropdownComponent from "components/DropdownComponent";
import SubscriptionEnum from "utils/enums/Subscription";
import { setRoute } from "reducers/routeReducer";
import QRCode from "react-native-qrcode-svg";
import { encryptUserRecord } from "utils/helpers/hashQrData";
import { RadioGroup } from "react-native-radio-buttons-group";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useCheckUserScanQrQuery } from "reducers/attendanceReducer";
const Attendance = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [toggleScan, setToggleScan] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [hashData, setHashData] = useState<string | unknown>("");
  const navigation = useNavigation<DrawerStackNavigationProp>();

  // console.log(qrRef.current.toDataURL);

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
    { id: "1", label: "Session", value: "1" },
    { id: "2", label: "Monthly", value: "2" },
  ];

  const dispatch: AppDispatch = useDispatch();

  const { data, isError, isUninitialized, isFetching } =
    useGetAccessTokenQuery();

  const { user } = data!;
  const { data: IsScanQR } = useCheckUserScanQrQuery(user?.UserID, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  console.log("is Scan Qr", IsScanQR);
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
    Username: `MJESHTER USER - ${user.Username} ${user.UserID}`,
  };

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

  useEffect(() => {
    dispatch(getSecretCode());
    dispatch(setRoute("Attendance"));

    const encryptRecord = async () => {
      const res = await encryptUserRecord(userRecord?.Username!);
      setHashData(res);
    };

    encryptRecord();
  }, []);

  console.log(user);
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

  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <View>
        <Text>You are not authenticated! Please Login Again!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textTitle}>Tap Me!</Text>

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
      </View>
      {!IsScanQR?.IsScanQR && (
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
      )}
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
});
