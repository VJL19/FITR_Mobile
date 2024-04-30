import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";

const Programs = () => {
  const [isReady, setIsReady] = useState(false);

  const navigation = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text
        style={styles.textStyle}
        onPress={() =>
          navigation.navigate("DetailedScreens", { screen: "Add Programs" })
        }
      >
        Add Programs
      </Text>
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  textStyle: {
    color: "#f5f5f5",
  },
});
