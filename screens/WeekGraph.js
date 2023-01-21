import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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

export default function WeekGraph() {

    // const data = [
    //     { x: 'Jan', y: 100 },
    //     { x: 'Feb', y: 120 },
    //     { x: 'Mar', y: 130 },
    //     { x: 'Apr', y: 145 },
    //     { x: 'May', y: 160 },
    //     { x: 'Jun', y: 170 },
    //     { x: 'Jul', y: 185 },
    //     { x: 'Aug', y: 200 },
    //     { x: 'Sep', y: 210 },
    //     { x: 'Oct', y: 220 },
    //     { x: 'Nov', y: 230 },
    //     { x: 'Dec', y: 240 },
    // ]


    const data = [
        
        { x: '10', y: 185 },
        { x: '12', y: 200 },
        { x: '14', y: 210 },
        { x: '15', y: 220 },
        { x: '16', y: 230 },
        { x: '20', y: 240 },
        

    ]

    const Tab = createMaterialTopTabNavigator();
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const Weekly = () => {
        return (
            <View style={{ backgroundColor: '', flex: 1 }}>
                <LineChart
                    // data={{
                    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dec"],
                    //     datasets: [
                    //         {
                    //             data: [
                    //                 100, 110, 90, 130, 80, 103, 12, 123, 544, 232, 290, 444
                    //             ]
                    //         }
                    //     ]
                    // }}

                    data={{
                        labels: data.map(({ x }) => x),
                        datasets: [{
                            data: data.map(({ y }) => y)
                        }]
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
                />
            </View>
        )
    }

    const Yearly = () => {
        return (
            <View style={{ backgroundColor: 'green', flex: 1 }}>
                <Text>kaslndioasjdiojdiojciojc</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>

            <Tab.Navigator
                screenOptions={{
                    // tabBarLabelStyle: { fontSize: 12 },
                    // tabBarItemStyle: { width: 100 },
                    tabBarStyle: { backgroundColor: 'transparent', },
                    tabBarActiveTintColor: '#fff',

                }}

            >
                <Tab.Screen name="weekly" component={Weekly} />
                <Tab.Screen name="Yearly" component={Yearly} />

            </Tab.Navigator>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    }


})