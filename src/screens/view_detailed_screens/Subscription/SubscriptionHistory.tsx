import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetSubscriptionHistoryQuery } from "reducers/subscriptionReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import LoadingIndicator from "components/LoadingIndicator";
import { IPost } from "utils/types/post.types";
import SubscriptionHistoryLists from "./SubscriptionHistoryLists";
import { ISubscriptions } from "utils/types/subscriptions.types";

const SubscriptionHistory = () => {
  const { isError, data } = useGetAccessTokenQuery();

  const {
    data: subscriptionHistory,
    isFetching,
    isUninitialized,
  } = useGetSubscriptionHistoryQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }

  if (subscriptionHistory?.result?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your Subscription history is empty!</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        alwaysBounceVertical={true}
        data={subscriptionHistory?.result}
        renderItem={({ item }) => <SubscriptionHistoryLists {...item} />}
        keyExtractor={(item: ISubscriptions) =>
          item?.SubscriptionID?.toString()
        }
      />
    </View>
  );
};

export default SubscriptionHistory;

const styles = StyleSheet.create({});
