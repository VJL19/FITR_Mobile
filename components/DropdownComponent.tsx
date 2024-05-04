import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";

interface IData {
  label: string;
  value: string;
}

const DropdownComponent = ({
  data,
  value,
  searchPlaceholder,
  handleChange,
}: {
  searchPlaceholder?: string;
  data: IData[];
  value: string;
  handleChange: (arg: string) => void;
}) => {
  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={searchPlaceholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onChange={(item) => handleChange(item.value)}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: 250,
    marginTop: 10,
    height: 50,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 0.5,
    color: "red",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#202020",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#202020",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
