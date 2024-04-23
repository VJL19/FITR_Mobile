import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const Programs = () => {
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
      <Text>Programs</Text>
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({});
