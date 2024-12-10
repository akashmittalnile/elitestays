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
import SelectableButtonGroup from 'components/SelectableButtonGroup';
import { ScrollView } from 'react-native-gesture-handler';






const ServiceFeeInput = ({ route }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [income, setincome] = useState('');
    const navigation = useNavigation();
    const { postAPI, loading } = useAPI()
    const [showModal, setShowModal] = useState(false);
    const [msg, setmsg] = useState('');
    const [selected, setselected] = useState('')
    const [options, setoptions] = useState([
        '$100',
        '$200',
        '$300',
        '$400',
        '$500',
    ])

    const payload = route?.params?.payload
    console.log({ payload });
   
    function next() {
        setShowModal(false);
        // navigation.navigate('ServiceFeeInput');
        navigation.navigate('ServiceFeeInput', { payload: { ...payload, serviceFee: selected.replace('$','') } })
    }

    return (
        <View style={styles.container}>
            <Header heading="Service Fee Input" onPressBack={() => { navigation.goBack() }} />
            <ImageBackground
                source={{ uri: Image.resolveAssetSource(BgImage)?.uri }}
                style={styles.bgImage}
                resizeMode="contain"
            />
            <Logo style={styles.logo} />
            <Text style={styles.mainText}>Service Fee Input</Text>
            <Text
                style={
                    styles.text
                }>{`What service fee would you choose with us?`}</Text>

            {/* <Text style={{ color: 'white', marginTop: 20, fontSize: 15, }}>Amenities</Text> */}
            <View>
                <ScrollView horizontal contentContainerStyle={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 20, }}>
                    {options.map((item, index) => {

                        return <BorderLessButton key={index}
                            buttonText={item}
                            onPress={() => { setselected(item) }}
                            style={{
                                backgroundColor: selected === item ? '#D7BC70':'#0E0E0E',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#2B2B2B',
                                paddingVertical: 10,
                                width: '30%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            buttonTextStyle={{
                                fontSize: 15,
                                fontWeight: '500',
                                textAlign: 'center'
                            }}
                        />
                    })}

                </ScrollView>
            </View>
            <GoldenButton buttonText='Next' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} style={{ marginTop: 30, height: 60, }} onPress={next} />

            <Modal transparent={true} visible={showModal} style={styles.fullWidthModel}>
                <View style={styles.bottomModel} >
                    <Logo style={styles.logo} />
                    <Text style={{ fontSize: 30, fontWeight: '500', textAlign: 'center', color: '#D7BC70' }}>Calculation Completed</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', textAlign: 'center', color: 'white', lineHeight: 31, marginTop: 10 }}>{msg}</Text>
                    <GoldenButton buttonText='View Status' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} style={{ marginTop: 30, height: 60, }} onPress={
                        () => {
                            setShowModal(false);
                            navigation.navigate('ServiceFeeInput');
                        }
                    } />

                </View>
            </Modal>
            {loading && <Loader />}
        </View>
    );
};

export default ServiceFeeInput;


