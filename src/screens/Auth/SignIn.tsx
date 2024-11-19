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




type RootStackParamList = {
  SignIn: undefined;
  Signup: undefined;
  UserSetupCompleteScreen: undefined;
};



type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn', 'Signup',>;

const SignIn = (): JSX.Element => {
  const toast = useToast();
  const dispatch = useDispatch();


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [device_id, setDevice_id] = useState<string>('');
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');

  useEffect(() => {
    const device_id = DeviceInfo.getDeviceId();
    setDevice_id(device_id);
  }, []);



  const handleLogout = async () => {
    try{
      const response = await axios.post(`${process.env.AUTH_URL}/logout`, {}, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      });
        toast.show(response.data.message, {
          type: 'success',
          placement: 'top',
          duration: 2000,
          animationType: 'zoom-in'
        });
        setShowLogout(false);
        dispatch(clearToken());
    }
    catch(error){
      toast.show(error.response.data.message, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
    }
  }

  const handleSignin = async () => {
    try {
      const response = await axios.post(`${process.env.AUTH_URL}/login`, {
        email: email,
        password: password,
        device_id: device_id
      });
      if (response.data.message === 'You seems to be logged in another device. Please Click on below below to logout from all devices.') {
        toast.show(response.data.message, {
          type: 'error',
          placement: 'top',
          duration: 2000,
          animationType: 'zoom-in'
        });
        
        setUserToken(response.data.token)
        setShowLogout(true);
      } else {
        const token = response.data.authorization.token;
        const user = response.data.user;
        dispatch(setToken({ authToken: token, user }));
        toast.show('Login Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          animationType: 'zoom-in'
        });
        navigation.navigate('UserSetupCompleteScreen');
      }
    }
    catch(error){
      
      toast.show(error.response.data.message, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
    } 
  }

  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Header heading="Sign In" onPressBack={() => { navigation.goBack() }} />
      <ImageBackground
        source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <Logo style={styles.logo} />
      <Text style={styles.mainText}>Login</Text>
      <Text
        style={
          styles.text
        }>{`Please enter your sign-in${'\n'}information`}</Text>
      <View style={styles.subContainer}>
        <CustomTextInput onChangeText={(text) => { setEmail(text) }} style={styles.inputBoxStyle} />
        <CustomPasswordInput
          onChangeText={(text) => { setPassword(text) }}
          style={styles.inputBoxStyle}
        />
        <BorderLessButton
          onPress={() => { }}
          buttonText="Forgot Password?"
          buttonTextStyle={styles.forgotStyle}
        />
        <GoldenButton
          buttonText="Login"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={() => { handleSignin() }}
        />
        <View style={styles.policy}>
          <Text
            style={[
              styles.policyText,
              styles.policyButton,
              { marginHorizontal: responsiveWidth(1), color: 'white' },
            ]}>
            Don’t Have An Account?
          </Text>
          
        </View>
      </View>
      {showLogout && (
        <TouchableOpacity onPress={handleLogout} style = {{position:'absolute',top:300,backgroundColor:'#D7BC70D1',padding:15,left:90,borderRadius:15}}>
          <Text style={{ color: 'white'}}>Logout from all devices</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    marginTop: responsiveHeight(1),
    alignSelf: 'center',
  },
  mainText: {
    marginTop: responsiveHeight(23),
    color: colors.gold,
    textAlign: 'center',
    fontSize: responsiveFontSize(3.5),
    fontWeight: '500',
  },
  subContainer: {
    alignSelf: 'center',
    paddingTop: responsiveHeight(3),
    width: '90%',
  },
  inputBoxStyle: {
    marginBottom: responsiveHeight(1.5),
  },
  forgotStyle: {
    fontSize: responsiveFontSize(1.7),
    color: colors.gold,
    fontWeight: '500',
  },
  text: {
    marginTop: responsiveHeight(1),
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    letterSpacing: responsiveWidth(0.1),
  },
  goldenButtonStyle: {
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    width: '100%',
  },
  goldenTextStyle: {
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyButton: {
    marginTop: responsiveHeight(3.5),
  },
  policyText: {
    color: colors.gold,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
  },
});
