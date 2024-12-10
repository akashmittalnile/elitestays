import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import BgImage from 'assets/Images/Login.png';
import Logo from 'assets/Icons/logo.svg';
import { colors } from '../../../utils/Constant';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoldenButton from 'components/Buttons/GoldenButton';
import BorderLessButton from 'components/Buttons/BorderLessButton';
import CustomTextInput from 'components/Input/CustomTextInput';
import CustomPasswordInput from 'components/Input/CustomPasswordInput';
import Header from 'components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from 'react-redux';
import { setToken } from 'src/redux/reduxSlices/authSlice';
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { clearToken } from 'src/redux/reduxSlices/authSlice';
import { styles } from './SingleInputStyle';



const MonthlyRevenue = ({route}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [income, setincome] = useState('');
  const navigation = useNavigation();

  const payload = route?.params?.payload
  console.log({payload});
  

  function next() {
    navigation.navigate('Plans', {payload: {...payload,income}})
  }

  return (
    <View style={styles.container}>
      <Header heading="Monthly Revenue" onPressBack={() => { navigation.goBack() }} />
      <ImageBackground
        source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <Logo style={styles.logo} />
      <Text style={styles.mainText}>Monthly Revenue</Text>
      <Text
        style={
          styles.text
        }>{`What is your average monthly rental income?`}</Text>
      <View style={styles.subContainer}>
        <CustomTextInput onChangeText={(text) => { setincome(text) }} style={styles.inputBoxStyle} value={income} placeholder={'Enter Monthly Revenue'}/>
       
      
        <GoldenButton
          buttonText="Next"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={next}
        />
       
      </View>
    
    </View>
  );
};

export default MonthlyRevenue;


