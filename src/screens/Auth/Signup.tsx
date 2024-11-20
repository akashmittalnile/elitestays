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
import { useToast } from "react-native-toast-notifications";


type RootStackParamList = {
  SignIn: undefined;
  Signup: undefined;
};



type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn', 'Signup'>;


const Signup = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const toast = useToast();
  
  const handleSignup = async () => {

    try {
      const response = await axios.post(`${process.env.AUTH_URL}/register`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: 'address',
      });

      
      if (response.data.status) {
        toast.show(response.data.message, {
          type: "success",
          placement: "top",
          duration: 2000,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.navigate('SignIn');
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.show(err.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
          animationType: "slide-in",
        });
        console.log('Error:', err.message);
      } else if ((err as any).response) {
        toast.show((err as any).response.data.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
          animationType: "slide-in",
        });
        // console.log('Error Status:', (err as any).response.status);
        // console.log('Error Data:', (err as any).response.data);
      } else {
        toast.show('Something went wrong', {
          type: "danger",
          placement: "top",
          animationType: "slide-in",
          duration: 2000,
        });
        // console.log('Unknown Error:', err);
      }
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <Header heading="Sign In" onPressBack={() => navigation.goBack()} />
        <ImageBackground
          source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
          style={styles.bgImage}
          resizeMode="contain"
        />
        <Text style={styles.mainText}>Signup</Text>
        <Text
          style={
            styles.text
          }>{`Please enter your sign-Up${'\n'}information`}</Text>
        <View style={styles.subContainer}>
          <CustomTextInput
            SvgImageComponent={<Profile />}
            placeholder="Name"
            onChangeText={(text: string) => setName(text)}

            style={styles.inputBoxStyle}
          />
          <CustomTextInput onChangeText={(text: string) => { setEmail(text) }} style={styles.inputBoxStyle} />
          <CustomPhoneInput
            onChangeText={(text: string) => { setPhone(text) }}
            style={styles.inputBoxStyle}
            placeholder='Phone'
          />
          <CustomTextInput
            onChangeText={(text: string) => { setAddress(text) }}
            style={styles.inputBoxStyle} placeholder='Address' />
          <CustomPasswordInput
            onChangeText={(text: string) => { setPassword(text) }}
            style={styles.inputBoxStyle}
          />
          <CustomPasswordInput
            onChangeText={(text: string) => { setConfirmPassword(text) }}
            style={styles.inputBoxStyle}
            placeholder="Confirm Password"
          />

          <GoldenButton
            buttonText="Signup"
            style={styles.goldenButtonStyle}
            buttonTextStyle={styles.goldenTextStyle}
            onPress={() => { handleSignup() }}
          />
          <View style={styles.policy}>
            <Text
              style={[
                styles.policyText,
                styles.policyButton,
                { marginHorizontal: responsiveWidth(1), color: 'white' },
              ]}>
              Already Have An Account?
            </Text>
            <BorderLessButton
              onPress={() => { navigation.navigate('SignIn') }}
              style={styles.policyButton}
              buttonText="SignIn"
              buttonTextStyle={styles.policyText}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
