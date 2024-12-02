import MainNavigation from "./MainNavigation"
import React, { useEffect, useState } from "react"
import { StyleSheet,LogBox ,View,Text,StatusBar} from "react-native"
import Splash from "screens/Auth/Splash"
import { Provider, useDispatch } from "react-redux"
import store from "src/redux/store"
import { fetchToken } from "src/redux/reduxSlices/authSlice"
import { NavigationContainer } from '@react-navigation/native';
import Drawer from "src/navigator/Drawer/Drawer"
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AuthStack from "src/navigator/AuthStack"

function Main() {
  const [toggleScreen, setToggleScreen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      setToggleScreen(true)
    }, 3000)

    return () => {}
  }, [])

  // if (!toggleScreen) {
  //   return <Splash />
  // }

  // return (
  //   <>
  //     <MainNavigation />
  //   </>
  // )
}

function App() {
  // LogBox.ignoreAllLogs()
  // const toastConfig = {
  //   success: (props) => (
  //     <BaseToast
  //       {...props}
  //       style={{ borderLeftColor: '#ADC430', borderColor: '#ADC430', borderWidth: 1, height: 55, width: '90%' }}
  //       contentContainerStyle={{ paddingHorizontal: 15 }}
  //       text1Style={{
  //         fontSize: 12,
  //         fontWeight: '400'

  //       }}
  //     />
  //   ),
  //   error: (props) => (
  //     <ErrorToast
  //       {...props}
  //       text1Style={{
  //         fontSize: 12
  //       }}
  //       text2Style={{
  //         fontSize: 12
  //       }}
  //     />
  //   ),
  // };
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#ADC430',
          borderColor: '#ADC430',
          borderWidth: 1,
          height: 55,
          width: '90%',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 12, fontWeight: '400', }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{ fontSize: 12 }}
        text2Style={{ fontSize: 12 }}
      />
    ),
  };

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor={'#4895F0'} />
      <Provider store={store}>
    <NavigationContainer>
    <Drawer />
    <Toast config={toastConfig} />
  </NavigationContainer>
  </Provider>

  </>
  )
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  }
})

export default App
