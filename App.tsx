import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import global_axios from "./global/axios";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.jsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
