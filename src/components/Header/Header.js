import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
import React from "react"
import ArrowLeft from "../../assets/Icons/arrow-left.svg"
import Notification from "../../assets/Icons/notification.svg"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/Ionicons"
import {
  responsiveFontSize,
  responsiveHeight
} from "react-native-responsive-dimensions"
import { BlurView } from "@react-native-community/blur"


const Header = ({
  heading = "",
  onPressBack,
  onPressNotification,
  toggleSidebar,
  gradient = false,
  showBackButton = true,
  showNotification = false,
  showGridIcon = false,
  headingStyle = {}
}) => {
  const navigation = useNavigation()

  const onPressBackHandler = () => {
    // onPressBack && onPressBack();
    navigation?.goBack()
  }

  const onPressNotificationHandler = () => {
    onPressNotification && onPressNotification()
  }
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  return (
    <View
      style={[
        styles.container,
        !gradient && {
          flexDirection: "row",
          height: 80,
          
        }
      ]}
    >
      {gradient ? (
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.2)"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientContainer}
        >
          <BlurView blurAmount={6} blurType="xlight" style={styles.blurView} />

          <View style={styles.card}>
            {showGridIcon && (
              <TouchableOpacity onPress={openDrawer}>
                <Icon name="grid" size={30} color="white" />
              </TouchableOpacity>
            )}
            {showBackButton && (
              <TouchableOpacity onPress={onPressBackHandler}>
                <ArrowLeft />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ ...styles.card, flex: 4, justifyContent: "center" }}>
            <Text style={[styles.heading, headingStyle]}>{heading}</Text>
          </View>

          <View style={styles.card}>
            {showNotification && (
              <TouchableOpacity onPress={onPressNotificationHandler}>
                <Notification />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      ) : (
        <>
          <View style={styles.card}>
            {showGridIcon && (
              <TouchableOpacity onPress={openDrawer}>
                <Icon name="grid-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
            {showBackButton && (
              <TouchableOpacity onPress={onPressBackHandler}>
                <ArrowLeft />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ ...styles.card, flex: 4, justifyContent: "center" }}>
            <Text style={[styles.heading, headingStyle]}>{heading}</Text>
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
  )
}

export default Header

const styles = StyleSheet.create({
  container: {},
  gradientContainer: {
    flexDirection: "row",
    paddingTop: NativeModules.StatusBarManager.HEIGHT,
    paddingBottom: responsiveHeight(2),
    width: "100%"
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  heading: {
    fontSize: responsiveFontSize(2),
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  }
})
