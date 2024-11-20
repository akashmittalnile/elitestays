import { View, Text, StyleSheet, TextInput,FlatList } from 'react-native'
import React, { useContext } from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import CustomTextInput from 'components/Input/CustomTextInput';
import Profile from 'assets/Icons/profile.svg';
import Email from 'assets/Icons/email.svg';
import Calender from 'assets/Icons/calendar.svg';
import Clock from 'assets/Icons/clock.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import { useNavigation } from '@react-navigation/native';
import CalendarLogo from 'assets/Icons/calendar.svg';
import FrameLogo from 'assets/Icons/Frame.svg';
import DollerCircle from 'assets/Icons/dollar-circle1.svg'
import CalendarTick from 'assets/Icons/calendar-tick.svg'
import Card from 'assets/Icons/card.svg'
const paymentData = [
  {
    id:1,
    paymentId:'#GA0919933992652',
    status:'Success',
    price:'$1000',
    dateTime:'27 September 2024, 10:00 AM',
    mobNo:'Xxxxx98'
  },
  {
    id:2,
    paymentId:'#GA0919933992652',
    status:'Success',
    price:'$1000',
    dateTime:'27 September 2024, 10:00 AM',
    mobNo:'Xxxxx98'
  },
  {
    id:3,
    paymentId:'#GA0919933992652',
    status:'Success',
    price:'$1000',
    dateTime:'27 September 2024, 10:00 AM',
    mobNo:'Xxxxx98'
  }
]


const PaymentHistory = () => {
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
            heading="Payment History"
            showNotification={true}
            headingStyle={{ color: 'white', fontSize: 20, }}
            showBackButton={true}
            onPressBack={() => { navigation.goBack() }}
          />
        </BlurView>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <CalendarLogo/>
          <TextInput
            style={styles.searchInputStyle}
            placeholder="27 September 2024"
            placeholderTextColor="white"
          />
        </View>
        <FrameLogo style={styles.filterIconStyle}/>
      </View>
      <FlatList
        data={paymentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style = {styles.paymentView}>
        <View style = {styles.nameStatus}>
          <Text style = {{fontSize:14,fontWeight:'500',color:'#D7BC70'}}>{item.paymentId}</Text>
          <View style = {{flexDirection:'row'}}>
            <Text style = {{fontSize:14,fontWeight:'500',color:'white'}}>Status: </Text>
            <Text style = {{fontSize:14,fontWeight:'500',color:'#D7BC70'}}>{item.status}</Text>
          </View>
        </View>
        <View style = {styles.priceView}>
          <DollerCircle/>
          <Text style = {{fontSize:14,fontWeight:'500'}}>{item.price}</Text>
        </View>
        <View style = {styles.dateTimeView}>
          <CalendarTick/>
          <View>
            <Text style = {{fontSize:14,fontWeight:'500',color:'white'}}>Date & Time:</Text>
            <Text style = {{fontSize:14,fontWeight:'500',color:'#D7BC70'}}>{item.dateTime}</Text>
          </View>
        </View>
        <View style = {styles.paymentMethodView}>
          <Card/>
          <View>
            <Text style = {{fontSize:14,fontWeight:'500',color:'white'}}>Pay Via CC</Text>
            <Text style = {{fontSize:14,fontWeight:'500',color:'#D7BC70'}}>{item.mobNo}</Text>
          </View>
        </View>

      </View>
        )}
      />
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
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterIconStyle: {
    width: 24,
    height: 24,
    right:-20,
    top:7
  },
  paymentView:{
    width:'90%',
    alignSelf:'center',
    backgroundColor:'#0E0E0E',
    borderRadius:20,
    padding:20,
    marginTop:20,
    borderWidth:1,
    borderColor:'#212020',
    gap:5
  },
  nameStatus:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10
  },
  priceView:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10,
    backgroundColor:'#D7BC70',
    width:90,
    borderRadius:4,
    gap:5,
    paddingHorizontal:5,
    paddingVertical:2
  },
  dateTimeView:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10,
    gap:10
  },
  paymentMethodView:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },

})

export default PaymentHistory