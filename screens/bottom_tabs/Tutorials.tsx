import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const Tutorials = () => {
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
      <Text>Tutorials</Text>
    </View>
  );
};

export default Tutorials;

const styles = StyleSheet.create({});
