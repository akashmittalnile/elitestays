import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CountryPicker from 'react-native-country-picker-modal';

interface CustomPhoneInputProps {
  SvgImageComponent?: any;
  style?: ViewStyle;
  placeholder?: string;
  onChangeText: () => void;
  email?: boolean;
  error?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  SvgImageComponent,
  style,
  placeholder = 'Email Address',
  onChangeText,
  error = false,
}) => {
  const _onChangeText = () => {
    onChangeText && onChangeText();
  };
  return (
    <View
      style={[
        styles.container,
        {borderColor: error ? 'red' : '#2B2B2B'},
        style,
      ]}>
      <CountryPicker
        containerButtonStyle={styles.countryPicker}
        withFlag={true}
        
      />
      <View style={styles.subContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={_onChangeText}
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>
    </View>
  );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(7),
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: responsiveWidth(2),
  },
  countryPicker: {
    height: '100%',
    width: '90%',
    borderWidth: responsiveWidth(0.5),
    borderColor: '#2B2B2B',
    borderRadius: responsiveWidth(2),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
    height: '100%',
    width: '70%',
    backgroundColor: '#0E0E0E',
    borderWidth: responsiveWidth(0.5),
    borderColor: '#2B2B2B',
    borderRadius: responsiveWidth(2),
  },
  input: {
    flex: 1,
    paddingLeft: responsiveWidth(2),
    height: '100%',
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
  },
});
