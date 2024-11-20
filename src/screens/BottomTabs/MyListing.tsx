import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import React,{useContext} from 'react';
import Header from 'components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import GoldenButton from 'components/Buttons/GoldenButton';
import { FlatList } from 'react-native-gesture-handler';
import { getActionFromState } from '@react-navigation/native';
import { SidebarContext } from 'components/context/SidebarContext';
import Sidebar from 'components/Sidebar/Sidebar';

type SidebarContextProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const PropertyData = [
    {
        id: 1,
        title: 'Property 1',
        price: 230,
        location: 'Lahore',
        image: require('../../assets/Images/property.png'),
        ratings: 4.5,
        beds: '01',
        baths: '02',
    },
    {
        id: 2,
        title: 'Property 2',
        price: 240,
        location: 'Karachi',
        image: require('../../assets/Images/property.png'),
        ratings: 4.7,
        beds: '02',
        baths: '03',
    },
    {
        id: 3,
        title: 'Property 3',
        price: 350,
        location: 'Islamabad',
        image: require('../../assets/Images/property.png'),
        ratings: 4.9,
        beds: '03',
        baths: '04',
    }
]

const MyListing: React.FC = () => {
    const context = useContext<SidebarContextProps | undefined>(SidebarContext);

    if (!context) {
        throw new Error("ChatSupport must be used within a SidebarProvider");
    }

    const { isOpen, toggleSidebar } = context;
    return (
        <View style={styles.Container}>
            <Sidebar/>
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
                        heading="My Listings"
                        showBackButton={false}
                        showNotification={true}
                        showGridIcon={true}
                        headingStyle={{ color: 'white', fontSize: 20 }}
                        toggleSidebar={toggleSidebar}
                    />
                </BlurView>
            </LinearGradient>

            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Image source={require('../../assets/Icons/search-normal.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="white"
                    />
                </View>
                <Image source={require('../../assets/Icons/Frame.png')} style={styles.filterIcon} />
            </View>
            <FlatList
                data={PropertyData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.propertyContainer}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={{ color: 'white' }}>⭐ {item.ratings}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>${item.price}</Text>
                                <Text style={{ color: '#D7BC70' }}>/month</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center',gap:4 }}>
                                <Image source={require('../../assets/Icons/Bed.png')} style={{ width: 20, height: 20}} />
                                <Text style={{ color: 'white' }}>Beds: {item.beds}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center',gap:4,marginTop:10}}>
                                <Image source={require('../../assets/Icons/Bathtub.png')} style={{ width: 20, height: 20 }} />
                            <Text style={{ color: 'white' }}>Baths: {item.baths}</Text>
                            </View>
                        </View>
                            <View style={{flexDirection:'row',alignContent:'center',gap:5,marginTop:10 }}>
                            <Image source={require('../../assets/Icons/location.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{color:'white'}}>{item.location}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2B2B2B',
        height: 60,
        marginTop: 20,
        borderRadius: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        gap: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    filterIcon: {
        width: 50,
        height: 70,
        marginRight: 3,
        marginTop: 15
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    propertyContainer: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        borderColor: '#212020',
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        gap: 14,
        marginTop: 10,
    },

});

export default MyListing;
