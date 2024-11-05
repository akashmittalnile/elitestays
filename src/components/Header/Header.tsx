import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ArrowLeft from '../../assets/Icons/arrow-left.svg';
import Notification from '../../assets/Icons/notification.svg';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {BlurView} from '@react-native-community/blur';

interface HeaderProps {
  heading?: string;
  onPressBack?: () => void;
  onPressNotification?: () => void;
  gradient?: boolean;
  showBackButton?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  heading = '',
  onPressBack,
  onPressNotification,
  gradient = false,
  showBackButton = true,
  showNotification = false,
}) => {
  const onPressBackHandler = () => {
    onPressBack && onPressBack();
  };

  const onPressNotificationHandler = () => {
    onPressNotification && onPressNotification();
  };

  return (
    <View
      style={[
        styles.container,
        !gradient && {
          flexDirection: 'row',
          paddingTop: NativeModules.StatusBarManager.HEIGHT,
        },
      ]}>
      {gradient && (
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)']}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.5, y: 1}}
          style={styles.gradientContainer}>
          <BlurView blurAmount={6} blurType="xlight" />
          <View style={styles.card}>
            {showBackButton && (
              <TouchableOpacity onPress={onPressBackHandler}>
                <ArrowLeft />
              </TouchableOpacity>
            )}
          </View>
          <View style={{...styles.card, flex: 4}}>
            <Text style={styles.heading}>{heading}</Text>
          </View>
          <View style={styles.card}>
            {showNotification && (
              <TouchableOpacity onPress={onPressNotificationHandler}>
                <Notification />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      )}
      {!gradient && (
        <>
          <View style={styles.card}>
            {showBackButton && (
              <TouchableOpacity onPress={onPressBackHandler}>
                <ArrowLeft />
              </TouchableOpacity>
            )}
          </View>
          <View style={{...styles.card, flex: 4}}>
            <Text style={styles.heading}>{heading}</Text>
          </View>
          <View style={styles.card}>
            {showNotification && (
              <TouchableOpacity onPress={onPressNotificationHandler}>
                <Notification />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10000,
  },
  gradientContainer: {
    flexDirection: 'row',
    paddingTop: NativeModules.StatusBarManager.HEIGHT,
    paddingBottom: responsiveHeight(2),
    width: '100%',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
  },
});
