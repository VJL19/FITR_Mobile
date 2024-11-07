import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionHistoryByDateMutation,
  useGetSubscriptionHistoryQuery,
} from "reducers/subscriptionReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import LoadingIndicator from "components/LoadingIndicator";
import { IPost } from "utils/types/post.types";
import SubscriptionHistoryLists from "./SubscriptionHistoryLists";
import {
  ISubscriptionHistoryDate,
  ISubscriptions,
} from "utils/types/subscriptions.types";
import DatePicker from "components/DatePicker";
import DisplayFormError from "components/DisplayFormError";
import { useForm } from "react-hook-form";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { joiResolver } from "@hookform/resolvers/joi";
import { subscriptionHistorySchema } from "utils/validations";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const SubscriptionHistory = () => {
  const { isError, data } = useGetAccessTokenQuery();

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ISubscriptionHistoryDate>({
    resolver: joiResolver(subscriptionHistorySchema),
  });
  const [showPicker, setShowPicker] = useState(false);

  // const {
  //   data: subscriptionHistory,
  //   isFetching,
  //   isUninitialized,
  // } = useGetSubscriptionHistoryQuery(data?.user?.UserID, {
  //   refetchOnMountOrArgChange: true,
  // });

  const [
    getSubscriptionHistory,
    { data: subscriptionHistory, isLoading, error },
  ] = useGetSubscriptionHistoryByDateMutation();
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    getSubscriptionHistory({
      UserID: data?.user?.UserID!,
      selectedDate: new Date().toISOString().split("T")[0],
    });
  }, []);
  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const { type } = event;
    if (type == "set") {
      const currentDate = selectedDate;
      setValue("subscriptionDate", currentDate!.toDateString());

      if (Platform.OS === "android") {
        toggleDatePicker();
        setValue("subscriptionDate", currentDate!.toDateString());
      }
      console.log(currentDate!.toISOString().split("T")[0]);
      getSubscriptionHistory({
        UserID: data?.user?.UserID!,
        selectedDate: currentDate!.toISOString().split("T")[0],
      });
    } else {
      toggleDatePicker();
    }
    console.log("subscription history data", subscriptionHistory);

    console.log("subscription history error", error);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }
  if (error?.status === HTTP_ERROR.BAD_REQUEST) {
    return <CustomError />;
  }
  if (subscriptionHistory?.result?.length === 0) {
    return (
      <React.Fragment>
        <DatePicker
          control={control}
          errors={errors}
          onChangeDate={onChangeDate}
          showPicker={showPicker}
          toggleDatePicker={toggleDatePicker}
          placeholder="Enter subscription date"
        />
        <DisplayFormError errors={errors.subscriptionDate} />
        <Text style={styles.labelStyle}>
          Selected Date: {getValues("subscriptionDate")}
        </Text>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            Your subscription history for this selected date is empty!
          </Text>
        </View>
      </React.Fragment>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <DatePicker
        control={control}
        errors={errors}
        onChangeDate={onChangeDate}
        showPicker={showPicker}
        toggleDatePicker={toggleDatePicker}
        placeholder="Enter subscription date"
      />
      <DisplayFormError errors={errors.subscriptionDate} />
      <Text style={styles.labelStyle}>
        Selected Date: {getValues("subscriptionDate")}
      </Text>
      <FlatList
        alwaysBounceVertical={true}
        data={subscriptionHistory?.result}
        renderItem={({ item }) => <SubscriptionHistoryLists {...item} />}
        ListFooterComponent={<View style={{ height: 200 }} />}
        keyExtractor={(item: ISubscriptions) =>
          item?.SubscriptionID?.toString()
        }
      />
    </View>
  );
};

export default SubscriptionHistory;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
  },
});
