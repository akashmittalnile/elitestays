import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SidebarContext } from 'components/context/SidebarContext';
import CrownLogo from 'assets/Icons/crown.svg';
import DollarCircle from 'assets/Icons/dollar-circle.svg';
import StickyNote from 'assets/Icons/stickynote.svg';
import StickyNote1 from 'assets/Icons/stickynote1.svg';
import Logout from 'assets/Icons/logout.svg';
import HomeScreen from 'assets/Icons/HomeScreen.svg';
import Calendar from 'assets/Icons/calendar.svg';

const Sidebar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const context = useContext(SidebarContext);
  const translateXAnim = useRef(new Animated.Value(-290)).current;

  if (!context) {
    throw new Error('Sidebar must be used within a SidebarProvider');
  }

  const { isOpen, toggleSidebar } = context;

  useEffect(() => {
    Animated.timing(translateXAnim, {
      toValue: isOpen ? 0 : -290,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
    toggleSidebar();
  };

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: translateXAnim }] }]}>
      {/* App Logo */}
      <Image source={require('../../assets/Images/elitestaysLogo.png')} style={styles.appLogo} />

      {/* Profile Information */}
      <View style={styles.profileView}>
        <View style={styles.profile}>
          <Image source={require('../../assets/Images/profile.png')} style={styles.profileImage} />
          <View style={styles.info}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={toggleSidebar}>
          <LinearGradient colors={['#060606', '#393939']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientBackground}>
            <Text style={{ color: '#D7BC70', fontSize: 14, fontWeight: '700' }}>View</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Sidebar Options */}
      <View style={styles.infoView}>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('Profile')}>
          <HomeScreen />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('Appointments')}>
          <Calendar />
          <Text style={styles.text}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('MembershipPlan')}>
          <CrownLogo />
          <Text style={styles.text}>Membership Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('PaymentHistory')}>
          <DollarCircle />
          <Text style={styles.text}>Payment History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('TermsAndConditions')}>
          <StickyNote />
          <Text style={styles.text}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('PrivacyPolicy')}>
          <StickyNote1 />
          <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => handleNavigation('Logout')}>
          <Logout />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View style={styles.socialMedia}>
        <Text style={{ fontSize: 12, fontWeight: '400', color: 'white' }}>Follow Us!</Text>
        <View style={styles.iconRow}>
          <Image source={require('../../assets/Images/Facebook.png')} />
          <Image source={require('../../assets/Images/Instagram.png')} />
          <Image source={require('../../assets/Images/Youtube.png')} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#060606',
    zIndex: 1000,
    width: 290,
  },
  appLogo: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  profileView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 290,
    height: 90,
    backgroundColor: '#D7BC70',
    gap: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  info: {
    flexDirection: 'column',
  },
  profileName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  profileEmail: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  submitButton: {
    backgroundColor: '#D7BC70',
    width: 90,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  infoView: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  socialMedia: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#D7BC70',
    borderBottomWidth: 1,
    borderBottomColor: '#D7BC70',
    marginTop: 20,
    gap: 20,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Sidebar;
