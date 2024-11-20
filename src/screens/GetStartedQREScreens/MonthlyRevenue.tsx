import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import BgImage from 'assets/Images/Login.png';
import Logo from 'assets/Icons/logo.svg';
import { colors } from '../../utils/Constant';
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
import { styles } from './YesScreens/SingleInputStyle';




type RootStackParamList = {
  SignIn: undefined;
  Signup: undefined;
  UserSetupCompleteScreen: undefined;
};



type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn', 'Signup',>;

const MonthlyRevenue = (): JSX.Element => {
  const toast = useToast();
  const dispatch = useDispatch();


  const [percent, setpercent] = useState<string>('');






  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Header heading="Current Management Fee" onPressBack={() => { navigation.goBack() }} />
      <ImageBackground
        source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <Logo style={styles.logo} />
      <Text style={styles.mainText}>Current Management Fee</Text>
      <Text
        style={
          styles.text
        }>{`What percentage commission do you currently pay your management company?`}</Text>
      <View style={styles.subContainer}>
        <CustomTextInput onChangeText={(text) => { setpercent(text) }} style={styles.inputBoxStyle} value={percent} placeholder={'Enter Percentage'}/>
       
      
        <GoldenButton
          buttonText="Next"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={() => { }}
        />
       
      </View>
    
    </View>
  );
};

export default MonthlyRevenue;


