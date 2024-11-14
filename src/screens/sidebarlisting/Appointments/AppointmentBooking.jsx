import { View, Text, StyleSheet,TextInput } from 'react-native'
import React,{useContext} from 'react'
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



const AppointmentBooking = () => {
    const navigation = useNavigation();

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
                        onPressBack={() => {navigation.goBack()}}
                    />
                </BlurView>
            </LinearGradient>
            <CustomTextInput
                placeholder="Name"
                onChangeText={() => { }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Profile />}
            />
            <CustomTextInput
                placeholder="Email Address"
                onChangeText={() => { }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Email />}
            />
            <CustomTextInput
                placeholder="Start Date"
                onChangeText={() => { }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Calender />}
            />
            <CustomTextInput
                placeholder="Start Time"
                onChangeText={() => { }}
                style={styles.inputBoxStyle}
                SvgImageComponent={<Clock />}
            />
            <TextInput
                style={[styles.textarea, { height: 103,marginTop:20, }]}
                multiline
                numberOfLines={4}
                placeholder="Type your message here…"
                onChangeText={text => console.log(text)}
                placeholderTextColor={"#575757"}
            />
            <GoldenButton buttonText='Submit' style={{ marginTop: 28, width: '90%', alignSelf: 'center',height:60}} onPress={() => { }} buttonTextStyle={{fontSize:14,fontWeight:'700',color:'black'}} />
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
})
export default AppointmentBooking