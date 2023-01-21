import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Image, FlatList, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, ScrollView, Button, Linking, StatusBar } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import CheckBox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { path } from './ApiUrl';
import SearchableDropdown from 'react-native-searchable-dropdown';



export default function EditLicense({ route, navigation }) {
    // const {item} = props.params;
    const { item, setItem } = route.params;
    console.log(route.params);

    const [data, setData] = useState({
        licenseName: route.params.licenseName,
        LicenseId: route.params.licenseId,
        companyName: route.params.organizationName,
        organizationId: route.params.organizationId,
        credentialId: route.params.cId,
        cIdUrl: route.params.url,
        licenseNumber: route.params.license_Number,
        paramDate: route.params.issueDate,
        paramDate1: route.params.expireDate,

    });
    const [isSelected, setSelection] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const changeCall = (e) => {
        setSelection(e)
        if (isSelected != true) {
            setParamDate1('')
        }
    }

    const showPicker = () => {
        setShow(true);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date) => {
        // setParamDate(date.toLocaleDateString());
        { setData({ ...data, paramDate: date.toLocaleDateString() }) }
        // console.log("New Start Date is ", data.paramDate);
        hideDatePicker();
    };

    const showpicker1 = () => {
        setShow1(true);
    };
    const hideDatePicker1 = () => {
        setShow1(false);
    };
    const handleConfirm1 = (date) => {
        // setParamDate1(date.toLocaleDateString());
        { setData({ ...data, paramDate1: date.toLocaleDateString() }) }
        // console.log("New End Date is ", paramDate1);
        hideDatePicker1();

    };


    const getDataUsingGet = () => {

        const formData = new FormData()
        formData.append('id', route.params.id);
        formData.append('number', data.licenseNumber);
        formData.append('license_name', data.LicenseId);
        formData.append('org_name', data.organizationId);
        formData.append('start_date', data.paramDate);
        formData.append('end_date', data.paramDate1);
        formData.append('url', data.cIdUrl);
        formData.append('credential_id', data.credentialId);

        try {
            fetch(path + 'edit_license', {
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

                            alert("success")
                            // setAllUserData(responseJson)
                            // console.log(AllUserData)
                            // // alert(AllUserData.data.reward_target)
                            // setIsLoading(false);
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
        <>
            {isLoading == true ? null

                :
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

                    <StatusBar hidden={false} />
                    <Header navigation={navigation} />
                    <View style={styles.card1}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            {/* <ScrollView> */}
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
                                <View style={{ width: '100%', height: '100%', marginTop: 20, paddingVertical: 10, alignSelf: 'center', }}>
                                    <View style={{ width: '100%', height: '100%', alignItems: 'center', }}>
                                        <View style={{ width: '100%', height: 40, paddingHorizontal: 10, flexDirection: 'row', }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f49f1c', }} >Edit License</Text>


                                        </View>

                                        {/* //search Box */}
                                        <View style={{ width: '100%', justifyContent: 'space-around', paddingHorizontal: 10, }}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: '8%' }}>Select your License </Text>
                                            <SearchableDropdown
                                                onTextChange={(text) => setDummy(text)}
                                                onItemSelect={(item) => { setData({ ...data, licenseName: item.name, LicenseId: item.id }) }}
                                                containerStyle={{ padding: 5 }}
                                                textInputStyle={{
                                                    padding: 12,
                                                    borderWidth: 1,
                                                    width: '90%',
                                                    height: 40,
                                                    borderColor: '#ccc',
                                                    backgroundColor: '#FAF7F6',
                                                    borderRadius: 10,
                                                    alignSelf: 'center',
                                                }}
                                                itemStyle={{
                                                    padding: 10,
                                                    width: '85%',
                                                    marginTop: 1,
                                                    backgroundColor: '#FAF9F8',
                                                    borderColor: '#bbb',
                                                    borderWidth: 1,
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                }}
                                                itemTextStyle={{
                                                    color: '#222',
                                                }}
                                                itemsContainerStyle={{
                                                    maxHeight: 100,
                                                }}

                                                items={route.params.licenseNameArray}
                                                placeholder={data.licenseName}
                                                resPtValue={false}

                                            />
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: '8%' }}>Select License's Company </Text>
                                            <SearchableDropdown
                                                onTextChange={(text) => setDummy(text)}
                                                onItemSelect={(item) => { setData({ ...data, companyName: item.name, organizationId: item.id }) }}

                                                containerStyle={{ padding: 5 }}
                                                textInputStyle={{
                                                    padding: 12,
                                                    borderWidth: 1,
                                                    width: '90%',
                                                    height: 40,
                                                    borderColor: '#ccc',
                                                    backgroundColor: '#FAF7F6',
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                }}
                                                itemStyle={{
                                                    padding: 10,
                                                    marginTop: 2,
                                                    width: '85%',
                                                    backgroundColor: '#FAF9F8',
                                                    borderColor: '#bbb',
                                                    borderWidth: 1,
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                }}
                                                itemTextStyle={{
                                                    color: '#222',
                                                }}
                                                itemsContainerStyle={{
                                                    maxHeight: 100,
                                                }}
                                                items={route.params.organizationNameArray}
                                                placeholder={data.companyName}
                                                resPtValue={true}
                                            />

                                        </View>
                                        {/* //End Search Box */}

                                        <ScrollView style={{ width: '100%', flex: 1 }}>

                                            <View style={{ height: 50, width: '100%', alignItems: 'center', flexDirection: 'row', }}>

                                                <CheckBox
                                                    value={isSelected}
                                                    onValueChange={changeCall}
                                                    color={'#f49f1c'}
                                                    style={{ marginLeft: '11%', }}


                                                />
                                                <Text style={{ marginLeft: 20, color: 'white', fontSize: 15, }}>This credential does not expire</Text>

                                            </View>
                                            {
                                                isSelected ?
                                                    <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                                                        <View style={{ width: '40%', marginLeft: '10%' }}>
                                                            <Text style={{ color: 'white', marginLeft: '7%', }}>
                                                                Issue Date
                                                            </Text>
                                                            <View style={{ width: '100%', height: 50, backgroundColor: '#FAF7F6', borderRadius: 10, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center' }}>
                                                                <EvilIcons onPress={showPicker} name="calendar" size={34} color="#f49f1c" />

                                                                {
                                                                    show ?
                                                                        <DateTimePickerModal
                                                                            isVisible={show}
                                                                            mode="date"
                                                                            onConfirm={handleConfirm}
                                                                            onCancel={hideDatePicker}

                                                                        />
                                                                        :
                                                                        null
                                                                }

                                                                <Text style={{ fontSize: 15, marginRight: 10 }}>{data.paramDate}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    :

                                                    <View style={{ width: '100%', height: 100, flexDirection: 'row', justifyContent: 'center', }}>

                                                        <View style={{ width: '40%', alignSelf: 'center', justifyContent: 'center', }}>
                                                            <Text style={{ color: 'white', marginLeft: '7%', }}>
                                                                Issue Date
                                                            </Text>
                                                            <View style={{ width: '100%', height: 50, backgroundColor: '#FAF7F6', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                                                <EvilIcons onPress={showPicker} name="calendar" size={34} color="#f49f1c" />

                                                                {
                                                                    show ?
                                                                        <DateTimePickerModal
                                                                            isVisible={show}
                                                                            mode="date"
                                                                            onConfirm={handleConfirm}
                                                                            onCancel={hideDatePicker}

                                                                        />
                                                                        :
                                                                        null
                                                                }

                                                                <Text style={{ fontSize: 15, marginRight: 10 }}>{data.paramDate}</Text>
                                                            </View>
                                                        </View>


                                                        <View style={{ width: 10, }}></View>
                                                        <View style={{ width: '40%', height: '50%', alignSelf: 'center', justifyContent: 'center', }}>
                                                            <Text style={{ color: 'white', marginLeft: '7%', }}>
                                                                Expire Date
                                                            </Text>
                                                            <View style={{ width: '100%', height: 50, backgroundColor: '#FAF7F6', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>


                                                                <EvilIcons onPress={showpicker1} name="calendar" size={34} color="#f49f1c" />

                                                                {show1 && (
                                                                    <DateTimePickerModal
                                                                        isVisible={show1}
                                                                        mode="date"
                                                                        onConfirm={handleConfirm1}
                                                                        onCancel={hideDatePicker}

                                                                    />
                                                                )}

                                                                <Text style={{ fontSize: 15, marginRight: 10 }}>{data.paramDate1}</Text>
                                                            </View>
                                                        </View>

                                                    </View>


                                            }
                                            {/* </View> */}

                                            <View style={{ width: '100%', height: 70, }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: '10%' }}>License Number </Text>
                                                {/* <TextInput value={licenseNumber} onChangeText={(idd) => setlicenseNumber(idd)} placeholder={'Enter license Number'} style={{ width: '85%', height: 45, marginTop: 5, padding: 10, borderRadius: 10, alignSelf: 'center', marginLeft: 10, backgroundColor: '#FAF7F6', }}></TextInput> */}
                                                <TextInput value={data.licenseNumber} onChangeText={(idd) => { setData({ ...data, licenseNumber: idd }) }} placeholder={'Enter license Number'} style={{ width: '85%', height: 45, marginTop: 5, padding: 10, borderRadius: 10, alignSelf: 'center', marginLeft: 10, backgroundColor: '#FAF7F6', }}></TextInput>

                                            </View>
                                            <View style={{ width: '100%', height: 70, }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: '10%' }}>Credential Id </Text>
                                                <TextInput value={data.credentialId} onChangeText={(id) => { setData({ ...data, credentialId: id }) }} placeholder={'Credential Id'} style={{ width: '85%', height: 45, marginTop: 5, padding: 10, borderRadius: 10, alignSelf: 'center', marginLeft: 10, backgroundColor: '#FAF7F6', }}></TextInput>
                                            </View>

                                            <View style={{ width: '100%', height: 70, }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: '10%' }}>Credential URL </Text>
                                                {/* <TextInput value={cIdUrl} onChangeText={(url) => setUrl(url)} placeholder={'url'} style={{ width: '85%', height: 45, marginTop: 5, padding: 10, borderRadius: 10, alignSelf: 'center', marginLeft: 10, backgroundColor: '#FAF7F6', }}></TextInput> */}
                                                <TextInput value={data.cIdUrl} onChangeText={(url) => { setData({ ...data, cIdUrl: url }) }} placeholder={'url'} style={{ width: '85%', height: 45, marginTop: 5, padding: 10, borderRadius: 10, alignSelf: 'center', marginLeft: 10, backgroundColor: '#FAF7F6', }}></TextInput>

                                            </View>

                                            <View style={{ width: '100%', flex: 1, justifyContent: 'center', }}>


                                                <TouchableOpacity onPress={getDataUsingGet} style={styles.submit}>
                                                    <Text style={{ color: 'white', fontSize: 18, }}>Submit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                            {/* </ScrollView> */}

                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>

            }

        </>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    card1: {
        width: '95%',
        height: '75%',
        backgroundColor: '#040d50',
        marginTop: 50,
        alignSelf: 'center',
        borderRadius: 20
    },
    submit: {
        width: '60%',
        height: 50,
        backgroundColor: '#f49f1c',
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})