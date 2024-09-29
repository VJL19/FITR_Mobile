import AsyncStorage from "@react-native-async-storage/async-storage";

const setItemStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log("Error in setting an item in async storage!");
  }
};
const getItemStorage = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (err) {
    console.log("Error in getting an item in async storage!");
  }
};
const deleteItemStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log("Error in deleting an item in async storage!");
  }
};

export { setItemStorage, getItemStorage, deleteItemStorage };
