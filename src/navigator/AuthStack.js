import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from 'screens/Auth/SignIn';

import GetStarted from 'screens/Auth/GetStarted';
import EditProfileScreen from 'screens/BottomTabs/EditProfileScreen';
import UserTypeSelection from 'screens/GetStartedQREScreens/UserTypeSelection';
import ContactInfoScreen from 'screens/propertyMultistepform/ContactInfoScreen';
import PropertyDetailStepScreen from 'screens/propertyMultistepform/PropertyDetailStepScreen';
import PropertyManagementPreferences from 'screens/propertyMultistepform/PropertyManagementPreferences';
import BottomTab from './BottomTab/BottomTab';
import CurrentManagement from 'screens/GetStartedQREScreens/YesScreens/CurrentManagement';
import MonthlyRevenue from 'screens/GetStartedQREScreens/YesScreens/MonthlyRevenue';
import Plans from 'screens/GetStartedQREScreens/YesScreens/Plans';
import Signup from 'screens/Auth/Signup';
import CurrentManagementFeeCalculationResult from 'screens/GetStartedQREScreens/YesScreens/CurrentManagementFeeCalculationResult';
import CurrentManagementFeeCalculation from 'screens/GetStartedQREScreens/YesScreens/CurrentManagementFeeCalculation';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // set the headerShown option to false to hide the header
      }}>
     <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="UserTypeSelection" component={UserTypeSelection} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} />
      
    
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="CurrentManagementFeeCalculationResult" component={CurrentManagementFeeCalculationResult} />
      <Stack.Screen name="CurrentManagement" component={CurrentManagement} />
      <Stack.Screen name="PropertyDetailStepScreen" component={PropertyDetailStepScreen} />
      <Stack.Screen name="PropertyManagementPreferences" component={PropertyManagementPreferences} />
      <Stack.Screen name="CurrentManagementFeeCalculation" component={CurrentManagementFeeCalculation} />
      <Stack.Screen name="MonthlyRevenue" component={MonthlyRevenue} />
      <Stack.Screen name="Plans" component={Plans} />

      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AuthStack;
