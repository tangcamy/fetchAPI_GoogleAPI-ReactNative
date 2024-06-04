import AsyncStorage from '@react-native-async-storage/async-storage';

// import { AsyncStorage } from 'react-native'

/**
 {string} name
 {number} accountInfoStatus
 */ 

export const setMySetting = (key, value) => AsyncStorage.setItem(key, value)
export const getMySetting = (key) => AsyncStorage.getItem(key)
