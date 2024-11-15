import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import LoadingIndicator from "components/LoadingIndicator";
import SubscriptionTypeEnum, {
  SubscriptionAmount,
  SubscriptionMethod,
} from "utils/enums/Subscription";
import { CheckoutPayload, ILineItems } from "actions/subscriptionAction";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setRoute } from "reducers/routeReducer";
import {
  authslice,
  setOTPToken,
  useGetAccessTokenQuery,
  useSendEmailPaymentVerificationMutation,
} from "reducers/authReducer";
import CustomError from "components/CustomError";
import { useCameraFns } from "utils/helpers/useCameraFns";
import DialogBox from "components/DialogBox";
import DisplayAlert from "components/CustomAlert";
import {
  createSubscription,
  setCheckOutId,
  setCheckOutUrl,
  setClientKey,
  setIsEmailVerified,
  setIsUserPayOnline,
  setUserPaymentEmail,
  setUserPaymongoArg,
  subscriptionApi,
  useAddSubscriptionMutation,
  useGetMonthlyAlreadyPaidMutation,
  useGetSessionAlreadyPaidMutation,
  useGetSpecificSubscriptionQuery,
} from "reducers/subscriptionReducer";
import getCurrentDate from "utils/helpers/formatDate";
import Subscriptions from "components/Subscriptions";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import DropdownComponent from "components/DropdownComponent";
import { ScrollView } from "react-native";
import * as Linking from "expo-linking";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import { useProcessOnlinePaymentMutation } from "reducers/paymongoReducer";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const { image, pickImage, pickCameraImage, removePhoto } = useCameraFns({
    allowsEditing: false,
    isProfilePhoto: true,
  });

  const { isLoading, checkout_url } = useSelector(
    (state: RootState) => state.subscription
  );
  const dispatch: AppDispatch = useDispatch();

  const {
    data,
    isFetching,
    isUninitialized,
    isError,
    error: tokenErr,
  } = useGetAccessTokenQuery();
  // const { data: subscription } = useCheckUserScanQrQuery(data?.user?.UserID);

  const [sendPayment, { data: subscriptionData, status, error }] =
    useAddSubscriptionMutation();

  const [sessionPaid, { data: sessionPaidData, error: sessionPaidErr }] =
    useGetSessionAlreadyPaidMutation();
  const [monthlyPaid, { data: monthlyPaidData, error: monthlyPaidErr }] =
    useGetMonthlyAlreadyPaidMutation();

  const { data: userSubscriptions } = useGetSpecificSubscriptionQuery(
    data?.user?.UserID,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { IsEmailVerified, userPaymongoArg } = useSelector(
    (state: RootState) => state.subscription
  );

  const [
    processOnlinePayment,
    {
      data: processOnlineData,
      error: processOnlineErr,
      status: processOnlineStat,
    },
  ] = useProcessOnlinePaymentMutation();

  const { isConnected } = useIsNetworkConnected();
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, error: emailErr },
  ] = useSendEmailPaymentVerificationMutation();

  useEffect(() => {
    if (data?.user?.SubscriptionType === SubscriptionTypeEnum.Session) {
      sessionPaid(data?.user?.UserID);
    } else {
      monthlyPaid(data?.user?.UserID);
    }
  }, [processOnlineData, subscriptionData]);

  useRefetchOnMessage("refresh_subscriptionPage", () => {
    dispatch(subscriptionApi.util.invalidateTags(["subscriptions"]));
  });

  useRefetchOnMessage("refresh_user", () => {
    dispatch(authslice.util.invalidateTags(["auth"]));
  });

  // console.log("user access token", data);
  // console.log("specific subscriptions", userSubscriptions);
  // console.log("details status", status);
  // console.log("subs data", subscriptionData);
  // console.log("subs error", error);

  const payment_methods = [
    { id: "1", label: "Online Payment (GCash, Paymaya)", value: "1" },
    { id: "2", label: "Cash", value: "2" },
  ];

  // const bank_transfer = [{ label: "BDO", value: "1" }];
  // const e_wallets = [
  //   { label: "G-Cash", value: "1" },
  //   { label: "Paymaya", value: "2" },
  //   { label: "GrabPay", value: "3" },
  // ];

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
    if (error?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", error?.data?.message);
    }
    if (status === "fulfilled") {
      // DisplayAlert("Success message", "Payment Uploaded successfully!");
      // dispatch(setIsEmailVerified(false));

      const runSendOTP = async () => {
        await sendOTPEmail({ Email: data?.user?.Email! })
          .unwrap()
          .then((payload) => {
            dispatch(setOTPToken(payload?.code));
            navigation.navigate("DetailedScreens", {
              screen: "Subscription Confirmation",
            });
          });
      };
      runSendOTP();
      setSelectedSubscription("");
      removePhoto();
      setPaymentMethod("");
    }
  }, [status]);

  useEffect(() => {
    if (IsEmailVerified) {
      processOnlinePayment(userPaymongoArg);
    }
  }, [IsEmailVerified]);

  useEffect(() => {
    if (processOnlineStat === "fulfilled") {
      console.log(
        "process online payment data",
        processOnlineData?.data?.attributes?.checkout_url!
      );
      navigation.navigate("DetailedScreens", {
        screen: "Process Checkout",
      });
      dispatch(setUserPaymentEmail(data?.user?.Email!));
      dispatch(setCheckOutId(processOnlineData?.data?.id));
      dispatch(
        setCheckOutUrl(processOnlineData?.data?.attributes?.checkout_url)
      );
      dispatch(setClientKey(processOnlineData?.data?.attributes?.client_key));
    }
  }, [processOnlineStat]);

  const handlePayment = () => {
    const checkOutDetails: ILineItems[] = [
      {
        currency: "PHP",
        amount:
          data?.user.SubscriptionType === SubscriptionTypeEnum.Session
            ? SubscriptionAmount.SESSION
            : SubscriptionAmount.MONTHLY,
        name: data?.user.SubscriptionType!,
        quantity: 1,
      },
    ];

    DialogBox({
      dialogTitle: "Process Payment",
      dialogDescription:
        "Please note: in the process of online payment you may avoid closing or going back to the screen to not interrupt or exit the processing of payment. Thank you!",
      async handlePress(args) {
        const arg = {
          UserID: data?.user?.UserID!,
          SubscriptionAmount:
            data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
              ? 90
              : 900,
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
          SubscriptionEntryDate: getCurrentDate(),
        };
        dispatch(createSubscription(arg));
        const paymentDetails: CheckoutPayload = {
          name: data?.user.LastName + " " + data?.user.FirstName,
          email: data?.user?.Email!,
          phone: data?.user?.ContactNumber!,
          line_items: checkOutDetails,
          payment_method_types: ["gcash", "paymaya", "grab_pay", "card"],
        };

        if (tokenErr?.status === HTTP_ERROR.BAD_REQUEST) {
          DisplayAlert("Error message", tokenErr?.data?.message);
          return;
        }

        dispatch(setUserPaymongoArg(paymentDetails));
        dispatch(setIsUserPayOnline(true));
        const runSendOTP = async () => {
          await sendOTPEmail({ Email: data?.user?.Email! })
            .unwrap()
            .then((payload) => {
              dispatch(setOTPToken(payload?.code));
              navigation.navigate("DetailedScreens", {
                screen: "Subscription Confirmation",
              });
            });
        };
        runSendOTP();

        console.log("in subscription screen url", checkout_url);
      },
    });
  };

  const handleUpload = async () => {
    DialogBox({
      dialogTitle: "Proceed payment?",
      dialogDescription:
        "Please proceed to counter or approach gym owner before clicking the confirm action.",
      async handlePress(args) {
        const arg = {
          UserID: data?.user?.UserID,
          SubscriptionAmount:
            data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
              ? 90
              : 900,
          SubscriptionBy: `${data?.user?.FirstName} ${data?.user?.MiddleName}. ${data?.user?.LastName}`,
          SubscriptionType:
            data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
              ? SubscriptionTypeEnum.Session
              : SubscriptionTypeEnum.Monthly,
          SubscriptionStatus: "pending",
          SubscriptionMethod: "Cash",
          SubscriptionEntryDate: getCurrentDate(),
        };

        const runSendPayment = async () => {
          await sendPayment(arg);
        };
        runSendPayment();
      },
    });
  };
  console.log("component mounted", IsEmailVerified);
  // const handleUpload = () => {
  //   DialogBox({
  //     dialogTitle: "Upload payment?",
  //     dialogDescription: "The gym owner will review your uploaded payment.",
  //     async handlePress(args) {
  //       const pathToFolder =
  //         data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
  //           ? "Payments/Session/"
  //           : "Payments/Monthly/";

  //       const url = await uploadImage(
  //         image,
  //         pathToFolder,
  //         "image",
  //         loading,
  //         setLoading
  //       );

  //       console.log("proof of payment ", url);
  //       const arg = {
  //         UserID: data?.user?.UserID,
  //         SubscriptionAmount:
  //           data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
  //             ? SubscriptionAmount.SESSION
  //             : SubscriptionAmount.MONTHLY,
  //         SubscriptionBy: `${data?.user?.FirstName} ${data?.user?.MiddleName}. ${data?.user?.LastName}`,
  //         SubscriptionType:
  //           data?.user?.SubscriptionType === SubscriptionTypeEnum.Session
  //             ? SubscriptionTypeEnum.Session
  //             : SubscriptionTypeEnum.Monthly,
  //         SubscriptionMethod:
  //           paymentMethod === "1"
  //             ? SubscriptionMethod.GCASH
  //             : paymentMethod === "2"
  //             ? SubscriptionMethod.PAYMAYA
  //             : paymentMethod === "3"
  //             ? SubscriptionMethod.CREDITCARD
  //             : SubscriptionMethod.CASH,
  //         SubscriptionUploadedImage: url,
  //         SubscriptionEntryDate: getCurrentDate(),
  //       };
  //       sendPayment(arg);
  //     },
  //   });
  // };

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
  if (isUninitialized || isFetching || emailStat === "pending") {
    return <LoadingIndicator />;
  }

  if (userSubscriptions?.result[0]?.SubscriptionStatus) {
    return <Subscriptions {...userSubscriptions.result[0]} />;
  }
  // console.log("subscription already paid Data", sessionPaidData);

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
            Step 2. for (online payment). You will be redirected to an online
            payment gateway to process your payment. Online payment supports
            gcash, and paymaya. for (cash). You will need to contact the gym
            owner or proceed to their counter before proceeding to upload or
            send the payment for this app.
          </Text>
        </View>

        {sessionPaidErr?.status === 401 && (
          <DropdownComponent
            searchPlaceholder="Select payment method..."
            data={payment_methods}
            handleChange={setPaymentMethod}
            value={paymentMethod}
          />
        )}

        {monthlyPaidErr?.status === 401 && (
          <DropdownComponent
            searchPlaceholder="Select payment method..."
            data={payment_methods}
            handleChange={setPaymentMethod}
            value={paymentMethod}
          />
        )}
        {/* <View style={styles.redirectBtns}>
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
                  const pla tform =
                    Platform.OS === "android"
                      ? "market://launch?id=ph.com.metrobank.mcc.mbonline&hl=en"
                      : "https://itunes.apple.com/us/app/metrobank-app/id1536081176";

                  openAppSpecific(platform);
                }}
              />
            </View>
          )}
        </View> */}
        {/* {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: "100%" }}
            resizeMode="center"
          />
        )} */}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Session &&
          sessionPaidErr?.status === 401 && (
            <Text style={styles.textStyle}>
              You have a due amount of 90.00 PHP
            </Text>
          )}
        {sessionPaidData?.status === 200 && (
          <Text style={styles.successText}>
            You already paid today for your {data?.user?.SubscriptionType}{" "}
            Subscription.
          </Text>
        )}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Monthly &&
          monthlyPaidErr?.status === 401 && (
            <Text style={styles.textStyle}>
              You have a due amount of 900.00 PHP
            </Text>
          )}

        {monthlyPaidData?.status === 200 && (
          <Text style={styles.successText}>
            You already paid today for your {data?.user?.SubscriptionType}{" "}
            Subscription. The expected end for your subscription till{" "}
            {new Date(
              monthlyPaidData?.result?.[0]?.SubscriptionExpectedEnd!
            ).toDateString()}
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

        {/* {paymentMethod !== "" && paymentMethod !== "4" ? (
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
        )} */}
        {paymentMethod === "1" && (
          <View style={{ width: "85%", alignSelf: "center", marginTop: 10 }}>
            <Button title="Process online payment" onPress={handlePayment} />
          </View>
        )}
        {paymentMethod === "2" && (
          <View style={{ width: "85%", alignSelf: "center", marginTop: 10 }}>
            <Button title="Proceed" onPress={handleUpload} />
          </View>
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
  successText: {
    color: "green",
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
