import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './MainNavigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Splash from 'screens/Auth/Splash';
import { Provider, useDispatch } from 'react-redux';
import store from 'src/redux/store';
import { fetchToken } from 'src/redux/reduxSlices/authSlice';
function Main() {
  const [toggleScreen, setToggleScreen] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {

    setTimeout(() => {
      setToggleScreen(true)
    }, 3000);

    return () => {

    }
  }, [])


  if (!toggleScreen) {
    return (<Splash />)
  }

  return (<>
    <MainNavigation />
  </>
  );
}


function App() {


  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default App;
