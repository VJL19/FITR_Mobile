import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import CheckoutScreen from "components/CheckoutScreen";
import useIsReady from "hooks/useIsReady";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setRoute } from "reducers/routeReducer";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAllAnnoucementsQuery } from "reducers/announcementReducer";
import AnnouncementLists from "screens/view_detailed_screens/Announcements/AnnouncementLists";
import { IAnnouncements } from "utils/types/announcement.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const Announcements = () => {
  const { isError } = useGetAccessTokenQuery();
  const {
    data: announcementData,
    isFetching,
    isUninitialized,
  } = useGetAllAnnoucementsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Announcements"));
  }, []);
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }

  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Announcement",
    });
  };

  console.log(announcementData);
  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={true}
        data={announcementData?.result}
        renderItem={({ item }) => <AnnouncementLists {...item} />}
        keyExtractor={(item: IAnnouncements) =>
          item?.AnnouncementID?.toString()
        }
      />
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
