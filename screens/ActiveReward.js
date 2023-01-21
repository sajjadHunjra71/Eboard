import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Image, SafeAreaView } from 'react-native'
import { AntDesign, Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';



export default function ActiveReward(props) {
    const [ind,setInd]=useState('')
    const [modalVisible1, setModalVisible1] = useState(false);
    const [data,setData]=useState({
        rewardName:'',
        rewardTarget:'',
        saleReward:'',
        rewardDiscription:'',
        rewardStartDate:'',
        rewardEndDate:''
    })
   

    const renderItem1 = (item,index) => {
        return (
            <TouchableOpacity style={styles.ActiveReward} onPress={() =>  {setData( {...data ,rewardName:item.rewards_name, rewardTarget:item.reward_target,rewardDiscription:item.description,rewardStartDate:item.target_start_date,rewardEndDate:item.rewards_price } )  &  setModalVisible1(!modalVisible1) }} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <View style={{ width: 140, flexDirection: 'row', }}>
                        <MaterialCommunityIcons name="license" size={20} color="#fff" />

                        <Text style={styles.title1}>{item.rewards_name}</Text>
                    </View>
                    <Text style={styles.title2}>{item.rewards_price}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

                    <Text style={styles.title3}>From:  {item.target_start_date}</Text>
                    <Text style={styles.title3}>    To:  {item.target_end_date}</Text>

                </View>

            </TouchableOpacity>
        )
    }

    return (

        <>
            <View style={styles.container}>
                {
                    props.user.length == 0 ?
                        <Image source={require('../assets/NoData.gif')} style={{ width: 140, height: 100, alignSelf: 'center' }} />
                        :
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={props.user}
                            renderItem={({ item,index }) => renderItem1(item,index)}
                            keyExtractor={item => item.id}

                        />
                }

                <Modal

                    transparent={true} visible={modalVisible1} animationType='slide' >
                    <View style={styles.modalView}  >
                        <View style={{ width: '100%', height: 70, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', borderBottomWidth: .5, backgroundColor: '#040d50', }}>

                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 20, color: '#f49f1c', marginLeft: 10, }}>Active Reward</Text>

                            </View>
                            <View style={{ width: '20%', justifyContent: 'center', }}>
                                <Entypo name="cross" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end', marginRight: 5 }} onPress={() => setModalVisible1(!modalVisible1)} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>



                            <View style={{ justifyContent: 'center', }}>
                                <Text style={{ fontSize: 17, }}>{data.rewardName}</Text>
                            </View>

                            <View style={{ justifyContent: 'center', marginRight: 25, }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Target:{data.rewardTarget}</Text>
                            </View>

                        </View>

                        <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                            <Text style={{ alignSelf: 'center', }}>Sale Reward       {data.saleReward}</Text>
                            <Text></Text>
                        </View>


                        <View style={{ justifyContent: 'center', flexDirection: 'row', padding: 10, alignItems: 'center', }}>
                            <Text style={{ alignSelf: 'center', }}>{data.rewardDiscription}</Text>

                        </View>

                        <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                            <Text style={styles.title3}>From:  {data.rewardStartDate}</Text>
                            <Text style={styles.title3}>         To:  {data.rewardEndDate}</Text>
                        </View>



                    </View>
                </Modal>

            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        // backgroundColor:'yellow',

    },
    ActiveReward: {
        width: 230,
        height: 80,
        backgroundColor: '#f49f1c',
        marginLeft: 10,
        marginEnd: 10,
        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 15,
    },

    modalView: {

        width: '90%',

        backgroundColor: "#fff",
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
    title3: {
        color: '#040d50',
        marginTop: 10,
        textAlign: 'center',
    },
});