import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { setRoute } from "reducers/routeReducer";
import { getAllPostsAction } from "actions/newsfeedAction";
import { FlatList } from "react-native-gesture-handler";
import Postsfeed from "../view_detailed_screens/Newsfeed/Postsfeed";
import LoadingIndicator from "components/LoadingIndicator";
import getAccessToken from "actions/homeAction";
import { INewsFeed } from "utils/types/newsfeed.types";
import { useNavigation } from "@react-navigation/native";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useGetAllPostInFeedQuery } from "reducers/newsfeedReducer";
import { useGetUserRecordsQuery } from "reducers/attendanceReducer";

const Newsfeed = () => {
  const { isError, data: user } = useGetAccessTokenQuery();
  const { data: userRecord } = useGetUserRecordsQuery(user?.user?.UserID);

  const {
    isFetching,
    isUninitialized,
    data: posts,
  } = useGetAllPostInFeedQuery(userRecord?.result[0]?.SubscriptionType, {
    refetchOnMountOrArgChange: true,
  });

  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Newsfeed"));
  }, []);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return (
      <View>
        <Text>You are not authenticated! Please Login again!</Text>
      </View>
    );
  }

  // console.log("feed", result);
  // console.log("feed", isAuthenticated);
  // console.log("feed", message);
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
