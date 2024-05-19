import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "reducers/routeReducer";
import { AppDispatch, RootState } from "store/store";
import * as ImagePicker from "expo-image-picker";
import avatar from "assets/avatar_default.jpeg";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { IChangeAccount } from "utils/types/user.types";
import { myAccountSchema } from "utils/validations";
import { ScrollView } from "react-native-gesture-handler";
import Ionicon from "react-native-vector-icons/Ionicons";
import getAccessToken from "actions/homeAction";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import LoadingIndicator from "components/LoadingIndicator";

const MyAccount = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

  const navigation = useNavigation<RootStackNavigationProp>();
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    dispatch(setRoute("My Account"));
    dispatch(getAccessToken());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!isAuthenticated) {
    return (
      <View>
        <Text>You are not authenticated! Please login again!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={image === undefined ? avatar : { uri: image }}
          style={styles.image}
        />
      </View>
      <ScrollView
        style={{
          width: "90%",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Username</Text>
          <Text>{user.Username}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Email</Text>
          <Text>{user.Email}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>Contact Number</Text>
          <Text>{user.ContactNumber}</Text>
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
