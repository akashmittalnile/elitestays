import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import Email from '../../assets/Icons/email.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface CustomTextInputProps {
  SvgImageComponent?: any;
  style?: ViewStyle;
  placeholder?: string;
  onChangeText: (text:String) => void;
  email?: boolean;
  error?: boolean;
  placeholderTextColor?: string;

}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  SvgImageComponent,
  style,
  placeholder = 'Email Address',
  onChangeText,
  error = false,
  placeholderTextColor,
  
  
}) => {
  const _onChangeText = (text:string) => {
    onChangeText && onChangeText(text);
  };
  return (
    <View
      style={[
        styles.container,
        {borderColor: error ? 'red' : '#2B2B2B'},
        style,
      ]}>
      {SvgImageComponent && SvgImageComponent}
      {/* {!SvgImageComponent && <Email />} */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={_onChangeText}
        placeholderTextColor={placeholderTextColor}
        
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(7),
    borderWidth: responsiveWidth(0.5),
    backgroundColor: '#0E0E0E',
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
