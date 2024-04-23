import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const Favorites = () => {
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
    <View>
      <Text>Favorites</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
