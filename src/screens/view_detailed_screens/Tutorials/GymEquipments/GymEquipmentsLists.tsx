import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IGymEquipment } from "utils/types/gym_equipment.types";

const GymEquipmentsLists = ({
  GymEquipmentName,
  GymEquipmentImage,
}: IGymEquipment) => {
  return (
    <View>
      <Text>{GymEquipmentName}</Text>
    </View>
  );
};

export default GymEquipmentsLists;

const styles = StyleSheet.create({});
