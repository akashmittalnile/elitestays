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

interface BorderLessButtonProps {
  style?: ViewStyle;
  buttonTextStyle?: TextStyle;
  buttonText?: string;
  onPress: () => void;
}

const BorderLessButton: React.FC<BorderLessButtonProps> = ({
  style,
  buttonTextStyle,
  buttonText,
  onPress,
}) => {
  const onClick = () => {
    onPress && onPress();
  };
  return (
    <View style={{...style}}>
      <TouchableOpacity
        onPress={onClick}
        style={styles.touch}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BorderLessButton;

const styles = StyleSheet.create({
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
