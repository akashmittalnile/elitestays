import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Logo from 'assets/Icons/splash.svg';

const Splash = () => {
  console.log('latest code: 18 oct 2024')
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
