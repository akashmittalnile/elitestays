import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import BgImage from 'assets/Images/signup.png';
import Profile from 'assets/Icons/profile.svg';
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
import CustomPhoneInput from 'components/Input/CustomPhoneInput';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { setToken } from 'src/redux/reduxSlices/authSlice';
import { useToast } from "react-native-toast-notifications";
import { APIEndPoints, baseUrl } from 'src/WebAPI/Service';
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux"
// type RootStackParamList = {
//   SignIn: undefined;
//   Signup: undefined;
// };



// type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn', 'Signup'>;

const dummySignUpData = {
  "authorization": {
    "token": "190|8OKZwK4qVfCQp9A4Lrp9cQSGp59aXZwvgwE7M0Nrb2a32197"
  },
  "message": "Registered Successfully",
  "status": true,
  "user": {
    "address": "address",
    "created_at": "2024-11-28T10:59:54.000000Z",
    "customer_id": null,
    "device_id": null,
    "email": "disha@yoopmail.com",
    "email_verified_at": null,
    "id": 28,
    "login_token": null,
    "name": "Disha Gupta",
    "otp": null,
    "otp_expire_at": null,
    "phone": "+1 333434343",
    "plan_id": null,
    "role": 2,
    "status": null,
    "subscription_id": null,
    "updated_at": "2024-11-28T10:59:54.000000Z"
  }
}

const Signup = ({ route }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch()
  const payload = route?.params?.payload
  console.log({ payload });

  function next(authData) {
    {console.log('does it reav herer->',authData)}
    navigation.navigate('CurrentManagementFeeCalculation', { payload, authData })
  }

  const toast = useToast();
  const handleInputChang = (key, value) => {
    const rawValue = value.replace(/\D/g, '');

  // Set the raw value to contact info
  // setContactInfo((prevState) => ({
  //   ...prevState,
  //   [key]: rawValue,
  // }));
    const formattedPhone = formatPhoneNumber(value);
    setPhone(formattedPhone);
  };
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = ('' + value).replace(/\D/g, '');

    // Format based on US phone number format
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const part1 = match[1] ? `(${match[1]}` : '';
      const part2 = match[2] ? `) ${match[2]}` : '';
      const part3 = match[3] ? `-${match[3]}` : '';
      return `${part1}${part2}${part3}`.trim();
    }
    return value;
  };
  const handleSignup = async () => {

    try {
      const response = await axios.post(`${baseUrl}${APIEndPoints.register}`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
         address: 'address',
      });

      console.log('handleSignup', { response: response?.data });

      if (response.data.status) {
        Toast.show({text1:response.data.message});
        const token = response?.data?.authorization?.token
        const user =response?.data?.user
        dispatch(setToken({ authToken: token, user }))
        next(response.data)
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        Toast.show({text1:err.message});
        console.log('Error:', err.message);
      } else if ((err).response) {
        Toast.show({text1:(err).response.data.message});
      } else {
        Toast.show({text1:'Something went wrong'});
        // console.log('Unknown Error:', err);
      }
    }
  };


  return (

    <View style={styles.container}>
      <Header heading="Sign In" onPressBack={() => navigation.goBack()} />
      <ImageBackground
        source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <ScrollView>
        <Text style={styles.mainText}>Sign up</Text>
        <Text
          style={
            styles.text
          }>{`Please fill in the following information to register with us`}</Text>
        <View style={styles.subContainer}>
          <CustomTextInput
            SvgImageComponent={<Profile />}
            placeholder="Name"
            onChangeText={(text) => setName(text)}

            style={styles.inputBoxStyle}
          />
          <CustomTextInput onChangeText={(text) => { setEmail(text) }} style={styles.inputBoxStyle} />
          <CustomTextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(value) => handleInputChang('phone', value)}
          style={styles.inputBoxStyle}
        />
          {/* <CustomTextInput
            onChangeText={(text) => { setAddress(text) }}
            style={styles.inputBoxStyle} placeholder='Address' /> */}
          <CustomPasswordInput
            onChangeText={(text) => { setPassword(text) }}
            style={styles.inputBoxStyle}
          />
          {/* <CustomPasswordInput
            onChangeText={(text) => { setConfirmPassword(text) }}
            style={styles.inputBoxStyle}
            placeholder="Confirm Password"
          /> */}

          <GoldenButton
            buttonText="Sign up"
            style={styles.goldenButtonStyle}
            buttonTextStyle={styles.goldenTextStyle}
            onPress={() => {
                handleSignup()
              // next(dummySignUpData)
            }}
          />
          <View style={styles.policy}>
            <Text
              style={[
                styles.policyText,
                styles.policyButton,
                { marginHorizontal: responsiveWidth(1), color: 'white' },
              ]}>
              Already have an account?
            </Text>
            <BorderLessButton
              onPress={() => { navigation.navigate('SignIn') }}
              style={styles.policyButton}
              buttonText="Sign in"
              buttonTextStyle={styles.policyText}
            />
          </View>
        </View>
      </ScrollView>
    </View>

  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black'
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
