import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function Reward() {

    return (
        <View style={styles.container}>
            <View style={styles.layer1}>
                <Text style={styles.loginTxt}>Log In</Text>
            </View>

            <View style={{width:'100%',height:'100%'}} >
            <View style={styles.card}>
                <View style={styles.layout1}>
                    <View>
                        <Text style={styles.textStyling}>
                            Employee of the day
                        </Text>
                    </View>
                    <View style={styles.pic}>
                        <Image style={styles.picStyling} source={require('../assets/img.jpg')} />
                    </View>

                </View>
                <View style={{ flex: 1, justifyContent: 'space-around', paddingVertical: 10, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.winnerName}>Sajjad Khalid</Text>
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('TabContainer')} >
                        <Text style={styles.loginText}>Continue</Text>
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
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#040d50',
    },
    layer1: {
        width: '65%',
        height: '25%',
        backgroundColor: "#f49f1c",
        borderBottomRightRadius: 280,
        justifyContent: 'center',
    },
    loginTxt: {
        fontSize: 35,
        marginLeft: '23%',
        color: '#fff',
        // marginTop:'25%',      
        fontWeight: 'bold',
    },
    layout1: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pic: {
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        marginBottom: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90

    },
    picStyling: {
        width: 140,
        height: 140,
        borderRadius: 70,
        resizeMode: 'cover',
    },
    textStyling: {
        fontSize: 24,
        color: '#f49f1c',
        marginTop: 30,

    },
    loginBtn: {
        backgroundColor: "#f49f1c",
        borderRadius: 30,
        width: 200,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 30,

    },
    loginText: {
        // marginTop: '6%',
        // alignSelf:'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },

    winnerName: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },



});