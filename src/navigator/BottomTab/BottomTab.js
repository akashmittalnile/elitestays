/* eslint-disable react/no-unstable-nested-components */
//react components
import React from 'react';
import { View, Image, Text ,StyleSheet} from 'react-native';
//custom components
import MyText from 'components/MyText/MyText';
//Bottom Tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//global
import LinearGradient from 'react-native-linear-gradient';
//styles
import { styles } from './BottomTabStyle';
////logos 
import HomeLogo from '../../assets/Icons/HomeScreen.svg'
import HomeInactive from '../../assets/Icons/home-2.svg'
import ListInactive from '../../assets/Icons/task-square.svg'
import ChatSupportLogo from '../../assets/Icons/ChatSupport.svg'
import ChatActive from '../../assets/Icons/messageActive.svg'
import ProfileLogo from '../../assets/Icons/profile.svg'
import MyListngLogo from '../../assets/Icons/MyListing.svg'
//screens
import HomeScreen from 'screens/BottomTabs/HomeScreen';

import ProfileScreen from 'screens/BottomTabs/ProfileScreen';
import MyListing from 'screens/BottomTabs/MyListing';
import ChatSupport from 'screens/BottomTabs/ChatSupport';

import Toast from 'react-native-toast-message';

const BottomTab = ({ userToken }) => {
    // const userInfo = useSelector(state => state.user.userInfo);
    //variables
    const Tab = createBottomTabNavigator();
    const screenOptions = {
        showLabel: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.navigatorStyle,
    tabBarBackground: () => (
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.78)', 'rgba(35, 35, 35, 1)']}
          
            style={StyleSheet.absoluteFill}
            
        />
    ),
    };
    // backBehavior = order - return to previous tab (in the order they are shown in the tab bar)
    // backBehavior = history - return to last visited tab
    console.log('Bottom Tab');
    return (
        <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
            <Tab.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                 <HomeLogo height={24} width={24}></HomeLogo>
                            ) : (
                                <HomeInactive height={24} width={24}></HomeInactive>)
                            }
                            {/* <MyText
                                text="Home"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? 'red': 'grey'}
                                marginTop={5}
                            /> */}
                            <Text style={{fontWeight:'400',fontSize:12,color:focused ? '#D7BC70': 'white',marginTop:5}}>Home</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'ProfileScreen'}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (

                                <ListInactive height={24} width={24}></ListInactive>
                            ) : (
                                <MyListngLogo height={24} width={24}></MyListngLogo>
                            )}
                            <Text style={{fontWeight:'400',fontSize:12,color:focused ? '#D7BC70': 'white',marginTop:5}}>My Listing</Text>
                        </View>
                    ),
                }}
            />
         
            <Tab.Screen
                name={'ChatSupport'}
                component={ChatSupport}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <ChatActive></ChatActive>
                            ) : (
                                <ChatSupportLogo></ChatSupportLogo>
                            )}
                          <Text style={{fontWeight:'400',fontSize:12,color:focused ? '#D7BC70': 'white',marginTop:5}}>Chat Support</Text>
                        </View>
                    ),
                }}
            />
             <Tab.Screen
                name={'MyListing'}
                component={MyListing}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <ChatSupportLogo></ChatSupportLogo>
                            ) : (
                                <ProfileLogo></ProfileLogo>
                            )}
                            <Text style={{fontWeight:'400',fontSize:12,color:focused ? '#D7BC70': 'white',marginTop:5}}>Profile</Text>
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen
                name={'ChatSupport'}
                component={ChatSupport}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <ChatSupport></ChatSupport>
                            ) : (
                                <ChatSupport></ChatSupport>
                            )}
                            <MyText
                                text="Profile"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ?  'red': 'grey'}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default BottomTab;