import { View, StyleSheet, Text, Image, ScrollView, Alert, TextInput } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import Header from 'components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import GoldenButton from 'components/Buttons/GoldenButton';
import { FlatList } from 'react-native-gesture-handler';
import CalculatorLogo from '../../assets/Icons/Calculator.svg';
import Sidebar from 'components/Sidebar/Sidebar';
import { SidebarContext } from 'components/context/SidebarContext';
import { useSelector } from 'react-redux';
import { getFontScale } from 'react-native-device-info';
import BlackThemeButton from 'components/Buttons/BlackThemeButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SmsStar from 'assets/Icons/sms-star.svg'
import PasswordCheck from 'assets/Icons/password-check.svg'
import Modal from "react-native-modal";
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import CustomPasswordInput from 'components/Input/CustomPasswordInput';



type RootStackParamList = {
  EditProfileScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditProfileScreen'>;

const ProfileScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp>();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.authToken);
  const toast = useToast();
  
  

  const context = useContext(SidebarContext);

  const isOpen = context?.isOpen;
  const toggleSidebar = context?.toggleSidebar;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isNewModelVisible, setIsNewModelVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState(Array(4).fill('')); 
  const inputRefs = useRef<TextInput[]>([]);

  const handleInputChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setOtp(newOtp);
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleOtpVerify = async() => {
    const response = await axios.post(`${process.env.AUTH_URL}/verify-otp`, {
      email: user.email,
      otp: otp.join(''),
    },{
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    const status = response.data.status;
    if(status === false){
      toast.show(response.data.message, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
    }else{
      toast.show(response.data.message, {
        type: 'success',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
      setModalVisible(false);
      setTimeout(() => {
        setIsNewModelVisible(true);
      }, 2000);
    }
  }
  const fetchOtp = async() => {
    const response = await axios.post(`${process.env.AUTH_URL}/forgot-password`, {
      email: user.email
    },{ 
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log(response.data.otp);
  }
  const handlePasswordReset = async() => {
    const response = await axios.post(`${process.env.AUTH_URL}/reset-password`, {
      email: user.email,
      otp: otp.join(''),
      password: password,
      password_confirmation: confirmPassword
    },{ 
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    
    if(response.data.status === false){
      toast.show(response.data.message, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
    }
    else{
      toast.show(response.data.message, {
        type: 'success',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in'
      })
      setIsNewModelVisible(false);
    }
  }

      
  
  return (
    <ScrollView style={styles.scrollContainer}>
      {isOpen && <Sidebar />}
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
              heading="Profile"
              showBackButton={false}
              showNotification={true}
              showGridIcon={true}
              headingStyle={{ color: 'white', fontSize: 20 }}
              toggleSidebar={toggleSidebar}
            />
          </BlurView>
        </LinearGradient>
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.profileImage} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: 'white', marginTop: 10 }}>{user?.name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', gap: 20 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>Business License:</Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#D7BC70' }}>(817) 237-7205</Text>
              <BlackThemeButton buttonText='Reset Password' onPress={() => { fetchOtp();setModalVisible(true);  }} style={styles.resetPasswordButton} buttonTextStyle={{ fontSize: 14 }} />
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>Email</Text>
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#D7BC70' }}>{user?.email}</Text>
              <GoldenButton buttonText="Edit Profile" onPress={() => { navigation.navigate('EditProfileScreen') }} style={styles.editProfileButton} buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} />
            </View>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Image source={require('../../assets/Icons/location.png')} style={{ width: 20, height: 20 }} />
          <View>
            <Text style={{ fontSize: 13, fontWeight: '400', color: 'white' }}>Location</Text>
            <Text style={{ fontSize: 13, fontWeight: '400', color: '#D7BC70' }}>4233  Benson Park Drive, YOUNG Atlanta, 55394</Text>
          </View>
        </View>
      </View>
      <Modal isVisible={isModalVisible} style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
        <View style={styles.modelView}>
          <SmsStar style={styles.smstar} />
          <Text style={{ fontSize: 30, fontWeight: '500', color: '#D7BC70', textAlign: 'center', marginTop: 10 }}>Wohoo!!!</Text>
          <Text style={{ fontSize: 22, fontWeight: '400', color: 'white', textAlign: 'center', lineHeight: 30, marginTop: 10 }}>Check your email we have sent you a verification code on {user.email}</Text>
          <View style={styles.otpContainer}>
            <FlatList
              data={otp}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TextInput
                  style={styles.inputBox}
                  maxLength={1}
                  keyboardType="numeric"
                  value={otp[index]}
                  onChangeText={(text) => handleInputChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    nativeEvent.key === 'Backspace' && handleBackspace('', index)
                  }
                  ref={(ref) => (inputRefs.current[index] = ref!)}
                />
              )}
              contentContainerStyle={styles.inputContainer}
            />
          </View>
          <GoldenButton buttonText='Validate OTP' onPress={() => {handleOtpVerify()}} style={{ width: '90%', alignSelf: 'center', marginTop: 25, height: 60 }} buttonTextStyle={{ fontSize: 14, fontWeight: '700', color: 'black' }} />
        </View>
      </Modal>
      <Modal isVisible={isNewModelVisible} style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
        <View style = {styles.newModelView}>
          <PasswordCheck style = {{alignSelf:'center',marginTop:10}} />
          <Text style = {{fontSize:27,fontWeight:'500',color:'#D7BC70',textAlign:'center',marginTop:10}}>Set Your New Password</Text>
          <CustomPasswordInput onChangeText={(text:any)=>setPassword(text)} style={{width:'90%',alignSelf:'center',marginTop:15}} placeholder='******'/>
          <CustomPasswordInput onChangeText={(text)=>setConfirmPassword(text)}style={{width:'90%',alignSelf:'center',marginTop:15}} placeholder='******'/>
          <GoldenButton buttonText='Save Password' onPress={()=>{handlePasswordReset()}} style={{width:'90%',alignSelf:'center',marginTop:10,height:60}} buttonTextStyle={{fontSize:14,fontWeight:'700',color:'black'}}/>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
  customHeader: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    marginTop: 15,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#070606',
    borderWidth: 1,
    borderColor: '#212020',
    borderRadius: 20,
  },
  profileView: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#D7BC70',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  resetPasswordButton: {
    height: 45,
    width: 160,
    backgroundColor: '#181618',
    marginTop: 15,
    marginBottom: 15,
  },
  editProfileButton: {
    height: 43,
    width: 150,
    marginTop: 16,
    marginBottom: 15,
  },
  locationContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#070606',
    borderWidth: 1,
    borderColor: '#212020',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 10
  },
  modelView: {
    width: '100%',
    height: 460,
    backgroundColor: '#181717',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  smstar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 60,
  },
  inputBox: {
    width: 50,
    height: 50,
    backgroundColor: '#070606e1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#212020',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  newModelView:{
    width:'100%',
    height:400,
    backgroundColor:'#181717',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
  },

})

export default ProfileScreen