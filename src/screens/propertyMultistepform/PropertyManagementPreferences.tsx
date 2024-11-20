import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GoogleMap from 'assets/Icons/googleMap.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import CustomTextInput from 'components/Input/CustomTextInput';
import Header from 'components/Header/Header';
import { FlatList } from 'react-native-gesture-handler';
import BorderLessButton from 'components/Buttons/BorderLessButton';


const imageData = [
    {
        id: 1,
        image: require('assets/Images/room.png')
    },
    {
        id: 2,
        image: require('assets/Images/room.png')
    },
    {
        id: 3,
        image: require('assets/Images/room.png')
    },
]

const PropertyManagementPreferences = () => {
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContainer}
        >
            <View style={styles.container}>
                <Header heading="Property Listing" />
                <LinearGradient
                    colors={['#ECE49E', '#D7BC70', '#AB8B51']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBar}
                >
                    <Text>Step 03/03</Text>
                </LinearGradient>
                <Text style={{ color: '#D7BC70', textAlign: 'center', top: 48, fontSize: 30, fontWeight: '500' }}>Property Management Preferences</Text>
                <Text style={{ color: 'white', alignSelf: 'center', top: 70, fontSize: 14 }}>
                    Are You Interested In Full-Service Property Management Or Do You Prefer To Handle
                    Certain Tasks Yourself?
                </Text>
                <View style={styles.checkView}>
                    <View style={styles.checkbox}></View>
                    <Text style={{ color: 'white', marginLeft: 15 }}>Full-Service Property Management</Text>
                </View>
                <View style={[styles.checkView, { marginTop: 13 }]}>
                    <View style={styles.checkbox}></View>
                    <Text style={{ color: 'white', marginLeft: 15 }}>Prefer To Handle Certain Tasks</Text>
                </View>
                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 16, fontSize: 14 }}>Do You Have Any Specific Preferences Or Requirements Regarding Guest Communication
                    & Check-In/Check-Out Processes?</Text>
                <TextInput
                    style={[styles.textarea, { marginTop: 15 }]}
                    multiline
                    numberOfLines={4}
                    placeholder="Type Here..."
                    onChangeText={text => console.log(text)}
                    placeholderTextColor={'#8D8D8D'}
                />
                <Text style={{ fontSize: 20, fontWeight: '400', color: '#D7BC70', marginTop: -7, marginLeft: 2 }}>Safety & Security</Text>
                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 16, fontSize: 14 }}>Are There Any Safety Measures In Place At The Property?</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 27, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <View style={{ width: 25, height: 25, backgroundColor: '#D7BC70', borderRadius: 50, borderWidth: 2, borderColor: '#2B2B2B' }}></View>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '300' }}>Smoke Detectors</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <View style={{ width: 25, height: 25, backgroundColor: '#D7BC70', borderRadius: 50, borderWidth: 2, borderColor: '#2B2B2B' }}></View>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '300' }}>Fire Extinguishers</Text>
                    </View>
                </View>
                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 16, fontSize: 14, left: -10 }}>Are There Any Security Features Such As Surveillance Cameras Or Alarm Systems?</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 27, marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <View style={{ width: 25, height: 25, backgroundColor: '#D7BC70', borderRadius: 50, borderWidth: 2, borderColor: '#2B2B2B' }}></View>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '300' }}>Surveillance Cameras</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <View style={{ width: 25, height: 25, backgroundColor: '#D7BC70', borderRadius: 50, borderWidth: 2, borderColor: '#2B2B2B' }}></View>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '300' }}>Alarm Systems</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 20, fontWeight: '400', color: '#D7BC70', marginTop: 13, marginLeft: 2 }}>Marketing & Promotion</Text>
                <View style={styles.uploadimageView}>
                    <View style={styles.galleryView}>
                        <Image source={require('assets/Icons/gallery.png')} style={{ width: 30, height: 30 }} />
                        <Text style={{ color: '#575757', fontSize: 14, marginLeft: 10 }}>Upload Image</Text>
                    </View>
                    <Image source={require('assets/Icons/export.png')} style={{ marginRight: 10, width: 30, height: 30 }} />
                </View>
                <FlatList
                    data={imageData}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={styles.propertyImageView}>
                            <Image source={item.image} style={styles.propertyImage} />
                            <Image source={require('assets/Images/bin.png')} style={styles.bin} />
                        </View>
                    )}
                />
                <TextInput
                    style={[styles.textarea, { marginTop: 15, height: 150, top: 60 }]}
                    multiline
                    numberOfLines={4}
                    placeholder="Type Here..."
                    onChangeText={text => console.log(text)}
                    placeholderTextColor={'#8D8D8D'}
                />
                <TextInput
                    style={[styles.textarea, { marginTop: 15, height: 150, top: 70 }]}
                    multiline
                    numberOfLines={4}
                    placeholder="Type Here..."
                    onChangeText={text => console.log(text)}
                    placeholderTextColor={'#8D8D8D'}
                />
                <Text style={{ color: '#D7BC70', fontSize: 20, fontWeight: '400', top: 80 }}>Other Considerations</Text>
                <TextInput
                    style={[styles.textarea, { marginTop: 40, height: 150, top: 70 }]}
                    multiline
                    numberOfLines={4}
                    placeholder="Type Here..."
                    onChangeText={text => console.log(text)}
                    placeholderTextColor={'#8D8D8D'}
                />
                <TextInput
                    style={[styles.textarea, { marginTop: 40, height: 150, top: 70 }]}
                    multiline
                    numberOfLines={4}
                    placeholder="Type Here..."
                    onChangeText={text => console.log(text)}
                    placeholderTextColor={'#8D8D8D'}
                />
                <TouchableOpacity style={styles.submitButton}>
                    <LinearGradient
                        colors={['#060606', '#393939']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientBackground}
                    >
                        <Text style={{
                            color: '#D7BC70', fontSize: 17, fontWeight: '500'
                        }}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
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
        top: 27,
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
    },
    textarea: {
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
    uploadimageView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#2B2B2B',
        borderRadius: 10,
        padding: 10,
    },
    galleryView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E0E0E',
        height: 50,
        width: 150,
        borderRadius: 10
    },
    propertyImageView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 20
    },
    propertyImage: {
        width: 150,
        height: 150,
        borderRadius: 10
    },
    bin: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 5,
        top: 5
    },
    submitButton: {
        backgroundColor: '#D7BC70',
        width: '100%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: 80,
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
})

export default PropertyManagementPreferences