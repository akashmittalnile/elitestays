import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from 'components/Header/Header'
import LinearGradient from 'react-native-linear-gradient';
import { VibrancyView } from "@react-native-community/blur";
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy = () => {

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
        <Header heading="Privacy Policy" showNotification={true} headingStyle={{ color: 'white', fontSize: 18, fontWeight: '400' }} onPressBack={()=>navigation.goBack()} />
      </LinearGradient>
      <View style = {styles.content}>
        <Text style = {{fontSize:13,fontWeight:'500',color:'#FFFFFF',lineHeight:20.5}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.


        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </Text>
      </View>
    </View >
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
  content:{
    padding:20
  }

})

export default PrivacyPolicy