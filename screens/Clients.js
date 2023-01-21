import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,ActivityIndicator,ScrollView,RefreshControl } from 'react-native'
import Header from './Header'
import { Button, Overlay } from 'react-native-elements';
import { Entypo, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, MaterialIcons, EvilIcons, Fontisto, Foundation } from '@expo/vector-icons';
import TabContainer from './TabContainer';
import { SearchBar } from 'react-native-elements';
import { path } from './ApiUrl';


export default function Clients({ route, navigation }) {
    const Data = [
        {
            name: 'Sajjad',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',
            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Ali',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Qasim',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Sajjad',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Sajjad',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Sajjad',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
        {
            name: 'Sajjad',
            email: 'Sajjad@gmail.com',
            contact: '00000000000',
            organizationName: 'Qubitars.Ltv',

            address: 'Gift University Chock Pindi Bypas Gujranwala Punjab Pakistan'
        },
    ]
    // console.log(route.params.id)
    let id = route.params.id;
    const [detail, setDetail] = useState({
        c_id:'',
        emp_id: id,
        name: '',
        email: '',
        contact: '',
        subject: '',
        address: '',

    })
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [dellModal,setDelModal]=useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [page, setPage] = useState(1);
    const [count,setCount]=useState(0);
    const [data, setData] = useState(Data.slice(0, ITEM_PER_PAGE));
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


    useEffect(() => {
        view_client()


    }, [page]);


    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        view_client(id)
    
      }, []);

    const addClient = () => {
        setLoading(true);
        toggleOverlay()
        const formData = new FormData()
        formData.append('employee_id', detail.emp_id);
        formData.append('name', detail.name);
        formData.append('email', detail.email);
        formData.append('contact', detail.contact);
        formData.append('subject', detail.subject);
        formData.append('address', detail.address);


        try {
            fetch(path + 'add_my_client', {
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
                            alert("Successfully Created")
                            setLoading(false);
                            setPage(page+1);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };

    const editClient = (c_id) => {
        const formData = new FormData()
        formData.append('employee_id', detail.emp_id);
        formData.append('id', c_id);
        formData.append('name', detail.name);
        formData.append('email', detail.email);
        formData.append('contact', detail.contact);
        formData.append('subject', detail.subject);
        formData.append('address', detail.address);
       toggleOverlay1()


        try {
            fetch(path + 'edit_my_client', {
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
                            alert("Update Successfully")
                            setLoading(false);
                            setPage(page+1);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };

    const deleteClient = (c_id) => {
        const formData = new FormData()
        formData.append('employee_id', detail.emp_id);
        formData.append('id', c_id);
        toggleOverlay2()

        try {
            fetch(path + 'delete_my_client', {
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
                            alert("Delete Successfully")
                            setLoading(false);
                            setPage(page+1);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };

    const view_client = () => {
        setLoading(true);
        const formData = new FormData()
        formData.append('employee_id', id);
        try {
            fetch(path + 'view_my_client', {
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
                            setFilteredDataSource(responseJson.Data)
                            setMasterDataSource(responseJson.Data)
                            console.log(responseJson.Data)
                            setRefreshing(false)
                            setLoading(false);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    };





    const ITEM_PER_PAGE = 10;

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const toggleOverlay1 = () => {
        setVisible1(!visible1);
    };
    const toggleOverlay2 = () => {
        setDelModal(!dellModal);
    };
    const renderItem = (item, index) => {
        return (
            <View style={styles.card}>

                <View style={{ height: '100%', width: 100, }}>
                    <View style={{ width: 80, height: 100, borderRadius: 300, alignSelf: 'center', }}>
                        <Image source={require('../assets/img.jpg')} resizeMode='cover' style={{ width: 70, height: 70, alignSelf: 'center', marginTop: '20%', borderRadius: 50, }} />
                    </View>

                </View>

                <View style={{ flex: 1, padding: 10, justifyContent: 'space-evenly', }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 19, color: '#f49f1c', }}>
                            {item.name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: 25, }}>

                            <MaterialCommunityIcons name="phone" size={20} color="#fff" />
                        </View>
                        <Text style={{ color: '#fff', }}>{item.contact}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }} >
                        <View style={{ width: 25, }}>

                            <MaterialCommunityIcons name="email" size={20} color="#fff" />
                        </View>

                        <Text style={{ color: '#fff', flexDirection: 'row', alignSelf: 'center', }}>
                            {item.email}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: 25 }}>
                            <Entypo name="location" size={20} color="#fff" />
                        </View>

                        <View style={{ width: '91%' }}>

                            <Text style={{ color: '#fff', }}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }} >
                        <View style={{ width: 25 }}>

                            <MaterialCommunityIcons name="notebook" size={20} color="#fff" />
                        </View>
                        <View style={{ width: '91%' }}>

                            <Text style={{ color: '#fff', flexDirection: 'row', }}>
                                {item.subject}
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 50, flexDirection: 'row', marginBottom: -25, }}>
                        <TouchableOpacity onPress={() => {
                            setDetail({
                                ...detail, name: item.name,
                                email: item.email,
                                contact: item.contact,
                                subject: item.subject,
                                address: item.address,
                                c_id:item.id

                            }), toggleOverlay1()
                        }}
                            style={{ width: 80, height: 35, borderRadius: 10, backgroundColor: '#f49f1c', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>

                            <FontAwesome name="pencil-square-o" size={20} color="#040d50" />
                            <Text style={{ fontSize: 16, color: '#040d50', fontWeight: 'bold', marginLeft: 7 }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setDetail({...detail,c_id:item.id}),toggleOverlay2()}} style={{ width: 80, height: 35, borderRadius: 10, marginLeft: 20, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}  >
                            <FontAwesome name="trash-o" size={20} color="#040d50" />
                            <Text style={{ fontSize: 15, color: '#040d50', fontWeight: 'bold', marginLeft: 7 }}>Delete</Text>
                        </TouchableOpacity>

                    </View>

                </View>


            </View>

        )
    }

    const handleLoadMore = () => {
        if (page * ITEM_PER_PAGE >= filteredDataSource.length) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            // setPage(page + 1);
            setData(filteredDataSource.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE));
            setLoading(false);
        }, 2000);

    }

    return (

        <>
            {loading == true ?
                <Header navigation={navigation} />


                :

                <View style={styles.container}>
                    <Header navigation={navigation} />
                    <View style={{ width: '100%', height: 30, marginTop: 5, justifyContent: 'center', borderBottomWidth: .5, }}>
                        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 16, }}>My Clients</Text>
                    </View>
                    <SearchBar
                        platform="android"
                        placeholder="Type Here..."
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        containerStyle={{height:60,}}
                    />

                    <ScrollView style={{ marginTop: 10, flex: 1, }} 

                     refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        } 
                     > 
                    {filteredDataSource.length == 0 ?
                    <Image source={require('../assets/NoData.gif')} style={{ width: 250, height: 200, alignSelf: 'center' }} ></Image>

                    :
                    <FlatList

                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        data={filteredDataSource}
                        renderItem={({ item, index }) => renderItem(item, index)}
                        keyExtractor={item => item.id}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            page * ITEM_PER_PAGE >= filteredDataSource.length
                                ? <Image source={require('../assets/loadingText4.gif')} style={{ alignSelf: 'center' }} />
                                : null
                        }
                    />
                    }
                    </ScrollView>


                    <Overlay visible={visible} overlayStyle={{ width: '95%', height: 420, padding: 0 }}>
                        <View style={styles.header}>
                            {/* <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', padding: 7 }}>

                            </View> */}

                            <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 19, fontWeight: '700' }}>Client Information Form</Text></View>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={toggleOverlay} style={{ width: '85%', height: '70%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 7, }}>
                                    <Entypo name='cross' color='#fff' size={27} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.field}>
                            <Feather name="user" size={24} color="#f49f1c" />
                            <TextInput onChangeText={(txt) => setDetail({ ...detail, name: txt })} placeholder='Enter your Full Name' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field}>
                            <Fontisto name="email" size={24} color="#f49f1c" />
                            <TextInput onChangeText={(txt) => setDetail({ ...detail, email: txt })} keyboardType={'email-address'} placeholder='Enter your Email Address' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field}>
                            <Feather name="phone" size={24} color="#f49f1c" />
                            <TextInput onChangeText={(txt) => setDetail({ ...detail, contact: txt })} keyboardType={'number-pad'} placeholder='Enter your Conatct' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>

                        <View style={styles.field}>
                            <Entypo name="location" size={24} color="#f49f1c" />
                            <TextInput onChangeText={(txt) => setDetail({ ...detail, address: txt })} placeholder='Enter your Address' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field}>
                            <Foundation name="clipboard-notes" size={24} color="#f49f1c" />
                            <TextInput multiline={true} onChangeText={(txt) => setDetail({ ...detail, subject: txt })} placeholder='Enter your Subject' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field1}>

                            <TouchableOpacity onPress={addClient} style={{ width: '40%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f49f1c', alignSelf: 'center', borderRadius: 7, }}>
                                <Text style={{ fontSize: 20, color: '#1f2e4d' }}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </Overlay>


                  
                    <Overlay visible={visible1} onBackdropPress={toggleOverlay1} overlayStyle={{ width: '95%', height: 420, padding: 0 }}>
                        <View style={styles.header}>
                            {/* <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', padding: 7 }}>

                            </View> */}

                            <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Edit Information</Text></View>
                            <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={toggleOverlay1} style={{ width: '85%', height: '70%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 7, }}>
                                    <Entypo name='cross' color='#fff' size={27} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.field}>
                            <Feather name="user" size={24} color="#f49f1c" />
                            <TextInput value={detail.name} onChangeText={(txt) => setDetail({ ...detail, name: txt })} placeholder='Enter your Full Name' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field}>
                            <Fontisto name="email" size={24} color="#f49f1c" />
                            <TextInput value={detail.email} onChangeText={(txt) => setDetail({ ...detail, email: txt })} keyboardType={'email-address'} placeholder='Enter your Email Address' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>
                        <View style={styles.field}>
                            <Feather name="phone" size={24} color="#f49f1c" />
                            <TextInput value={detail.contact} onChangeText={(txt) => setDetail({ ...detail, contact: txt })} keyboardType={'number-pad'} placeholder='Enter your Conatct' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>

                        <View style={styles.field}>
                            <Entypo name="location" size={24} color="#f49f1c" />
                            <TextInput value={detail.address} onChangeText={(txt) => setDetail({ ...detail, address: txt })} placeholder='Enter your Address' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>

                        <View style={styles.field}>
                            <Foundation name="clipboard-notes" size={24} color="#f49f1c" />
                            <TextInput value={detail.subject} multiline={true} onChangeText={(txt) => setDetail({ ...detail, subject: txt })} placeholder='Enter your Subject' placeholderTextColor={'gray'} style={{ width: '90%', marginLeft: 10, paddingLeft: 5, }} />
                        </View>

                        <View style={styles.field1}>
                            <TouchableOpacity onPress={()=>editClient(detail.c_id)} style={{ width: '40%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f49f1c', alignSelf: 'center', borderRadius: 7, }}>
                                <Text style={{ fontSize: 20, color: '#1f2e4d' }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    </Overlay>

                    <TouchableOpacity onPress={toggleOverlay} style={{
                        justifyContent: "center", alignItems: "center",
                        backgroundColor: "#f49f1c", width: 60, height: 60, borderRadius: 50,
                        position: "absolute", right: 0, bottom: 0, marginRight: 10,
                        marginBottom: 40,
                    }}>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <MaterialIcons name="add" size={39} color="#ffff" />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Overlay visible={dellModal} onBackdropPress={toggleOverlay2} overlayStyle={{width:'95%',height:120,padding:0}}>
                       <View style={{width:'100%',height:'100%'}}>
                        <View style={{width:'100%',height:'40%',justifyContent:'center',alignItems:'center',backgroundColor:'#040d50'}}>
                            <Text style={{fontSize:20,fontWeight:'700',color:'#fff'}}>Delete Client</Text>
                        </View>
                        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:'70%',height:'60%',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                                <TouchableOpacity onPress={toggleOverlay2} style={{ width: 80, height: 35, borderRadius: 10, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'center',}}>
                                    <Text>NO</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>deleteClient(detail.c_id)} style={{ width: 80, height: 35, borderRadius: 10, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'center',}}>
                                    <Text>YES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </Overlay>



                </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ActiveReward1: {
        width: '90%',
        height: 200,
        backgroundColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
    },
    header: {
        width: '100%',
        height: '13%',
        backgroundColor: '#1f2e4d',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    card: {
        width: '90%',
        height: 230,
        backgroundColor: '#040d50',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 20,

    },
    field: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        borderWidth: 0.7,
        // borderColor:'#f49f1c',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
    },
    field1: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        padding: 10,
        // borderColor:'#f49f1c',
        alignItems: 'center',
        borderRadius: 10,

        flexDirection: 'row',
    },
});