import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, AsyncStorage, Button, Platform,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from './Header';
import MaskInput from 'react-native-mask-input';
import { Ionicons, MaterialCommunityIcons, Feather, Entypo, AntDesign } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EditProfile({ route, navigation }) {

    const [Employee, setEmployee] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [img, setImage] = useState("");
    const [image1, setImage1] = useState("");

    const [phone, setPhone] = React.useState('');
    const [ssn, setssn] = React.useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [base64, setbase64] = useState("");

    const [imgCheck, setimgCheck] = useState(false);




    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        
            const getUsers= async () => {
                const value = await AsyncStorage.getItem('data')
                var parsed = JSON.parse(value);
                // console.log("*******************");
                setEmployee(parsed.data);
                // console.log("*******************");
                // console.log(Employee);
                setName(parsed.data.name);
                setEmail(parsed.data.email);
                setPhone(parsed.data.contact);
                setssn(parsed.data.ssn);
                setStreet(parsed.data.street);
                setCity(parsed.data.city);
                setState(parsed.data.state);
                setZip(parsed.data.zip);
                setCountry(parsed.data.country);
                setImage(parsed.data.image);

                // console.log(parsed.data.image);
                setIsLoading(false);
                // console.log(isLoading);
                // console.log("********************End***********");
                picImage();
                // console.log("After that *******")

            }
        getUsers();

            
    }, []);





    // useEffect(() => {
    //     async function fetch_data(){
    //         var user = await AsyncStorage.getItem('data');
    //         var parsed = JSON.parse(user);
    //          console.log(Employee.email)
    //          alert("data link")
    //         // setEmployee(parsed.data);
    //         // setName(parsed.data.name);
    //         // setEmail(parsed.data.email);
    //         // setPhone(parsed.data.contact);
    //         // setssn(parsed.data.ssn);
    //         // setStreet(parsed.data.street);
    //         // setCity(parsed.data.city);
    //         // setState(parsed.data.state);
    //         // setZip(parsed.data.zip);
    //         // setCountry(parsed.data.country);
    //         // setImage(parsed.data.image);

    //         // // // console.log(parsed.data.image);
    //         // setIsLoading(false);
    //         // picImage(); 
    //         // return 1;
    //     }




    // },[]);


    const editProfile = () => {

        const formData = new FormData()
        formData.append('id', route.params.id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contact', phone);
        formData.append('street', street);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zip', zip);
        formData.append('country', country);
        formData.append('ssn', ssn);
        formData.append('image','data:image/jpeg;base64,' + base64);
       
        // console.log(image);





        try {
            fetch('http://eboard.qubitars.com/api/edit_profile', {
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

                            alert("Succesfully Edited Profile ")


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



    const picImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, Camera roll permissions are required to make this work!');
            }
        }
    };


    // const chooseImg = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         // aspect: [4, 3],
    //         aspect: [15, 17],

    //         quality: 1,
    //         allowsEditing: true,

    //     });

    //     // console.log(result);

    //     if (!result.cancelled) {

    //         setImage(result.uri); 
    //         console.log(result);


    //         const myArray = img.split("/");
    //         let length = myArray.length;

    //         // console.log(myArray[length - 1]);
    //         setImage1(myArray[length - 1]);
    //         setimgCheck(true);
    //     }
    // };


    const chooseImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [15, 17],
          quality: 1,
          base64:true
        });
        if (!result.cancelled) {
          setbase64(result.base64 )
          console.log(result.uri)
          console.log("Yesss")
          console.log(result.type)

          setImage(result.uri);
                setTimeout(() => {
                    alert(img);
                }, 3000);
                setimgCheck(true);
       }
       };


    return (
        <>
            {
                isLoading ? null
                    :
                    <View style={styles.container}>
                        <Header navigation={navigation} />
                        <View style={styles.card}>
                            <View style={{ width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                                {
                                    imgCheck ?
                                        <Image source={{ uri: img}} style={{ width: 90, height: 90, borderRadius: 60, }} />

                                        :
                                        <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + img }} style={{ width: 90, height: 90, borderRadius: 60, }} />
                                }

                                <View onPress={chooseImg} style={{ width: 30, height: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginTop: 40, marginLeft: -20, }}>
                                    <Ionicons name="camera-reverse" size={24} color="#040d50" onPress={chooseImg} />
                                </View>
                                {/* {image && <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 60, }} />} */}
                            </View>

                            <ScrollView>
                                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', }}>
                                    <View style={styles.field}>
                                        <Feather name="user" size={24} color="#f49f1c" />
                                        <TextInput value={name} onChangeText={(txt) => setName(txt)} placeholder='Enter your Full Name' placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                    </View>

                                    <View style={styles.field}>
                                        <MaterialCommunityIcons name="email" size={24} color="#f49f1c" />
                                        <TextInput value={email} onChangeText={(mail) => setEmail(mail)} placeholder='Enter your Email' placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                    </View>

                                    <View style={styles.field}>
                                        <MaterialCommunityIcons name="phone" size={24} color="#f49f1c" />
                                        <TextInput value={phone} onChangeText={(txt) => {
                                            setPhone(txt)
                                        }} placeholder='Enter your Phone Number' placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                    </View>

                                    <View style={styles.field}>

                                        <AntDesign name="idcard" size={24} color="#f49f1c" />
                                        <MaskInput
                                            style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }}
                                            value={ssn}
                                            onChangeText={(masked, unmasked) => {
                                                setssn(masked); // you can use the unmasked value as well
                                            }}
                                            mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        />
                                    </View>
                                    <View style={styles.field}>
                                        <Entypo name="location" size={24} color="#f49f1c" />
                                        <TextInput value={street} onChangeText={(txt) => setStreet(txt)} placeholder='street' placeholderTextColor={'gray'} style={{ width: '80%', marginLeft: 10, paddingLeft: 5, }} />
                                    </View>
                                    <View style={styles.card1}>
                                        <View style={{ width: '50%', alignItems: 'flex-end', marginLeft: -2, }}>
                                            <View style={styles.address}>
                                                <TextInput value={city} onChangeText={(txt) => setCity(txt)} placeholder='City' placeholderTextColor={'gray'} />
                                            </View>
                                        </View>
                                        <View style={{ width: '50%', marginLeft: 4, }}>
                                            <View style={styles.address}>
                                                <TextInput value={state} onChangeText={(txt) => setState(txt)} placeholder='State' placeholderTextColor={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.card1}>
                                        <View style={{ width: '50%', alignItems: 'flex-end', marginLeft: -2 }}>
                                            <View style={styles.address}>
                                                <TextInput value={zip} onChangeText={(txt) => setZip(txt)} placeholder='Zip' placeholderTextColor={'gray'} />
                                            </View>
                                        </View>
                                        <View style={{ width: '50%', marginLeft: 4, }}>
                                            <View style={styles.address}>
                                                <TextInput value={country} onChangeText={(txt) => setCountry(txt)} placeholder='Country' placeholderTextColor={'gray'} />
                                            </View>
                                        </View>
                                    </View>



                                <TouchableOpacity onPress={editProfile} style={styles.submit}>
                                    <Text style={{ color: 'white', fontSize: 18, }}>Submit</Text>
                                </TouchableOpacity>

                                </View>
                            </ScrollView>




                        </View>
                    </View>
            }
        </>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    card: {
        width: '99%',
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#040d50',
        shadowColor: "#000",
        // marginTop: 30,
        paddingVertical: 8,
        alignSelf: 'center',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },

    field: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        // borderColor:'#f49f1c',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
    },
    submit: {
        width: '60%',
        height: 50,
        backgroundColor: '#f49f1c',
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    address: {
        width: '88%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginLeft:25,


    },

    card1: {
        width: '100%',
        height: 50,
        // justifyContent: 's',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 10,
    }
})