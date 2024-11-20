import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from 'screens/BottomTabs/HomeScreen';
import MyListing from 'screens/BottomTabs/MyListing';
import ChatSupport from 'screens/BottomTabs/ChatSupport';
import ProfileScreen from 'screens/BottomTabs/ProfileScreen';
import HomeLogo from 'assets/Icons/HomeScreen.svg';
import ChatSupportLogo from 'assets/Icons/ChatSupport.svg';
import MyListingLogo from 'assets/Icons/MyListing.svg';
import ProfileLogo from 'assets/Icons/user-octagon.svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SidebarProvider } from 'components/context/SidebarContext';
import Profile from 'screens/sidebarlisting/Profile';
import Appointments from 'screens/sidebarlisting/Appointments/Appointments';
import Logout from 'screens/sidebarlisting/Logout';
import MembershipPlan from 'screens/sidebarlisting/MembershipPlan';
import PrivacyPolicy from 'screens/sidebarlisting/PrivacyPolicy';
import PaymentHistory from 'screens/sidebarlisting/PaymentHistory';
import TermsAndConditions from 'screens/sidebarlisting/TermsAndConditions';
import ContactInfoScreen from 'screens/propertyMultistepform/ContactInfoScreen';
import PropertyDetailStepScreen from 'screens/propertyMultistepform/PropertyDetailStepScreen';
import PropertyManagementPreferences from 'screens/propertyMultistepform/PropertyManagementPreferences';
import UserSetupCompleteScreen from 'screens/Auth/UserSetupCompleteScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import AppointmentBooking from 'screens/sidebarlisting/Appointments/AppointmentBooking';
import SignIn from 'screens/Auth/SignIn';
import Signup from 'screens/Auth/Signup';
import GetStarted from 'screens/Auth/GetStarted';
import EditProfileScreen from 'screens/BottomTabs/EditProfileScreen';
import { ToastProvider } from 'react-native-toast-notifications'
import UserTypeSelection from 'screens/GetStartedQREScreens/UserTypeSelection';
import CurrentManagement from 'screens/GetStartedQREScreens/YesScreens/CurrentManagement';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          paddingBottom: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopColor: 'transparent',
          elevation: 4,
        },
        tabBarBackground: () => (
          <View style={styles.blurContainer}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.78)', '#232323']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              locations={[0.1975, 0.8855]}
              style={StyleSheet.absoluteFill}
            >
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={6}
                reducedTransparencyFallbackColor="#130e0e"
              />
            </LinearGradient>
          </View>
        ),
        tabBarActiveTintColor: '#eec42e',
        tabBarInactiveTintColor: '#A9A9A9',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <HomeLogo /> }}
      />
      <Tab.Screen
        name="MyListing"
        component={MyListing}
        options={{ tabBarIcon: () => <MyListingLogo /> }}
      />
      <Tab.Screen
        name="ChatSupport"
        component={ChatSupport}
        options={{ tabBarIcon: () => <ChatSupportLogo /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <ProfileLogo /> }}
      />
    </Tab.Navigator>
  );
};

function MainNavigation() {
  return (
    <ToastProvider>
    <SidebarProvider>
      <NavigationContainer>
        <GestureHandlerRootView>
          <Stack.Navigator initialRouteName='GetStarted'>
          <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{ headerShown: false }}
            />
          <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Appointments"
              component={Appointments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MembershipPlan"
              component={MembershipPlan}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentHistory"
              component={PaymentHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Logout"
              component={Logout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AppointmentBooking"
              component={AppointmentBooking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactInfoScreen"
              component={ContactInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PropertyDetailStepScreen"
              component={PropertyDetailStepScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PropertyManagementPreferences"
              component={PropertyManagementPreferences}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserSetupCompleteScreen"
              component={UserSetupCompleteScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserTypeSelection"
              component={UserTypeSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CurrentManagement"
              component={CurrentManagement}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </SidebarProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default MainNavigation;
