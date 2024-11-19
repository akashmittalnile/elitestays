import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import CustomTextInput from 'components/Input/CustomTextInput';
import Profile from 'assets/Icons/profile.svg';
import Email from 'assets/Icons/email.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomPhoneInput from 'components/Input/CustomPhoneInput';
import GoogleLogo from 'assets/Icons/googleMap.svg'
import GoldenButton from 'components/Buttons/GoldenButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import Geolocation from 'react-native-geolocation-service';
import { Permission } from 'react-native';
import { setToken } from 'src/redux/reduxSlices/authSlice';
import { useDispatch } from 'react-redux';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const username = useSelector((state: any) => state.auth.user.name);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const token = useSelector((state: any) => state.auth.authToken);
    const toast = useToast();
    const dispatch = useDispatch();

    const handleSaveDetails = async () => {
        const response = await axios.post(`${process.env.AUTH_URL}/update-profile`, {
            name: name,
            phone: phone,
            address: "Atlanta GA, 55394"
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.data.status === false) {
            toast.show(response.data.message, {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in'
            });
        }
        else {
            toast.show(response.data.message, {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in'
            });
            dispatch(setToken({user: response.data.user, authToken: token}));
        }
    }

    const handleClear = () => {
        setName('');
        setEmail('');
        setPhone('');
        setLocation('');
    }


    // useEffect(() => {
    //     Geolocation.requestAuthorization('whenInUse').then((status) => {
    //         console.log(status)
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 console.log(position);
    //                 setLocation(position.coords.latitude + ',' + position.coords.longitude);
    //             },
    //             (error) => {
    //                 console.log(error.code, error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //     })

    // }, [])


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#232323']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0.1975, 0.8855]}
                style={styles.customHeader}
            >
                <BlurView
                    style={styles.blurOverlay}
                    blurType="dark"
                    blurAmount={6}
                    reducedTransparencyFallbackColor="black"
                >
                    <Header
                        heading="Edit Profile"
                        showNotification={true}
                        headingStyle={{ color: 'white', fontSize: 20, }}
                        showBackButton={true}
                        onPressBack={() => { navigation.goBack() }}
                    />
                </BlurView>
            </LinearGradient>
            <CustomTextInput
                placeholder="Name"
                onChangeText={(text: any) => { setName(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Profile />}
            />
            <CustomTextInput
                placeholder="Email Address"
                onChangeText={(text: any) => { setEmail(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Email />}
            />
            <CustomPhoneInput
                placeholder='Phone'
                onChangeText={(text: any) => { setPhone(text) }}
                style={styles.inputBoxStyle}
            />
            <View style={styles.locationView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <GoogleLogo />
                    <Text style={{ fontSize: 13, fontWeight: '400', color: 'white' }}>Atlanta GA, 55394</Text>
                </View>
                <GoldenButton buttonText='Edit' onPress={() => { }} style={styles.editButton} buttonTextStyle={{ fontSize: 13, fontWeight: '300', color: 'black' }} />
            </View>
            <View style={styles.locationContainer}>
                <Image source={require('../../assets/Icons/location.png')} style={{ width: 20, height: 20 }} />
                <View>
                    <Text style={{ fontSize: 13, fontWeight: '400', color: 'white' }}>Location</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#D7BC70' }}>4233  Benson Park Drive, YOUNG Atlanta, 55394</Text>
                </View>
            </View>
            <GoldenButton buttonText='Save Detail' onPress={() => { handleSaveDetails() }} style={{ width: '90%', alignSelf: 'center', marginTop: 30, height: 60 }} buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} />
            <TouchableOpacity style={styles.shadow} onPress={() => handleClear()}>
                <LinearGradient
                    colors={['#060606', '#393939']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.gradButton}
                />
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#D7BC70', textAlign: 'center', top: -40 }}>Clear</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    customHeader: {
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBoxStyle: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#212020',
        padding: 10,
        borderRadius: 10
    },
    editButton: {
        width: 63,
        height: 33,

    },
    locationContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#212020',
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        gap: 10
    },
    shadow: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    gradButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }
});
export default EditProfileScreen