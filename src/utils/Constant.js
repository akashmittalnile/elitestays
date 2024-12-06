import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const colors = {
  gold: '#D7BC70',
  black: '#101010',
  borderColor: '#2B2B2B',
  yellow:'#D7BC70'
};

export const dimensions = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  SCREEN_HEIGHT: Dimensions.get('window').height
};

export const AStorage = {
  setData: async (key = '', data = '') => {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  },
  getData: async (key = '') => {
    return JSON.parse(await AsyncStorage.getItem(key))
  },
}