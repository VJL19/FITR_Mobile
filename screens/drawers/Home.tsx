import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const Home = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#202020" }}>
      <Text style={{ color: "#f5f5f5", fontWeight: "bold", fontSize: 25 }}>
        Home
      </Text>
    </SafeAreaView>
  );
};

export default Home;
