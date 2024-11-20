import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import CustomTextInput from 'components/Input/CustomTextInput';
import Profile from 'assets/Icons/profile.svg';
import Email from 'assets/Icons/email.svg';
import Calender from 'assets/Icons/calendar.svg';
import { toGammaSpace } from 'react-native-reanimated/lib/typescript/Colors';
import Clock from 'assets/Icons/clock.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Modal from "react-native-modal";
import Logo from 'assets/Icons/verify.svg';
import BlackThemeButton from 'components/Buttons/BlackThemeButton';


const AppointmentBooking = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const token = useSelector(state => state.auth.authToken);


    const handlebook = async () => {


        try {
            const response = await axios.post(`${process.env.AUTH_URL}/appointment/add`, {
                name: name,
                email: email,
                description: message,
                start_date: moment(startDate).format('YYYY-MM-DD'),
                start_time: moment(startDate).format('HH:MM'),
            },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
            if (response.data.message === 'New appointment saved successfully.') {
                setShowModal(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                        heading="Book An Appointment"
                        showNotification={true}
                        headingStyle={{ color: 'white', fontSize: 20, }}
                        showBackButton={true}
                        onPressBack={() => { navigation.goBack() }}
                    />
                </BlurView>
            </LinearGradient>
            <CustomTextInput
                placeholder="Name"
                onChangeText={(text) => { setName(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Profile />}
            />
            <CustomTextInput
                placeholder="Email Address"
                onChangeText={(text) => { setEmail(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Email />}
            />
            <CustomTextInput
                placeholder={startDate?moment(startDate).format('YYYY-MM-DD'):'Start Date'}
                onChangeText={(text) => { setStartDate(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Calender onPress={() => setOpen(true)} />}
            />
            <DatePicker
                modal
                open={open}
                date={startDate}
                onConfirm={(date) => {
                    setStartDate(date);
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
            />

            <CustomTextInput
                placeholder={startDate?moment(startDate).format('HH:MM'):'Start Time'}
                onChangeText={(text) => { setStartTime(text) }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Clock />}
            />
            <TextInput
                style={[styles.textarea, { height: 103, marginTop: 20, }]}
                multiline
                numberOfLines={4}
                placeholder="Type your message here…"
                placeholderTextColor={"#575757"}
                value={message}
                onChangeText={(text) => { setMessage(text) }}
            />
            <GoldenButton buttonText='Submit' style={{ marginTop: 28, width: '90%', alignSelf: 'center', height: 60 }} onPress={() => { handlebook() }} buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} />

            <Modal isVisible={showModal} style={styles.fullWidthModel}>
                <View style={styles.bottomModel} >
                    <Logo style={styles.logo} />
                    <Text style={{ fontSize: 30, fontWeight: '500', textAlign: 'center', color: '#D7BC70' }}>Appointment
                        Request Submitted</Text>
                    <Text style={{ fontSize: 24, fontWeight: '400', textAlign: 'center', color: 'white', lineHeight: 31, marginTop: 10 }}>Once Accepted From The Admin You Will Notify
                        Via App Notification.</Text>
                    <GoldenButton buttonText='View Status' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} style={{ marginTop: 30, height: 60, }} onPress={
                        () => {
                            setShowModal(false);
                            navigation.navigate('Appointments');
                        }
                    } />
                    <BlackThemeButton buttonText='Go To Home' buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: '#D7BC70' }} style={{ marginTop: 17, height: 60, marginBottom: 25, backgroundColor: '#393939' }} onPress={() => {
                        setShowModal(false);
                        navigation.navigate('BottomTabs');
                    }
                    } />
                </View>
            </Modal>
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
    textarea: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#212020',
        borderRadius: 10,
        color: 'white',
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    fullWidthModel: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    bottomModel: {
        backgroundColor: '#181717',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 8,
        width: 100,
        height: 100,
    }
})
export default AppointmentBooking