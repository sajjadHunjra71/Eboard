import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import TabContainer from './TabContainer';
import Forgot_password from '../screens/Forgot_password';




export default function Login({ navigation }) {
    const [email, setEmail] = useState("employee@gmail.com");
    const [password, setPassword] = useState("123456");
    const [hidePass, setHidePass] = useState(true);
    var [isLoading, setIsLoading] = useState(false);


    // API Call


    const getDataUsingGet = () => {
        setIsLoading(true);
        const formData = new FormData()
        formData.append('email', email);
        formData.append('password', password);
        try {
            fetch('http://eboard.qubitars.com/api/login', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.error) {
                        alert(responseJson.error_msg);
                        setIsLoading(false);
                    } else {
                         AsyncStorage.setItem('session', JSON.stringify('login'));
                        try {

                            AsyncStorage.setItem('data', JSON.stringify(responseJson));
                            
                            console.log('Data has been stored');
                            setIsLoading(false);

                            navigation.navigate('TabContainer');
                        } catch (error) {
                            console.log(error)
                        }

                    }

                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };


    // CALL API END


    return (

        <KeyboardAvoidingView style={styles.container}>

            <View style={styles.layer1}>
                <Text style={styles.loginTxt}>Log In</Text>
            </View>

            <View style={styles.layer2}>

                <View style={styles.layer3}>
                    <View style={styles.layer4}>

                        <View >
                            <ScrollView >
                                <Text style={styles.text}>Email</Text>
                                <View style={styles.inputView}>
                                    <Fontisto name="email" size={20} color="white" style={{ marginLeft: 10, }} />
                                    <TextInput
                                        style={styles.TextInput}

                                        placeholder="e.g john@example.com"

                                        placeholderTextColor="#fff"
                                        onChangeText={(email) => setEmail(email)}
                                    />

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.text}>Password</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Forgot_password')}>
                                        <Text style={styles.forgot_button}>Forgot Password?</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.inputView}>
                                    <Fontisto name="key" size={20} color="white" style={{ marginLeft: 10, }} />
                                    <TextInput
                                        style={styles.TextInput}

                                        placeholder="Password"
                                        secureTextEntry={hidePass ? true : false}

                                        placeholderTextColor="#fff"
                                        onChangeText={(password) => setPassword(password)}
                                    />
                                    <Ionicons name="eye-outline" size={24} color="white" onPress={() => setHidePass(!hidePass)} style={{ marginRight: '5%', }} />


                                </View>
                                <TouchableOpacity style={styles.loginBtn} onPress={getDataUsingGet}  >
                                {/* <TouchableOpacity style={styles.loginBtn} onPress={()=> navigation.navigate('TabContainer')}> */}

                                    <Text style={styles.loginText}>LOGIN</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>

                    </View>

                </View>

            </View>



        </KeyboardAvoidingView>
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
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer3: {
        width: '100%',
        flex: 1,
        marginTop: 45,
        backgroundColor: '#E8ECED',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,


    },

    layer4: {
        width: '100%',
        flex: 1,
        marginTop: 55,
        backgroundColor: '#040d50',
        borderTopLeftRadius: 170,
        borderTopRightRadius: 170,
        justifyContent: 'center',


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
        marginTop: 20,
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
        fontSize: 35,
        marginLeft: '23%',
        color: '#fff',
        // marginTop:'25%',      
        fontWeight: 'bold',
    }


});