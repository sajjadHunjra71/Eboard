import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import Header from './Header';
import { Feather, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import WinningReward from './WinningReward';
export default function My_Achievements({navigation}) {

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {/* <View style={{ width: '100%', height: '100%', backgroundColor:'red',}}> */}
            <View style={styles.styleBox}>
                    <View style={{  alignItems: 'center', }}>
                        <Image source={require('../assets/img.jpg')} resizeMode='cover' style={styles.profilePic} />
                        {/* <Text style={styles.name}>Sajjad Khalid</Text> */}
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginLeft:15,marginTop:10,}} >My Achievments</Text>

                    </View>

                </View>
                <View style={styles.card1}>
                    {/* <View style={{width:'100%',height:60,}}>
                    </View> */}
                    <WinningReward/>
                </View>

            </View>

        // </View>
    );

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor:'#f49f1c',
    },
    card1: {
        // width: '90%',
        // height:'50%',
        flex:1,
 
        // backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop:10,
        paddingVertical: 10,
    },
    styleBox: {
        width: '90%',
        height: 230,
        alignSelf: 'center',
        marginTop: '5%',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#040d50',

    },
    name: {
        fontSize
        : 20,
        color: '#f49f1c',
        alignSelf: 'center',
        marginTop: 5,
        fontWeight: 'bold',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 15,
        // marginLeft: 50,

    },

});