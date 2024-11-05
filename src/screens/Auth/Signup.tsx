import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import BgImage from 'assets/Images/signup.png';
import Profile from 'assets/Icons/profile.svg';
import {colors} from '../../utils/Constant';
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

const Signup = () => {
  return (
    <View style={styles.container}>
      <Header heading="Sign In" />
      <ImageBackground
        source={{uri: Image.resolveAssetSource(BgImage)?.uri}}
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
          onChangeText={() => {}}
          style={styles.inputBoxStyle}
        />
        <CustomTextInput onChangeText={() => {}} style={styles.inputBoxStyle} />
        <CustomPhoneInput
          onChangeText={() => {}}
          style={styles.inputBoxStyle}
          placeholder='Phone'
        />
        <CustomPasswordInput
          onChangeText={() => {}}
          style={styles.inputBoxStyle}
        />
        <CustomPasswordInput
          onChangeText={() => {}}
          style={styles.inputBoxStyle}
          placeholder="Confirm Password"
        />
        <GoldenButton
          buttonText="Signup"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={() => {}}
        />
        <View style={styles.policy}>
          <Text
            style={[
              styles.policyText,
              styles.policyButton,
              {marginHorizontal: responsiveWidth(1), color: 'white'},
            ]}>
            Already Have An Account?
          </Text>
          <BorderLessButton
            onPress={() => {}}
            style={styles.policyButton}
            buttonText="SignIn"
            buttonTextStyle={styles.policyText}
          />
        </View>
      </View>
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
