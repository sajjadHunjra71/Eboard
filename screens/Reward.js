import React, { useState, useEffect } from 'react'
import { Text, ScrollView, RefreshControl, View, StatusBar, StyleSheet, Image, FlatList, TouchableOpacity, Modal,  } from 'react-native'
import { AntDesign, Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveReward from './ActiveReward';
import Header from './Header';
import PreviousReward from './PreviousReward';
import {path} from './ApiUrl';

export default function Reward({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    var AllData;
    const [data, setData] = useState('');
    const [data1, setData1] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        async function fetchData() {
            let user = await AsyncStorage.getItem('data');
            let parsed = JSON.parse(user);
            getDataUsingGet(parsed.data.id);
        }
        fetchData();

    }, []);

    const getDataUsingGet = (emp_id) => {
        setIsLoading(true);
        const formData = new FormData()
        formData.append('id', emp_id);
        try {
            fetch(path+'reward', {
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
                            AllData = responseJson
                            setData(AllData.data)
                            setData1(AllData.data1)
                            setIsLoading(false);
                            setRefreshing(false);
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

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        let user = await AsyncStorage.getItem('data');
        let parsed = JSON.parse(user);
        // console.log(parsed);
        getDataUsingGet(parsed.data.id)

    }, []);

    return (
        <>
            {
                isLoading ?
                    <Header navigation={navigation} />
                    :
                    <View style={styles.container}>
                        <StatusBar hidden={false} />
                        <Header navigation={navigation} />
                        <ScrollView style={{ marginTop: 10, flex: 1, }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <ActiveReward user={data} />
                            <View style={{ width: '100%', height: 30, marginTop: 5, justifyContent: 'center', borderBottomWidth: .5 }}>
                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: 16, }}>Previous Rewards</Text>
                            </View>
                            <PreviousReward user={data1} />
                        </ScrollView>
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

});