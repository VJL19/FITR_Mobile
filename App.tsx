import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigators/RootStack";
import SplashScreen from "./screens/SplashScreen";
import AuthRootScreen from "./screens/AuthRootScreen";
import DashboardScreen from "./screens/DashboardScreen";
import BottomRootScreen from "./screens/BottomRootScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootStack.Navigator
          screenOptions={{ headerShown: false, freezeOnBlur: true }}
        >
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen
            name="AuthStackScreens"
            component={AuthRootScreen}
          />
          <RootStack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
          />
          <RootStack.Screen name="BottomTab" component={BottomRootScreen} />
        </RootStack.Navigator>
        {/* <View style={styles.container}>
        <Text>Open up App.jsx to start working on your app!</Text>
        <Button title="Click Me" onPress={handleClick} />
      </View> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
