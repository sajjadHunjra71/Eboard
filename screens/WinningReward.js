import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity,Modal } from 'react-native'
import { AntDesign, Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';



const DATA1 = [
    {
        id: '1',
        title: 'This is a Reward of Christmis ',
        description: 'This is description .........111......!=================',
        date: '1 Jan - 2 Feb',
        target: '$100,000',
        saleTarget:'$100,000,0',
        rank:'1st',
        stat: 'Winning Reward',
    },
    // {
    //     id: '2',
    //     title: 'Reward 2',
    //     description: 'This is description .........222......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'1st',
    //     stat: 'Winning Reward',
    // },
    // {
    //     id: '3',
    //     title: 'Reward 3',
    //     description: 'This is description .........333......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'2nd',
    //     stat: 'Winning Reward',
    // },
    // {
    //     id: '4',
    //     title: 'Reward 4',
    //     description: 'This is description .........444......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'2nd',
    //     stat: 'Winning Reward',
    // },
    // {
    //     id: '5',
    //     title: 'Reward 5',
    //     description: 'This is description .........444......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'2nd',
    //     stat: 'Winning Reward',
    // },
    // {
    //     id: '6',
    //     title: 'Reward 6',
    //     description: 'This is description .........444......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'2nd',
    //     stat: 'Winning Reward',
    // },
    // {
    //     id: '7',
    //     title: 'Reward 7',
    //     description: 'This is description .........444......!11111111111111111111111',
    //     date: '1 Jan - 2 Feb',
    //     target: '$100,000',
    //     rank:'2nd',
    //     stat: 'Winning Reward',
    // },
   
];




export default function WinningReward() {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [rewardName, setRewardName] = useState("null");
    const [rewardTarget, setRewardTarget] = useState("null");
    const [rewardDiscription, setRewardDiscription] = useState("");
    const [winningRank, setwinningRank] = useState("null");
    const [rewardDate, setRewardDate] = useState("null");
    const [rewardStatus, setRewardStatus] = useState("null");
    const [saleTarget, setsaleTarget] = useState("null");


    const renderItem1 = (item) => {
        return (
            <TouchableOpacity style={styles.ActiveReward} onPress={() => setModalVisible1(!modalVisible1) & setRewardName(item.title) & setRewardTarget(item.target) & setRewardDiscription(item.description) & setRewardDate(item.date) & setRewardStatus(item.stat) & setwinningRank(item.rank) & setsaleTarget(item.saleTarget) } >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <View style={{ width: '60%', flexDirection: 'row', }}>
                        <MaterialCommunityIcons name="license" size={20} color="#fff" />

                        <Text numberOfLines={1} style={styles.title1}>{item.title}</Text>
                    </View>
                    <Text style={styles.title2}>{item.rank}</Text>
                </View>
                <Text style={styles.title3}>{item.date}</Text>

            </TouchableOpacity>
        )
    }



    return (
        <View style={styles.container}>
            <View style={{ flex:1 }}>
                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    data={DATA1}
                    renderItem={({ item }) => renderItem1(item)}
                    keyExtractor={item => item.id}

                />
            </View>

            <Modal

transparent={true} visible={modalVisible1} animationType='slide' >
<View style={styles.modalView}  >
    <View style={{ width: '100%', height: 70,borderTopLeftRadius:20,borderTopRightRadius:20, flexDirection:'row',borderBottomWidth:.5,backgroundColor:'#040d50',}}>
      
        <View style={{width:'80%',justifyContent:'center',}}>
            <Text style={{fontSize:20, color:'#f49f1c',marginLeft:10,}}>Previous  Reward</Text>
            
        </View>
        <View style={{width:'20%',justifyContent:'center',}}>
            <Entypo name="cross" size={24} color="#f49f1c" style={{ alignSelf: 'flex-end',marginRight:5 }} onPress={() => setModalVisible1(!modalVisible1)} />
        </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around',padding:10 }}>



        <View style={{ justifyContent: 'center', }}>
            <Text style={{fontSize:17,}}>{rewardName}</Text>

        </View>

        <View style={{ justifyContent: 'center', marginRight: 25, }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{rewardTarget}</Text>
        </View>

    </View>

    <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50, padding: 10, alignItems: 'center',}}>
        <Text style={{ alignSelf: 'center', }}>Sale Target {saleTarget}</Text>
        <Text></Text>
    </View>


    <View style={{ justifyContent: 'center', flexDirection: 'row', padding: 10, alignItems: 'center', }}>
        <Text style={{ alignSelf: 'center',textAlign:'justify' }}>{rewardDiscription}</Text>
        <Text></Text>
    </View>

    <View style={{ justifyContent: 'center', flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', }}>
        <Text >{rewardDate}</Text>
    </View>

  

</View>
</Modal>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    ActiveReward: {
        width: '90%',
        height: 80,
        backgroundColor: '#040d50',
        // backgroundColor:'#ccc',
        // marginLeft: 10,
        marginBottom:10,
        // marginTop: ,
        padding: 10,
        borderRadius: 15,
        alignSelf:'center',
    },

    modalView: {
        // marginLeft: '45%',
        marginTop: '90%',
        width: '90%',
        borderTopWidth:1,
        borderTopColor:'#fff',  
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
        width:'90%',
    },

    title2: {
        width: 80,
        marginLeft: '30%',
        color: '#fff',
        alignSelf: 'center',

    },
    title3: {
        color: '#fff',
        marginTop:20,
        textAlign: 'center',
    },
});