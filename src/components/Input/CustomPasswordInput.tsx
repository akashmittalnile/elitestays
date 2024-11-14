import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Lock from '../../assets/Icons/lock.svg';
import Eye from '../../assets/Icons/eye.svg';
import ClosedEye from '../../assets/Icons/closedEye.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface CustomPasswordInputProps {
  style?: ViewStyle;
  placeholder?: string;
  onChangeText: (text: string) => void;
  email?: boolean;
  error?: boolean;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  style,
  placeholder = 'Password',
  onChangeText,
  error = false,
}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const _onChangeText = (text:string) => {
    onChangeText && onChangeText(text);
  };

  const secureTextEntryHandler = () => {
    setSecureTextEntry(value => !value);
  };

  return (
    <View
      style={[
        styles.container,
        {borderColor: error ? 'red' : '#2B2B2B'},
        style,
      ]}>
      <Lock />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={_onChangeText}
        secureTextEntry={secureTextEntry}
          placeholderTextColor='rgba(255,255,255,0.5)'
      />
      <TouchableOpacity activeOpacity={0.5} onPress={secureTextEntryHandler}>
        {secureTextEntry ? <Eye /> : <ClosedEye />}
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(7),
    borderWidth: responsiveWidth(0.5),
    borderColor: '#2B2B2B',
    backgroundColor: '#0E0E0E',
    borderRadius: responsiveWidth(2),
  },
  input: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
    height: '100%',
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    borderWidth: 1,
  },
});
