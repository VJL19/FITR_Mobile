import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RootApp from "./RootApp";
import AuthContextProvider from "./context/AuthContext";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import LoadingIndicator from "./components/LoadingIndicator";
import useFontsLoaded from "./hooks/useFontsLoaded";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import theme from "./assets/themes/theme";

export default function App() {
  const fontsLoaded = useFontsLoaded();
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2500);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContextProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <RootApp />
            {/* <View style={styles.container}>
        <Text>Open up App.jsx to start working on your app!</Text>
        <Button title="Click Me" onPress={handleClick} />
      </View> */}
          </NavigationContainer>
        </AuthContextProvider>
      </PaperProvider>
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
