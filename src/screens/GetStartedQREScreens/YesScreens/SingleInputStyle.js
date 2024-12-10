import { StyleSheet } from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors, dimensions } from '../../../utils/Constant';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logo: {
        marginTop: responsiveHeight(1),
        alignSelf: 'center',
    },
    mainText: {
        marginTop: responsiveHeight(15),
        color: colors.gold,
        textAlign: 'center',
        fontSize: responsiveFontSize(3.5),
        fontWeight: '500',
        width:'98%'
    },
    subContainer: {
        alignSelf: 'center',
        paddingTop: responsiveHeight(3),
        width: '90%',
    },
    inputBoxStyle: {
        marginBottom: responsiveHeight(1.5),
    },
    forgotStyle: {
        fontSize: responsiveFontSize(1.7),
        color: colors.gold,
        fontWeight: '500',
    },
    text: {
        marginTop: responsiveHeight(1),
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        width:dimensions.SCREEN_WIDTH*0.90,
        alignSelf:'center'
        // letterSpacing: responsiveWidth(0.1),
    },
    goldenButtonStyle: {
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        width: '100%',
    },
    goldenTextStyle: {
        color: colors.black,
        fontSize: responsiveFontSize(1.8),
    },
    policy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    policyButton: {
        marginTop: responsiveHeight(3.5),
    },
    policyText: {
        color: colors.gold,
        fontSize: responsiveFontSize(1.5),
        fontWeight: '500',
    },
    fullWidthModel: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    bottomModel: {
        backgroundColor: '#181717',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: '100%'
    }
});