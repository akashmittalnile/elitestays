import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import React,{useContext} from 'react';
import Header from 'components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import GoldenButton from 'components/Buttons/GoldenButton';
import { FlatList } from 'react-native-gesture-handler';
import CalculatorLogo from '../../assets/Icons/Calculator.svg';
import Sidebar from 'components/Sidebar/Sidebar';
import { SidebarContext } from 'components/context/SidebarContext';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const PropertyData = [
    {
        id: 1,
        title: 'Property 1',
        price: 230,
        location: 'Lahore',
        image: require('../../assets/Images/property.png'),
        ratings: 4.5
    },
    {
        id: 2,
        title: 'Property 2',
        price: 240,
        location: 'Karachi',
        image: require('../../assets/Images/property.png'),
        ratings: 4.7
    },
    {
        id: 3,
        title: 'Property 3',
        price: 350,
        location: 'Islamabad',
        image: require('../../assets/Images/property.png'),
        ratings: 4.9
    }
];


const testimonials = [
    {
        id: '1',
        name: 'John Doe',
        image: require('../../assets/Images/profile.png'),
        testimonial: 'Sapiente occaecati exercitationem quasi eum corporis sit. Aut consectetur maxime debitis quam voluptatem aut consequatur.',
        ratingImage: require('../../assets/Images/testimonial.png')
    },
    {
        id: '2',
        name: 'Jane Smith',
        image: require('../../assets/Images/profile.png'),
        testimonial: 'Sapiente occaecati exercitationem quasi eum corporis sit. Aut consectetur maxime debitis quam voluptatem aut consequatur.',
        ratingImage: require('../../assets/Images/testimonial.png')
    },
    {
        id: '3',
        name: 'Alex Johnson',
        image: require('../../assets/Images/profile.png'),
        testimonial: 'Sapiente occaecati exercitationem quasi eum corporis sit. Aut consectetur maxime debitis quam voluptatem aut consequatur.',
        ratingImage: require('../../assets/Images/testimonial.png')
    },
];

const HomeScreen = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigation = useNavigation();


    const context = useContext(SidebarContext);

    const { isOpen, toggleSidebar } = context;

    const renderTestimonial = ({ item }) => (
        <View style={styles.testimonials}>
            <View style={styles.profileTestimonial}>
                <Image source={item.image} style={styles.profileImage} />
                <View style={styles.testimonialText}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Image source={item.ratingImage} style={styles.ratingImage} />
                </View>
            </View>
            <Text style={styles.testimonialDescription}>{item.testimonial}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.subContainer}>
            <View style={styles.imageView}>
                <Image source={item.image} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                <Image source={require('../../assets/Images/Heart.png')} style={{ width: 20, height: 20, position: 'absolute', top: 5, left: 5 }} />
                <GoldenButton buttonText="Status:Active" style={{ width: 100, height: 25, position: 'absolute', bottom: 10, alignSelf: 'center', opacity: 1 }} buttonTextStyle={{ color: 'white', fontSize: 12, fontWeight: '400' }} />
            </View>
            <View style={styles.infoView}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Image source={require('../../assets/Icons/star.png')} style={{ width: 15, height: 15 }} />
                    <Text style={{ color: 'white', fontSize: 15 }}>{item.ratings}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Image source={require('../../assets/Icons/location.png')} style={{ width: 15, height: 15 }} />
                    <Text style={{ color: 'white', fontSize: 15,fontWeight:'200' }}>{item.location}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#D7BC70', fontSize: 19, fontWeight: '800' }}>${item.price}</Text>
                    <Text style={{ color: 'white', fontSize: 15 }}>/month</Text>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.scrollContainer}>
            <Sidebar />
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
                            heading="Home"
                            showBackButton={false}
                            showNotification={true}
                            showGridIcon={true}
                            headingStyle={{ color: 'white', fontSize: 20 }}
                            toggleSidebar={toggleSidebar}
                        />
                    </BlurView>
                </LinearGradient>
                <View style={styles.heroSection}>
                    <View style={styles.left}>
                        <Text style={{ color: 'white', fontSize: 17 }}>Post New</Text>
                        <Text style={{ color: '#D7BC70', fontSize: 25, marginTop: 5, fontWeight: '500' }}>Properties</Text>
                        <GoldenButton buttonText="Post" style={styles.goldenButton} buttonTextStyle={{ color: 'black', fontWeight: '500' }} 
                        onPress={()=>navigation.navigate('ContactInfoScreen')}/>
                    </View>
                    <View style={styles.right}>
                        <Image source={require('../../assets/Images/GroupImage.png')} style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>
                <FlatList
                    data={PropertyData}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.returnCalculatorView}>
                    <Image
                        source={require('../../assets/Images/returnCalculatorBgImage.png')}
                        style={styles.calcbgimage}
                    />
                    <CalculatorLogo width={70} height={80} style={styles.calculatorLogo} />
                    <View style={styles.calculatorView}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Return Calculator</Text>
                        <GoldenButton
                            buttonText="Calculate"
                            style={{ width: 100, height: 40, marginTop: 5 }}
                            buttonTextStyle={{ color: 'black', fontSize: 14, fontWeight: '500' }}
                        />
                    </View>
                </View>
                <Text style={{
                    color: 'white', fontSize: 20, fontWeight: '500', left: 20,
                    top: 20
                }}>Testimonials</Text>
                <FlatList
                    data={testimonials}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTestimonial}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.testimonialList}
                />
            </View>
        </ScrollView>
    );
};

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
    heroSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '90%',
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#232323',
        borderRadius: 20
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    right: {
        width: 200,
        height: 170,
        right: 30,
    },
    goldenButton: {
        width: 100,
        height: 35,
        marginTop: 15,
    },
    subContainer: {
        flexDirection: 'row',
        width: 325,
        height: 150,
        backgroundColor: '#0E0E0E',
        borderWidth: 1,
        borderColor: '#212020',
        marginTop: 30,
        marginRight: 15,
        borderRadius: 20,
        padding: 10,
    },
    imageView: {
        width: 130,
        height: 130,
    },
    infoView: {
        width: 200,
        height: 200,
        margin: 15,
        display: 'flex',
        flexDirection: 'column',
        gap: 7
    },
    returnCalculatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#131111',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#212020',
    },
    calcbgimage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    calculatorLogo: {
        position: 'absolute',
        left: 10,
        top: 13,
    },
    calculatorView: {
        marginLeft: 65,
    },
    testimonials: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#D7BC70',
        width: 350,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 20,
        marginRight: 15,
        marginTop: 20,
      },
      profileTestimonial: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15,
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      testimonialText: {
        top: -10,
      },
      nameText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500',
      },
      ratingImage: {
        width: 180,
        height: 30,
        marginTop: 16,
      },
      testimonialDescription: {
        color: 'white',
        fontSize: 17,
        lineHeight: 30,
        marginTop: -10,
        marginLeft:7
      },
      testimonialList: {
        paddingHorizontal: 20,
        paddingVertical: 20,
      },
});

export default HomeScreen;
