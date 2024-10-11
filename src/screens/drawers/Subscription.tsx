import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import LoadingIndicator from "components/LoadingIndicator";
import SubscriptionTypeEnum, {
  SubscriptionAmount,
  SubscriptionMethod,
} from "utils/enums/Subscription";
import processPayment, {
  CheckoutPayload,
  ILineItems,
} from "actions/subscriptionAction";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setRoute } from "reducers/routeReducer";
import { authslice, useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { isLoading } from "expo-font";
import { RadioGroup } from "react-native-radio-buttons-group";
import CustomModal from "components/CustomModal";
import { useCameraFns } from "utils/helpers/useCameraFns";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import DialogBox from "components/DialogBox";
import { uploadImage } from "utils/helpers/uploadImage";
import DisplayAlert from "components/CustomAlert";
import {
  subscriptionApi,
  useAddSubscriptionMutation,
  useGetSpecificSubscriptionQuery,
} from "reducers/subscriptionReducer";
import getCurrentDate from "utils/helpers/formatDate";
import Subscriptions from "components/Subscriptions";
import { ISubscriptions } from "utils/types/subscriptions.types";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import DropdownComponent from "components/DropdownComponent";
import { ScrollView } from "react-native";
import * as Linking from "expo-linking";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const { image, pickImage, pickCameraImage, removePhoto } = useCameraFns({
    allowsEditing: false,
    isProfilePhoto: true,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { data, isFetching, isUninitialized, isError } =
    useGetAccessTokenQuery();
  // const { data: subscription } = useCheckUserScanQrQuery(data?.user?.UserID);

  const [sendPayment, { data: subscriptionData, status, error }] =
    useAddSubscriptionMutation();

  const { data: userSubscriptions } = useGetSpecificSubscriptionQuery(
    data?.user?.UserID,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { isConnected } = useIsNetworkConnected();

  useRefetchOnMessage("refresh_subscriptionPage", () => {
    dispatch(subscriptionApi.util.invalidateTags(["subscriptions"]));
  });

  useRefetchOnMessage("refresh_user", () => {
    dispatch(authslice.util.invalidateTags(["auth"]));
  });

  console.log("user access token", data);
  // console.log("specific subscriptions", userSubscriptions);
  // console.log("details status", status);
  // console.log("subs data", subscriptionData);
  // console.log("subs error", error);

  const payment_methods = [
    { id: "1", label: "G-Cash", value: "1" },
    { id: "2", label: "PayMaya", value: "2" },
    { id: "3", label: "Credit-Card", value: "3" },
    { id: "4", label: "Cash", value: "4" },
  ];

  // const bank_transfer = [{ label: "BDO", value: "1" }];
  // const e_wallets = [
  //   { label: "G-Cash", value: "1" },
  //   { label: "Paymaya", value: "2" },
  //   { label: "GrabPay", value: "3" },
  // ];

  console.log(paymentMethod);
  useEffect(() => {
    dispatch(setRoute("Subscription"));
  }, []);

  useEffect(() => {
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (error?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (status === "rejected" && error?.status !== NETWORK_ERROR?.FETCH_ERROR) {
      DisplayAlert("Error message", error?.data?.error?.sqlMessage);
    }
    if (status === "fulfilled") {
      DisplayAlert("Success message", "Payment Uploaded successfully!");
      removePhoto();
      setSelectedSubscription("");
    }
  }, [status]);

  // const handlePayment = () => {
  //   const checkOutDetails: ILineItems[] = [
  //     {
  //       currency: "PHP",
  //       amount:
  //         subscription?.user.SubscriptionType === SubscriptionTypeEnum.Session
  //           ? SubscriptionAmount.SESSION
  //           : SubscriptionAmount.MONTHLY,
  //       name: subscription?.user.SubscriptionType!,
  //       quantity: 1,
  //     },
  //   ];

  //   const paymentDetails: CheckoutPayload = {
  //     name: user.LastName + " " + user.FirstName,
  //     email: user.Email,
  //     phone: user.ContactNumber,
  //     line_items: checkOutDetails,
  //     payment_method_types: ["gcash", "paymaya", "grab_pay", "card"],
  //   };

  //   dispatch(processPayment(paymentDetails));
  //   if (!isLoading) {
  //     navigation.navigate("DetailedScreens", {
  //       screen: "Process Checkout",
  //       params: { checkout_url: checkout_url },
  //     });
  //   }
  // };

  const handleUpload = () => {
    DialogBox({
      dialogTitle: "Upload payment?",
      dialogDescription: "The gym owner will review your uploaded payment.",
      async handlePress(args) {
        const pathToFolder =
          data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
            ? "Payments/Session/"
            : "Payments/Monthly/";

        const url = await uploadImage(
          image,
          pathToFolder,
          "image",
          loading,
          setLoading
        );

        console.log("proof of payment ", url);
        const arg = {
          UserID: data?.user?.UserID,
          SubscriptionAmount:
            data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
              ? SubscriptionAmount.SESSION
              : SubscriptionAmount.MONTHLY,
          SubscriptionBy: `${data?.user?.FirstName} ${data?.user?.MiddleName}. ${data?.user?.LastName}`,
          SubscriptionType:
            data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
              ? SubscriptionTypeEnum.Session
              : SubscriptionTypeEnum.Monthly,
          SubscriptionMethod:
            paymentMethod === "1"
              ? SubscriptionMethod.GCASH
              : paymentMethod === "2"
              ? SubscriptionMethod.PAYMAYA
              : paymentMethod === "3"
              ? SubscriptionMethod.CREDITCARD
              : SubscriptionMethod.CASH,
          SubscriptionUploadedImage: url,
          SubscriptionEntryDate: getCurrentDate(),
        };
        sendPayment(arg);
      },
    });
  };

  const openAppSpecific = async (storeURL: string) => {
    try {
      const supported = await Linking.canOpenURL(storeURL);
      if (supported) {
        await Linking.openURL(storeURL);
      } else {
        console.log("error in opening the url!");
      }
    } catch (error) {
      console.log("error in executing can open url method");
    }
  };
  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "View Payments" });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }
  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }

  if (userSubscriptions?.result[0]?.SubscriptionStatus) {
    return <Subscriptions {...userSubscriptions.result[0]} />;
  }
  console.log("subscriptionData error", error);
  console.log("subscriptionData", subscriptionData);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <Text style={{ textAlign: "center", fontSize: 18 }}>
          Select a subscription you wanna inquire in the gym.
        </Text> */}
          <TouchableOpacity onPress={handlePress}>
            <View>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontStyle: "italic",
                  fontSize: 17,
                  color: "#ff2e00",
                  textAlign: "center",
                }}
              >
                View Subscription History
              </Text>
            </View>
          </TouchableOpacity>
          {/* <RadioGroup
          radioButtons={payment_methods}
          selectedId={selectedSubscription}
          onPress={setSelectedSubscription}
          containerStyle={{ flex: 1, flexDirection: "row" }}
        /> */}
        </View>

        <View style={{ padding: 20 }}>
          <Text style={styles.instructionTitle}>
            Step by step on how to process payment from subscription using this
            app.
          </Text>
          <Text style={styles.instructionText}>
            Step 1. Select your payment method.
          </Text>
          <Text style={styles.instructionText}>
            Step 2. for (gcash), (paymaya), and (credit-card) payments there
            will be a account name, and number presented to further send your
            payment.
          </Text>
          <Text style={styles.instructionText}>
            Step 4. for those users who are paying on (gcash), (paymaya) you may
            click the image to redirect this app to gcash/paymaya application.
          </Text>
          <Text style={styles.instructionText}>
            Step 5. Last step is to screenshot the proof of payment or receipt
            indicating that you sent the money to the account name, and number
            indicated from the image. Note: if you choose a CASH payment please
            disregard this step and you may proceed to upload directly your
            payment.
          </Text>
        </View>
        <DropdownComponent
          searchPlaceholder="Select payment method..."
          data={payment_methods}
          handleChange={setPaymentMethod}
          value={paymentMethod}
        />
        <View style={styles.redirectBtns}>
          {paymentMethod === "1" && (
            <Button
              title="Open gcash app"
              onPress={() => {
                const platform =
                  Platform.OS === "android"
                    ? "market://launch?id=com.globe.gcash.android"
                    : "https://itunes.apple.com/us/app/maya-savings-loans-cards/id991673877";

                openAppSpecific(platform);
              }}
            />
          )}
          {paymentMethod === "2" && (
            <Button
              color={"green"}
              title="Open paymaya app"
              onPress={() => {
                const platform =
                  Platform.OS === "android"
                    ? "market://launch?id=com.paymaya"
                    : "https://itunes.apple.com/us/app/gcash/id520020791";

                openAppSpecific(platform);
              }}
            />
          )}

          {paymentMethod === "3" && (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Button
                title="Open BDO app"
                color={"blue"}
                onPress={() => {
                  const platform =
                    Platform.OS === "android"
                      ? "market://launch?id=ph.com.bdo.retail&hl=en"
                      : "https://itunes.apple.com/us/app/bdo-online/id1551584630";

                  openAppSpecific(platform);
                }}
              />
              <Button
                color={"violet"}
                title="Open METRO BANK app"
                onPress={() => {
                  const platform =
                    Platform.OS === "android"
                      ? "market://launch?id=ph.com.metrobank.mcc.mbonline&hl=en"
                      : "https://itunes.apple.com/us/app/metrobank-app/id1536081176";

                  openAppSpecific(platform);
                }}
              />
            </View>
          )}
        </View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: "100%" }}
            resizeMode="center"
          />
        )}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Session && (
          <Text style={styles.textStyle}>
            You have a due amount of 90.00 PHP
          </Text>
        )}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Monthly && (
          <Text style={styles.textStyle}>
            You have a due amount of 900.00 PHP
          </Text>
        )}

        {/*paymentMethod !== "1" && paymentMethod !== "" && (
        <DropdownComponent
          searchPlaceholder="Select a bank..."
          data={paymentMethod == "3" ? e_wallets : bank_transfer}
          handleChange={setBankName}
          value={bankName}
        />
      )} */}

        {paymentMethod !== "" && paymentMethod !== "4" ? (
          <View style={{ flex: 0.3, width: "100%" }}>
            <CustomModal
              isButton={true}
              modalTitle="Available methods"
              handleCamera={pickCameraImage}
              handleGallery={pickImage}
              handleRemove={removePhoto}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        ) : (
          <View></View>
        )}
        {image !== IMAGE_VALUES.DEFAULT || paymentMethod === "4" ? (
          <View style={{ width: "85%", alignSelf: "center", marginTop: 10 }}>
            <Button title="Upload payment" onPress={handleUpload} />
          </View>
        ) : selectedSubscription === "" ? (
          <View></View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    color: "#131313",
    fontSize: 23,
  },
  textStyle: {
    color: "#d9534f",
    fontSize: 23,
    fontStyle: "italic",
  },
  redirectBtns: {
    flex: 1,
    gap: 15,
    marginTop: 35,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  instructionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  instructionText: {
    fontSize: 15,
    paddingVertical: 10,
    lineHeight: 25,
  },
});
