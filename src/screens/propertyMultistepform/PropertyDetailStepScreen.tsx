import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GoogleMap from 'assets/Icons/googleMap.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import CustomTextInput from 'components/Input/CustomTextInput';
import BorderLessButton from 'components/Buttons/BorderLessButton';
import Header from 'components/Header/Header';
import {Calendar} from 'react-native-calendars';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {dimensions} from 'utils/Constant';
import {SafeAreaView} from 'react-native-safe-area-context';

const PropertyDetailStepScreen = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Define your buttons with unique IDs
  const buttons = [
    {id: 1, text: 'Wi-fi'},
    {id: 7, text: 'Pool'},
    {id: 8, text: 'Spa'},
    {id: 2, text: 'Toliters'},
    {id: 3, text: 'Mobile Data'},
    {id: 4, text: 'Kitchen Appliances'},
    {id: 5, text: 'Parking'},
    {id: 6, text: '24*7 service'},
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <Header heading="Property Listing" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <LinearGradient
          colors={['#ECE49E', '#D7BC70', '#AB8B51']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBar}>
          <Text>Step 02/03</Text>
        </LinearGradient>
        <Text style={[styles.mainText, {marginBottom: 12, marginVertical: 20}]}>
          Property Details
        </Text>

        <View style={styles.subContainer}>
          <Text style={[styles.subText, {marginBottom: 20}]}>
            What is the address of the property you want to list on EliteStays?
          </Text>
          <View style={styles.locationContainer}>
            <GoogleMap style={styles.gmap} />
            <GoldenButton
              buttonText="Edit"
              style={styles.goldenButtonStyle}
              buttonTextStyle={styles.goldenTextStyle}
              onPress={() => {}}
            />
          </View>
          <Text style={[styles.subText, {marginVertical: 20}]}>
            How many bedrooms and bathrooms does the property have?
          </Text>
          <View style={styles.subContainer1}>
            <CustomTextInput
              placeholder="Bedrooms"
              onChangeText={() => {}}
              style={styles.inputBoxStyle}
            />
            <CustomTextInput
              placeholder="Bathrooms"
              onChangeText={() => {}}
              style={styles.inputBoxStyle}
            />
          </View>
          <Text style={[styles.subText, {marginVertical: 20}]}>
            What is the maximum number of guests the property can accommodate
            comfortably?
          </Text>
          <CustomTextInput
            placeholder="Guests"
            onChangeText={() => {}}
            style={styles.guestBoxStyle}
          />
          <Text style={[styles.subText, {marginVertical: 20}]}>
            Are there any specific rules or restrictions regarding the property,
            such as noise regulations or pet policies?
          </Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            placeholder="Type Here..."
            onChangeText={text => console.log(text)}
          />
          <Text style={{color: 'white', fontSize: 18}}>
            Property Amenities :-
          </Text>
          <Text style={[styles.subText, {marginTop: 9}]}>
            What amenities does the property offer?
          </Text>

          <View style={styles.containerFlat}>
            {buttons.map(button => (
              <TouchableOpacity
                key={button.id}
                style={[
                  styles.button,
                  selectedButton === button.id && styles.selectedButton, // Apply selected styles
                ]}
                onPress={() => setSelectedButton(button.id)} // Update the selected button ID
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === button.id && styles.selectedButtonText, // Apply selected text styles
                  ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.subText, {marginVertical: 20}]}>
            Are there any unique features or selling points of the property that
            should be highlighted in the listing?
          </Text>
          <TextInput
            style={[styles.textarea, {}]}
            multiline
            numberOfLines={4}
            placeholder="Type Here..."
            onChangeText={text => console.log(text)}
          />
          <Text style={{color: 'white', fontSize: 18}}>
            Price & Availability:-
          </Text>
          <Text style={[styles.subText, {marginVertical: 15}]}>
            What is your desired nightly rate for the property?
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              backgroundColor: '#0E0E0E',
              borderWidth: 1,
              borderColor: '#2B2B2B',
              borderRadius: 10,
              height: 57,
            }}>
            <CustomTextInput
              placeholder="$200"
              onChangeText={() => {}}
              style={[
                styles.inputBoxStyle,
                {
                  width: '48%',
                  backgroundColor: '#0E0E0E',
                  borderWidth: 0,
                  height: 30,
                  marginTop: 12,
                  borderRadius: 5,
                },
              ]}
              placeholderTextColor="#D7BC70"
            />

            <GoldenButton
              buttonText="/ per day"
              style={[
                styles.goldenButtonStyle,
                {width: '25%', marginRight: 10},
              ]}
              buttonTextStyle={styles.goldenTextStyle}
              onPress={() => {}}
            />
          </View>
          <Text style={[styles.subText, {marginVertical: 20}]}>
            What is your desired nightly rate for the property?
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              backgroundColor: '#0E0E0E',
              borderWidth: 1,
              borderColor: '#2B2B2B',
              borderRadius: 10,
              height: 57,
            }}>
            <Text
              style={{
                color: '#575757',
                fontSize: 13,
                fontWeight: '400',
                paddingHorizontal: 15,
              }}>
              Select Dates
            </Text>
            <Image
              source={require('../../assets/Icons/calendar.png')}
              style={styles.dateImage}
            />
          </View>
          {/* How flexible are you with adjusting pricing based on demand or seasonal fluctuations? */}
          <Text style={[styles.subText, {marginVertical: 15}]}>
          How flexible are you with adjusting pricing based on demand or seasonal fluctuations?
          </Text>
          <View style={{marginBottom: 20}}>
            <GoldenButton
              buttonText="Next"
              style={{marginTop: 30}}
              buttonTextStyle={{
                fontSize: 14,
                color: 'black',
                fontWeight: '600',
              }}
              onPress={() => {
                navigation.navigate('PropertyManagementPreferences');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradientBar: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  mainText: {
    color: '#D7BC70',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
  },
  subText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',

    fontFamily: 'Roboto',
  },
  subContainer: {
    alignSelf: 'center',
    paddingTop: 20,
    width: '90%',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBoxStyle: {
    marginBottom: 18,
    width: '48%',
  },
  guestBoxStyle: {},
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
  },

  ///
  containerFlat: {
    flexDirection: 'row', // Arrange buttons in a row
    flexWrap: 'wrap', // Allow wrapping to the next line
    gap: 10, // Add space between buttons (supported in React Native 0.71+)
    // Optional: Adjust spacing between rows
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Add spacing between rows if `gap` isn't supported
  },
  selectedButton: {
    backgroundColor: '#D7BC70', // Highlighted background color
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  selectedButtonText: {
    color: '#FFF', // Highlighted text color
  },
  input: {
    flex: 1,
    paddingLeft: responsiveWidth(2),
    height: '100%',
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
  },
});

export default PropertyDetailStepScreen;
