import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const EditPost = () => {
  const { PostTitle } = useSelector((state: RootState) => state.post.postData);
  return (
    <View>
      <Text>EditPost {PostTitle}</Text>
    </View>
  );
};

export default EditPost;

const styles = StyleSheet.create({});
