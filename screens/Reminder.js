
import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image
} from 'react-native';
import { MaterialIcons, Entypo, MaterialCommunityIcons, Ionicons, EvilIcons,Feather,FontAwesome } from 'react-native-vector-icons';
import { Agenda } from 'react-native-calendars';
import { Button, Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from './Header';
import { path } from './ApiUrl';



function Reminder() {
  const [Employee, setEmployee] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [AllUserData, setAllUserData] = useState("null");
  const [visible1, setVisible1] = useState(false);
  const [cId,setCid]=useState(null);
  const [Title, setTitle] = useState('');
  const [count ,setCount]=useState(0);
  const [Description, setDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [time, setTime] = useState('');
  const [modalDate, setModalDate] = useState("");


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleSetDate = (date) => {
    // console.log(date.)
    // let dateTimeString =
    // date.getFullYear()+
    //   '-' +
    //   (date.getMonth() + 1) +
    //   '-' +
    //   date.getDate()  ;


    var year = date.getFullYear(); // gives the value in 24 hours format
    var datex = date.getDate();
    var month = date.getMonth() + 1;
    if (datex < 10) {
      datex = '0' + datex;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var finalDate = year + "-" + month + "-" + datex;

    // console.log(finalDate)
    setModalDate(finalDate)
    hideDatePicker();
    // console.log(modalDate + "  snxknxksknxknkl");
  };




  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleSetTime = (time) => {

    var hours = time.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (hours < 10) {
      hours = '0' + hours
    }
    var finalTime = hours + ":" + minutes + " " + AmOrPm;
    console.log(finalTime)
    setTime(finalTime)
    hideTimePicker();
    // console.log(time + "  Time");
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };

  const [date, setDate] = useState('');
  var date2 = 1;
  const Data2 = [
    {
      "Title": "Birthday",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
      "date": "2022-12-22",
    },
    {
      "Title": "Birthday",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
      "date": "2022-12-22",
    },
    {
      "Title": "Birthday",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
      "date": "2022-12-22",
    },
    {
      "Title": "Birthday",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
      "date": "2022-11-22",
    },
    {
      "Title": "Birthday",
      "date": "2022-11-18",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
    },
    {
      "Title": "Birthday",
      "Time": "6:40pm",
      "Descriptio": "On This day My friend was came in my life so i want to Wish him...!",
      "date": "2022-11-19",
    }
  ]

  useEffect(() => {

    async function fetchData() {

      let user = await AsyncStorage.getItem('data');
      let parsed = JSON.parse(user);
      setEmployee(parsed.data)
      console.log(parsed.data.id)
      getDataUsingGet(parsed.data.id);
    }
    fetchData();

  }, []);

  const deleteReminder = () => {
    const formData = new FormData()
    formData.append('id', cId);
    toggleOverlay()

    try {
      fetch(path + 'delete_reminder', {
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
              alert("Delete Successfully")
              setLoading(false);
              getDataUsingGet(Employee.id)
            } catch (error) {
              console.log(error)
            }
          }
          setLoading(false)
        })
        .catch((error) => {
          alert(error)
        });
    } catch (e) {
      alert(e)
    }
  };
  const getDataUsingGet = (emp_id) => {
    setLoading(true);
    const formData = new FormData()
    formData.append('user_id', emp_id);

    try {
      fetch(path + 'view_reminder', {
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

              // console.log(responseJson.Data)
              setAllUserData(responseJson.Data)
              setLoading(false);
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

  const Add_Reminder = () => {
    setLoading(true);
    console.log(Employee.id + "  " + Title + " " + modalDate + "  " + time + "  " + Description);
    const formData = new FormData()
    formData.append('user_id', Employee.id);
    formData.append('title', Title);
    formData.append('date', modalDate);
    formData.append('time', time);
    formData.append('description', Description);


    try {
      fetch(path + 'add_reminder', {
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

              alert("Succesfully Created")

              toggleOverlay1()
              setLoading(false)
              getDataUsingGet(Employee.id)
            } catch (error) {
              console.log(error)
            }

          }

        })
        .catch((error) => {
          alert(error)
          setLoading(false)

        });
    } catch (e) {
      alert(e)
    }
  };


  const checkEmptyField = () => {
    //Check for the Name TextInput
    if (!Title.trim()) {
      alert('Please Enter Title');
      return;
    }
    //Check for the Email TextInput
    if (!time.trim()) {
      alert('Please Enter Time');
      return;
    }
    if (!modalDate.trim()) {
      alert('Please Select Date');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    Add_Reminder()
  };
   
  const delFunc=(id)=>{
    toggleOverlay();
    setCid(id);
  }

  const LoaderFunction = () => {
    // if (Data2.length > 0) {
    // if (date2 != 1) {
    return (
      AllUserData.map((item) => {
        if (item.date == date) {
          return (
            <View style={{
              width: '95%', margin: 10, padding: 10, backgroundColor: '#040d50',
              flexDirection: 'row', borderBottomColor: 'gray', borderRadius: 15
            }}>
              <View style={{ width: '90%' }}>
                <View style={{flexDirection:'row',}}>
                <Feather name="user" size={20} color="#fff" />
                <Text style={styles.titleStyle}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '45%', alignItems: 'center', justifyContent: 'space-between', }}>
                  <Feather name='calendar' color="#fff" size={20} />
                  <Text style={styles.color}>{item.date}</Text>
                  <Text style={styles.color}>{item.time}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems: 'center',}}>
                <Feather name="clipboard" size={20} color="#fff" />
                <Text style={styles.color}>{item.description}</Text>
                </View>
              </View>
              <TouchableOpacity   style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={()=>delFunc(item.id)} >
              <FontAwesome name="trash-o" size={20} color="#fff" />
              </TouchableOpacity>

            </View>
          )
        }
      })


    )
    // }
    //  else {
    //   // if(date.length>0){
    //   return (
    //     Data.map((item) => {
    //       // if(item==date){
    //       // return(

    //       <View>
    //         <Text>{item.name}</Text>
    //         <Text>{item.age}</Text>

    //       </View>
    //       // )
    //       // }
    //     })
    //   )

    // }
    // }

  }
  //   const memoizedValue = useMemo(() => LoaderFunction);

  return (
    <>
      {
        loading == true ?
          <Header />
          :

          <SafeAreaView style={styles.container}>

            <StatusBar hidden={false} />
            <Header />

            <Agenda
              items={AllUserData}
              // Callback that gets called when items for a certain month should be loaded (month became visible)
              // loadItemsForMonth={month => {
              //   console.log('trigger items loading');
              // }}
              // Callback that fires when the calendar is opened or closed
              onCalendarToggled={calendarOpened => {
                console.log(calendarOpened);
              }}
              // Callback that gets called on day press
              onDayPress={day => {
                console.log('day pressed');
                console.log(day.dateString);
                setDate(day.dateString)
              }}
              // Callback that gets called when day changes while scrolling agenda list
              onDayChange={day => {
                console.log('day changed');
                // console.log(day);

              }}
              // Initially selected day
              // selected={'2022-11-12'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // minDate={'2022-11-09'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={'2022-11-12'}
              // Max amount of months allowed to scroll to the past. Default = 50
              // pastScrollRange={50}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={0}
              // Specify how each item should be rendered in agenda
              // renderItem={(item, isFirst) => (

              //   <TouchableOpacity  style={styles.item}>
              //     <Text style={styles.itemText}>{item.name}</Text>
              //     <Text style={styles.itemText}>{item.age}</Text>
              //   </TouchableOpacity>
              // )}
              // Specify how each date should be rendered. day can be undefined if the item is not first in that day
              // renderDay={(day, item) => {
              //   return (
              //     <View>
              //       <Text>1</Text>
              //       <Text>2</Text>
              //       <Text>3</Text>
              //       <Text>4</Text>

              //     </View>
              //   );
              // }}
              // Specify how empty date content with no items should be rendered
              // renderEmptyDate={() => {
              //   return ;
              // }}
              // Specify how agenda knob should look like
              // renderKnob={() => {
              //   return (
              //     <View style={{width:200}}>

              //     </View>
              //   );
              // }}
              // Override inner list with a custom implemented component
              renderList={listProps => {
                // memoizedValue
                return LoaderFunction();

              }}

              onRefresh={() => console.log('refreshing...')}
              refreshing={true}
              refreshControl={null}
              style={{}}
            />



            <Overlay visible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ width: '95%', height: 120, padding: 0 }}>
              <View style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#040d50' }}>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>Delete Reminder</Text>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '70%', height: '60%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={toggleOverlay} style={{ width: 80, height: 35, borderRadius: 10, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'center', }}>
                      <Text>NO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteReminder()} style={{ width: 80, height: 35, borderRadius: 10, backgroundColor: '#f49f1c', alignItems: 'center', justifyContent: 'center', }}>
                      <Text>YES</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Overlay>


            {/* <Overlay isVisible={visible1}
              overlayStyle={{ width: '95%', height: 230, padding: 0, }
              }>

              <View style={styles.header}>
                <TouchableOpacity onPress={toggleOverlay1} style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', padding: 7 }}>
                  <Entypo name='cross' color='#fff' size={27} />
                </TouchableOpacity>
                <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 22 }}>Add Reminder</Text></View>
                <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={checkEmptyField} style={{ width: '85%', height: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 7, }}>
                    <Text style={{ fontSize: 16, color: '#1f2e4d' }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bott}>
                <TextInput
                  style={{ fontSize: 16, width: '90%' }}
                  onChangeText={setTitle}
                  value={Title}
                  placeholder="Enter Title For Reminder"
                  keyboardType="default"
                />
              </View>
              <TouchableOpacity style={styles.bott} onPress={showDatePicker}>
                <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={showDatePicker}>
                  <EvilIcons name='calendar' size={28} />
                </TouchableOpacity>

                {
                  isDatePickerVisible ?
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleSetDate}
                      onCancel={hideDatePicker}
                    />
                    :
                    null

                }

                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                  <Text>{modalDate}</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={styles.bott} onPress={showTimePicker}>
                <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={showTimePicker}>
                  <EvilIcons name='clock' size={28} />
                </TouchableOpacity>

                {
                  isTimePickerVisible ?
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleSetTime}
                      onCancel={hideTimePicker}
                    />
                    :
                    null

                }

                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                  <Text>{time}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.bott}>
                <TextInput
                  style={{ fontSize: 16, width: '90%' }}
                  onChangeText={setDescription}
                  value={Description}
                  placeholder="Enter Description For Reminder"
                  keyboardType="default"
                />
              </View>



            </Overlay> */}




            <Overlay visible={visible1} overlayStyle={{ width: '95%', height: 350, padding: 0 }}>
              <View style={styles.header}>
                {/* <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', padding: 7 }}>

                            </View> */}

                <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 19, fontWeight: '700' }}>Client Information Form</Text></View>
                <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={toggleOverlay1} style={{ width: '85%', height: '70%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 7, }}>
                    <Entypo name='cross' color='#fff' size={27} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.field}>
                <TextInput
                  style={{ fontSize: 16, width: '90%' }}
                  onChangeText={setTitle}
                  value={Title}
                  placeholder="Enter Title For Reminder"
                  keyboardType="default"
                />
              </View>
              <View style={styles.field}>
                <TouchableOpacity style={styles.bott} onPress={showDatePicker}>
                  <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={showDatePicker}>
                    <EvilIcons name='calendar' size={28} />
                  </TouchableOpacity>

                  {
                    isDatePickerVisible ?
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleSetDate}
                        onCancel={hideDatePicker}
                      />
                      :
                      null

                  }

                  <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <Text>{modalDate}</Text>
                  </View>

                </TouchableOpacity>
              </View>
              <View style={styles.field}>
                <TouchableOpacity style={styles.bott} onPress={showTimePicker}>
                  <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={showTimePicker}>
                    <EvilIcons name='clock' size={28} />
                  </TouchableOpacity>

                  {
                    isTimePickerVisible ?
                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleSetTime}
                        onCancel={hideTimePicker}
                      />
                      :
                      null

                  }

                  <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <Text>{time}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.field}>
                <TextInput
                  style={{ fontSize: 16, width: '90%' }}
                  onChangeText={setDescription}
                  value={Description}
                  placeholder="Enter Description For Reminder"
                  keyboardType="default"
                />
              </View>

              <View style={styles.field1}>

                <TouchableOpacity onPress={checkEmptyField} style={{ width: '40%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f49f1c', alignSelf: 'center', borderRadius: 7, }}>
                  <Text style={{ fontSize: 20, color: '#1f2e4d' }}>Save</Text>
                </TouchableOpacity>
              </View>

            </Overlay>















            <TouchableOpacity style={{
              justifyContent: "center", alignItems: "center",
              backgroundColor: "#f49f1c", width: 60, height: 60, borderRadius: 50,
              position: "absolute", right: 0, bottom: 0, marginHorizontal: 5, marginRight: 10,
              marginBottom: 30,
            }}>
              <TouchableOpacity onPress={toggleOverlay1}>
                <MaterialIcons name="add" size={39} color="#ffff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </SafeAreaView>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  field: {
    width: '95%',
    height: 50,
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    borderWidth: 0.7,
    // borderColor:'#f49f1c',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    height: '13%',
    backgroundColor: '#1f2e4d',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  field1: {
    width: '95%',
    height: 50,
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    // borderColor:'#f49f1c',
    alignItems: 'center',
    borderRadius: 10,

    flexDirection: 'row',
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
  color: {
    margin: 5,
    color: '#fff'
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginLeft:10

  },
  
  bott: {
    width: '100%',
    // padding: 10,
    flexDirection: 'row',
  },


});

export default Reminder;