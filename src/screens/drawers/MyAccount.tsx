import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "reducers/routeReducer";
import { AppDispatch, RootState } from "store/store";
import avatar from "assets/avatar_default.jpeg";
import { myAccountSchema } from "utils/validations";
import { ScrollView } from "react-native-gesture-handler";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const MyAccount = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isError, data, isUninitialized, isFetching, refetch } =
    useGetAccessTokenQuery(undefined, {});

  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    dispatch(setRoute("My Account"));
  }, []);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }
  console.log("hey", data);
  const url = data?.user?.ProfilePic === null ? avatar : data?.user?.ProfilePic;
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <ScrollView
        style={{
          width: "90%",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Username</Text>
          <Text>{data?.user?.Username}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Email</Text>
          <Text>{data?.user?.Email}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Contact Number</Text>
          <Text>{data?.user?.ContactNumber}</Text>
        </View>
      </ScrollView>
      <View style={{ width: "90%" }}>
        <Button
          title="Change account"
          onPress={() =>
            navigation.navigate("DetailedScreens", { screen: "Change Account" })
          }
        />
      </View>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "#ff2e00",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
