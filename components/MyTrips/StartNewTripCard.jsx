import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function StartNewTripCard() {
  const router = useRouter()
  return (
    <View style={{
      padding:20,
      marginTop:50,
      display:'flex',
      alignItems:'center',
      gap:20
    }}>
      <Ionicons name="location-sharp" size={50} color="black" />
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-medium'
      }}>No Trips Planned Yet</Text>
      <Text style={{
        fontSize:16,
        fontFamily:'outfit',
        color:Colors.GRAY,
        textAlign:'center'
      }}>Looks like time to plan a new travel experiennce! Get started below</Text>
      <TouchableOpacity 
      onPress={()=>router.push('/create-trip/search-place')}
      style={{
        padding:12,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:30        
      }}>
        <Text style={{
          color:'#fff',
          fontFamily:'outfit-medium',
          color:Colors.WHITE,
          fontSize:15
        }}>
          Start New Trip
        </Text>
      </TouchableOpacity>
    </View>
  )
}