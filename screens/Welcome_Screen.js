import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome_Screen({navigation}) {

    const check_login_status=async()=>{
      var sessionparse= await AsyncStorage.getItem('session');
      var session=JSON.parse(sessionparse)
        if(session=='login'){
            navigation.navigate('TabContainer')
        }
        else{
            navigation.navigate('Login')
        }

    }

    return (
        <View style={styles.container}>
            <View style={{width:'100%',height:'50%',alignItems:'center',}}>
              <Image source={require('../assets/logo.png')} style={{width:200,height:80,marginTop:'24%',}} />
              <Image source={require('../assets/chart.gif')} style={{width:'80%',height:'60%',padding:10,marginTop:-10,}} />
            </View>
            <View style={styles.layer2}>
                <View style={styles.layer3}>
                {/* <Image source={require('../assets/tree.gif')} style={{width:20,height:20,backgroundColor:'red',}}></Image> */}
                    <View style={styles.layer4}>
                        <TouchableOpacity style={styles.loginBtn} onPress={()=>check_login_status()}>
                            <Text style={styles.loginText}>Get Started</Text>
                            <Feather name="arrow-right" size={24} color="white" style={{paddingLeft:10,}} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    layer2: {
        width: '100%',
        flex:1,
        // marginTop: '80%',
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer3: {
        width: '100%',
        flex:1,
        marginTop: '25%',
        backgroundColor: '#E8ECED',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer4: {
        width: '100%',
        flex:1,
        marginTop: '30%',
        backgroundColor: '#040d50',
        alignItems:'center',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,
        justifyContent:'center'

    },
    loginBtn: {
        backgroundColor: "#f49f1c",
        borderRadius: 30,
        width: 200,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        // marginTop: '40%',
        flexDirection:'row',

    },
    loginText: {

        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});