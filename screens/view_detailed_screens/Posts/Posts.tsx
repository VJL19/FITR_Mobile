import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { IPost } from "../../../utils/types/post.types";
import logo from "../../../assets/fitr_logo3.png";

const Posts = ({ PostTitle, PostDate }: IPost) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{PostTitle}</Text>
          <Text style={styles.date}>{PostDate.substring(0, 10)}</Text>
        </View>
        <Image
          source={logo}
          style={{ height: 130, width: "50%", opacity: 0.4 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Posts;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    width: 300,
    padding: 15,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#f5f5f5",
    backgroundColor: "#303030",
  },
  title: {
    fontSize: 22,
    color: "#f5f5f5",
    fontWeight: "800",
    fontFamily: "Inter-Bold",
  },
  date: {
    fontSize: 14,
    color: "#f5f5f5",
  },
});
