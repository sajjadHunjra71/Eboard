import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import Header from './Header';
import { Ionicons, MaterialCommunityIcons, Feather, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import {path} from './ApiUrl';


export default function ChangePassword({ route, navigation }) {
    const [hidePass, setHidePass] = useState(true);
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
    const [id, setId] = useState(route.params.id);
    const [modalVisible2, setModalVisible2] = useState(false);




    const changePass = () => {

        const formData = new FormData()
        formData.append('oldpassword', oldPassword);
        formData.append('newpassword', newPassword);
        formData.append('confirmpassword', confirmNewPassword);
        formData.append('id', id);




        try {
            fetch(path+'change_password', {
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
                    } else {

                        try {

                            alert("Succesfully changed Password ");


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

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={{ width: '100%', height: '100%', }}>
                    <View style={styles.card}>
                        <View style={{ width: '100%', height: 40, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginLeft: 20, }}>Change Password</Text>
                        </View>
                        <View style={{ width: '100%', height: 75, marginTop: 10, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: '6%', }}>Old password</Text>
                            <View style={styles.field}>

                                <TextInput onChangeText={(old) => setoldPassword(old)} placeholder='Enter old password' secureTextEntry={hidePass ? true : false} placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                <Ionicons name="eye-outline" size={24} color="black" onPress={() => setHidePass(!hidePass)} style={{ alignSelf: 'flex-end', }} />

                            </View>
                        </View>

                        <View style={{ width: '100%', height: 75, marginTop: 10, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: '6%', }}>New Password</Text>
                            <View style={styles.field}>

                                <TextInput onChangeText={(newPass) => setnewPassword(newPass)} placeholder='Enter New password' secureTextEntry={hidePass1 ? true : false} placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                <Ionicons name="eye-outline" size={24} color="black" onPress={() => setHidePass1(!hidePass1)} style={{ alignSelf: 'flex-end', }} />

                            </View>
                        </View>


                        <View style={{ width: '100%', height: 75, marginTop: 10, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: '6%', }}>Confirm password</Text>
                            <View style={styles.field}>

                                <TextInput onChangeText={(confirm) => setconfirmNewPassword(confirm)} placeholder='Confirm password' secureTextEntry={hidePass2 ? true : false} placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                <Ionicons name="eye-outline" size={24} color="black" onPress={() => setHidePass2(!hidePass2)} style={{ alignSelf: 'flex-end', }} />

                            </View>
                        </View>

                        <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.loginBtn}  >
                            <Text style={styles.loginText}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
            <Modal

                transparent={true} visible={modalVisible2} animationType='slide' >
                <View style={styles.modalView}  >
                    {/* <Entypo name="cross" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }}  /> */}
                    <View >
                        <MaterialIcons name="warning" size={32} color="red" style={{ alignSelf: 'center', }} />
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 20, color: '#040d50', }}> Are you sure you want to Logout?</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly', width: '90%', }}>
                        <TouchableOpacity style={{ width: 70, height: 40, borderRadius: 10, backgroundColor: '#f49f1c', justifyContent: 'center', alignItems: 'center', }} onPress={() => setModalVisible2(!modalVisible2)}>
                            <Text style={{ color: '#fff', }}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2) & changePass()} style={{ width: 70, height: 40, borderRadius: 10, backgroundColor: '#040d50', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#fff', }}>Yes</Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    card: {
        width: '95%',
        height: 400,
        backgroundColor: '#040d50',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 80,
    },
    field: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        // marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        // borderColor:'#f49f1c',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
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
    modalView: {
        // marginLeft: '45%',
        marginTop: '70%',
        width: '80%',
        height: '30%',
        //  borderRadius: 7,
        backgroundColor: "#F3F4F6",
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        shadowColor: "#000",
        justifyContent: 'space-around',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },


});