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
  import { setToken } from 'src/redux/reduxSlices/authSlice';
  import Toast from 'react-native-toast-message';
  import {colors, dimensions} from '../../utils/Constant';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import { APIEndPoints } from 'src/WebAPI/Service';
  import useAPI from 'src/hooks/useAPI';
  import ImagePicker from 'react-native-image-crop-picker';
  import Modal from 'react-native-modal';
  import { useDispatch } from "react-redux"
  const PropertyManagmentPrefrences = ({navigation,route}) => {
    {{console.log('my contactinfo screennn---->>>',route?.params?.propertyId,route?.params?.userId)}}
    const [selectedButton, setSelectedButton] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modlevisual, setmodlevisual] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDates, setSelectedDates] = useState({});
    const [images, setImages] = useState('')
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const dispatch = useDispatch()
    const { error,  loading ,postAPI,} = useAPI()
    // Define your buttons with unique IDs
    const buttons = [
      {id: 1, text: 'fire extinguishers'},
      {id: 2, text: 'smoke detectors'},
      {id: 3, text: 'emergency exist'},
      {id: 4, text: 'water'},
     
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [picker, setPicker] = useState([])
    const [showEndPicker, setShowEndPicker] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  
    const [contactInfo, setContactInfo] = useState({
      step:'3',
      property_id: route?.params?.propertyId,
      user_id: route?.params?.userId,
      // property_id:
      property_management: '',
      guest_communication: '',
      safety_measures:'',
      surveillance:'hhhhh',
      'images[]':[],
      marketing:'',
      local_attraction:'',
      other_consideraton:'',
      additional_information:'',
      marketing_preference:'hhhhhh'
      
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
    const toggleDateSelection = (date) => {
      setSelectedDates((prevDates) => {
        const updatedDates = { ...prevDates };
        if (updatedDates[date]) {
          // If already selected, remove the date
          delete updatedDates[date];
        } else {
          // Otherwise, add the date
          updatedDates[date] = {
            selected: true,
            marked: true,
            selectedColor: '#00B0FF',
          };
        }
        return updatedDates;
      });
    };
  
    const removeDate = (date) => {
      setSelectedDates((prevDates) => {
        const updatedDates = { ...prevDates };
        delete updatedDates[date];
        return updatedDates;
      });
    };

    //on gallery
    // const onGallery = async () => {
    //   console.log('picker');
    //   try {
    //     const images = await ImagePicker.openPicker({
    //       width: 1080,
    //       height: 1080,
    //       cropping: true,
    //       mediaType: 'photo',
    //       compressImageQuality: 1,
    //       compressImageMaxHeight: 1080 / 2,
    //       compressImageMaxWidth: 1080 / 2,
    //       multiple: true,
    //     });
    
    //     console.log('Selected images:', images);
    
    //     // Update the 'images[]' field in contactInfo
    //     handleInputChange('images[]', [...contactInfo['images[]'], ...images]);
    
    //     setmodlevisual(false); // Close the modal
    //   } catch (error) {
    //     console.log('Error in openLibrary:', error);
    //   }
    // };
  
////gellery
const onGallery = async () => {
  console.log('picker');
  try {
    const images = await ImagePicker.openPicker({
      width: 1080,
      height: 1080,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 1,
      compressImageMaxHeight: 1080 / 2,
      compressImageMaxWidth: 1080 / 2,
      multiple: true,
    });

    console.log('Selected images:', images);

    // Append the newly selected images to the existing picker array
    setPicker(prevPicker => [...prevPicker, ...images]);

    // Update the 'images[]' field in contactInfo
    handleInputChange('images[]', [...contactInfo['images[]'], ...images]);

    setmodlevisual(false); // Close the modal
  } catch (error) {
    console.log('Error in openLibrary:', error);
  }
};


    const onCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image, 'camera image')
        setPicker([...picker, image]);
        // setPicker(image);
        
        setmodlevisual(false)
  
      });
    }
  //post api
  const Validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameReg = /[^a-zA-Z- ]/g;
    var OneDecimalPoint = /^(\d*)\.{0,1}(\d){0,1}$/;
    var PassregularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
    if ( contactInfo.bedroom== '' || contactInfo.bedroom.trim().length == 0) {
      Toast.show({text1:'Please Enter Bedrooms'});
      return false
    }else if (contactInfo.bathroom == '' || contactInfo.bathroom.trim().length == 0) {
      Toast.show({text1:'Please Enter Bathrooms'});
      return false
    } else if (contactInfo.guest == '' || contactInfo.guest.trim().length == 0) {
      Toast.show({text1:'Please Enter Maximum number of Guests'});
      return false
    } else if (contactInfo.regulations == '' || contactInfo.regulations.trim().length == 0) {
      Toast.show({text1:'Please Enter Specific rules or Restrictions'});
      return false
    } 
  //   else if (contactInfo.amenities == '' || contactInfo.amenities.trim().length == 0) {
  //   Toast.show({text1:'Please Enter number'});
  //   return false
  // }
  // else if (contactInfo.selling_points == '' || contactInfo.selling_points.trim().length == 0) {
  //   Toast.show({text1:'Please Enter number'});
  //   return false
  // }
  else if (contactInfo.price == '' || contactInfo.price.trim().length == 0) {
    Toast.show({text1:'Please Enter number'});
    return false
  }
    
     else {
      return true
    }
  
  };
  
  //Post the details
  const SignupPressed = async () => {
  let resp = null
  const endPoint = APIEndPoints.property_listing 
  if (contactInfo) {
      console.log("goalData",contactInfo);
      resp = await postAPI({ endPoint: endPoint, bodyJSON: contactInfo,  })
  } else {
      resp = await postAPI({ endPoint: endPoint, bodyJSON: contactInfo })
  }
  
  // if (!resp) {
  //   {console.log('my response after submission03/01',JSON.stringify(resp?.authorization?.token))}
  //     return
  // }

  if (resp.res.status) {
    console.log('yuiuiui tokenvvvvv---->>>>>',resp.res.user)
    Toast.show({text1:resp.res.message});
    const token = resp?.res?.authorization?.token
    const user =resp.res.user
    console.log('yuiuiui token---->>>>>',token)
   
    dispatch(setToken({ authToken: token, user }))
    navigation.navigate('BottomTab')
    // next(response.data)
  } else {
    throw new Error(response.data.message);
  }
  return
  
  // Toast.show(resp?.message)
  
  if (response.data.status) {
    Toast.show({text1:response.data.message});
    const token = response?.data?.authorization?.token
    const user =response?.data?.user
    console.log('yuiuiui token---->>>>>',token)
    return
    dispatch(setToken({ authToken: token, user }))
    next(response.data)
  } else {
    throw new Error(response.data.message);
  }
  // props?.navigation?.replace("GetGoals")
  
  
  };
    const handleInputChange = (field, value) => {
      setContactInfo((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
  
    const handleInputChang = (key, value) => {
    
    // Set the raw value to contact info
    setContactInfo((prevState) => ({
      ...prevState,
      [key]: rawValue,
    }));
      const formattedPhone = formatPhoneNumber(value);
      setPhone(formattedPhone);
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
            <Text>Step 03/03</Text>
          </LinearGradient>
          <Text style={[styles.mainText, {marginBottom: 12, marginVertical: 20}]}>
          Property Management
          Preferences
          </Text>
  
          <View style={styles.subContainer}>
            <Text style={[styles.subText, {marginBottom: 20}]}>
            Are you interested in full-service property management or do you prefer to handle certain tasks yourself?
            </Text>
            <CustomTextInput
              placeholder="Type here..."
              onChangeText={(value) => handleInputChange('property_management', value)}
              style={styles.guestBoxStyle}
            />
            <Text style={[styles.subText, {marginVertical: 20}]}>
            Do you have any specific preferences or requirements regarding guest communication and check-in/check-out processes?
            </Text>
          
            <CustomTextInput
              placeholder="Type here..."
              onChangeText={(value) => handleInputChange('guest_communication', value)}
              style={styles.guestBoxStyle}
            />
       
              <Text style={{color: 'white', fontSize: 18,marginVertical:15}}>
              Safety and Security:
            </Text>
            <Text style={[styles.subText, {}]}>
            Are there any safety measures in place at the property?
            </Text>
            <View style={styles.containerFlat}>
              {buttons.map(button => (
                <TouchableOpacity
                  key={button.id}
                  style={[
                    styles.button,
                    selectedButton === button.id && styles.selectedButton, // Apply selected styles
                  ]}
                  onPress={() =>
                   { handleInputChange('safety_measures', button.text)
                    setSelectedButton(button.id)
                    }// Update selected button ID dynamically
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
            Are there any security features such as surveillance cameras or alarm systems?
            </Text>
            <CustomTextInput
              placeholder="Type here..."
              onChangeText={(value) => handleInputChange('surveillance', value)}
              style={styles.guestBoxStyle}
            />
            <Text style={{color: 'white', fontSize: 18,marginTop:20}}>
            Marketing and Promotion:
            </Text>
            <Text style={[styles.subText, {marginTop: 9}]}>
            Do you have high-quality photos of the property that can be used for the listing?
            </Text>
            <TouchableOpacity onPress={()=>{setmodlevisual(true)}} >
          <View style={[styles.selectDateView,{marginTop:16}]}>
            <View style={{flexDirection:'row'}}>
            <Image source={require('assets/Icons/gallery.png')} style={{ width: 30, height: 30 ,marginRight:7}} />
            <Text style={[styles.selectDateText,{marginTop:4}]}>Upload Image</Text>
            </View>
        
            <Image source={require('assets/Icons/export.png')} style={{ marginRight: 10, width: 30, height: 30 }} />
          </View>
        </TouchableOpacity>

        {/* {picker.length >0?
                <ScrollView horizontal>

            <View style={ styles.myImage }>
              
              <>
                {picker.length > 0 ?
                  picker.map((y, index) => {
                    console.log('images yyyyyyy hhhhh--------->', y.path);
                    return (
                      <View key={index} style={styles.uploadedImageBox}>
                        <Image
                          source={{
                            uri: y?.path ? y?.path : null,
                          }}
                          style={styles.imagePickerStyle}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            const updated = picker.filter(el => el.path !== y.path);
                            setPicker(updated);
                            console.log('Updated gallery', updated.length);
                            // { updated.length == 0 ? setcurrentSelection('All') : null }
                            Toast.show({ text1: 'Image has been deleted' });
                          }}
                          style={{
                            position: 'absolute'
                          }}
                        >
                          <Image
                            style={styles.deleteIcon}
                            source={require('../../assets/Images/bin.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                 :null}
              </>

            </View>
          </ScrollView>
  :null} */}

{picker.length > 0 ? (
  <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10 }}>
    <View style={styles.myImage}>
      {picker.map((y, index) => (
        <View key={index} style={styles.uploadedImageBox}>
          <Image
            source={{ uri: y?.path ? y.path : null }}
            style={styles.imagePickerStyle}
          />
          <TouchableOpacity
            onPress={() => {
              const updated = picker.filter(el => el.path !== y.path);
              setPicker(updated); // Update the picker state to remove the image
              console.log('Updated gallery', updated.length);
              Toast.show({ text1: 'Image has been deleted' });
            }}
            style={{ position: 'absolute', top: -7, right: -4 ,backgroundColor:'white',width:24,height:24,justifyContent:'center',alignItems:'center',borderRadius:50}}
          >
            <Image
                source={require('../../assets/Images/deleteWhite.png')}
                style={{width: 15, height: 15, resizeMode: 'contain',tintColor:'red'}}
              />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>
) : null}

            <Text style={[styles.subText, {marginVertical: 20}]}>
            Are there any specific marketing preferences or strategies you would like us to consider?
            </Text>
            <TextInput
              style={[styles.textarea, {}]}
              multiline
              numberOfLines={4}
              placeholder="Type Here..."
              onChangeText={(value) => handleInputChange('marketing', value)}
            />
             <Text style={[styles.subText, {marginVertical: 20}]}>
             Are there any local attractions or points of interest near the property that we should highlight?

            </Text>
            <TextInput
              style={[styles.textarea, {}]}
              multiline
              numberOfLines={4}
              placeholder="Type Here..."
              onChangeText={(value) => handleInputChange('local_attraction', value)}
            />
            <Text style={{color: 'white', fontSize: 18}}>
            Other Considerations:
            </Text>
            <Text style={[styles.subText, {marginVertical: 20}]}>
            Are there any specific concerns or questions you have about the vacation rental process?
            </Text>
            <TextInput
              style={[styles.textarea, {}]}
              multiline
              numberOfLines={4}
              placeholder="Type Here..."
              onChangeText={(value) => handleInputChange('other_consideraton', value)}
            />

            <Text style={[styles.subText, {marginVertical: 20}]}>
            Is there any additional information you would like to provide about the property or your expectations?
            </Text>
            <TextInput
              style={[styles.textarea, {}]}
              multiline
              numberOfLines={4}
              placeholder="Type Here..."
              onChangeText={(value) => handleInputChange('additional_information', value)}
            />

  
            
         
          
           <View style={styles.container}>
        
        <ScrollView
          horizontal
          contentContainerStyle={styles.selectedDatesContainer}
          showsHorizontalScrollIndicator={false}>
          {Object.keys(selectedDates).map((date) => (
            // <View key={date} style={styles.selectedDateItem}>
            //   <TouchableOpacity
            //     style={styles.deleteIcon}
            //     onPress={() => removeDate(date)}>
            //     {/* <Icon name="close" size={16} color="#FFF" /> */}
            //     <Image source={require('../../assets/Images/bin.png')}></Image>
            //   </TouchableOpacity>
            //   <Text style={styles.selectedDateText}>{date}</Text>
            // </View>
            <View key={date} style={{marginRight:12, position: 'relative', }}>
               <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => removeDate(date)}>
              {/* <Icon name="close" size={16} color="#FFF" /> */}
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
        </ScrollView>
  
        {/* Calendar Modal */}
        <Modal
          visible={isModalVisible}
          // #D7BC70
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.bottomSheet}>
              <Calendar
                onDayPress={(day) => toggleDateSelection(day.dateString)}
                markedDates={{
                  ...selectedDates,
                  [currentDate]: {
                    selected: true,
                    selectedColor: '#D7BC70', // Highlight active (current) date
                    disableTouchEvent: true, // Disable tapping on the current date
                  },
                }}
                minDate={currentDate} // Disable previous dates
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
            </View>
          </View>
        </Modal>
      </View>
            {/* How flexible are you with adjusting pricing based on demand or seasonal fluctuations? */}
            
            <View style={{marginBottom: 20}}>
              <GoldenButton
                buttonText="Submit"
                style={{marginTop: 30}}
                buttonTextStyle={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: '600',
                }}
                onPress={() => {
                  // Validation()
                   SignupPressed()
                  // navigation.navigate('BottomTab')
                }}
              />
            </View>
          </View>
          <Modal
  isVisible={modlevisual}
  swipeDirection="down"
  onBackdropPress={() => setmodlevisual(false)}
  propagateSwipe={true}
  onSwipeComplete={() => setmodlevisual(false)}
  backdropColor="rgba(0,0,0,0.5)"
  style={{
    justifyContent: 'flex-end', // Position the modal at the bottom
    margin: 0, // No margin around the modal
  }}
>
  <View
    style={{
      height:300,
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40, // Rounded corners at the top
      padding: 20,
      width: '100%', // Full width
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'black',fontSize:16}}>Upload Image</Text>
    <Text style={{ color: '#C7C7C7',fontSize:16,alignSelf:'center',textAlign:'center',fontWeight:'400',marginTop:9}}>Please Upload Client Signed
    Documents Here…</Text>
   
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 25,
      }}
    >
      <TouchableOpacity style={{ height: 121,width:145,borderColor:'#C7C7C7',borderWidth:1 ,justifyContent:'center',borderRadius:14}} onPress={onGallery}>
      <Image source={require('../../assets/Images/gallery.png')} style={{height:50,width:50,resizeMode:'contain',alignSelf:'center'}}></Image>
        <Text style={{ color: colors.yellow ,textAlign:'center',marginTop:15}}>Open Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ height: 121,width:145,borderColor:'#C7C7C7',borderWidth:1 ,justifyContent:'center',}} onPress={onCamera}>
      <Image source={require('../../assets/Images/camera.png')} style={{height:50,width:50,resizeMode:'contain',alignSelf:'center'}}></Image>
      
        <Text style={{ color: colors.yellow,textAlign:'center',marginTop:15}}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


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
    guestBoxStyle: {fontSize:6},
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
      width:'100%'
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
      shadowOffset: { width: 0, height: -2 },
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
    uploadedImageBox: {
      height: 70,
      width: 80,
      position: 'relative',
      marginRight: 29,
      
    },
    imagePickerStyle: {
      height: '100%',
      width: '100%',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: 10,
  
    },
    deleteIcon: {
      // backgroundColor: 'red',
      width: 20,
      height: 20,
      borderRadius: 10,
      left: 70,
      alignItems: 'center',
      backgroundColor: 'white',
      top: 1
    },
    myImage: { flexDirection: 'row', paddingVertical: '6%', height: 110, marginTop: 10 },

    ///
    myImage: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    uploadedImageBox: {
      marginRight: 10,
      position: 'relative',
    },
    imagePickerStyle: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    deleteIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      tintColor: 'red',
    },
  
  });
  
  export default PropertyManagmentPrefrences;
  