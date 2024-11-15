import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, Ref, useEffect } from "react";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import loadConfig from "global/config";
import {
  setIsEmailVerified,
  setOnlinePaymentPayload,
  useAddSubscriptionMutation,
} from "reducers/subscriptionReducer";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import DisplayAlert from "components/CustomAlert";
import {
  useExpireCheckoutSessionMutation,
  useRetrieveCheckoutSessionMutation,
} from "reducers/paymongoReducer";
import {
  setOTPToken,
  useSendEmailPaymentVerificationMutation,
} from "reducers/authReducer";
const config = loadConfig();
const ProcessCheckout = () => {
  const {
    details,
    error,
    result,
    checkout_url,
    clientKey,
    userPaymentEmail,
    message,
    checkOutStatus,
    createPayment,
  } = useSelector((state: RootState) => state.subscription);

  const [
    sendPayment,
    { data: subscriptionData, status: sendPaymentStat, error: sendPaymentErr },
  ] = useAddSubscriptionMutation();

  const {
    UserID,
    SubscriptionAmount,
    SubscriptionBy,
    SubscriptionEntryDate,
    SubscriptionMethod,
    SubscriptionType,
  } = createPayment;
  const route = useRoute<RouteProp<DetailedRootStackNavigatorsParamList>>();
  const [url, setUrl] = useState("");
  const [clientId, setClientId] = useState("");

  const navigation = useNavigation<RootStackNavigationProp>();
  const { checkOutId, status } = useSelector(
    (state: RootState) => state.subscription
  );
  const [expireSession, { status: expireStat, error: expireErr, data }] =
    useExpireCheckoutSessionMutation();
  const [retrieveCheckout, { data: sessionData, status: retrieveStatus }] =
    useRetrieveCheckoutSessionMutation();

  const dispatch: AppDispatch = useDispatch();

  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, error: emailErr },
  ] = useSendEmailPaymentVerificationMutation();
  useEffect(() => {
    if (url !== "") {
      //for success transac
      if (url.includes(`${config.BASE_URL}user/subscription/success_payment`)) {
        retrieveCheckout(checkOutId);
      }
      //for failed transac
      if (
        url.includes(`https://checkout.paymongo.com/${clientKey}?message=true`)
      ) {
        console.log("current url in use effect", url);
        retrieveCheckout(checkOutId);
      }
      dispatch(setIsEmailVerified(false));
    }
  }, [url]);

  useEffect(() => {
    if (expireStat === "fulfilled") {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "DashboardScreen" }],
      });
      navigation.dispatch(resetAction);
    }
  }, [expireStat]);
  useEffect(() => {
    if (
      retrieveStatus === "fulfilled" &&
      sessionData?.data?.attributes?.payment_intent?.attributes?.payments?.[0]
        ?.attributes?.status === "paid"
    ) {
      const arg = {
        UserID: UserID,
        SubscriptionAmount: SubscriptionAmount,
        SubscriptionBy: SubscriptionBy,
        SubscriptionType: SubscriptionType,
        SubscriptionStatus: "Fulfill",
        SubscriptionMethod: sessionData?.data?.attributes?.payment_method_used,
        SubscriptionEntryDate: SubscriptionEntryDate,
      };
      const runSendPayment = async () => {
        await sendPayment(arg);
      };
      runSendPayment();
    }
    if (
      retrieveStatus === "fulfilled" &&
      sessionData?.data?.attributes?.payment_intent?.attributes?.payments?.[0]
        ?.attributes?.status === "failed"
    ) {
      DisplayAlert(
        "Payment Error",
        sessionData?.data?.attributes?.payment_intent?.attributes?.payments?.[0]
          ?.attributes?.failed_message
      );
      const arg = {
        UserID: UserID,
        SubscriptionAmount: SubscriptionAmount,
        SubscriptionBy: SubscriptionBy,
        SubscriptionType: SubscriptionType,
        SubscriptionStatus: "Reject",
        SubscriptionMethod:
          sessionData?.data?.attributes?.payment_intent?.attributes
            ?.payments?.[0]?.attributes?.source?.type,
        SubscriptionEntryDate: SubscriptionEntryDate,
      };
      const runSendPayment = async () => {
        await sendPayment(arg);
      };
      runSendPayment();
      expireSession(checkOutId);
      navigation.goBack();
    }
  }, [retrieveStatus]);

  console.log(retrieveStatus);

  useEffect(() => {
    if (sendPaymentStat === "fulfilled") {
      dispatch(setIsEmailVerified(false));
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "DashboardScreen" }],
      });
      navigation.dispatch(resetAction);
    }
  }, [sendPaymentStat]);
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Are you sure?",
        "The checkout process will not continue upon leaving the screen. Please make sure to complete the process first before going back.",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Ok",
            style: "destructive",

            onPress: async () => {
              expireSession(checkOutId);
              dispatch(setIsEmailVerified(false));
            },
          },
        ]
      );

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  console.log("updated checkoutid", checkOutId);
  // console.log("url in reducer", checkout_url);
  // console.log("url in reducer", error);
  // console.log("url in reducer", details);
  // console.log("send payload to admin", subscriptionData);
  // console.log("send payload to admin err", sendPaymentErr);
  return (
    <React.Fragment>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: checkout_url,
        }}
        startInLoadingState={true}
        domStorageEnabled={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        style={styles.webStyle}
        onNavigationStateChange={(state) => {
          if (
            state.url.includes(
              `${config.BASE_URL}user/subscription/success_payment`
            )
          ) {
            setUrl(state.url);
          }

          if (
            state.url.includes(
              `https://checkout.paymongo.com/${clientKey}?message=true`
            )
          ) {
            setUrl(state.url);
          } else {
            setUrl("");
          }

          console.log("for admin", state.url);
        }}
      />
    </React.Fragment>
  );
};

export default ProcessCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#f5f5f5",
  },
  webStyle: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 25,
  },
});
