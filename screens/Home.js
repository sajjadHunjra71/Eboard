import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, StyleSheet, RefreshControl, Image, FlatList, SafeAreaView, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { AntDesign, Entypo, Foundation, Ionicons, FontAwesome5, MaterialCommunityIcons, } from '@expo/vector-icons';
import Header from '../screens/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveReward from './ActiveReward';
import { ActivityIndicator } from 'react-native-paper';
import { path } from './ApiUrl'

export default function Home({ navigation }) {

    const [data, setData] = useState({
        empName: '',
        itemSales: '',
        EmployeeContact: '',
        empEmail: '',
        itemuserid: '',
        EmpImage: '',
    });
    const [CheckEmployee, CheckEmployeeContact] = useState("null");
    const [modalVisible2, setModalVisible2] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [AllUserData, setAllUserData] = useState(null);
    const [Employee, setEmployee] = useState(null);
    const [flatListEmployee, setflatListEmployee] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {

        const getUsers = async () => {
            let user = await AsyncStorage.getItem('data');
            let parsed = JSON.parse(user);
            setEmployee(parsed.data)
            getDataUsingGet(parsed.data.id);
        };
        getUsers();
    }, []);

    const getDataUsingGet = (emp_id) => {
        setIsLoading(true);
        const formData = new FormData()
        formData.append('id', emp_id);
        try {
            fetch(path + 'home', {
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
                            setAllUserData(responseJson)
                            setflatListEmployee(responseJson.data)
                            CheckEmployeeContact(responseJson.data2)
                            setRefreshing(false)
                            setIsLoading(false);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };

    const CheckRanking = (index) => {
        if (index == 1) {
            return (
                <View style={{ marginLeft: 5 }}>
                    <FontAwesome5 name="crown" size={18} color="#f49f1c" />
                </View>
            )
        } else if (index == 2) {
            return (
                <View style={{ marginLeft: 5 }}>
                    <MaterialCommunityIcons name="license" size={20} color="#f49f1c" />

                </View>
            )
        } else {
            return (
                <></>
            )

        }
    }

    const CheckRecord = (sales, userid) => {
        // console.log("yes")
        return (

            CheckEmployee.map((item, index) => {

                if (item.user_id == userid) {

                    if (sales > item.sales) {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                                <Text style={{ color: '#fff', marginRight: 10 }}>{((sales - item.sales) / item.sales * 100).toFixed(2)} %</Text>
                                <AntDesign name="arrowup" size={24} color="white" />

                            </View>

                        )

                    } else {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                                <Text style={{ color: '#fff', marginRight: 10 }}>{((sales - item.sales) / item.sales * 100).toFixed(2)} %</Text>
                                <AntDesign name="arrowdown" size={24} color="red" />
                            </View>
                        )
                    }

                } else {
                    <></>
                    // return (
                    //     <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                    //         {/* <Text style={{ color: '#fff', marginRight: 10 }}>{((sales - item.sales) / item.sales * 100).toFixed(2)} %</Text> */}
                    //         <Text style={{color:'white', marginRight: 10}}>New User</Text>
                    //         <AntDesign name="arrowup" size={20} color="white" />

                    //     </View>

                    // )
                }
            })
        )


    }

    // const CheckRecordModal = (sales, userid) => {

    //     return (
    //         CheckEmployee.map((item, index) => {
    //             if (item.user_id == userid) {

    //                 if (sales > item.sales) {
    //                     return (
    //                         <View style={{ flexDirection: 'row', alignItems: 'center' }} >
    //                             <Text style={{ marginRight: 10 }}>{((sales - item.sales) / item.sales * 100).toFixed(2)} %</Text>
    //                             <AntDesign name="arrowup" size={20} color="green" />

    //                         </View>

    //                     )

    //                 } else {
    //                     return (
    //                         <View style={{ flexDirection: 'row', alignItems: 'center' }} >

    //                             <Text style={{ marginRight: 10 }}>{((sales - item.sales) / item.sales * 100).toFixed(2)} %</Text>
    //                             <AntDesign name="arrowdown" size={24} color="red" />
    //                         </View>
    //                     )
    //                 }
    //             } else {
    //                 <></>
    //             }
    //         })
    //     )


    // }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        let user = await AsyncStorage.getItem('data');
        let parsed = JSON.parse(user);
        // console.log(parsed);
        setEmployee(parsed.data)
        getDataUsingGet(parsed.data.id)

    }, []);

    const renderItem2 = (item, index) => {
        return (

            // <TouchableOpacity style={styles.ActiveReward1} onPress={() => setModalVisible2(!modalVisible2) & setEmpName(item.employee_detail.name) & setEmpStatus(item.sales) & setEmployeeContact(item.employee_detail.contact) & setEmpEmail(item.employee_detail.email) & SetitemSales(item.sales,) & Setitemuserid(item.user_id) & SetEmpImage(item.employee_detail.image)}>
            <TouchableOpacity style={styles.ActiveReward1} onPress={() => {
                setData({
                    ...data,
                    empName: item.employee_detail.name,
                    itemSales: item.sale,
                    EmployeeContact: item.employee_detail.contact,
                    empEmail: item.employee_detail.email,
                    itemuserid: item.user_id,
                    EmpImage: item.employee_detail.image,
                }) & setModalVisible2(!modalVisible2)
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '25%' }}>
                    <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + item.employee_detail.image }} resizeMode='cover' style={styles.employeePic} />
                    <Text style={{ color: '#fff', marginLeft: 5 }}>{item.employee_detail.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '25%', }}>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ color: '#fff', marginLeft: 5 }}>{index + 1}</Text>
                    </View>
                    <View style={{ width: '50%', }}>
                        {CheckRanking(index + 1)}

                    </View>
                </View>
                <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                    {CheckRecord(item.sales, item.user_id)}
                </View>

            </TouchableOpacity>

        )
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <>
            {isLoading == true ?
                null

                :
                <View style={styles.container}>
                    <SafeAreaView style={{
                        marginTop: Platform.OS == 'ios' ? 0 : 0
                    }}>
                        <View style={styles.header}>
                            <TouchableOpacity style={{ width: 40, height: 40, marginLeft: -30 }} onPress={() => navigation.navigate('Profile')} >
                                <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + Employee.image }} resizeMode='cover' style={styles.profilePic} />
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center', }}>
                                <Image source={require('../assets/logo.png')} style={styles.logo} ></Image>
                            </View>

                            <View style={{ justifyContent: 'center', }}>
                                {/* <Ionicons name="ios-chevron-back-outline" onPress={()=>navigation?.goBack()} size={24} color="black" style={{ alignSelf: 'flex-end', marginRight: -25, }} /> */}
                            </View>
                        </View>
                    </SafeAreaView>

                    <View style={{ width: '90%', height: 105, alignSelf: 'center', backgroundColor: '#f49f1c', flexDirection: 'row', marginTop: 10, borderRadius: 10 }}>
                        <View style={{ width: 100, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                AllUserData.data != null ?
                                    <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + AllUserData.data1.employee_detail.image }} style={{ width: 70, height: 70, borderRadius: 50, }} />
                                    :
                                    <Image source={require('../assets/img1.jpg')} style={{ width: 70, height: 70, borderRadius: 50, }} />
                            }
                        </View>

                        <View style={{ flex: 1, }}>

                            <View style={{ width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>

                                <View style={{ width: 27, height: 27, backgroundColor: '#040d50', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginTop: 15, marginLeft: -35, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                                    <FontAwesome5 name="crown" size={17} color="#f49f1c" style={{ position: "absolute", right: 0, bottom: 0, left: 0, alignSelf: 'center', marginBottom: 5, marginLeft: 3 }} />
                                </View>
                                <Text numberOfLines={1} style={{ fontSize: 22, fontWeight: 'bold', color: '#040d50' }}>Employee of The day</Text>
                            </View>
                            <Image style={{ width: 100, height: 100, marginTop: -50, marginLeft: 15 }} source={require('../assets/part-pop.gif')} />

                            <View style={{ width: '100%', height: '50%', alignItems: 'center', marginTop: -40 }}>
                                <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', marginTop: 5 }}>{AllUserData?.data1.employee_detail.name}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ width: '100%', height: 30, marginTop: 5, justifyContent: 'center', borderBottomWidth: .5, }}>
                        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 16, }}>Employee with Rank</Text>
                    </View>
                    <ScrollView style={{ marginTop: 10, flex: 1, }}

                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {flatListEmployee.length == 0 ?
                            <Image source={require('../assets/NoData.gif')} style={{ width: 250, height: 200, alignSelf: 'center' }} ></Image>
                            :
                            <FlatList

                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                data={AllUserData?.data}
                                renderItem={({ item, index }) => renderItem2(item, index)}
                                keyExtractor={item => item.id}

                            />
                        }
                    </ScrollView>

                    <Modal

                        transparent={true} visible={modalVisible2} animationType='slide' dismiss={() => setModalVisible2(false)} >
                        <View style={styles.modalView}  >
                            <View style={{ width: '100%', height: '20%', borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', borderBottomWidth: .5, backgroundColor: '#040d50', }}>

                                <View style={{ width: '80%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 20, color: '#f49f1c', marginLeft: 10, }}>Employee's Record</Text>

                                </View>
                                <View style={{ width: '20%', justifyContent: 'center', }}>
                                    <Entypo name="cross" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end', marginRight: 5 }} onPress={() => setModalVisible2(!modalVisible2)} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>

                                <View >
                                    <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + data.EmpImage }} style={styles.modelEmployeePic} />
                                </View>

                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.employeeName1}>{data.empName}</Text>
                                </View>

                                <View style={{ justifyContent: 'center', marginRight: 25, }}>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                                <Ionicons name="call-sharp" size={24} color="black" />
                                <Text style={{ marginLeft: 40, }}>{data.EmployeeContact}</Text>
                                <Text></Text>
                            </View>

                            <View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                                <Entypo name="email" size={24} color="black" />
                                <Text style={{ marginLeft: 40, }}>{data.empEmail}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                                <Foundation name="burst-sale" size={30} color="black" />
                                {/* <Text style={{ marginLeft: 40, color: '#000' }}>{empStatus}</Text> */}
                            </View>
                        </View>
                    </Modal>

                    <StatusBar hidden={false} />
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    employeePic: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 5,
        alignSelf: 'center',
    },
    ActiveReward: {
        width: 230,
        height: 90,
        backgroundColor: '#f49f1c',
        marginLeft: 10,
        marginEnd: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
    },
    ActiveReward1: {
        width: '90%',
        height: 80,
        backgroundColor: '#040d50',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
    },

    title1: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#040d50',
    },
    title2: {
        width: 80,
        marginLeft: '8%',
        color: '#040d50',
        // backgroundColor:'red',
        alignSelf: 'center',

    },
    employeeName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: -10,
        width: 100,
        // backgroundColor:'gray',

    },


    employeeRank1: {
        fontSize: 17,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#fff',
        // margin:-10,
    },

    employeeName4: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: -45,
    },
    employeeName1: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginLeft: -10,

    },

    rewardName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    title3: {
        color: '#040d50',
        marginTop: 10,
        textAlign: 'center',
    },

    modalView: {
        // marginLeft: '45%',
        marginTop: '60%',
        width: '90%',
        height: '40%',
        //  borderRadius: 7,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignSelf: 'center',
        shadowColor: "#000",
        // justifyContent: 'space-around',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modelEmployeePic: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 15,
        // alignSelf: 'center',
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
        backgroundColor: 'red',

        backgroundColor: '#E8ECED',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 50,
        // marginLeft: -30,

    },


});