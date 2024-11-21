import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React,{useEffect} from 'react';
import bgImage from 'assets/Images/GetStarted.png';
import Logo from 'assets/Icons/logo.svg';
import {colors} from '../../utils/Constant';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SvgXml} from 'react-native-svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import BlackThemeButton from 'components/Buttons/BlackThemeButton';
import BorderLessButton from 'components/Buttons/BorderLessButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from 'components/Header/Header';


type RootStackParamList = {
  SignIn: undefined;
  Signup: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn','Signup'>;

const UserTypeSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  

  return (
    <View style={styles.container}>
      <Header heading="User Type Selection" />
      <ImageBackground
        source={{uri: Image.resolveAssetSource(bgImage)?.uri}}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <Logo style={styles.logo} />
      {/* <Text style={styles.mainText}>Welcome to Elite Stays</Text> */}
      {/* <Text
        style={
          styles.text
        }>{`Vacation Rental Management${'\n'}Simplified`}</Text> */}
      <Text
        style={
          [styles.text,{marginTop:responsiveHeight(20)}]
        }>{`Are you currently using a vacation rental management service?`}</Text>
   
      <GoldenButton
        buttonText="Yes"
        style={styles.goldenButtonStyle}
        buttonTextStyle={styles.goldenTextStyle}
        onPress={() => {navigation.navigate('CurrentManagement')}}
      />
      <BlackThemeButton
        buttonText="NO"
        style={styles.goldenButtonStyle}
        buttonTextStyle={{...styles.goldenTextStyle, color: colors.gold}}
        onPress={() => {navigation.navigate('ContactInfoScreen')}}
      />
   
    </View>
  );
};

export default UserTypeSelection;

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
    marginTop: responsiveHeight(12),
    alignSelf: 'center',
  },
  mainText: {
    marginTop: responsiveHeight(30),
    color: colors.gold,
    textAlign: 'center',
    fontSize: responsiveFontSize(3.5),
    fontWeight: '500',
  },
  text: {
    marginTop: responsiveHeight(1),
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    letterSpacing: responsiveWidth(0.1),
  },
  goldenButtonStyle: {
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    width: '85%',
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
    marginTop: responsiveHeight(1),
  },
  policyText: {
    color: colors.gold,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
  },
});
