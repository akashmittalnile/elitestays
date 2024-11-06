import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import BgImage from 'assets/Images/AccountCreated.png';
import Header from 'components/Header/Header';
import Logo from 'assets/Icons/verify.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import { withDecay } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
const UserSetupCompleteScreen = () => {
  return (
    <View style={styles.container}>
      <Header heading="" />
      <ImageBackground source={{ uri: Image.resolveAssetSource(BgImage)?.uri }} style={styles.bgImage} resizeMode="contain" />
      <View style={styles.SubContainer}>
        <Logo style={styles.logo} />
        <Text style={styles.mainText}>Account Created Successfully</Text>
        <Text style={styles.subtext}>Great! Your Signup Bonus</Text>
        <View style={styles.newButton}>
          <View style={styles.circle}>
            <Icon name="check" size={40} color="#f8f2f2" style={{ alignSelf: 'center' }} />
          </View>
          <View style={styles.newContainer}>
            <Text style={styles.text1}>01 FREE</Text>
            <Text style={styles.text2}>Property Listing</Text>
          </View>
        </View>
        <GoldenButton
          buttonText="Post Your First Property FREE!"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={() => { }}
        />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black'
  },
  SubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 9
  },
  newButton: {
    width: '90%',
    height: 78,
    borderRadius: 65,
    backgroundColor: 'rgba(215, 188, 112, 0.4)',
    display: 'flex',
    flexDirection: 'row',
    top: -8
  },
  newContainer: {
    display: 'flex',
    margin: 10,
  },
  text1: {
    color: '#060606',
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: '700',
  },
  text2: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 5
  },
  goldenButtonStyle: {
    width: '90%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',

  },
  circle: {
    width: 78,
    height: 78,
    borderRadius: 65,
    backgroundColor: '#D7BC70D1',
    display: 'flex',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  mainText: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 35.16,
    textAlign: 'center',
    color: '#D7BC70',

  },
  subtext: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '400',
    //lineHeight: 30,
    textAlign: 'center',
    color: "#FFFFFF",
    top: -12
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

})
export default UserSetupCompleteScreen