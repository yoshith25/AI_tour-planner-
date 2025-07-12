import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from '../../constants/Colors';

export default function SelectDates() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: " ",
        });
    }, []);

    const onDateChange = (date, type) => {
        if (type === 'START_DATE') {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    };

    const OnDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show("Please select both start and end dates", ToastAndroid.SHORT);
            return;
        }
        
        if (startDate && !endDate) {
            Alert.alert(
                "Incomplete Selection",
                "Please select an end date.",
                [{ text: "OK" }]
            );
            return;
        } 
        
        if (!startDate && endDate) {
            Alert.alert(
                "Incomplete Selection",
                "Please select a start date.",
                [{ text: "OK" }]
            );
            return;
        }

        const totalNoOfDays = endDate.diff(startDate, 'days');
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNoOfDays: totalNoOfDays + 1,
        });
        router.push('/create-trip/select-budget');
    };

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                marginTop: 20
            }}>Travel Dates</Text>
            <View style={{
                marginTop: 20
            }}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={10}
                    selectedRangeStyle={{
                        backgroundColor: Colors.PRIMARY
                    }}
                    selectedDayTextStyle={{
                        color: Colors.WHITE
                    }} 
                />
            </View>
            <TouchableOpacity
                onPress={OnDateSelectionContinue}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 27
                }}>
                <Text style={{
                    color: Colors.WHITE,
                    textAlign: 'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 18
                }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
}
