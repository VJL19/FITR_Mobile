import { Text, View, StyleSheet, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
const SignInScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text>SignInScreen</Text>
      <View style={{ width: "90%" }}>
        <Button
          title="Sign In"
          color="#131313"
          onPress={() => navigation.navigate("DashboardScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
