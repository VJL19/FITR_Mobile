import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
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
import { useGetAccessTokenQuery } from "reducers/authReducer";
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

  useRefetchOnMessage("refresh_subscriptionPage", () => {
    dispatch(subscriptionApi.util.invalidateTags(["subscriptions"]));
  });

  console.log("user access token", data);
  // console.log("specific subscriptions", userSubscriptions);
  // console.log("details status", status);
  // console.log("subs data", subscriptionData);
  // console.log("subs error", error);

  const payment_methods = [
    { id: "1", label: "G-Cash", value: "1" },
    { id: "2", label: "Paymaya", value: "2" },
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

        DisplayAlert("Success message", "Payment Uploaded successfully!");
        removePhoto();
        setSelectedSubscription("");
      },
    });
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

        <DropdownComponent
          searchPlaceholder="Select payment method..."
          data={payment_methods}
          handleChange={setPaymentMethod}
          value={paymentMethod}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: "100%" }}
            resizeMode="center"
          />
        )}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Session && (
          <Text style={styles.textStyle}>You have a due amount of 90.00</Text>
        )}
        {data?.user?.SubscriptionType === SubscriptionTypeEnum.Monthly && (
          <Text style={styles.textStyle}>You have a due amount of 900.00</Text>
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
        {image !== IMAGE_VALUES.DEFAULT ? (
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
});
