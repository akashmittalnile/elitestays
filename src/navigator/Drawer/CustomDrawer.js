//import : react components
import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Home from '../../assets/Icons/HomeScreen.svg'
// import { CommonActions } from '@react-navigation/core';
// //import : custom components
// import MyText from '../../Components/MyText/MyText';
// import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
// import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './CustomDrawerStyle';
//import : modal
//import : third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : redux
// import { useSelector, useDispatch } from 'react-redux';
// import { logOutUser, setUser } from 'src/reduxToolkit/reducer/user';
import { useDrawerStatus } from '@react-navigation/drawer';
// import CustomLoader from '../../components/CustomLoader/CustomLoader';
///svg image
// import Logo from '../../Global/Images/logo.svg'
// import Profile from '../../Global/Images/profile.svg'
const CustomDrawer = ({ navigation }) => {
    //variables
    // const userToken = useSelector(state => state.user.userToken);
    // const dispatch = useDispatch();
    //hook : states
    const [showLoader, setShowLoader] = useState(false);
    //function : imp function
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //function : navigation function
    // const closeDrawer = () => navigation.closeDrawer();

    // const resetIndexGoToSignup = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ScreenNames.SIGN_UP_1 }],
    // });
    const gotoSignUp = () => {
        // closeDrawer();
        // navigation.dispatch(resetIndexGoToSignup);
    };
    const gotoHome = () => {
        // navigation.navigate(ScreenNames.BOTTOM_TAB, { screen: ScreenNames.HOME });
    };
    const gotoSuperAdminCourses = () => {
        // navigation.navigate(ScreenNames.SUPER_ADMIN_COURSES);
    };
    const gotoAllProducts = () => {
        // navigation.navigate(ScreenNames.ALL_PRODUCTS);
    };
    const gotoMyWhishlist = () => {
        // navigation.navigate(ScreenNames.BOTTOM_TAB, {
        //     screen: ScreenNames.WISHLIST,
        // });
    };
    const gotoMyOrders = () => {
        // navigation.navigate(ScreenNames.MY_ORDERS);
    };
    const gotoWelcome = () =>{}
        // CommonActions.reset({
        //     index: 1,
        //     routes: [{ name: ScreenNames.WELCOME }],
        // });
    const logout = async () => {
        setShowLoader(true);
        try {
            const resp = await Service.postApiWithToken(
                userToken,
                Service.LOGOUT,
                {},
            );
            console.log('logout resp', resp?.data);
            if (resp?.data?.status) {
                closeDrawer();
                navigation.dispatch(gotoWelcome);
                dispatch(logOutUser());
                await AsyncStorage.clear();
            }
        } catch (error) {
            console.log('error in logout', error);
        }
        setShowLoader(false);
    };
    //UI
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ backgroundColor:'black'}}>
              
                    {/* <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../assets/images/logo.png')}
                    /> */}
                     <Image source={require('../../assets/Images/elitestaysLogo.png')} style={styles.appLogo} />

                    {/* <Logo height={56} width={226} ></Logo> */}
                    {/* <TouchableOpacity
                        style={styles.crossImage}
                    onPress={() => {
                        closeDrawer();
                    }}
                    >
                        <Image
                            resizeMode="contain"
                            // style={styles.image}
                            source={require('../../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity> */}
             
                 {/* Profile Information */}
      <View style={styles.profileView}>
        <View style={styles.profile}>
          <Image source={require('../../assets/Images/profile.png')} style={styles.profileImage} />
          <View style={styles.info}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@gmail.com</Text>
          </View>
          <TouchableOpacity>
          <LinearGradient colors={['#060606', '#393939']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientBackground}>
            <Text style={{ color: '#D7BC70', fontSize: 14, fontWeight: '700' }}>View</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View>
       
      </View>
                <View style={{ padding: 10, marginVertical:10,  }}>
                   
                    <DrawerItemList
                        Title="Home"
                     image={require('../../assets/Images/homeDrawer.png')}
                    // onPress={gotoHome}
                    />
                    <DrawerItemList
                        Title="Appointments"
                     image={require('../../assets/Images/appointment.png')}
                    // onPress={gotoMyWhishlist}
                    />
                    <DrawerItemList
                        Title="Membership Plan"
                    image={require('../../assets/Images/membership.png')}
                    // onPress={gotoMyOrders}
                    />
                    <DrawerItemList
                        Title="Payment History"
                     image={require('../../assets/Images/paymentHistory.png')}
                    // onPress={gotoSuperAdminCourses}
                    />
                    {/* <DrawerItemList
            Title="Products"
            image={require('assets/images/products-img.png')}
            onPress={gotoAllProducts}
          /> */}
                    <DrawerItemList
                        Title="Terms & Conditions"
                     image={require('../../assets/Images/stickynote.png')}
                    // onPress={() => { }}
                    />
                    <DrawerItemList
                        Title="Help & Support"
                     image={require('../../assets/Images/privacy.png')}
                    />
                   
                    <DrawerItemList
                        Title="Logout"
                     image={require('../../assets/Images/logout.png')}
                    // onPress={logout}
                    />
                </View>
                <View style={styles.socialMedia}>
        <Text style={{ fontSize: 12, fontWeight: '400', color: 'white' }}>Follow Us!</Text>
        <View style={styles.iconRow}>
          <Image source={require('../../assets/Images/Facebook.png')} />
          <Image source={require('../../assets/Images/Instagram.png')} />
          <Image source={require('../../assets/Images/Youtube.png')} />
        </View>
      </View>
             
            </ScrollView>
            {/* <CustomLoader text="Logging Out...." showLoader={showLoader} /> */}
        </View>
      
    );
};

export default CustomDrawer;

export const DrawerItemList = ({Title = '', image, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          // width: '90%',
          paddingBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={image} style={{width: 24, height: 24,marginRight:10}} />
          {/* <MyText
            text={Title}
            fontSize={14}
            textColor="white"
            fontFamily="medium"
            style={{marginLeft: 14}}
          /> */}
          <Text style={{fontFamily:'Roboto',fontSize:14,fontWeight:'500',color:'white'}}>{Title}</Text>
        </View>
        {/* <Image source={require('assets/images/white-right.png')} /> */}
      </TouchableOpacity>
    );
  };