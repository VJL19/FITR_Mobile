import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setRoute } from "../../reducers/routeReducer";
import { getAllPostsAction } from "../../actions/newsfeedAction";
import { FlatList } from "react-native-gesture-handler";
import Postsfeed from "../view_detailed_screens/Newsfeed/Postsfeed";
import LoadingIndicator from "../../components/LoadingIndicator";
import getAccessToken from "../../actions/homeAction";

const Newsfeed = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isAuthenticated, message } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { result, isLoading } = useSelector(
    (state: RootState) => state.newsfeed
  );

  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(setRoute("Newsfeed"));
    dispatch(getAllPostsAction());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!isAuthenticated) {
    return (
      <View>
        <Text>You are not authenticated! Please Login again!</Text>
      </View>
    );
  }
  console.log("feed", result);
  console.log("feed", isAuthenticated);
  console.log("feed", message);
  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={true}
        data={result}
        renderItem={({ item }: { item: INewsFeed }) => <Postsfeed {...item} />}
        keyExtractor={(item) => item.NewsfeedID}
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
