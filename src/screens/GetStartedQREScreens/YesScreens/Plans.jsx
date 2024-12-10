import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import useAPI from 'src/hooks/useAPI';
import { APIEndPoints } from 'src/WebAPI/Service';
import Loader from 'components/Loader';
const plansDataDummy = [
  {
    "id": 4,
    "product_id": "prod_RD0lFmomkvY4Aw",
    "name": "Starter",
    "image": "https://nileprojects.in/elite-stays/public/assets/images/no-image.jpg",
    "monthly_price": "99",
    "monthly_price_id": "price_1QKakMGauO6maaV0BtqOQXp8",
    "anually_price": "1000",
    "anually_price_id": "price_1QKamRGauO6maaV0jXudDNfd",
    "currency": "usd",
    "current_plan": false
  },
  {
    "id": 3,
    "product_id": "prod_RD0mtrgM6gaGK5",
    "name": "Premier",
    "image": "https://nileprojects.in/elite-stays/public/assets/images/no-image.jpg",
    "monthly_price": "199",
    "monthly_price_id": "price_1QKakoGauO6maaV02tRsomn7",
    "anually_price": "2100",
    "anually_price_id": "price_1QKamsGauO6maaV0OVT7trio",
    "currency": "usd",
    "current_plan": false
  },
  {
    "id": 2,
    "product_id": "prod_RD0mOymP6z2hWD",
    "name": "Premier Plus",
    "image": "https://nileprojects.in/elite-stays/public/assets/images/no-image.jpg",
    "monthly_price": "399",
    "monthly_price_id": "price_1QKalPGauO6maaV0jk119k1d",
    "anually_price": "4000",
    "anually_price_id": "price_1QKanHGauO6maaV0G9syDnji",
    "currency": "usd",
    "current_plan": false
  },
  {
    "id": 1,
    "product_id": "prod_RD0nxL3FlZ32zn",
    "name": "Platinum",
    "image": "https://nileprojects.in/elite-stays/public/assets/images/no-image.jpg",
    "monthly_price": "699",
    "monthly_price_id": "price_1QKalnGauO6maaV0Auh3tQi7",
    "anually_price": "7000",
    "anually_price_id": "price_1QKanbGauO6maaV0HePem1y0",
    "currency": "usd",
    "current_plan": false
  }
]




const Plans = ({ route }) => {
  const navigation = useNavigation();
  const { getAPI, loading } = useAPI()
  const payload = route?.params?.payload
  console.log({ payload });

  const [plansData, setplansData] = useState([])

  async function getPlans() {
    const { res, err } = await getAPI({ endPoint: APIEndPoints.plans })
    {console.log('my response--->>>',res)}
    if (res) {
      {console.log('my response--->>>',res)}
      setplansData(res?.data)
    }
  }

  useEffect(() => {
    getPlans()


  }, [])


  function next(item) {
    navigation.navigate('Signup', { payload: { ...payload, plan_id: item.id } })
    // navigation.navigate('CurrentManagementFeeCalculation', { payload: { ...payload, plan_id: item.id } })
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
            heading="Elite Stays Membership"
            showNotification={false}
            headingStyle={{ color: 'white', fontSize: 16,marginTop:7 }}
            showBackButton={true}
            onPressBack={() => { navigation.goBack() }}
          />
        </BlurView>
      </LinearGradient>
      {/* <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <CalendarLogo/>
          <TextInput
            style={styles.searchInputStyle}
            placeholder="27 September 2024"
            placeholderTextColor="white"
          />
        </View>
        <FrameLogo style={styles.filterIconStyle}/>
      </View> */}
      <FlatList
        data={plansData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const { id,
            product_id,
            name,
            image,
            monthly_price,
            monthly_price_id,
            anually_price,
            anually_price_id,
            currency,
            current_plan } = item
          return (
        

            <TouchableOpacity onPress={() => next(item)} style={styles.paymentView}>
                  {console.log('llllll------->>>>',item)}
              <View style={styles.nameStatus}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#D7BC70' }}>{product_id}</Text>
                {/* <View style = {{flexDirection:'row'}}>
            <Text style = {{fontSize:14,fontWeight:'500',color:'white'}}>Status: </Text>
            <Text style = {{fontSize:14,fontWeight:'500',color:'#D7BC70'}}>{item.status}</Text>
          </View> */}
              </View>
              <View style={styles.priceView}>
                {/* <DollerCircle/> */}
                <Text style={{ fontSize: 14, fontWeight: '500' }}>{name}</Text>
              </View>
              <View style={styles.dateTimeView}>
                {/* <DollerCircle/> */}
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>Monthly Price</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#D7BC70' }}>${monthly_price}</Text>
                </View>
              </View>
              <View style={styles.paymentMethodView}>
                {/* <Card/> */}
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>Annual Price</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#D7BC70' }}>${anually_price}</Text>
                </View>
              </View>

            </TouchableOpacity>
          )
        }}
      />

      {loading && <Loader />}
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
    right: -20,
    top: 7
  },
  paymentView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0E0E0E',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#212020',
    gap: 5
  },
  nameStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#D7BC70',
    width: 90,
    borderRadius: 4,
    gap: 5,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  dateTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  paymentMethodView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

})

export default Plans