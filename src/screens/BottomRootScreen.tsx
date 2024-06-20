import { StyleSheet, Text, InteractionManager, View } from "react-native";
import React, { useEffect, useState } from "react";
import BottomTab from "navigators/BottomTab";
import { Favorites, Home, Programs, Tutorials } from "./bottom_tabs";
import {
  DrawerStackNavigationProp,
  DrawerStackScreenProp,
} from "utils/types/navigators/DrawerStackNavigators";
import {
  About,
  Announcements,
  Attendance,
  CalculateBMI,
  MyAccount,
  MyPosts,
  Newsfeed,
  SignOut,
  Subscription,
} from "./drawers";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomTabBar from "components/CustomTabBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setRoute } from "reducers/routeReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";

const BottomRootScreen = ({
  route,
}: DrawerStackScreenProp | { route: any }) => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();

  const { isUninitialized, isFetching, data, status, isError } =
    useGetAccessTokenQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  useEffect(() => {
    dispatch(setRoute(route.name));
    // navigation.setOptions({ headerTitle: route.name });
  }, []);
  const RenderTabs = () => {
    switch (route.name) {
      case "HomeDrawer":
        return <Home />;
      case "Announcements":
        return <Announcements />;
      case "Attendance":
        return <Attendance />;
      case "Newsfeed":
        return <Newsfeed />;
      case "My Posts":
        return <MyPosts />;
      case "Calculate BMI":
        return <CalculateBMI />;
      case "Pay":
        return <Subscription />;
      case "About MJeshter":
        return <About />;

      case "My Account":
        return <MyAccount />;

      case "Sign Out":
        return <SignOut />;
    }
  };

  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        unmountOnBlur: true,
        headerShown: false,
        tabBarLabel: ({ focused, position, color, children }) => {
          return (
            <Text
              style={{
                color: focused ? "#FF2E00" : "#202020",
                fontSize: 11,
              }}
            >
              {children}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let name;
          switch (route.name) {
            case "Home_Bottom":
              name = focused ? "home" : "home-outline";
              break;
            case "Programs":
              name = focused ? "barbell" : "barbell-outline";
              break;
            case "Tutorials":
              name = focused ? "play-circle" : "play-circle-outline";
              break;
            case "Favorites":
              name = focused ? "heart" : "heart-outline";
              break;
            default:
              break;
          }
          return (
            <View
              style={{
                justifyContent: "center",
                borderRadius: 50,
                paddingLeft: 25,
                paddingRight: 25,
                backgroundColor: focused ? "rgba(255,45,0, .2)" : "transparent",
                height: 45,
              }}
            >
              <Ionicons name={name} size={28} color={color} />
            </View>
          );
        },

        tabBarButton: (props) => <CustomTabBar {...props} />,
        tabBarActiveTintColor: "#FF2E00",
        tabBarInactiveTintColor: "#202020",
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          height: 80,
          flexWrap: "wrap-reverse",
          shadowColor: "#000000",
          elevation: 50,
          paddingVertical: 13,
        },
      })}
    >
      <BottomTab.Screen
        name="Home_Bottom"
        component={RenderTabs}
        options={{
          tabBarBadge: 3,
          title: "Home",
        }}
      />
      <BottomTab.Screen name="Programs" component={Programs} />
      <BottomTab.Screen name="Tutorials" component={Tutorials} />
      <BottomTab.Screen name="Favorites" component={Favorites} />
    </BottomTab.Navigator>
  );
};

export default BottomRootScreen;

const styles = StyleSheet.create({});
