import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RootApp from "./RootApp";
import AuthContextProvider from "./context/AuthContext";
export default function App() {
  return (
    <Provider store={store}>
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
