import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GoogleMap from 'assets/Icons/googleMap.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import CustomTextInput from 'components/Input/CustomTextInput';
import BorderLessButton from 'components/Buttons/BorderLessButton';

const PropertyDetailStepScreen = () => {
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContainer}
        >
            <View style={styles.container}>
                <LinearGradient
                    colors={['#ECE49E', '#D7BC70', '#AB8B51']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBar}
                >
                    <Text>Step 02/03</Text>
                </LinearGradient>
                <Text style={styles.mainText}>Property Details</Text>
                <Text style={styles.subText}>What Is The Address Of The Property You Want To List On Elite Stays</Text>
                <View style={styles.subContainer}>
                    <View style={styles.locationContainer}>
                        <GoogleMap style={styles.gmap} />
                        <GoldenButton
                            buttonText="Edit"
                            style={styles.goldenButtonStyle}
                            buttonTextStyle={styles.goldenTextStyle}
                            onPress={() => { }}
                        />
                    </View>
                    <Text style={{ color: 'white', top: 20 }}>How Many Bedrooms & Bathrooms Does The Property Have?</Text>
                    <View style={styles.subContainer1}>
                        <CustomTextInput
                            placeholder="Bedrooms"
                            onChangeText={() => { }}
                            style={styles.inputBoxStyle}
                        />
                        <CustomTextInput
                            placeholder="Bathrooms"
                            onChangeText={() => { }}
                            style={styles.inputBoxStyle}
                        />
                    </View>
                    <Text style={{ color: 'white', top: 30 }}>What Is The Maximum Number of Guests The Property Can Accommodate Comfortably</Text>
                    <CustomTextInput
                        placeholder="Guests"
                        onChangeText={() => { }}
                        style={styles.guestBoxStyle}
                    />
                    <Text style={{ color: 'white', top: 55 }}>Are There Any Specific Rules Or Restrictions Regarding The Property, Such As Noise Regulations Or Pet Policies?</Text>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        placeholder="Type Here..."
                        onChangeText={text => console.log(text)}
                    />
                    <Text style={{ color: 'white', marginTop: 70, fontSize: 15, }}>Amenities</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 20 }}>
                        <BorderLessButton
                            buttonText="Wi-fi"
                            onPress={() => { }}
                            style={{
                                backgroundColor: '#D7BC70',
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
                        <BorderLessButton
                            buttonText="Parking"
                            onPress={() => { }}
                            style={{
                                backgroundColor: '#0E0E0E',
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
                        <BorderLessButton
                            buttonText="Pool"
                            onPress={() => { }}
                            style={{
                                backgroundColor: '#0E0E0E',
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
                    </View>
                    <BorderLessButton
                        buttonText="Kitchen Appliances"
                        onPress={() => { }}
                        style={{
                            backgroundColor: '#0E0E0E',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#2B2B2B',
                            paddingVertical: 10,
                            width: '50%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30
                        }}
                        buttonTextStyle={{
                            fontSize: 15,
                            fontWeight: '500',
                            textAlign: 'center'
                        }}
                    />
                    <TextInput
                        style={[styles.textarea, { top: 30 }]}
                        multiline
                        numberOfLines={4}
                        placeholder="Type Here..."
                        onChangeText={text => console.log(text)}
                    />
                    <Text style={{ color: '#D7BC70', top: 30, fontSize: 17, fontWeight: '300' }}>Price & Availability</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 47, backgroundColor: '#0E0E0E', borderWidth: 1, borderColor: '#2B2B2B', borderRadius: 10, height: 57 }}>
                        <CustomTextInput
                            placeholder="$200"
                            onChangeText={() => { }}
                            style={[styles.inputBoxStyle, { width: '48%', backgroundColor: '#0E0E0E', borderWidth: 0, height: 30, marginTop: 12, borderRadius: 5 }]}
                            placeholderTextColor="#D7BC70"
                        />
                        <GoldenButton
                            buttonText="/ per day"
                            style={[styles.goldenButtonStyle, { width: '25%', marginRight: 10 }]}
                            buttonTextStyle={styles.goldenTextStyle}
                            onPress={() => { }}
                        />
                    </View>
                    <CustomTextInput
                        placeholder='Password'
                        onChangeText={() => { }}
                        style={{ top: 30, borderWidth: 1 }}
                    />
                    <View style={styles.startEndDateContainer}>
                        <View style={styles.startEndDate}>
                            <CustomTextInput
                                placeholder="11/11/2024"
                                onChangeText={() => { }}
                                style={[styles.inputBoxStyle, { width: 161 }]}
                            />
                            <Image source={require('../../assets/Icons/calendar.png')} style={styles.dateImage} />
                        </View>
                        <View style={styles.startEndDate}>
                            <CustomTextInput
                                placeholder="11/11/2024"
                                onChangeText={() => { }}
                                style={[styles.inputBoxStyle, { width: 161, }]}
                            />
                            <Image source={require('../../assets/Icons/calendar.png')} style={styles.dateImage} />
                        </View>
                    </View>
                    <View style={[styles.checkView, { top: 17 }]}>
                        <View style={styles.checkbox}></View>
                        <Text style={{ color: 'white', marginLeft: 15 }}>Price Based On Demand</Text>
                    </View>
                    <View style={styles.checkView}>
                        <View style={styles.checkbox}></View>
                        <Text style={{ color: 'white', marginLeft: 15 }}>Seasonal Fluctuations?</Text>
                    </View>
                    <GoldenButton
                        buttonText="Next"
                        style={{ marginTop: 30 }}
                        buttonTextStyle={{ fontSize: 14, color: 'black', fontWeight: '600' }}
                        onPress={() => { }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'black',
    },
    scrollViewContainer: {
        flexGrow: 1,
        minHeight: '100%',
    },
    container: {
        paddingBottom: 20,
    },
    gradientBar: {
        width: '100%',
        paddingVertical: 13,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: 114,
    },
    mainText: {
        top: 136,
        color: '#D7BC70',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500',
    },
    subText: {
        top: 146,
        color: 'white',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '400',
        lineHeight: 25,
    },
    subContainer: {
        alignSelf: 'center',
        paddingTop: 20,
        width: '90%',
        top: 156,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        height: 60,
        backgroundColor: '#0E0E0E',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2B2B',
    },
    gmap: {
        width: 20,
        height: 20,
    },
    goldenButtonStyle: {
        width: 78,
        height: 40,
    },
    goldenTextStyle: {
        fontSize: 13,
        color: 'black',
        fontWeight: '200',
    },
    subContainer1: {
        top: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputBoxStyle: {
        marginBottom: 18,
        width: '48%',
    },
    guestBoxStyle: {
        top: 40,
    },
    textarea: {
        top: 70,
        backgroundColor: '#0E0E0E',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2B2B',
        color: 'white',
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        height: 100,
    },
    startEndDateContainer: {
        top: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateImage: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 10,
        top: 16,
    },
    checkView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
        height: 50,
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#2B2B2B',
        borderRadius: 10,
        padding: 10,

    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: '#D7BC70',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2B2B2B',
    }
});

export default PropertyDetailStepScreen;
