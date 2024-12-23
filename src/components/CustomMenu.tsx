import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Menu, Divider } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../assets/themes/theme";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const CustomMenu = ({
  screenName,
  onPress,
}: {
  screenName: string;
  onPress: (e: GestureResponderEvent) => void;
}) => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    navigation.addListener("blur", () => {
      closeMenu();
    });
  }, []);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            <View>
              <MaterialIcon name="dots-vertical" size={30} color={"#f5f5f5"} />
            </View>
          </Button>
        }
      >
        <Menu.Item onPress={onPress} title={`Edit ${screenName}`} />
        <Divider />
      </Menu>
    </View>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({});
