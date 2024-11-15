import React, { useContext, useEffect, useState } from "react";
import DrawerStack from "navigators/DrawerStack";
import BottomRootScreen from "./BottomRootScreen";
import CustomDrawer from "components/CustomDrawer";
import drawerIcon from "components/drawerIcon";
import { View, Text, StyleSheet } from "react-native";
import CustomNotification from "components/CustomNotification";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import * as SecureStore from "expo-secure-store";
import global_axios from "global/axios";
import {
  CommonActions,
  Route,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackScreenProp,
} from "utils/types/navigators/RootStackNavigators";
import { AuthContext } from "context/AuthContext";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import {
  authslice,
  setToken,
  useAddExpoNotifTokenMutation,
  useGetAccessTokenQuery,
} from "reducers/authReducer";
import {
  useGetAllNotificationsCountQuery,
  notificationApi,
  setNotificationCount,
  setExpoNotifToken,
} from "reducers/notificationReducer";
import { io } from "socket.io-client";
import loadConfig from "global/config";
import {
  IsPushNotificationReceived,
  registerForPushNotificationsAsync,
} from "utils/helpers/ExpoNotifications";
const config = loadConfig();
const socket = io(`${config.SOCKET_URL}`);
const DashboardScreen = ({ navigation }: RootStackScreenProp) => {
  const { route: nav } = useSelector((state: RootState) => state.route);
  const { isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { data, isError, refetch, status } = useGetAccessTokenQuery();

  const { data: count } = useGetAllNotificationsCountQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch: AppDispatch = useDispatch();
  const [addExpoToken, { data: expoData, status: expoStat }] =
    useAddExpoNotifTokenMutation();
  const [expoToken, setExpoToken] = useState<string | undefined>("");
  let messageType = "refresh_user";
  useEffect(() => {
    const handleMessage = (data: { refresh_token: string }) => {
      dispatch(setToken(data?.refresh_token));
      dispatch(authslice.util.invalidateTags(["auth"]));
      const setTokenAsync = async () => {
        await SecureStore.setItemAsync("accessToken", data?.refresh_token!);
      };
      setTokenAsync();
      console.log("got the token in client", data);
    };

    //listens to any event emitted by the server and refetch the data
    socket?.on(messageType, handleMessage);
    dispatch(setToken(accessToken));
    refetch();
    return () => {
      socket?.off(messageType, handleMessage);
    };
  }, [messageType]);

  useEffect(() => {
    const getExpoToken = async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoToken(token);
    };
    getExpoToken();
  }, []);

  useEffect(() => {
    const isReceived = IsPushNotificationReceived(expoToken);
    if (isReceived) {
      addExpoToken({ Email: data?.user?.Email, ExpoNotifToken: expoToken });
      dispatch(setExpoNotifToken(expoToken));
      const setExpoTokenAsync = async () => {
        await SecureStore.setItemAsync("expoNotifToken", expoToken!);
      };
      setExpoTokenAsync();
    }
    console.log("run isreceived token");
  }, [expoToken]);

  //refresh notif counts when mutation is perform on the server.
  useRefetchOnMessage("refresh_post", () => {
    dispatch(notificationApi.util.invalidateTags(["notifications"]));
  });
  useEffect(() => {
    dispatch(setNotificationCount(count?.result?.[0].NotificationCount));
    // dispatch(setToken(data?.accessToken));
    // const setTokenAsync = async () => {
    //   await SecureStore.setItemAsync("accessToken", data?.accessToken!);
    // };
    // setTokenAsync();
    // refetch();
  }, []);
  function getHeaderTitle(route: Partial<Route<string>>) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? nav.name;

    switch (routeName) {
      case "Home_Bottom":
        return nav.name;
      case "Programs":
        return "Programs";
      case "Tutorials":
        return "Tutorials";
      case "Favorites":
        return "Favorites";
    }
  }

  const { logOut } = useContext(AuthContext);

  // console.log("routes", route.name);
  // console.log("my accesstoken", accessToken);

  // console.log("in dashboard,", isAuthenticated);

  // useEffect(() => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "DashboardScreen" }],
  //   });
  //   console.log("dashboard use effect");
  // }, []);

  const checkAccessToken = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) {
      navigation.replace("AuthStackScreens", { screen: "Sign In" });
    } else {
      navigation.replace("DashboardScreen");
    }
  };
  // console.log("dashboard", status);

  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        unmountOnBlur: true,
        headerBackground: () => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "#ff2e00",
                shadowColor: "#000000",
                elevation: 10,
              }}
            />
          );
        },
        drawerStyle: {
          width: 310,
        },
        headerTintColor: "#f5f5f5",
        headerRight: (props) => (
          <View>
            {/* <Button
              title="Logout"
              onPress={async () => {
                await SecureStore.deleteItemAsync("accessToken");
                global_axios.defaults.headers.common["Authorization"] = "";
                Alert.alert("Logout message", "", [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => {} },
                ]);
                console.log("token deleted successfully!");
              }}
            /> */}
            <CustomNotification {...props} />
          </View>
        ),
        drawerLabelStyle: {
          marginLeft: -7,
          fontFamily: "Inter-SemiBold",
          fontSize: 16,
        },
        drawerActiveBackgroundColor: "#rgba(255,45,0, .2)",
        drawerActiveTintColor: "#ff2e00",
      })}
    >
      <DrawerStack.Screen
        name="HomeDrawer"
        component={BottomRootScreen}
        options={{
          title: "Home",
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "home";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Announcements"
        component={BottomRootScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleStyle: styles.title,
          title: "Announcements",
          drawerIcon: ({ color, focused, size }) => {
            const name = "megaphone";
            return drawerIcon({ color, size, focused, name });
          },
        })}
      />
      <DrawerStack.Screen
        name="Attendance"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "newspaper";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Pay"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "card";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Calculate BMI"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "calculator";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Newsfeed"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "newspaper";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="My Posts"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "person-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />

      <DrawerStack.Screen
        name="About MJeshter"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerItemStyle: {
            borderTopWidth: 1.5,
            borderTopColor: "#ccc",
          },
          drawerIcon: ({ color, focused, size }) => {
            const name = "information-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Terms and Conditions"
        component={BottomRootScreen}
        options={{
          headerStyle: {
            height: 120,
          },

          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "information-circle";

            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="My Account"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "settings";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Sign Out"
        component={BottomRootScreen}
        options={{
          headerTitleStyle: styles.title,
          drawerIcon: ({ color, focused, size }) => {
            const name = "arrow-back";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
  },
});
