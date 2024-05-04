import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setRoute } from "../../reducers/routeReducer";
import { getAllPostsAction } from "../../actions/newsfeedAction";
import { FlatList } from "react-native-gesture-handler";
import Postsfeed from "../view_detailed_screens/Newsfeed/Postsfeed";
import LoadingIndicator from "../../components/LoadingIndicator";

const Newsfeed = () => {
  const dispatch: AppDispatch = useDispatch();

  const { result, isLoading } = useSelector(
    (state: RootState) => state.newsfeed
  );
  useEffect(() => {
    dispatch(setRoute("Newsfeed"));
    dispatch(getAllPostsAction());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  console.log("feed", result);
  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={true}
        data={result}
        renderItem={({ item }: { item: INewsFeed }) => <Postsfeed {...item} />}
        keyExtractor={(item) => item.NewsfeedID}
      />

      <Text>Newsfeed</Text>
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
