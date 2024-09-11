import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const CustomModal = ({
  modalTitle,
  modalVisible,
  setModalVisible,
  handleCamera,
  handleGallery,
  handleRemove,
  isButton,
}: {
  modalTitle: string;
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
  handleCamera: () => Promise<void>;
  handleGallery: () => Promise<void>;
  handleRemove: () => void;
  isButton?: boolean;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        statusBarTranslucent
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={[
            styles.centeredView,
            { backgroundColor: "rgba(0, 0, 0, 0.6)" },
          ]}
        >
          <Ionicon
            name="close-circle"
            size={35}
            color="red"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalTitle}</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 25,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Ionicon
                  name="camera"
                  size={35}
                  color="#131313"
                  onPress={handleCamera}
                />
                <Text>Camera</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialIcon
                  name="photo"
                  size={35}
                  color="#131313"
                  onPress={handleGallery}
                />
                <Text>Gallery</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Ionicon
                  name="close-circle"
                  size={35}
                  color="#131313"
                  onPress={handleRemove}
                />
                <Text>Remove</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      {isButton ? (
        <View style={{ flex: 1, width: "85%" }}>
          <Button
            title="Choose Image"
            color={"#ff2e00"}
            onPress={() => setModalVisible(true)}
          />
        </View>
      ) : (
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicon name="camera" size={35} color="#ff2e00" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    flex: 0.3,
    padding: 20,
    width: "75%",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomModal;
