import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAllGymEquipmentsQuery } from "reducers/tutorialReducer";
import GymEquipmentsLists from "./GymEquipmentsLists";
import { IGymEquipment } from "utils/types/gym_equipment.types";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import LoadingIndicator from "components/LoadingIndicator";
import CustomError from "components/CustomError";

const GymEquipments = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { data, isFetching, isUninitialized } = useGetAllGymEquipmentsQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { isError } = useGetAccessTokenQuery();

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Gym Equipment",
    });
  };

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }
  return (
    <View>
      <FlatList
        key="_gym_equipments"
        alwaysBounceVertical={true}
        numColumns={2}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        data={data?.gym_results}
        renderItem={({ item }) => <GymEquipmentsLists {...item} />}
        keyExtractor={(item: IGymEquipment) => item?.GymEquipmentID?.toString()}
      />
    </View>
  );
};

export default GymEquipments;

const styles = StyleSheet.create({});
