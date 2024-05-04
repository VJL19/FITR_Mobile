import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  AppState,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { increment, incrementByAmount } from "../../reducers/counterReducer";
import getAccessToken from "../../actions/homeAction";
import { setRoute } from "../../reducers/routeReducer";
import { useRoute } from "@react-navigation/native";
// import { fetchUsers } from "../../reducers/authReducer";
const Home = () => {
  // console.log("TTT", auth);
  const { value, name } = useSelector((state: RootState) => state.counter);
  const { message, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  console.log("message: ", message);
  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("user: ", user);
  // console.log(value);
  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(setRoute("Home"));
    // dispatch(fetchUsers());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Text style={{ color: "#f5f5f5", fontWeight: "bold", fontSize: 25 }}>
        Home
      </Text>
      <Text>{value}</Text>
      <Text>Name: {name}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button
        title="Increment By Amount"
        onPress={() => dispatch(incrementByAmount(50))}
      />
      {/* <Button title="Get Data" onPress={() => dispatch(fetchUsers())} /> */}
    </SafeAreaView>
  );
};

export default Home;
