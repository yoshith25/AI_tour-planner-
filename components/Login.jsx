import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../constants/Colors'
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  return (
    <View>
      <Image 
        source={require('./../assets/images/fro.webp')}
        style={{
          width: '100%',
          height: 475
        }}
      />
      <View style={styles.container}>
        <Text style={{
          fontSize: 28,
          fontFamily: 'outfit-bold',
          marginTop:10,
          textAlign:'center'
        }}>AI Tour Planner</Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 15,
          textAlign: 'center',
          color: Colors.GRAY,
          marginTop: 15,
          lineHeight: 24,
        }}>
          Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>router.push('auth/sign-in')}>
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'outfit',
            fontSize: 15,
          }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-15,
        height:'100%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        height:'100%',
        padding:20
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:79,
        marginTop:'12%'
    }
})