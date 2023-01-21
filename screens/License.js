

import React, { useCallback, useState, useEffect } from "react";
import { ActivityIndicator, Text, View, TextInput, StyleSheet, Image, FlatList, Modal, TouchableOpacity, Button, Linking, RefreshControl, SafeAreaView, } from 'react-native'
import { Entypo, Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import ActiveReward from '../screens/ActiveReward';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { NavigationContainer } from '@react-navigation/native';
import CheckBox from "expo-checkbox";
import DatePicker from 'react-native-datepicker'
import SearchableDropdown from 'react-native-searchable-dropdown';
// import DatePicker from 'react-native-date-picker'
import { ScrollView } from 'react-native-gesture-handler';
import AddLicense from '../screens/AddLicense'
import Header from './Header';
import EditLicense from "./EditLicense";
import { Alert } from "react-native-web";
import { path } from './ApiUrl';
import { SearchBar } from 'react-native-elements';




const flatListItems = Array(200)
  .fill()
  .map((_, i) => ({ title: i, id: i }));

const Item = ({ title }) => (
  <View
    style={{
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }}>
    <Text>{title}</Text>
  </View>
);

export default function License({ navigation, route }) {

  const [AllUserData, setAllUserData] = useState(null);

  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selected_index, set_selected_index] = useState('');
  const [license, setlicense] = useState('');
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [Employee, setEmployee] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [flatListEmployee, setflatListEmployee] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(filteredDataSource.slice(0, ITEM_PER_PAGE));
  const [loading, setLoading] = useState(false);

  const ITEM_PER_PAGE = 4;


  useEffect(() => {

    async function fetchData() {

      let user = await AsyncStorage.getItem('data');
      let parsed = JSON.parse(user);
      setEmployee(parsed.data)
      getDataUsingGet(parsed.data.id);
    }
    fetchData();

  }, []);


  const getDataUsingGet = (emp_id) => {
    setIsLoading(true);
    const formData = new FormData()
    formData.append('id', emp_id);

    try {
      fetch(path + 'license', {
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
              setMasterDataSource(responseJson.data)
              setFilteredDataSource(responseJson.data)
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




  const deleteLicense = () => {
    // setIsLoading(true);
    // alert(emp_id)
    const formData = new FormData()
    formData.append('id', license);

    try {
      fetch(path + 'license_delete', {
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
              AllUserData.data.splice(selected_index, 1)
              alert("Succesfully delete ")
              setCount(count + 1)

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

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      await Linking.openURL(url);

    }, [url]);

    return <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: '#fff', flexDirection: 'row', marginLeft: 10, alignSelf: 'center', fontSize: 15, }} onPress={handlePress}>Open URL link</Text>
    </TouchableOpacity>
  };


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.certificate_names.name
            ? item.certificate_names.name.toUpperCase()
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


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    let user = await AsyncStorage.getItem('data');
    let parsed = JSON.parse(user);
    setEmployee(parsed.data)
    getDataUsingGet(parsed.data.id)

  }, []);



  const handleLoadMore = () => {
    if (page * ITEM_PER_PAGE >= filteredDataSource.length) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setPage(page + 1);
      setData(filteredDataSource.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE));
      setLoading(false);
    }, 2000);

  }

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
              {item.certificate_names.name}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff', }}>({item.license_number})</Text>
          </View>


          <View style={{ flexDirection: 'row', }} >
            <FontAwesome5 name="building" size={15} color="white" />
            <Text style={{ color: '#fff', flexDirection: 'row', marginLeft: 10, alignSelf: 'center', }}>
              {item.certificate_org.name}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', }} >
            <FontAwesome name="calendar" size={15} color="white" />
            <Text style={{ color: '#fff', marginLeft: 10, }}>{item.issue_date}</Text>
            <Text style={{ color: '#fff', marginLeft: '10%', }}>{item.expiry_date}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <MaterialCommunityIcons name="security" size={15} color="white" />
            <Text style={{ color: '#fff', marginLeft: 10, }}>{item.credential_id}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Entypo name="link" size={15} color="white" />
            {/* <Text style={{ color: '#fff', marginLeft: 10, alignSelf: 'center', }}>{item.credentialUrl}</Text> */}
            <OpenURLButton url={item.url} ></OpenURLButton>
          </View>

          <View style={{ width: '100%', height: 50, flexDirection: 'row', marginBottom: -25, }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditLicense', {
              id: item.id,
              issueDate: item.issue_date,
              licenseId: item.certificate_names.id,
              organizationId: item.certificate_org.id,
              expireDate: item.expiry_date,
              license_Number: item.license_number,
              cId: item.credential_id,
              url: item.url,
              licenseName: item.certificate_names.name,
              organizationName: item.certificate_org.name,
              licenseNameArray: AllUserData.data1,
              organizationNameArray: AllUserData.data2,
              // }) & setLicenseName(item.licenseName) & setCompanyName(item.description) & setIssueDate(item.issueDate) & setExpireDate(item.expireDate) & setCredentialId(item.credential) & setUrl(item.credentialUrl)}
            })}
              style={{ width: 70, height: 35, borderRadius: 20, backgroundColor: '#f49f1c', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', }}>
              <FontAwesome name="pencil-square-o" size={20} color="#040d50" />
              <Text style={{ fontSize: 16, color: '#040d50', fontWeight: 'bold', marginLeft: -5, }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { set_selected_index(index) & setlicense(item.id) & setModalVisible1(!modalVisible1) }} style={{ width: 70, height: 35, borderRadius: 20, marginLeft: 20, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', }}  >
              <EvilIcons name="trash" size={24} color="red" style={{ marginLeft: -4, }} />
              <Text style={{ fontSize: 15, color: '#040d50', fontWeight: 'bold', marginLeft: -10, }}>Delete</Text>
            </TouchableOpacity>

          </View>

        </View>



      </View>


    )
  }


  return (

    <>

      {isLoading == true ?
        <Header navigation={navigation} />
        :
        <SafeAreaView style={styles.contaianer}>
          <Header navigation={navigation} />
          <SearchBar
            platform="android"
            placeholder="Type Here..."
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            containerStyle={{height:60,}}
          />
          {/* <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          /> */}
          <ScrollView style={{ flex: 1 }}
            horizontal={false}
            scrollEnabled={true}
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
                data={filteredDataSource}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  page * ITEM_PER_PAGE >= filteredDataSource.length
                    ? <Image  source={require('../assets/loadingText4.gif')} style={{alignSelf:'center'}} />
                     :
                    //  null
                      <ActivityIndicator size={"large"}/>
                }
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={item => item.id}
              />
            }


            <Modal

              transparent={true} visible={modalVisible1} animationType='slide' >
              <View style={styles.modalView}  >
                {/* <Entypo name="cross" size={24} color="#040d50" style={{ alignSelf: 'flex-end', }}  /> */}
                <View >
                  <MaterialIcons name="warning" size={32} color="red" style={{ alignSelf: 'center', }} />
                  <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 20, color: '#040d50', }}> Are you sure you want to Delete License?</Text>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly', width: '90%', }}>
                  <TouchableOpacity style={{ width: 70, height: 40, borderRadius: 10, backgroundColor: '#f49f1c', justifyContent: 'center', alignItems: 'center', }} onPress={() => setModalVisible1(!modalVisible1)}>
                    <Text style={{ color: '#fff', }}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { deleteLicense(), setModalVisible1(!modalVisible1) }} style={{ width: 70, height: 40, borderRadius: 10, backgroundColor: '#040d50', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: '#fff', }}>Yes</Text>
                  </TouchableOpacity>

                </View>


              </View>
            </Modal>
          </ScrollView>
          <View style={{
            justifyContent: "center", alignItems: "center",
            backgroundColor: "#f49f1c", width: 60, height: 60, borderRadius: 50,
            position: "absolute", right: 0, bottom: 0, marginHorizontal: 5, marginRight: 10,
            marginBottom: 30,
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddLicense', {
              userid: Employee.id,
              licenseNameArray: AllUserData.data1,
              organizationNameArray: AllUserData.data2,

            })

            } >
              <MaterialIcons name="add" size={39} color="#040d50" />
              {/* <Text style={{ color: "#040d50", alignSelf: 'center', fontSize: 17, fontWeight: 'bold', }}>Add</Text> */}
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      }
    </>
  )

}

const styles = StyleSheet.create({
  contaianer: {
    flex: 1,
    backgroundColor: '#fff',

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
  modalView: {
    // marginLeft: '45%',
    marginTop: '70%',
    width: '80%',
    height: '30%',
    //  borderRadius: 7,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    shadowColor: "#000",
    justifyContent: 'space-around',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },


  modalView1: {
    // marginLeft: '45%',
    // opacity:0.2,
    width: '90%',
    height: '84%',
    //    flex:1,
    backgroundColor: "#F3F4F6",
    // backgroundColor:'red',
    borderRadius: 20,
    // padding: 10,
    marginTop: '16%',
    alignSelf: 'center',
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 1.25,
    shadowRadius: 10,
    elevation: 19
  },
  container1: {
    flex: 1,


  },
  in: {
    width: '85%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  submit: {
    width: '60%',
    height: 50,
    backgroundColor: '#f49f1c',
    marginTop: 8,
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

