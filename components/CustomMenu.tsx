import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Menu, Divider } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../assets/themes/theme";

const CustomMenu = () => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
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
        <Menu.Item onPress={() => {}} title="Edit Post" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Delete Post" />
      </Menu>
    </View>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({});
