import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import BgImage from 'assets/Images/Login.png';
import Logo from 'assets/Icons/logo.svg';
import { colors } from '../../../utils/Constant';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoldenButton from 'components/Buttons/GoldenButton';
import BorderLessButton from 'components/Buttons/BorderLessButton';
import CustomTextInput from 'components/Input/CustomTextInput';
import CustomPasswordInput from 'components/Input/CustomPasswordInput';
import Header from 'components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from 'react-redux';
import { setToken } from 'src/redux/reduxSlices/authSlice';
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { clearToken } from 'src/redux/reduxSlices/authSlice';
import { styles } from './SingleInputStyle';
import useAPI from 'src/hooks/useAPI';
import Loader from 'components/Loader';
import { APIEndPoints } from 'src/WebAPI/Service';






const CurrentManagementFeeCalculation = ({ route }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [income, setincome] = useState('');
    const navigation = useNavigation();
    const { postAPI, loading } = useAPI()
    const [showModal, setShowModal] = useState(false);
    const [msg, setmsg] = useState('');

    const payload = route?.params?.payload
    console.log({ payload });
    async function calculator() {
        // const bodyJSON = {}
        const response = await postAPI({ endPoint: APIEndPoints.calculator, bodyJSON: payload })
        if (response?.res) {
            setmsg(response?.res?.message)
            setShowModal(true)
        }
    }

    return (
        <View style={styles.container}>
            <Header heading="Current Management Calculation" onPressBack={() => { navigation.goBack() }} />
            <ImageBackground
                source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
                style={styles.bgImage}
                resizeMode="contain"
            />
            <Logo style={styles.logo} />
            <Text style={styles.mainText}>Current Management Fee Calculation</Text>
            <Text
                style={
                    styles.text
                }>{`Calculate and show the current monthly fee based on the inputted commission percentage and monthly income.`}</Text>
            <View style={styles.subContainer}>
                {/* <CustomTextInput onChangeText={(text) => { setincome(text) }} style={styles.inputBoxStyle} value={income} placeholder={'Enter Monthly Revenue'}/> */}

                <GoldenButton
                    buttonText="Calculate"
                    style={styles.goldenButtonStyle}
                    buttonTextStyle={styles.goldenTextStyle}
                    onPress={() => { calculator() }}
                />

            </View>
            <Modal visible={showModal} style={styles.fullWidthModel}>
                <View style={styles.bottomModel} >
                    <Logo style={styles.logo} />
                    <Text style={{ fontSize: 30, fontWeight: '500', textAlign: 'center', color: '#D7BC70' }}>Calculation Completed</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', textAlign: 'center', color: 'white', lineHeight: 31, marginTop: 10 }}>{msg}</Text>
                    <GoldenButton buttonText='View Status' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} style={{ marginTop: 30, height: 60, }} onPress={
                        () => {
                            setShowModal(false);
                            // navigation.navigate('Appointments');
                        }
                    } />
                    {/* <BlackThemeButton buttonText='Go To Home' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: '#D7BC70' }} style={{ marginTop: 17, height: 60, marginBottom: 25, backgroundColor: '#393939' }} onPress={() => {
                        setShowModal(false);
                        navigation.navigate('BottomTabs');
                    }
                    } /> */}
                </View>
            </Modal>
            {loading && <Loader />}
        </View>
    );
};

export default CurrentManagementFeeCalculation;


