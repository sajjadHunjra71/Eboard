
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Header from './Header';
import { FontAwesome, MaterialCommunityIcons, AntDesign, Entypo, EvilIcons } from '@expo/vector-icons';
import FilterScreen from './FilterScreen';
import My_Achievements from './My_Achievements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { path } from './ApiUrl';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ActivityIndicator } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import WeekGraph from './WeekGraph';


export default function MyStatistics({ route, navigation }) {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [date, setDate] = useState("mm/dd/yyyy");
    const [date1, setDate1] = useState("mm/dd/yyyy");
    const [isLoading, setIsLoading] = useState(true);
    const [totalSale, setTotalSale] = useState('');
    const [count, setCount] = useState(0);
    const [apiCall, setpiCall] = useState(false);
    const [mode, setMode] = useState('date');
    const [mode1, setMode1] = useState('date');
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [userId, setuserId] = useState(route.params.id);
    const [Employee, setEmployee] = useState([]);
    const [TSR, TodaySalesRecord] = useState([]);
    const [YSR, YesterdaySalesRecord] = useState([]);
    const [toolTipVisible, setToolTip] = useState(false);


    useEffect(() => {
        async function fetchData() {
            {
                apiCall == true ?
                    searchedData()
                    :
                    getDataUsingGet()
            }
        }
        fetchData();

    }, []);




    const showPicker = () => {
        setShow(true);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date) => {
        setDate(date.toLocaleDateString());
        console.log("New Start Date is ", date);
        hideDatePicker();
    };

    const showpicker1 = () => {
        setShow1(true);
    };

    const handleConfirm1 = (date) => {
        setDate1(date.toLocaleDateString());
        console.log("New Start Date is ", date1);
        setShow1(false);
    };

    const getDataUsingGet = () => {
        // setIsLoading(true);
        // alert(emp_id)
        const formData = new FormData()
        formData.append('id', userId);

        try {
            fetch(path + 'statistics', {
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

                            setEmployee(responseJson)
                            TodaySalesRecord(responseJson.data1)
                            YesterdaySalesRecord(responseJson.data2)

                            //  console.log(responseJson)
                            // alert(AllUserData.data.reward_target)
                            setIsLoading(false);
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



    const screenWidth = Dimensions.get("window").width;

    const searchedData = () => {
        if (date == '' || date1 == '') {
            alert('Fileds are required ')
            return
        }
        setModalVisible1(!modalVisible1)
        setIsLoading(true);
        // alert(emp_id)
        const formData = new FormData()
        formData.append('id', userId);
        // console.log(date.toLocaleDateString());

        // console.log(date1.toLocaleDateString());
        formData.append('from_date', date);
        formData.append('to_date', date1);


        try {
            fetch(path + 'search_filter', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.error) {
                        alert(responseJson.error_msg);
                    } else {

                        try {

                            setEmployee(responseJson)
                            // console.log("***************",responseJson)
                            // alert(AllUserData.data.reward_target)
                            TodaySalesRecord(responseJson.data1)
                            // YesterdaySalesRecord(responseJson.data1)
                            setDate('mm/dd/yyyy')
                            setDate1('mm/dd/yyyy')

                            setCount(count + 1);
                        } catch (error) {
                            console.log(error)
                        }

                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    alert(error)
                });
        } catch (e) {
            alert(e)
        }
    }; var X_Data = [14, 22, 53, 24, 6, 6, 97];


    const CheckRecord = (todaysales, todaydate) => {
        console.log(todaysales)


        return (
            YSR.map((item, index) => {



                if (item.date == todaydate) {



                    if (todaysales > item[index + 1]?.sales) {



                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ color: '#fff' }}>{item.sales}</Text>
                                <AntDesign name="arrowup" size={20} color="white" />

                            </View>

                        )
                        // }

                    } else {
                        // console.log(item.date+"-----"+todaydate)

                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                {/* <Text style={{color:'#fff'}}>{ite.sales}</Text> */}
                                <AntDesign name="arrowdown" size={24} color="red" />
                            </View>
                        )
                        // }

                    }
                } else {
                    <></>
                }


            })
        )


    }


    const renderItem1 = (item) => {
        return (

            <View style={styles.record} >
                <View style={{ width: '33%', height: 60, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 16, color: 'white', }}>{item.date}</Text>
                </View>

                <View style={{ width: '25%', height: 60, alignItems: 'center', justifyContent: 'center', }}>

                    <Text style={{ fontSize: 16, color: 'white', }}>{item.sales}</Text>
                </View>
                {/* {item[condition].sales>item.sales?<View><Text>sdasdsad</Text></View>:<View><Text>4dsf</Text></View>} */}



            </View>

        )
    }
    return (


        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={{ flex: 1, justifyContent: 'center', }}>
                <View style={styles.card1}>
                    <View style={{ width: '100%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                        <View style={{ width: '50%', height: '70%', alignItems: 'center', }}>
                            <Text style={{ color: '#040d50', fontSize: 25, fontWeight: 'bold', marginTop: 10, marginLeft: -40, }}>
                                My Statistics
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={{ width: '30%', height: '70%', marginLeft: 10, alignItems: 'flex-end', }}   >
                            <FontAwesome name="filter" size={24} color="#040d50" style={{ marginRight: 20, marginTop: 10, }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ width: '100%', height: 130, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: -50, }}>
                        <TouchableOpacity style={{ width: 140, height: 120, backgroundColor: '#040d50', borderRadius: 10, }}>

                            <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', }}>Total Sale</Text>
                            </View>
                            <View style={{ width: '90%', height: '50%', alignItems: 'center', alignSelf: 'center', }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', }}>${Employee.data}</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('My_Achievements')} style={{ width: 140, height: 120, backgroundColor: '#040d50', borderRadius: 10, }}>

                            <View style={{ width: '100%', height: '70%', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', }}>My Acievements</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ color: 'white', alignSelf: 'center', }}>View More</Text>
                                <AntDesign name="arrowright" size={20} color="white" style={{ alignSelf: 'flex-end', }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <Text style={{ color: '#040d50', fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>
                            Sale Record
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20 }} >
                        <Text style={{ color: '#040d50', fontSize: 15, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>
                            Date
                        </Text>
                        <Text style={{ color: '#040d50', fontSize: 15, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>
                            Sale
                        </Text>
                    </View>
                    {/* {isLoading ?
                        <View style={{ width: 200, height: 300, justifyContent: 'center', alignSelf: 'center' }}>
                            <ActivityIndicator color='#fff' />
                        </View>
                        :
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={TSR}
                            renderItem={({ item }) => renderItem1(item)}
                            keyExtractor={item => item.id}

                        />
                        
                        
                        } */}

                      

                    {/* <LineChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dec"],
                            datasets: [
                                {
                                    data: [
                                        100, 110, 90, 130, 80, 103, 12, 123, 544, 232, 290, 444
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width - 20}
                        height={250}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "white",
                            backgroundGradientFrom: "#040d50",
                            backgroundGradientTo: "#f49f1c",
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 0
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "0",
                                stroke: "#fbfbfb"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 6
                        }}

                        decorator={() => {
                            return tooltipPos.visible ? <View>
                                <Svg>
                                    <Rect x={tooltipPos.x - 15}
                                        y={tooltipPos.y + 10}
                                        width="40"
                                        height="30"
                                        fill="black" />
                                    <TextSVG
                                        x={tooltipPos.x + 5}
                                        y={tooltipPos.y + 30}
                                        fill="white"
                                        fontSize="16"
                                        fontWeight="bold"
                                        textAnchor="middle">
                                        {tooltipPos.value}
                                    </TextSVG>
                                </Svg>
                            </View> : null
                        }}

                        onDataPointClick={(data) => {

                            let isSamePoint = (tooltipPos.x === data.x
                                && tooltipPos.y === data.y)

                            isSamePoint ? setTooltipPos((previousState) => {
                                return {
                                    ...previousState,
                                    value: data.value,
                                    visible: !previousState.visible
                                }
                            })
                                :
                                setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

                        }}
                    /> */}

                    <WeekGraph/>
                </View>
            </View >

            <Modal

                transparent={true} visible={modalVisible1} animationType='slide' >
                <View style={styles.modalView}  >
                    <View style={{ width: '100%', height: 30, justifyContent: 'space-around', flexDirection: 'row', }}>
                        <View>
                            <Text style={{ color: '#040d50', fontSize: 20, fontWeight: 'bold', }}>
                                Filter
                            </Text>
                        </View>
                        <View style={{ width: 150, }}>

                        </View>
                        <View style={{ justifyContent: 'center', width: 30, height: 30, marginRight: -20, }}>
                            <Entypo name="cross" size={24} color="#888ea8" style={{ alignSelf: 'center', }} onPress={() => setModalVisible1(!modalVisible1)} />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 70, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around', }}>
                        <View>
                            <Text style={{ color: '#040d50', fontSize: 17, fontWeight: 'bold', }}>From</Text>
                        </View>
                        <View style={{ borderWidth: 1, height: 50, width: 150, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>

                            <Text style={{ fontSize: 15, marginRight: 10 }}>{date}</Text>

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

                            <EvilIcons onPress={showPicker} name="calendar" size={34} color="#f49f1c" />




                        </View>
                    </View>


                    <View style={{ width: '100%', height: 70, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around', }}>
                        <View style={{ width: 35, }}>
                            <Text style={{ color: '#040d50', fontSize: 17, fontWeight: 'bold', }}>To</Text>
                        </View>
                        <TouchableOpacity style={{ borderWidth: 1, height: 50, width: 150, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, marginRight: 10 }}>{date1}</Text>

                            {show1 && (
                                <DateTimePickerModal
                                    isVisible={show1}
                                    mode="date"
                                    onConfirm={handleConfirm1}
                                    onCancel={hideDatePicker}

                                />
                            )}


                            <EvilIcons onPress={showpicker1} name="calendar" size={34} color="#f49f1c" />


                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => searchedData()} style={styles.loginBtn}  >
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card1: {
        width: '95%',
        flex: 1,
        backgroundColor: '#f49f1c',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 10,
    },
    record: {
        width: '95%',
        height: 80,
        backgroundColor: '#040d50',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 15,

    },
    anotherView: {
        backgroundColor: '#CCCCCC',
        width: 40,
        height: 40,
        position: 'absolute',
        // top:Tooldata.x,
        // right:Tooldata.y,
        zIndex: 2, // <- zIndex here
    },
    modalView: {
        // marginLeft: '45%',
        marginTop: '60%',
        width: '90%',
        height: 250,
        //  borderRadius: 7,
        backgroundColor: "#F3F4F6",
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    loginBtn: {
        backgroundColor: "#040d50",
        borderRadius: 30,
        width: 200,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 10,

    },
    loginText: {
        // marginTop: '6%',
        // alignSelf:'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});