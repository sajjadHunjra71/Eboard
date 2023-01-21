import React, { Component,useState,useEffect } from 'react'
import { Text, View,AsyncStorage } from 'react-native'
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Forgot_password from '../screens/Forgot_password';
import Reward from '../screens/Reward';
import License from '../screens/License';
import TabContainer from './TabContainer';
import Welcome_Screen from '../screens/Welcome_Screen';
import InnerProfile from './InnerProfile';
import AddLicense from './AddLicense';
import Editprofile from './EditProfile';
import ChangePassword from './ChangePassword';
import WinningReward from './WinningReward'
import My_Achievements from './My_Achievements';
import PreviousReward from './PreviousReward';
import Clients from './Clients';
import Test from './Test';
import Winner_Card from './Winner_Card';
import FilterScreen from './FilterScreen';
import MyStatistics from './MyStatistics';
import ActiveReward from './ActiveReward';
import EditLicense from './EditLicense';
import WeekGraph from './WeekGraph';
import Reminder from './Reminder'
import Test2 from './Test2';
import Footer from './Footer';
import { ActivityIndicator } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    
        const [isLoading,setLoading]=useState(true)
        const [introscreens,setintro]=useState(false)

        const [showLogin,setLogin]=useState(false)
       
         useEffect(()=>{
        //       CheckLoginActivity()  
        },[])
        // const CheckLoginActivity=async()=>{
        //         let intro=await AsyncStorage.getItem("Intro")
        //         let login=await AsyncStorage.getItem("isLogin")
                
        //           if(login=="2"){
        //                  setLogin(false) 
        //                  setintro(false)
        //                  setLoading(false)
        //          }else if(intro=="1"){
        //                  setLogin(true)
        //                  setintro(false)
        //                  setLoading(false)  
                        
 
        //          }
        //          else{
                        
        //                  setintro(true)
        //                  setLoading(false)
        //          }
                 
 
        //  }
        //  if(isLoading){
        //          return(
        //                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //                          <ActivityIndicator/>
        //                  </View>
        //          )
        //  }
 
 
        //  else{
        //  if(introscreens){
                 return (
                         <Stack.Navigator options={{headerShown:false}} >            
                              {/* <Stack.Screen name="Test2" component={Test2}  options={{headerShown:false}}/> */}
                              {/* <Stack.Screen name="Test" component={Test}  options={{headerShown:false}}/> */}
                             

                              {/* <Stack.Screen name="Footer" component={Footer}  options={{headerShown:false}}/> */}
                              <Stack.Screen name="Welcome_Screen" component={Welcome_Screen} options={{headerShown:false}} />
                              <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                              <Stack.Screen name="Forgot_password" component={Forgot_password} options={{headerShown:false}}  />
                              <Stack.Screen name="Winner_Card" component={Winner_Card} options={{headerShown:false}} />
                              <Stack.Screen name="TabContainer" component={TabContainer} options={{headerShown:false}}/>
                              <Stack.Screen name="Reward" component={Reward}/>
                              <Stack.Screen name="Reminder" component={Reminder}/>
                              <Stack.Screen name="Clients" component={Clients} options={{headerShown:false}} />
                              <Stack.Screen name="EditLicense" component={EditLicense}  options={{headerShown:false}}/>
                              <Stack.Screen name="License" component={License}/>
                              <Stack.Screen name="InnerProfile" component={InnerProfile}  options={{headerShown:false}}/>
                              <Stack.Screen name="AddLicense" component={AddLicense}  options={{headerShown:false}}/>
                              <Stack.Screen name="EditProfile" component={Editprofile}  options={{headerShown:false}}/>
                              <Stack.Screen name="MyStatistics" component={MyStatistics}  options={{headerShown:false}}/>
                              <Stack.Screen name="FilterScreen" component={FilterScreen}  options={{headerShown:false}}/>
                              <Stack.Screen name="My_Achievements" component={My_Achievements}  options={{headerShown:false}}/>
                              <Stack.Screen name="WinningReward" component={WinningReward}  options={{headerShown:false}}/>
                              <Stack.Screen name="WeekGraph" component={WeekGraph}  options={{headerShown:false}}/>
                              <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{headerShown:false}}/>
                         </Stack.Navigator>
                      )
        //  }else if(showLogin){
        //          return (
        //                  <Stack.Navigator >            
        //                       {/* <Stack.Screen name="ActiveReward" component={ActiveReward}  /> */}
        //                       {/* <Stack.Screen name="Test" component={Test}  options={{headerShown:false}}/> */}
        //                       <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        //                       <Stack.Screen name="Welcome_Screen" component={Welcome_Screen} options={{headerShown:false}} />
 
        //                       <Stack.Screen name="Forgot_password" component={Forgot_password} options={{headerShown:false}}  />
        //                       <Stack.Screen name="Winner_Card" component={Winner_Card} options={{headerShown:false}} />
        //                       <Stack.Screen name="TabContainer" component={TabContainer} options={{headerShown:false}}/>
        //                       <Stack.Screen name="Reward" component={Reward}/>
        //                       <Stack.Screen name="EditLicense" component={EditLicense}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="License" component={License}/>
        //                       <Stack.Screen name="InnerProfile" component={InnerProfile}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="AddLicense" component={AddLicense}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="EditProfile" component={Editprofile}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="MyStatistics" component={MyStatistics}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="FilterScreen" component={FilterScreen}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="My_Achievements" component={My_Achievements}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="WinningReward" component={WinningReward}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{headerShown:false}}/>
        //                  </Stack.Navigator>
        //               )
        //  }else{
        //          return (
        //                  <Stack.Navigator >            
        //                       {/* <Stack.Screen name="ActiveReward" component={ActiveReward}  /> */}
        //                       {/* <Stack.Screen name="Test" component={Test}  options={{headerShown:false}}/> */}
                            
        //                       <Stack.Screen name="TabContainer" component={TabContainer} options={{headerShown:false}}/>
        //                       <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        //                       <Stack.Screen name="Welcome_Screen" component={Welcome_Screen} options={{headerShown:false}} />
 
        //                       <Stack.Screen name="Forgot_password" component={Forgot_password} options={{headerShown:false}}  />
        //                       <Stack.Screen name="Winner_Card" component={Winner_Card} options={{headerShown:false}} />
        //                       <Stack.Screen name="Reward" component={Reward}/>
        //                       <Stack.Screen name="EditLicense" component={EditLicense}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="License" component={License}/>
        //                       <Stack.Screen name="InnerProfile" component={InnerProfile}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="AddLicense" component={AddLicense}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="EditProfile" component={Editprofile}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="MyStatistics" component={MyStatistics}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="FilterScreen" component={FilterScreen}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="My_Achievements" component={My_Achievements}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="WinningReward" component={WinningReward}  options={{headerShown:false}}/>
        //                       <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{headerShown:false}}/>
        //                  </Stack.Navigator>
        //               )
        //  }
        
         }



       
    
