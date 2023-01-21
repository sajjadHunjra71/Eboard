import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,AsyncStorage, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Header from './Header';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import InnerProfile from '../screens/InnerProfile'
import Login from './Login';
import MyStatistics from './MyStatistics';
import Clients from './Clients';


export default function Profile({ navigation}) {

    const [Employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(async() => {
        async function fetchData() {

            let user = await AsyncStorage.getItem('data');
            let parsed = JSON.parse(user);
            setEmployee(parsed.data)
            setIsLoading(false)
          }
          fetchData();
      }, []);

     


    const [modalVisible2, setModalVisible2] = useState(false);

    const logout=async()=>{
        await AsyncStorage.clear();
        navigation.navigate(Login)

    }
    return (

        <>
        {isLoading==true?null
        :
        <View style={styles.container}>

            <Header navigation={navigation}/>
            <View style={{ alignItems: 'center', flex: 1, }}>
                <View style={styles.styleBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <Image source={{uri:'http://eboard.qubitars.com/storage/app/'+Employee.image}} resizeMode='cover' style={styles.profilePic} />
                        {/* <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#f49f1c', justifyContent: 'center', marginRight: -65, alignItems: 'center', marginTop: -20, }}>
                            <FontAwesome name="pencil-square-o" size={20} color="#040d50" />
                        </View> */}
                    </View>

                    <Text style={styles.name}>{Employee.name}</Text>

                    <View >

                        {/* <View style={{ width: '90%', marginTop: 10, height: 30, flexDirection: 'row', justifyContent: 'center', }}>
                        <Feather name="mail" size={20} color="#fff" style={{ marginLeft: 10, }} />
                        <Text style={{ fontSize: 16, color: '#fff', marginLeft: '5%', }}>sajjad@gmail.com</Text>
                    </View>

                    <View style={{ width: '90%', marginTop: 10, height: 30, flexDirection: 'row', justifyContent: 'center', }}>
                        <Entypo name="phone" size={20} color="#fff" style={{ marginLeft: 10, }} />
                        <Text style={{ fontSize: 16, color: '#fff', marginLeft: '5%', }}>0300 0000000</Text>
                    </View> */}

                        <View style={{ width: '100%', height: 50, marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                            <TouchableOpacity style={{ width: 100, height: 35, borderRadius: 20, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', }} onPress={() => navigation.navigate('InnerProfile')} >
                               
                                <Feather name="user" size={22} color="black" />
                                <Text style={{ fontSize: 16, color: '#040d50', fontWeight: 'bold', marginLeft: -5, }}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 100, height: 35, borderRadius: 20, backgroundColor: '#f49f1c', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', }} onPress={() => navigation.navigate('EditProfile',{id:Employee.id})}>
                            {/* <TouchableOpacity style={{ width: 100, height: 35, borderRadius: 20, backgroundColor: '#f49f1c', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', }} > */}
                            
                                <FontAwesome name="pencil-square-o" size={20} color="#040d50" />
                                <Text style={{ fontSize: 16, color: '#040d50', fontWeight: 'bold', marginLeft: -5, }}>Edit</Text>
                            </TouchableOpacity>

                        </View>

                    </View>


                </View>


                <View style={styles.styleBox1}>

                    <TouchableOpacity onPress={()=>navigation.navigate('MyStatistics',{id:Employee.id})} style={{ width: '90%', height: 50, alignItems: 'center', borderRadius: 10, borderBottomWidth: .9, flexDirection: 'row', }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('MyStatistics',{id:Employee.id})} style={{ width: '50%', flexDirection: 'row', }}>
                            <FontAwesome5 name="dollar-sign" size={24} color="#040d50" />
                            <Text style={{ color: '#040d50', fontSize: 18, marginLeft: 10, fontWeight: 'bold', }}>My Statistics</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Ionicons name="ios-chevron-forward-outline" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }} />

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('Clients',{id:Employee.id})} style={{ width: '90%', height: 50, alignItems: 'center', borderRadius: 10, borderBottomWidth: .9, flexDirection: 'row', }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Clients',{id:Employee.id})} style={{ width: '50%', flexDirection: 'row', }}>
                            <Entypo name="user" size={24} color="#040d50" />
                            <Text style={{ color: '#040d50', fontSize: 18, marginLeft: 10, fontWeight: 'bold', }}>My Clients</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Ionicons name="ios-chevron-forward-outline" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }} />

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword',{id:Employee.id})} style={{ width: '90%', height: 50, alignItems: 'center', borderRadius: 10, borderBottomWidth: .9, flexDirection: 'row', }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword',{id:Employee.id})} style={{ width: '50%', flexDirection: 'row', }}>
                            <Entypo name="key" size={24} color="#040d50" />
                            <Text style={{ color: '#040d50', fontSize: 18, marginLeft: 10, fontWeight: 'bold', }}>Change Password</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Ionicons name="ios-chevron-forward-outline" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }} />

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '90%', height: 50, alignItems: 'center', borderRadius: 10, borderBottomWidth: .9, flexDirection: 'row', }} onPress={() => setModalVisible2(!modalVisible2)}>
                        <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)} style={{ width: '50%', flexDirection: 'row', }}  >
                            <MaterialCommunityIcons name="logout" size={24} color="red" />
                            <Text style={{ color: 'red', fontSize: 18, marginLeft: 10, fontWeight: 'bold', }}>Log Out</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Ionicons name="ios-chevron-forward-outline" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }} />

                        </View>

                    </TouchableOpacity>


                </View>
            </View>


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
                        <TouchableOpacity onPress={()=>logout()} style={{ width: 70, height: 40, borderRadius: 10, backgroundColor: '#040d50', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#fff', }}>Yes</Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </Modal>


        </View>
        }
        </>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    styleBox: {
        width: '90%',
        height: 230,
        alignSelf: 'center',
        marginTop: '5%',
        borderRadius: 20,
        backgroundColor: '#040d50',

    },
    styleBox1: {
        width: '90%',
        height: 230,
        alignSelf: 'center',
        marginTop: '5%',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f49f1c',

    },
    profilePic: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginTop: 15,
        // marginLeft: 50,

    },
    name: {
        fontSize: 20,
        color: '#f49f1c',
        alignSelf: 'center',
        marginTop: 5,
        fontWeight: 'bold',
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