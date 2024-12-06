import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

interface GoldenButtonProps {
  style?: ViewStyle;
  buttonTextStyle?: TextStyle;
  buttonText?: string;
  onPress: () => void;
}

const GoldenButton: React.FC<GoldenButtonProps> = ({
  style,
  buttonTextStyle,
  buttonText,
  onPress,
}) => {
  const onClick = () => {
    onPress && onPress();
  };
  return (
    <View style={[styles.container, style]}>
      <BlurView style={styles.absolute} blurType="xlight" blurAmount={1} />
      <TouchableOpacity onPress={onClick} style={styles.touch} activeOpacity={0.5}>
        <LinearGradient
          colors={['#ECE49E', '#D7BC70', '#AB8B51']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GoldenButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: responsiveHeight(6),
    width: '100%',
    borderRadius: responsiveHeight(5),
    overflow: 'hidden',
  },
  touch: {
    height: '100%',
    width: '100%',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    paddingHorizontal:12
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
