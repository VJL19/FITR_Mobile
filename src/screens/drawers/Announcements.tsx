import { FlatList, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import CheckoutScreen from "components/CheckoutScreen";
import useIsReady from "hooks/useIsReady";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setRoute } from "reducers/routeReducer";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import {
  announcementApi,
  useGetAllAnnoucementsQuery,
} from "reducers/announcementReducer";
import AnnouncementLists from "screens/view_detailed_screens/Announcements/AnnouncementLists";
import { IAnnouncements } from "utils/types/announcement.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import SearchBar from "components/SearchBar";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [queryAnnouncement, setQueryAnnouncement] = useState<
    IAnnouncements[] | []
  >();
  useEffect(() => {
    dispatch(setRoute("Announcements"));
  }, []);

  useRefetchOnMessage("refresh_announcement", () => {
    dispatch(announcementApi.util.invalidateTags(["announcement"]));
  });

  useEffect(() => {
    setQueryAnnouncement(announcementData?.result);
  }, [announcementData?.result]);
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

  const handleChange = (text: string) => {
    const formattedQuery = text.toLowerCase();

    if (formattedQuery) {
      const filteredAnnouncement = announcementData?.result.filter(
        (announcement) =>
          announcement.AnnouncementTitle.toLowerCase().includes(formattedQuery)
      );

      setQueryAnnouncement(filteredAnnouncement);
    } else {
      setQueryAnnouncement(announcementData?.result);
    }
    setSearchQuery(formattedQuery);
  };

  console.log(announcementData);
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", marginTop: 25 }}>
        <SearchBar
          placeholder="Search announcement"
          handleChangeText={handleChange}
          value={searchQuery}
        />
      </View>
      <FlatList
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        alwaysBounceVertical={true}
        data={queryAnnouncement}
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
