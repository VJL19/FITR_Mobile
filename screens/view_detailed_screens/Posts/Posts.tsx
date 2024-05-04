import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { IPost } from "../../../utils/types/post.types";
import logo from "../../../assets/fitr_logo3.png";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";

const Posts = ({ PostTitle, PostDate, PostImage, PostDescription }: IPost) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Post",
      params: {
        PostDate: PostDate,
        PostDescription: PostDescription,
        PostImage: PostImage,
        PostTitle: PostTitle,
      },
    });
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
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
