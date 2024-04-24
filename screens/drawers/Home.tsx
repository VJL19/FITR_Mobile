import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { increment, incrementByAmount } from "../../reducers/counterReducer";

const Home = () => {
  const [isReady, setIsReady] = useState(false);

  const { value, name } = useSelector((state: RootState) => state.counter);

  const dispatch: AppDispatch = useDispatch();
  console.log(value);
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
      <Text>{value}</Text>
      <Text>Name: {name}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button
        title="Increment By Amount"
        onPress={() => dispatch(incrementByAmount(50))}
      />
    </SafeAreaView>
  );
};

export default Home;
