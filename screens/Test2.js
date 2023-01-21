import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { fakeServer } from './fakeServer';
import Header from './Header';

export default function Test2() {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [flage, setFlage] = useState(false);


  
const renderItem = ({ item }) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 15,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
      }}
    >
      {item}
    </Text>
  );
};

let stopFetchMore = true;

const ListFooterComponent = () => {
   
    return (
    //   <>
    //   {
    // flage !='true'?


    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
      }}
    >
      Loading...
    </Text>
//     :
//     null
// }
// </>
    )
     



};



  const fetchData = async () => {
    const response = await fakeServer(20);
    setData([...response]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnEndReached = async () => {
    setLoadingMore(true);

    if (!flage) {
      console.log("Insile Stop Fetch More ....")
      const response = await fakeServer(20);
      if (response === 'done') {
        setFlage(true);
        return setLoadingMore(false);
      }
      console.log(response)
      setData([...data, ...response]);
      stopFetchMore = true;
    }
    setLoadingMore(false);
  };

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }}>
      <Header/>
      <View style={{ height: '90%', width: '100%', }}>
        <FlatList
          data={data}
          keyExtractor={item => item}
          renderItem={renderItem}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          // onScrollBeginDrag={() => {
          //   stopFetchMore = false;
          // }}
          ListFooterComponent={() => !flage && <ListFooterComponent />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});