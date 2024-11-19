import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import React, { useState } from 'react';
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
  onChangeText: (text: string) => void;
  error?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  SvgImageComponent,
  style,
  placeholder = 'Phone Number',
  onChangeText,
  error = false,
}) => {
  const [country, setCountry] = useState<any>({ callingCode: ['1'], cca2: 'US' });
  const [phone, setPhone] = useState<string>('');

  const _onChangeText = (text: string) => {
    // Remove country code from input if it exists to avoid duplication
    const countryCode = `+${country.callingCode[0]} `;
    const cleanedText = text.startsWith(countryCode)
      ? text.slice(countryCode.length)
      : text;

    setPhone(cleanedText); // Save only the number part
    onChangeText && onChangeText(`${countryCode}${cleanedText}`);
  };

  const formattedPhone = `+${country.callingCode[0]} ${phone}`; // Add country code dynamically


  return (
    <View
      style={[
        styles.container,
        { borderColor: error ? 'red' : '#2B2B2B' },
        style,
      ]}>
      <CountryPicker
        containerButtonStyle={styles.countryPicker}
        withFlag={true}
        withCallingCode={true}
        withCallingCodeButton={true}
        withCountryNameButton={false}
        withAlphaFilter={true}
        withFilter={true}
        withEmoji={true}
        onSelect={(selectedCountry) => setCountry(selectedCountry)}
        countryCode={country?.cca2 || 'US'}
      />
      <View style={styles.subContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={_onChangeText}
          value={country?.callingCode ? `+${country.callingCode[0]} ${phone}` : phone}
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="phone-pad"
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
    gap: 10,
  },
  countryPicker: {
    height: '100%',
    width: 90,
    borderWidth: responsiveWidth(0.5),
    borderColor: '#2B2B2B',
    borderRadius: responsiveWidth(2),
    color: 'white',
    backgroundColor: '#0E0E0E',
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
