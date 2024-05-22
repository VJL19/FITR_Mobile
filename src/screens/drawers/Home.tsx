import { Text, SafeAreaView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { increment, incrementByAmount } from "reducers/counterReducer";
import getAccessToken from "actions/homeAction";
import { setRoute } from "reducers/routeReducer";
import { useRoute } from "@react-navigation/native";
import useIsReady from "hooks/useIsReady";
import * as Speech from "expo-speech";
// import { fetchUsers } from "reducers/authReducer";
const Home = () => {
  // console.log("TTT", auth);
  const { isReady } = useIsReady();
  const { value, name } = useSelector((state: RootState) => state.counter);
  const { message, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

  const [voices, setVoices] = useState<Speech.Voice[]>([]);

  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  // console.log("message: ", message);
  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("user: ", user);
  // console.log(value);
  useEffect(() => {
    // dispatch(getAccessToken());
    dispatch(setRoute("Home"));

    const loadVoices = async () => {
      const res = await Speech.getAvailableVoicesAsync();
      setVoices(res);
    };
    loadVoices();

    // dispatch(fetchUsers());
  }, []);

  const text =
    "Alam mo ba girl (alam mo) Pagka wala ka dito promise ako concern (promise)'Di ka nagre-reply 'di mo pa 'ko ma-confirm (ano ba)  Ayaw mo ba sa 'kin porke wala 'kong skrt (skrt)   O ayaw mo sa 'kin kasi ikaw mas older (uh) 'Di ko pa mabigay mga luho mo't order  Malas lang 'ta mo nga 'tong hawak ko ngayon four pairs (ayos 'yan) Ako batang kalye lang kayo ay foreigners Inalok kita ng red horse sagot mo okur (okur)";
  const speak = () => {
    // en-us-x-sfg-network
    Speech.speak(text, { language: "en-US" });
  };

  // const fetchVoices = voices.map((voice) =>
  //   console.log(voice.identifier, "language" + voice.language)
  // );
  const stop = () => {
    Speech.stop();
  };

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Text style={{ color: "#f5f5f5", fontWeight: "bold", fontSize: 25 }}>
        Home
      </Text>
      <Text>{value}</Text>
      <Text>Name: {name}</Text>
      <Button title="Speak" onPress={speak} />
      <Button title="Stop" onPress={stop} />
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
