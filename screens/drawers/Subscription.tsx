import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DropdownComponent from "../../components/DropdownComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { checkUserScanQr } from "../../actions/attendanceAction";
import LoadingIndicator from "../../components/LoadingIndicator";

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const { user: subscription, isLoading } = useSelector(
    (state: RootState) => state.attendance
  );
  const { user } = useSelector((state: RootState) => state.authReducer);
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
    dispatch(checkUserScanQr(user));
  }, []);

  console.log(subscription, "current subscription");

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Subscription</Text>
      <Text>Select a payment method: </Text>
      {subscription.SubscriptionType === "Session" && (
        <Text style={styles.textStyle}>You have a due amount of 90.00</Text>
      )}
      {subscription.SubscriptionType === "Monthly" && (
        <Text style={styles.textStyle}>You have a due amount of 900.00</Text>
      )}

      <DropdownComponent
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
      )}
      {paymentMethod !== "" && (
        <View style={{ flex: 1, width: "85%" }}>
          <Button title="Pay now" color={"#ff2e00"} />
        </View>
      )}
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  textStyle: {
    color: "#f5f5f5",
    fontSize: 23,
  },
});
