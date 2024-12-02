import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from 'components/Input/CustomTextInput';
import Profile from 'assets/Icons/profile.svg';
import CustomPhoneInput from 'components/Input/CustomPhoneInput';
import GoldenButton from 'components/Buttons/GoldenButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useAPI from '../../hooks/useAPI'
import Loader from '../../WebAPI/Loader'
import {APIEndPoints} from '../../WebAPI/Service'
const ContactInfoScreen = () => {
  const navigation = useNavigation();
  const[phone,setPhone]=useState('');
 
  const [contactInfo, setContactInfo] = useState({
    fullname: '',
    email: '',
    phone:'',
    address:'hhhhh'
    
  });

  const { error,  loading ,postAPI,} = useAPI()

  const handleInputChange = (field, value) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
 
  const handleInputChang = (key, value) => {
    const rawValue = value.replace(/\D/g, '');

  // Set the raw value to contact info
  setContactInfo((prevState) => ({
    ...prevState,
    [key]: rawValue,
  }));
    const formattedPhone = formatPhoneNumber(value);
    setPhone(formattedPhone);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = ('' + value).replace(/\D/g, '');

    // Format based on US phone number format
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const part1 = match[1] ? `(${match[1]}` : '';
      const part2 = match[2] ? `) ${match[2]}` : '';
      const part3 = match[3] ? `-${match[3]}` : '';
      return `${part1}${part2}${part3}`.trim();
    }
    return value;
  };
  

  const Validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameReg = /[^a-zA-Z- ]/g;
    var OneDecimalPoint = /^(\d*)\.{0,1}(\d){0,1}$/;
    var PassregularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if ( contactInfo.fullname== '' || contactInfo.fullname.trim().length == 0) {
      Toast.show({text1:'Please Enter Name'});
      return false
    }else if (contactInfo.email == '' || contactInfo.email.trim().length == 0) {

      

      Toast.show({text1:'Please Enter Email'});
      return false
    } else if (!EmailReg.test(contactInfo.email)) {
      Toast.show({text1:'Please Enter Valid Email'});
      return false
    } else if (contactInfo.phone == '' || contactInfo.phone.trim().length == 0) {
      Toast.show({text1:'Please Enter number'});
      return false
    } else {
      return true
    }

  };

  //Post the details
  const SignupPressed = async () => {
    if (!Validation()) {
      return
  }
  let resp = null
  const endPoint = APIEndPoints.property_listing 
  if (contactInfo) {
      console.log("goalData");
      resp = await postAPI({ endPoint: endPoint, bodyJSON: contactInfo,  })
  } else {
      resp = await postAPI({ endPoint: endPoint, bodyJSON: contactInfo })
  }

  if (!resp) {
    {console.log('my response after submission',JSON.stringify(resp))}
      return
  }
  // Toast.show(resp?.message)


  // props?.navigation?.replace("GetGoals")


  };
  return (
    <SafeAreaView style={styles.container}>
      <Header heading="Property Listing" />
      <LinearGradient
        colors={['#ECE49E', '#D7BC70', '#AB8B51']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBar}
      >
        <Text>Step 01/03</Text>
      </LinearGradient>
      <Text style={styles.mainText}>Contact Information</Text>
      <Text style={styles.subText}>What Is Your Full Name And Preferred Contact Information</Text>
      <View style={styles.subContainer}>
        <CustomTextInput
          SvgImageComponent={<Profile />}
          placeholder="Name"
          onChangeText={(value) => handleInputChange('fullname', value)}
          style={styles.inputBoxStyle}
        />
        <CustomTextInput
          placeholder="Email"
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.inputBoxStyle}
        />
        {/* <CustomPhoneInput
          placeholder="Phone"
          onChangeText={(value) => handleInputChange('phone', value)}
          style={styles.inputBoxStyle}
        /> */}
         <CustomTextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(value) => handleInputChang('phone', value)}
          style={styles.inputBoxStyle}
        />
        <GoldenButton
          buttonText="Next"
          style={styles.goldenButtonStyle}
          buttonTextStyle={styles.goldenTextStyle}
          onPress={() => {
            // (SignupPressed())
            //  console.log(contactInfo,'contact info')
            navigation.navigate('PropertyDetailStepScreen')
          }}
        />
      </View>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    top: 22
  },
  mainText: {
    color: '#D7BC70',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 50
  },
  subText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto'
  },
  subContainer: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  inputBoxStyle: {
    marginBottom: 18,
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18
  },
  goldenButtonStyle: {
    marginTop: 17,
    width: '100%'
  },
  goldenTextStyle: {
    fontSize: 15,
    color: 'black'
  }
})

export default ContactInfoScreen