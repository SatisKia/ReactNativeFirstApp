import AsyncStorage from '@react-native-async-storage/async-storage';

class MyAsyncStorage {
  getValue = async (key, defValue) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
    }
    return defValue;
  };
  getNumber = async (key, defValue) => {
    return Number(await this.getValue(key, defValue));
  };
  getBool = async (key, defValue) => {
    return Number(await this.getValue(key, defValue)) !== 0;
  };

  setValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
    }
  };
  setNumber = async (key, value) => {
    this.setValue(key, String(value));
  };
  setBool = async (key, value) => {
    this.setValue(key, value ? "1" : "0");
  };
}

export default MyAsyncStorage;
