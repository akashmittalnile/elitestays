import { View, TextInput, StyleSheet } from "react-native"
import React from "react"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions"

const CustomTextInput = ({
  SvgImageComponent,
  style,
  placeholder = "Email Address",
  onChangeText,
  error = false,
  placeholderTextColor,
  value = null
}) => {
  const _onChangeText = text => {
    onChangeText && onChangeText(text)
  }
  return (
    <View
      style={[
        styles.container,
        { borderColor: error ? "red" : "#2B2B2B" },
        style
      ]}
    >
      {/* {SvgImageComponent && SvgImageComponent} */}
      {/* {!SvgImageComponent && <Email />} */}

      {value ? (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={_onChangeText}
          placeholderTextColor={placeholderTextColor}
          value={value}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={_onChangeText}
          placeholderTextColor={placeholderTextColor}
        />
      )}
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(7),
    borderWidth: responsiveWidth(0.5),
    backgroundColor: "#0E0E0E",
    borderRadius: responsiveWidth(2)
  },
  input: {
    flex: 1,
    paddingLeft: responsiveWidth(2),
    height: "100%",
    color: "white",
    fontSize: 12,
    fontWeight: "400"
  }
})
