import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import BgImage from 'assets/Images/Login.png';
import Logo from 'assets/Icons/logo.svg';
import { colors, dimensions } from '../../../utils/Constant';
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
// import SelectableButtonGroup from 'components/SelectableButtonGroup';

// import { BarChart, PieChart } from "react-native-gifted-charts"






const CurrentManagementFeeCalculationResult = ({ route }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [income, setincome] = useState('');
    const navigation = useNavigation();
    const { postAPI, loading } = useAPI()
    const [showModal, setShowModal] = useState(false);
    const [msg, setmsg] = useState('');
    const [calculatedValue, setcalculatedValue] = useState('');

    const { payload, authData, calculatedValueResponse } = route?.params
    console.log(route?.params, 'route?.params');

    const { elite_paying_per_year,
        plan_price_per_month,
        plan_name,
        saving_per_year,
        saving_five_year,
        saving_ten_year,
        saving_fifteen_year } = calculatedValueResponse?.data

    async function calculator() {
        // const bodyJSON = {}
        const { res, err } = await postAPI({ endPoint: APIEndPoints.calculator, bodyJSON: payload })
        if (res) {
            // setmsg(response?.res?.message)
            // setShowModal(true)
            // setcalculatedValue(response?.res?.data)
            next(res)
        }
    }

    function next(calculatedValueResponse) {
        // setShowModal(false);
        // navigation.navigate('ServiceFeeInput');
        // navigation.navigate('ServiceFeeInput', { payload: { ...payload, calculatedValue } })
        navigation.navigate('CurrentManagementFeeCalculationResult', { payload: { ...payload, calculatedValueResponse } })
    }
    const data = [
        { label: 'Current', value: calculatedValueResponse?.data["currently_paying+per_year"] },
        { label: 'Elite Plan', value: elite_paying_per_year },
    ];

    const pieData = [
        { value: 18, label: 'Current Cost', color: '#34A853' },
        { value: 1188, label: 'Starter Plan Cost', color: '#FBBC05' },
    ];
    return (
        <>

            <View style={styles.container}>
                <Header heading="Current Management Calculation" onPressBack={() => { navigation.goBack() }} />
                <ImageBackground
                    source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
                    style={styles.bgImage}
                    resizeMode="contain"
                />
                <ScrollView>

                    <Logo style={styles.logo} />
                    <Text style={styles.mainText}>Check out the potential savings!</Text>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                        <View style={{width: dimensions.SCREEN_WIDTH/3}}/>
                        {/* <BarChart
                        
                            data={data}
                            width={dimensions.SCREEN_WIDTH/2}
                            barWidth={80}
                            barBorderRadius={5}
                            yAxisLabel="$"
                            frontColor="white"
                            xAxisLabelTextStyle={{ color: 'white', fontSize: 12 }}
                            yAxisTextStyle={{ color: 'white', fontSize: 12 }}
                            xAxisColor={"white"}
                            yAxisColor={"white"}

                        /> */}
                    </View>
                    {/* <PieChart
                        data={pieData}
                        showText
                        textColor="black"
                        radius={100}
                    /> */}
                    <Text
                        style={
                            styles.text
                        }>{`You are currently paying $ ${calculatedValueResponse?.data["currently_paying+per_year"]} per year in your commission.`}</Text>

                    <Text
                        style={
                            styles.text
                        }>{`By switching to us using our Premier $${plan_price_per_month} /mo plan.`}</Text>
                    <Text
                        style={
                            styles.text
                        }>{`You would only pay $${plan_price_per_month} a month, multiply by 12, which would be $${elite_paying_per_year} a year.`}</Text>
                    <Text
                        style={
                            styles.text
                        }>{`And your potential savings would be:`}</Text>

                    <Text style={
                        styles.text
                    }>{`$${saving_per_year} per year`}</Text>
                    <Text style={
                        styles.text
                    }>{`$${saving_five_year} for 5 year`}</Text>
                    <Text style={
                        styles.text
                    }>{`$${saving_ten_year} for 10 year`}</Text>
                    <Text style={
                        styles.text
                    }>{`$${saving_fifteen_year} for 15 year`}</Text>


                    <View style={styles.subContainer}>
                        {/* <CustomTextInput onChangeText={(text) => { setincome(text) }} style={styles.inputBoxStyle} value={income} placeholder={'Enter Monthly Revenue'} /> */}

                        <GoldenButton
                            buttonText="Let's Start"
                            style={styles.goldenButtonStyle}
                            buttonTextStyle={styles.goldenTextStyle}
                            onPress={() => {
                                // calculator()\
                                navigation.navigate('BottomTab')
                            }}
                        />

                    </View>


                    <Modal transparent={true} visible={showModal} style={styles.fullWidthModel}>
                        <View style={styles.bottomModel} >
                            <Logo style={styles.logo} />
                            <Text style={{ fontSize: 30, fontWeight: '500', textAlign: 'center', color: '#D7BC70' }}>Calculation Completed</Text>
                            <Text style={{ fontSize: 24, fontWeight: '400', textAlign: 'center', color: 'white', lineHeight: 31, marginTop: 10 }}>{msg}</Text>
                            <GoldenButton buttonText='View Status' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} style={{ marginTop: 30, height: 60, }} onPress={next} />
                            {/* <BlackThemeButton buttonText='Go To Home' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: '#D7BC70' }} style={{ marginTop: 17, height: 60, marginBottom: 25, backgroundColor: '#393939' }} onPress={() => {
                        setShowModal(false);
                        navigation.navigate('BottomTabs');
                    }
                    } /> */}
                        </View>
                    </Modal>
                    <View style={{ height: 40 }} />
                </ScrollView>

                {loading && <Loader />}
                {/* </ScrollView> */}
            </View>

        </>
    );
};

export default CurrentManagementFeeCalculationResult;


