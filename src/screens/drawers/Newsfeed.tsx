import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setRoute } from "reducers/routeReducer";
import { FlatList } from "react-native-gesture-handler";
import Postsfeed from "../view_detailed_screens/Newsfeed/Postsfeed";
import LoadingIndicator from "components/LoadingIndicator";
import { INewsFeed } from "utils/types/newsfeed.types";
import { useNavigation } from "@react-navigation/native";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  newsfeedslice,
  useGetAllPostInFeedQuery,
} from "reducers/newsfeedReducer";
import { useGetUserRecordsQuery } from "reducers/attendanceReducer";
import CustomError from "components/CustomError";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";

export const Newsfeed = () => {
  const { isError, data: user } = useGetAccessTokenQuery();
  const { data: userRecord } = useGetUserRecordsQuery(user?.user?.UserID);

  const {
    isFetching,
    isUninitialized,
    data: posts,
  } = useGetAllPostInFeedQuery(user?.user?.SubscriptionType, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch: AppDispatch = useDispatch();

  useRefetchOnMessage("refresh_post", () => {
    dispatch(newsfeedslice.util.invalidateTags(["newsfeed"]));
  });
  useRefetchOnMessage("refresh_user", () => {
    dispatch(newsfeedslice.util.invalidateTags(["newsfeed"]));
  });

  useEffect(() => {
    dispatch(setRoute("Newsfeed"));
  }, []);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (posts?.result?.length === 0) {
    return (
      <View>
        <Text>
          There are no posts currently between {user?.user?.SubscriptionType}
        </Text>
      </View>
    );
  }
  if (isError) {
    return <CustomError />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={true}
        data={posts?.result}
        renderItem={({ item }: { item: INewsFeed }) => <Postsfeed {...item} />}
        keyExtractor={(item) => item?.NewsfeedID?.toString()}
      />
    </View>
  );
};
export default Newsfeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
