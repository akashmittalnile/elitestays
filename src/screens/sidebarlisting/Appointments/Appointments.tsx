import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { VibrancyView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import CalendarLogo from 'assets/Icons/calendar.svg';
import FrameLogo from 'assets/Icons/Frame.svg';
import SmsLogo from 'assets/Icons/sms.svg';
import CalenderTick from 'assets/Icons/calendar-tick.svg';
import GoldenButton from 'components/Buttons/GoldenButton';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AppointmentBooking: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'AppointmentBooking'>;

interface Appointment {
  id: number;
  name: string;
  email: string;
  dateAndTime: string;
  status: string;
}

const AppointmentsData: Appointment[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    dateAndTime: '27 September 2024, 10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    dateAndTime: '27 September 2024, 11:00 AM',
    status: 'Not Confirmed',
  },
];

const Appointments: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#232323']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0.1975, 0.8855]}
        style={styles.customHeader}
      >
        <Header
          heading="Appointments"
          showNotification={true}
          headingStyle={{ color: 'white', fontSize: 18, fontWeight: '400' }}
          onPressBack={() => navigation.goBack()}
        />
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <CalendarLogo />
          <TextInput
            style={styles.searchInputStyle}
            placeholder="27 September 2024"
            placeholderTextColor="white"
          />
        </View>
        <FrameLogo style={styles.filterIconStyle} />
      </View>

      <FlatList
        data={AppointmentsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentView}>
            <View style={styles.nameStatusView}>
              <Text style={styles.nameText}>{item.name}</Text>
              <View style={styles.statusView}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.smsView}>
              <SmsLogo />
              <Text style={styles.emailText}>{item.email}</Text>
            </View>
            <Text style={styles.inquiryText}>Hello, I want to know more about...</Text>
            <View style={styles.dateView}>
              <CalenderTick />
              <View>
                <Text style={styles.dateLabel}>Date & Time:</Text>
                <Text style={styles.dateText}>{item.dateAndTime}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <GoldenButton
        buttonText="Book An Appointment"
        onPress={() => navigation.navigate('AppointmentBooking')}
        style={styles.bookButton}
        buttonTextStyle={{ fontSize: 14, fontWeight: '700',color: 'black' }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  customHeader: {
    width: '100%',
    height: 130,
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
   gap: 10
  },
  filterIconStyle: {
    width: 24,
    height: 24,
    right:-20,
    top:8
  },
  appointmentView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0E0E0E',
    borderWidth: 1,
    borderColor: '#212020',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  nameStatusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D7BC70',
    marginLeft: 5,
  },
  smsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#D7BC70',
    width: 150,
    padding: 5,
    borderRadius: 4,
  },
  emailText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  inquiryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginTop: 13,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D7BC70',
  },
  bookButton: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 35,
    height:60
  },
});

export default Appointments;
