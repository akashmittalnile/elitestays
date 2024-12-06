import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
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
import Toast from 'react-native-toast-message';
import {dimensions} from 'utils/Constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {APIEndPoints} from 'src/WebAPI/Service';
import useAPI from 'src/hooks/useAPI';
const PropertyDetailStepScreen = ({navigation, route}) => {
  {
    console.log(
      'propertydetail step---->>>>',
      route?.params?.propertyId,
      route?.params?.userId,
    );
  }
  const [selectedButton, setSelectedButton] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const {error, loading, postAPI} = useAPI();
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
  const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  const [contactInfo, setContactInfo] = useState({
    step: '2',
    property_id: route?.params?.propertyId,
    user_id: route?.params?.userId,
    address:'fffff',
    bedroom: '',
    bathroom: '',
    guest: '',
    regulations: '',
    amenities: '',
    selling_points: '',
    price: '',
    peak_season_name: 'gggg',
    adjust_pricing: '',
   'date[]': [],
  });

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

  ///multiple date selection
  // const toggleDateSelection = (date) => {
  //   setSelectedDates((prevDates) => {
  //     const updatedDates = { ...prevDates };
  //     if (updatedDates[date]) {
  //       // If already selected, remove the date
  //       delete updatedDates[date];
  //     } else {
  //       // Otherwise, add the date
  //       updatedDates[date] = {
  //         selected: true,
  //         marked: true,
  //         selectedColor: '#00B0FF',
  //       };
  //     }
  //     return updatedDates;
  //   });
  // };

  // const toggleDateSelection = (date) => {
  //   setContactInfo((prevState) => {
  //     const updatedDates = prevState['date[]'] ? [...prevState['date[]']] : [];// Clone the existing dates array
  //     const dateIndex = updatedDates.indexOf(date);
  
  //     if (dateIndex > -1) {
  //       // If the date is already selected, remove it
  //       updatedDates.splice(dateIndex, 1);
  //     } else {
  //       // Otherwise, add the date
  //       updatedDates.push(date);
  //     }
  
  //     return {
  //       ...prevState,
  //       'date[]': updatedDates, // Update the 'date' field with the new array
  //     };
  //   });
  // };

  const toggleDateSelection = (date) => {
    setContactInfo((prevState) => {
      const updatedDates = prevState.date ? [...prevState.date] : [];
      const dateIndex = updatedDates.indexOf(date);

      if (dateIndex > -1) {
        updatedDates.splice(dateIndex, 1);
      } else {
        updatedDates.push(date);
      }

      return {
        ...prevState,
        date: updatedDates,
      };
    });
  };

  // const closeModal = () => setIsModalVisible(false);

  

  const removeDate = date => {
    setSelectedDates(prevDates => {
      const updatedDates = {...prevDates};
      delete updatedDates[date];
      return updatedDates;
    });
  };
  //post api
  const Validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameReg = /[^a-zA-Z- ]/g;
    var OneDecimalPoint = /^(\d*)\.{0,1}(\d){0,1}$/;
    var PassregularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (contactInfo.bedroom == '' || contactInfo.bedroom.trim().length == 0) {
      Toast.show({text1: 'Please Enter Bedrooms'});
      return false;
    } else if (
      contactInfo.bathroom == '' ||
      contactInfo.bathroom.trim().length == 0
    ) {
      Toast.show({text1: 'Please Enter Bathrooms'});
      return false;
    } else if (
      contactInfo.guest == '' ||
      contactInfo.guest.trim().length == 0
    ) {
      Toast.show({text1: 'Please Enter Maximum number of Guests'});
      return false;
    } else if (
      contactInfo.regulations == '' ||
      contactInfo.regulations.trim().length == 0
    ) {
      Toast.show({text1: 'Please Enter Specific rules or Restrictions'});
      return false;
    }
    //   else if (contactInfo.amenities == '' || contactInfo.amenities.trim().length == 0) {
    //   Toast.show({text1:'Please Enter number'});
    //   return false
    // }
    // else if (contactInfo.selling_points == '' || contactInfo.selling_points.trim().length == 0) {
    //   Toast.show({text1:'Please Enter number'});
    //   return false
    // }
    // else if (contactInfo.price == '' || contactInfo.price.trim().length == 0) {
    //   Toast.show({text1: 'Please Enter number'});
    //   return false;
    // } 
    
    else {
      return true;
    }
  };

  //Post the details
  const SignupPressed = async () => {
    if (!Validation()) {
      return;
    }
    let resp = null;
    const endPoint = APIEndPoints.property_listing;
    if (contactInfo) {
      console.log('goalData', contactInfo);
      resp = await postAPI({endPoint: endPoint, bodyJSON: contactInfo});
    } else {
      resp = await postAPI({endPoint: endPoint, bodyJSON: contactInfo});
    }

    if (!resp) {
      {
        console.log('my response after submission', JSON.stringify(resp));
      }
      return;
    }
    navigation.navigate('PropertyManagementPreferences',{  propertyId:route?.params?.propertyId,
        userId:route?.params?.userId})
    // Toast.show(resp?.message)

    // props?.navigation?.replace("GetGoals")
  };
  const handleInputChange = (field, value) => {
    setContactInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleInputChang = (key, value) => {
    // Set the raw value to contact info
    setContactInfo(prevState => ({
      ...prevState,
      [key]: rawValue,
    }));
    const formattedPhone = formatPhoneNumber(value);
    setPhone(formattedPhone);
  };
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <Header heading="Property Listing"  showBackButton={false}/>
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
              onChangeText={value => handleInputChange('bedroom', value)}
              style={styles.inputBoxStyle}
            />
            <CustomTextInput
              placeholder="Bathrooms"
              onChangeText={value => handleInputChange('bathroom', value)}
              style={styles.inputBoxStyle}
            />
          </View>
          <Text style={[styles.subText, {marginVertical: 20}]}>
            What is the maximum number of guests the property can accommodate
            comfortably?
          </Text>
          <CustomTextInput
            placeholder="Guests"
            onChangeText={value => handleInputChange('guest', value)}
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
            onChangeText={value => handleInputChange('regulations', value)}
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
                onPress={
                  () => {
                    handleInputChange('amenities', button.text);
                    setSelectedButton(button.id);
                  } // Update selected button ID dynamically
                } // Update the selected button ID
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
            onChangeText={value => handleInputChange('selling_points', value)}
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
              onChangeText={value => handleInputChange('price', value)}
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
            Are there any specific peak seasons or blackout dates when the
            property will be unavailable?
          </Text>
          {/* <View
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
          </View> */}
          <View style={styles.container}>
            {/* Select Dates View */}
            <TouchableOpacity onPress={openModal}>
              <View style={styles.selectDateView}>
                <Text style={styles.selectDateText}>Select Dates</Text>
                <Image
                  source={require('../../assets/Icons/calendar.png')}
                  style={styles.dateImage}
                />
              </View>
            </TouchableOpacity>

            {/* Display Selected Dates */}
            {/* <ScrollView
        horizontal
        contentContainerStyle={styles.selectedDatesContainer}
        showsHorizontalScrollIndicator={false}>
        {Object.keys(selectedDates).map((date) => (
          <View key={date} style={{marginRight:12, position: 'relative', }}>
             <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => removeDate(date)}>
           
            <Image source={require('../../assets/Images/deleteWhite.png')} style={{width:15,height:15,resizeMode:'contain'}}></Image>
          </TouchableOpacity>
          <GoldenButton
              buttonText={date}
              style={{marginTop: 30,borderRadius:10}}
              buttonTextStyle={{
                fontSize: 12,
                color: 'black',
                fontWeight: '600',
              }}
              onPress={() => {
                navigation.navigate('PropertyManagementPreferences');
              }}
            />
            </View>
        ))}
      </ScrollView> */}
            <ScrollView
        horizontal
        contentContainerStyle={styles.selectedDatesContainer}
        showsHorizontalScrollIndicator={false}>
        {(contactInfo.date || []).map((date) => (
          <View key={date} style={{marginRight: 12, position: 'relative'}}>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => toggleDateSelection(date)}>
              <Image
                source={require('../../assets/Images/deleteWhite.png')}
                style={{width: 15, height: 15, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <GoldenButton
              buttonText={date}
              style={{marginTop: 30, borderRadius: 10}}
              buttonTextStyle={{
                fontSize: 12,
                color: 'black',
                fontWeight: '600',
              }}
              onPress={() => {
                navigation.navigate('PropertyManagementPreferences');
              }}
            />
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {/* <View style={styles.bottomSheet}>
            <Calendar
              onDayPress={(day) => toggleDateSelection(day.dateString)}
              markedDates={{
                ...(contactInfo.date || []).reduce((acc, date) => {
                  acc[date] = {
                    selected: true,
                    marked: true,
                    selectedColor: '#00B0FF',
                  };
                  return acc;
                }, {}),
                [currentDate]: {
                  selected: true,
                  selectedColor: '#D7BC70',
                  disableTouchEvent: true,
                },
              }}
              minDate={currentDate}
              theme={{
                selectedDayBackgroundColor: '#D7BC70',
                selectedDayTextColor: '#FFF',
                todayTextColor: '#D7BC70',
                arrowColor: '#D7BC70',
                textDayFontWeight: '600',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View> */}
         <View style={styles.bottomSheet}>
  <Calendar
    onDayPress={(day) => toggleDateSelection(day.dateString)}
    markedDates={{
      ...(contactInfo.date || []).reduce((acc, date) => {
        acc[date] = {
          selected: true,
          marked: true,
          selectedColor: '#D7BC70', // Yellow for selected dates
        };
        return acc;
      }, {}),
      [currentDate]: {
        marked: true, // Only mark the current date, no selection
        dotColor: '#D7BC70', // Use a different color or marker for the current date
      },
    }}
    minDate={currentDate}
    theme={{
      selectedDayBackgroundColor: '#FFD700', // Yellow for selected days
      selectedDayTextColor: '#FFF', // White text for selected days
      todayTextColor: '#D7BC70', // Highlight current day text
      arrowColor: '#D7BC70',
      textDayFontWeight: '600',
      textMonthFontWeight: '700',
      textDayHeaderFontWeight: '600',
      textDayFontSize: 14,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 14,
    }}
  />
  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
    <Text style={styles.closeButtonText}>Done</Text>
  </TouchableOpacity>
</View>

        </View>
      </Modal>
          </View>
          {/* How flexible are you with adjusting pricing based on demand or seasonal fluctuations? */}
          <Text style={[styles.subText, {marginVertical: 15}]}>
            How flexible are you with adjusting pricing based on demand or
            seasonal fluctuations?
          </Text>
          <CustomTextInput
            placeholder="Pricing Flexibility"
            onChangeText={value => handleInputChange('adjust_pricing', value)}
            style={styles.guestBoxStyle}
          />
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
                  SignupPressed()
                //  navigation.navigate('PropertyManagementPreferences',{  propertyId:route?.params?.propertyId,
                //   userId:route?.params?.userId});
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
  guestBoxStyle: {fontSize: 6},
  textarea: {
    backgroundColor: '#0E0E0E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    color: 'white',
    fontSize: 12,
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  selectDateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0E0E0E',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 10,
    height: 57,
    paddingHorizontal: 15,
    width: '100%',
  },
  selectDateText: {
    color: '#575757',
    fontSize: 13,
    fontWeight: '400',
  },
  dateImage: {
    width: 20,
    height: 20,
  },
  selectedDatesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedDateItem: {
    backgroundColor: '#00B0FF',
    borderRadius: 5,
    padding: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedDateText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#D7BC70',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: -5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensures it appears above the button
  },
});

export default PropertyDetailStepScreen;
