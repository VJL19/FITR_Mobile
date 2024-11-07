import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import SubscriptionTypeEnum from "utils/enums/Subscription";
import { useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigationProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDispatch } from "react-redux";
import { setViewSubscriptionPayload } from "reducers/subscriptionReducer";
import { AppDispatch } from "store/store";

const SubscriptionHistoryLists = ({
  SubscriptionAmount,
  SubscriptionEntryDate,
  SubscriptionStatus,
  Email,
  SubscriptionMethod,
  SubscriptionType,
  SubscriptionBy,
  ContactNumber,
}: ISubscriptions) => {
  const getSubscriptionType =
    SubscriptionAmount === 90
      ? SubscriptionTypeEnum.Session
      : SubscriptionTypeEnum.Monthly;

  const formatDate = SubscriptionEntryDate.split(", ").join("");
  console.log(formatDate);

  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation<DetailedRootStackNavigationProp>();

  const handleNavigate = () => {
    const arg = {
      SubscriptionAmount,
      SubscriptionEntryDate,
      SubscriptionStatus,
      Email,
      SubscriptionMethod,
      SubscriptionType,
      SubscriptionBy,
      ContactNumber,
    };
    dispatch(setViewSubscriptionPayload(arg));

    navigation.navigate("View Detailed Subscription History");
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onPress={handleNavigate}>
          <Text style={styles.text} numberOfLines={1}>
            SubscriptionDate: {formatDate}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionHistoryLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 20,
    height: 105,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E12900",
  },
  text: {
    fontSize: 23,
    fontFamily: "Inter-Bold",
    color: "#202020",
  },
});
