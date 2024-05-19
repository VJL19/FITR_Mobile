import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setRoute } from "reducers/routeReducer";

const About = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("About MJeshter"));
  }, []);
  return (
    <View style={styles.container}>
      <Text>About us</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
});
