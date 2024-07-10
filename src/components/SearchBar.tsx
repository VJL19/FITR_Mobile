import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

interface ISearchBar {
  placeholder?: string;
  value: string;
  handleChangeText: (value: string) => void;
}

const SearchBar = ({ placeholder, value, handleChangeText }: ISearchBar) => {
  return (
    <TextInput
      autoCapitalize="words"
      autoCorrect
      value={value}
      style={styles.searchInput}
      placeholder={placeholder}
      onChangeText={handleChangeText}
      clearButtonMode="always"
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    borderWidth: 1.5,
    borderColor: "#202020",
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 15,
    marginBottom: 20,
    height: 60,
    paddingLeft: 20,
  },
});
