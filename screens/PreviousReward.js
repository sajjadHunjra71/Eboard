import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal,Image } from 'react-native'
import { AntDesign, Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


export default function PreviousReward(props) {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [rewardName, setRewardName] = useState("null");
    const [rewardTarget, setRewardTarget] = useState("null");
    const [saleReward, setSaleReward] = useState("null");

    const [rewardDiscription, setRewardDiscription] = useState("");
    const [rewardStartDate, setRewardStartDate] = useState("null");
    const [rewardEndDate, setRewardEndDate] = useState("null");

    const [rewardStatus, setRewardStatus] = useState("null");
    const [isLoading, setIsLoading] = useState(true);

    const [AllUserData, setAllUserData] = useState(null);
    const [Employee, setEmployee] = useState(null);
    const [flateListData, setflateListData] = useState(null);




    const renderItem1 = (item) => {
        return (
            <TouchableOpacity style={styles.ActiveReward} onPress={() => setModalVisible1(!modalVisible1) & setRewardName(item.rewards_name) & setRewardTarget(item.reward_target) & setRewardDiscription(item.description) & setRewardStartDate(item.target_start_date) & setRewardEndDate(item.target_end_date) & setSaleReward(item.rewards_price)} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <View style={{ width: '60%', flexDirection: 'row', }}>
                        <MaterialCommunityIcons name="license" size={20} color="#fff" />

                        <Text numberOfLines={1} style={styles.title1}>{item.rewards_name}</Text>
                    </View>
                    <Text style={styles.title2}>{item.rewards_price}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

                    <Text style={styles.title4}>From:  {item.target_start_date}</Text>
                    <Text style={styles.title4}>    To:  {item.target_end_date}</Text>

                </View>
            </TouchableOpacity>
        )
    }



    return (

        <>
           
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                    {
                        props.user.length==0?
                        <Image source={require('../assets/NoData.gif')} style={{width:140,height:100,alignSelf:'center'}} /> 
                        :
                        <FlatList
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            data={props.user}
                            renderItem={({ item }) => renderItem1(item)}
                            keyExtractor={item => item.id}

                        />
                    }
                    </View>

                    <Modal

                        transparent={true} visible={modalVisible1} animationType='slide' >
                        <View style={styles.modalView}  >
                            <View style={{ width: '100%', height: 70, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', borderBottomWidth: .5, backgroundColor: '#040d50', }}>

                                <View style={{ width: '80%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 20, color: '#f49f1c', marginLeft: 10, }}>Previous  Reward</Text>

                                </View>
                                <View style={{ width: '20%', justifyContent: 'center', }}>
                                    <Entypo name="cross" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end', marginRight: 5 }} onPress={() => setModalVisible1(!modalVisible1)} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>



                                <View style={{ justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 17, }}>{rewardName}</Text>

                                </View>

                                <View style={{ justifyContent: 'center', marginRight: 25, }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Target is:       {rewardTarget}</Text>
                                </View>

                            </View>

                            <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
                                <Text style={{ alignSelf: 'center', }}> Reward Price:       {saleReward}</Text>
                                <Text></Text>
                            </View>


                            <View style={{ justifyContent: 'center',padding: 10, alignItems: 'center', }}>
                                <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{rewardDiscription}</Text>
                            </View>

                            <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50,   }}>
                                <Text style={styles.title3}>From:  {rewardStartDate}</Text>
                                <Text style={styles.title3}>         To:  {rewardEndDate}</Text>
                            </View>



                        </View>
                    </Modal>

                </View>
            
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ActiveReward: {
        width: '90%',
        height: 80,
        backgroundColor: '#040d50',
        // marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
    },

    modalView: {
        // marginLeft: '45%',
        marginTop: '60%',
        width: '90%',
        borderColor:'#fff',
        borderWidth:1,
        // height: '40%',
        //  borderRadius: 7,
        backgroundColor: "#fff",
        borderRadius: 20,
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

    title1: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#fff',
        width: '90%',
    },

    title2: {
        width: 80,
        marginLeft: '20%',
        color: '#fff',
        alignSelf: 'center',

    },
    title3: {
        color: 'black',
        marginTop: 20,
        textAlign: 'center',
    },
    title4: {
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },
});