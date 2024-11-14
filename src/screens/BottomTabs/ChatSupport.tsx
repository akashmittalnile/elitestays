import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Header from 'components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Sidebar from 'components/Sidebar/Sidebar';
import { SidebarContext } from 'components/context/SidebarContext';

type SidebarContextProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const ChatSupport: React.FC = () => {
    const context = useContext<SidebarContextProps | undefined>(SidebarContext);

    if (!context) {
        throw new Error("ChatSupport must be used within a SidebarProvider");
    }

    const { isOpen, toggleSidebar } = context;

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
                            heading="Chat Support"
                            showBackButton={false}
                            showNotification={true}
                            showGridIcon={true}
                            headingStyle={{ color: 'white', fontSize: 20 }}
                            toggleSidebar={toggleSidebar}
                        />
                    </BlurView>
                </LinearGradient>
            </View>
        </ScrollView>
    );
};

// Styles
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
        alignItems: 'center',
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatSupport;
