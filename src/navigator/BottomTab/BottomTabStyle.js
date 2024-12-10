import {Platform, StyleSheet} from 'react-native';
import {dimensions} from '../../utils/Constant';

export const styles = StyleSheet.create({
  navigatorStyle: {
    height: 90,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: dimensions.SCREEN_WIDTH * 0.99,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabStyle: {
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? 0 : 20
    alignItems: 'center', // Centers icon and text horizontally
    justifyContent: 'center', // Centers icon and text vertically
    flexDirection: 'column',
  },
  customTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: '90%', // Align to the center of the tab
    marginLeft: -33, // Adjust to center the tab,
    backgroundColor: 'green',
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    height: 90,
    width: 100,
    marginTop: 20,
    // paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  tabBarItem: {
    alignItems: 'center', // Centers icon and text horizontally
    justifyContent: 'center', // Centers icon and text vertically
    flexDirection: 'column', // Ensures icon is above text
  },
});
