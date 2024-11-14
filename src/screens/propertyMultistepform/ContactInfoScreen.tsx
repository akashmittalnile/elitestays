import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from 'components/Input/CustomTextInput';
import Profile from 'assets/Icons/profile.svg';
import CustomPhoneInput from 'components/Input/CustomPhoneInput';
import GoldenButton from 'components/Buttons/GoldenButton';


const ContactInfoScreen = () => {
  return (
    <View style = {styles.container}>
      <Header heading="Property Listing"/>
      <LinearGradient
      colors={['#ECE49E', '#D7BC70', '#AB8B51']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBar}
    >
      <Text>Step 01/03</Text>
    </LinearGradient>
    <Text style = {styles.mainText}>Contact Information</Text>
    <Text style = {styles.subText}>What Is Your Full Name And Preferred Contact Information</Text>
    <View style = {styles.subContainer}>
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
      <GoldenButton
        buttonText="Next"
        style={styles.goldenButtonStyle}
        buttonTextStyle={styles.goldenTextStyle}
        onPress={() => {}}
      />
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradientBar: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    top:22
  },
  mainText: {
    color:'#D7BC70',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 50
  },
  subText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
    fontFamily:'Roboto'
  },
  subContainer: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  inputBoxStyle: {
    marginBottom: 18,
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18
  },
  goldenButtonStyle: {
    marginTop: 17,
    width: '100%'
  },
  goldenTextStyle: {
    fontSize: 15,
    color: 'black'
  }
})

export default ContactInfoScreen