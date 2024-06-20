import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import LoadingIndicator from "components/LoadingIndicator";
import SubscriptionTypeEnum, {
  SubscriptionAmount,
} from "utils/enums/Subscription";
import processPayment, {
  CheckoutPayload,
  ILineItems,
} from "actions/subscriptionAction";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setRoute } from "reducers/routeReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useCheckUserScanQrQuery } from "reducers/attendanceReducer";

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState(0);

  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  const { details, error, status, checkout_url } = useSelector(
    (state: RootState) => state.subscription
  );

  const { data, isFetching, isUninitialized, isError } =
    useGetAccessTokenQuery();
  const { user } = data!;
  const { data: subscription } = useCheckUserScanQrQuery(user?.UserID);

  console.log("details subs", details);
  console.log("details error", error);
  console.log("details status", status);

  const subscription_types = [
    { label: "Cash", value: "1" },
    { label: "Bank Transfer", value: "2" },
    { label: "E-Wallet", value: "3" },
  ];

  const bank_transfer = [{ label: "BDO", value: "1" }];
  const e_wallets = [
    { label: "G-Cash", value: "1" },
    { label: "Paymaya", value: "2" },
    { label: "GrabPay", value: "3" },
  ];

  console.log(paymentMethod);
  useEffect(() => {
    dispatch(setRoute("Subscription"));
  }, []);

  console.log(subscription, "current subscription");

  const handlePayment = () => {
    const checkOutDetails: ILineItems[] = [
      {
        currency: "PHP",
        amount:
          subscription?.user.SubscriptionType === SubscriptionTypeEnum.Session
            ? SubscriptionAmount.SESSION
            : SubscriptionAmount.MONTHLY,
        name: subscription?.user.SubscriptionType!,
        quantity: 1,
      },
    ];

    const paymentDetails: CheckoutPayload = {
      name: user.LastName + " " + user.FirstName,
      email: user.Email,
      phone: user.ContactNumber,
      line_items: checkOutDetails,
      payment_method_types: ["gcash", "paymaya", "grab_pay", "card"],
    };

    dispatch(processPayment(paymentDetails));
    if (!isLoading) {
      navigation.navigate("DetailedScreens", {
        screen: "Process Checkout",
        params: { checkout_url: checkout_url },
      });
    }
  };

  if (isError) {
    return (
      <View>
        <Text>You are not authenticated! Please login again!</Text>
      </View>
    );
  }
  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Subscription</Text>
      <Text>Select a payment method: </Text>
      {subscription?.user.SubscriptionType === SubscriptionTypeEnum.Session && (
        <Text style={styles.textStyle}>You have a due amount of 90.00</Text>
      )}
      {subscription?.user.SubscriptionType === SubscriptionTypeEnum.Monthly && (
        <Text style={styles.textStyle}>You have a due amount of 900.00</Text>
      )}

      {/* <DropdownComponent
        searchPlaceholder="Select a payment method..."
        data={subscription_types}
        handleChange={setPaymentMethod}
        value={paymentMethod}
      />

      {paymentMethod !== "1" && paymentMethod !== "" && (
        <DropdownComponent
          searchPlaceholder="Select a bank..."
          data={paymentMethod == "3" ? e_wallets : bank_transfer}
          handleChange={setBankName}
          value={bankName}
        />
      )} */}

      <View style={{ flex: 0.2, width: "85%" }}>
        <Button title="Pay now" color={"#ff2e00"} onPress={handlePayment} />
      </View>
    </View>
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
  textStyle: {
    color: "#202020",
    fontSize: 23,
  },
});
