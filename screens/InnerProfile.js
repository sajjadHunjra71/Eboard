// import React, { useState,useEffect } from 'react';
// import { Text, View, StyleSheet, Image, TouchableOpacity ,AsyncStorage} from 'react-native';
// import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons ,AntDesign} from '@expo/vector-icons';
// import Header from './Header';
// import EditProfile from './EditProfile'


// export default function InnerProfile({navigation}) {
//     const [Employee, setEmployee] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(async() => {
//         // Update the document title using the browser API

//         let user = await AsyncStorage.getItem('data');
//         let parsed = JSON.parse(user);
//         // console.log(parsed);
//         setEmployee(parsed.data)
//         setIsLoading(false)
//         // console.log(Employee.image)
//       }, []);

//     return (
//         <>
//         {isLoading==true?null
//         :
//         <View style={styles.container}>

//                 <Header navigation={navigation}/>


//             <View style={{ width: '90%', height: '30%', alignSelf: 'center', backgroundColor: '#040d50', alignItems: 'center', borderRadius: 20, marginTop: 40, justifyContent: 'center', }}>

//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

//                     <View style={{ width: '30%', height: 40, }}></View>
//                     <View style={{ width: '30%', }}>
//                         <Image source={{uri:'http://eboard.qubitars.com/storage/app/'+Employee.image}} style={{ width: 90, height: 90, borderRadius: 60, alignSelf: 'center', }} />
//                     </View>
//                     <TouchableOpacity style={{ width: '30%',height:100,marginTop:-30,}}  onPress={()=>navigation.navigate('EditProfile')}  >
//                         <FontAwesome name="edit" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end',}}   />

//                     </TouchableOpacity>

//                 </View>
//                 <View style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
//                     <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold', }}>
//                         {Employee.name}
//                     </Text>
//                 </View>

//             </View>


//             <View style={{ width: '90%', height: "40%", alignSelf: 'center', backgroundColor: '#f49f1c', alignItems: 'center', borderRadius: 20, marginTop: 30, justifyContent: 'space-evenly', }}>
//                 <View style={{ width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
//                     <Entypo name="phone" size={24} color="white" />
//                     <Text style={{ fontSize: 18, color: '#fff', marginLeft: 20, }}>{Employee.contact}</Text>

//                 </View>

//                 <View style={{ width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
//                     <MaterialCommunityIcons name="email" size={24} color="white" />
//                     <Text style={{ textAlign: 'auto', color: 'white', marginLeft: 20, }}>
//                         {Employee.email}
//                     </Text>
//                 </View>

//                 <View style={{ width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
//                 <AntDesign name="idcard" size={24} color="#fff" />
//                     <Text style={{ textAlign: 'auto', color: 'white', marginLeft: 20, }}>
//                         {Employee.ssn}
//                     </Text>
//                 </View>

//                 <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, }}>
//                     <Entypo name="location" size={24} color="white" />

//                     <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
//                        {Employee.street}
//                     </Text>
//                     <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
//                        {Employee.city}
//                     </Text>
//                     <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
//                        {Employee.state}
//                     </Text>
//                     <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
//                        {Employee.zip}
//                     </Text>
//                 </View>
//             </View>



//         </View>
//         }
//         </>
//     );

// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: 'center',
//     }
// });





import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Header from './Header';
import EditProfile from './EditProfile'


export default function InnerProfile({ navigation }) {
    const [Employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        // Update the document title using the browser API

        let user = await AsyncStorage.getItem('data');
        let parsed = JSON.parse(user);
        // console.log(parsed);
        setEmployee(parsed.data)
        setIsLoading(false)
        // console.log(Employee.image)
    }, []);

    return (
        <>
            {isLoading == true ? null
                :
                <View style={styles.container}>

                    <Header navigation={navigation} />


                    <View style={{ width: '90%', height: '30%', alignSelf: 'center', backgroundColor: '#040d50', alignItems: 'center', borderRadius: 20, marginTop: 40, justifyContent: 'center', }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                            <View style={{ width: '30%', height: 40, }}></View>
                            <View style={{ width: '30%', }}>
                                <Image source={{ uri: 'http://eboard.qubitars.com/storage/app/' + Employee.image }} style={{ width: 90, height: 90, borderRadius: 60, alignSelf: 'center', }} />
                            </View>
                            <TouchableOpacity style={{ width: '30%', height: 100, marginTop: -30, }} onPress={() => navigation.navigate('EditProfile')}  >
                                <FontAwesome name="edit" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end', }} onPress={() => navigation.navigate('EditProfile')} />

                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
                            <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold', }}>
                                {Employee.name}
                            </Text>
                        </View>

                    </View>


                    <View style={{ width: '90%', height: "40%", alignSelf: 'center', backgroundColor: '#f49f1c',  borderRadius: 20, marginTop: 30, justifyContent: 'space-evenly', }}>
                        <View style={{ width: '100%', height: 40, flexDirection: 'row', margin:20 }}>
                            <Entypo name="phone" size={24} color="white" />
                            <Text style={{ fontSize: 18, color: '#fff', marginLeft: 20, }}>{Employee.contact}</Text>

                        </View>

                        <View style={{ width: '100%', height: 40, flexDirection: 'row', margin:20 }}>
                            <MaterialCommunityIcons name="email" size={24} color="white" />
                            <Text style={{ textAlign: 'auto', color: 'white', marginLeft: 20, }}>
                                {Employee.email}
                            </Text>
                        </View>

                        <View style={{ width: '100%', height: 40, flexDirection: 'row', margin:20 }}>
                            <AntDesign name="idcard" size={24} color="#fff" />
                            <Text style={{ textAlign: 'auto', color: 'white', marginLeft: 20, }}>
                                {Employee.ssn}
                            </Text>
                        </View>

                        <View style={{ width: '100%', height: 40, flexDirection: 'row', margin:20 }}>
                            <Entypo name="location" size={24} color="white" />

                            <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
                                {Employee.street}
                            </Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
                                {Employee.city}
                            </Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
                                {Employee.state}
                            </Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginLeft: 20, }}>
                                {Employee.zip}
                            </Text>
                        </View>
                    </View>



                </View>
            }
        </>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    }
});