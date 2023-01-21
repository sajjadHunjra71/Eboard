import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity,AsyncStorage, SafeAreaView, Platform } from 'react-native'
import { MaterialCommunityIcons, Entypo, MaterialIcons,Ionicons } from '@expo/vector-icons';
// import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import My_Achievements from './My_Achievements';
import MyStatistics from './MyStatistics';
import InnerProfile from './InnerProfile';
import ChangePassword from './ChangePassword';



export default function Header({navigation}) {

    const [Employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    
    useEffect(async () => {

        let user = await AsyncStorage.getItem('data');
        let parsed = JSON.parse(user);
        // console.log(parsed);
        setEmployee(parsed.data)
        setIsLoading(false);
        // console.log('data************',Employee.image)
       

    }, []);

    return (
        <>

        {
           isLoading==true?
           null
           : 
        
        <SafeAreaView style={{
        marginTop:Platform.OS=='ios'?0:0
       
        }}>
            <View style={styles.header}>
              <TouchableOpacity  style={ {width:40,height: 40,marginLeft:-30}} onPress={()=>navigation.navigate('Profile')} >
              <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/'+Employee.image }} resizeMode='cover' style={styles.profilePic} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', }}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} ></Image>
                </View>

                <View style={{ justifyContent: 'center', }}>
                <Ionicons name="ios-chevron-back-outline" onPress={()=>navigation.goBack()} size={24} color="black" style={{ alignSelf: 'flex-end', marginRight: -25, }} />
                </View>
            </View>

        

        </SafeAreaView>
        }
        </>
    )

}
const styles = StyleSheet.create({
    container: {
        height: 70,
       
    },
    logo: {
        width: 80,
        height: 20,
        marginTop: 10,

    }, header: {
        width: '100%',
        height: 70,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'red',

        backgroundColor: '#E8ECED',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 50,
        // marginLeft: -30,

    },

  

});
