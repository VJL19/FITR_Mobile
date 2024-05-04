import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "../../reducers/routeReducer";
import { AppDispatch } from "../../store/store";

const MyAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("My Account"));
  }, []);
  return (
    <View style={styles.container}>
      <Text>MyAccount</Text>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#202020",
  },
});
