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
import {colors} from '../../utils/Constant'

interface BlackThemeButtonProps {
  style?: ViewStyle;
  buttonTextStyle?: TextStyle;
  buttonText?: string;
  onPress: () => void;
}

const BlackThemeButton: React.FC<BlackThemeButtonProps> = ({
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
      <TouchableOpacity
        onPress={onClick}
        style={styles.touch}
        activeOpacity={0.5}>
        <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlackThemeButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: responsiveHeight(6),
    width: '100%',
    borderRadius: responsiveHeight(5),
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  buttonText: {
    color: colors.gold,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
});
