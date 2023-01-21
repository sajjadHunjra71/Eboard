import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Fontisto } from '@expo/vector-icons';
// import Login from './Login';
export default function Login({ navigation }) {




    const ValidateEmail=(mail)=> {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.layer1}>
                <Text style={styles.loginTxt}>Forgot Password</Text>
            </View>

            <View style={styles.layer2}>
                <View style={styles.layer3}>
                    <View style={styles.layer4}>
                        <View style={{ marginTop: 80, }}>
                            <Text style={styles.txt2}>
                                Enter your email
                            </Text>
                            <Text style={styles.txt2}>And the instructions will be sent to you!</Text>

                            <Text style={styles.text}>Email</Text>
                            {/* <TextInput  placeholder="e.g john@example.com" placeholderTextColor="#fff" style={styles.input}></TextInput> */}
                            <View style={styles.inputView}>
                                <Fontisto name="email" size={20} color="white" style={{ marginLeft: 10, }} />
                                <TextInput
                                    style={styles.TextInput}

                                    placeholder="e.g john@example.com"

                                    placeholderTextColor="#fff"
                                // onChangeText={(email) => setEmail(email)}
                                />

                            </View>




                            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')} >
                                <Text style={styles.loginText}>Submit</Text>
                            </TouchableOpacity>


                        </View>
                    </View>

                </View>

            </View>



        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    layer1: {
        width: '65%',
        height: '25%',
        backgroundColor: "#f49f1c",
        borderBottomRightRadius: 280,
        justifyContent: 'center',
    },

    layer2: {
        width: '100%',
        height: '100%',
        // marginTop: 5,
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer3: {
        width: '100%',
        height: '100%',
        marginTop: 40,
        backgroundColor: '#E8ECED',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer4: {
        width: '100%',
        height: '100%',
        marginTop: 50,
        backgroundColor: '#040d50',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    inputView: {
        backgroundColor: '#1f2e4d',
        borderRadius: 30,
        flexDirection: 'row',
        width: "80%",
        height: 45,
        marginTop: 5,
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },

    TextInput: {
        height: 45,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        backgroundColor: '#1f2e4d',
        borderRadius: 30,
        color: '#fff',

    },
    text: {
        marginTop: 40,
        color: '#fff',
        marginLeft: '15%',
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#1f2e4d',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 8,
        paddingLeft: 20,
        color: '#fff',
    },
    txt2: {
        color: '#fff',
        alignSelf: 'center',
        // textAlign: 'center',
        // width:'100%',
        fontSize: 18,
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
        fontSize: 15,
    },

    forgot_button: {
        color: '#888ea8',
        marginTop: 20,
        marginLeft: '37%',
    },
    loginTxt: {
        fontSize: 25,
        textAlign: 'justify',
        marginLeft: '10%',
        color: '#fff',
        // marginTop:'25%',      
        fontWeight: 'bold',
    }


});


//   <Svg  height={300}  xmlns="http://www.w3.org/2000/svg" viewBox="0 3 1440 320"><Path fill="#0099ff" fill-opacity="0" d="M0,288L120,256C240,224,480,160,720,160C960,160,1200,224,1320,256L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></Path></Svg>
