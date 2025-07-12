import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const OnCreateAccount = () => {
    // Check if any field is empty
    if (!fullName || !email || !password) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }

    // Create user with email and password using Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        ToastAndroid.show('Account Created Successfully', ToastAndroid.SHORT);
        // Optionally, you can navigate the user after signup
        router.replace('auth/sign-in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      });
  };

  return (
    <View style={{
      padding: 20,
      paddingTop: 50,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontSize: 24,
        marginTop: 30,
        fontFamily: 'outfit-bold'
      }}>Create New Account</Text>

      {/* Full Name */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Full Name'
          value={fullName}
          onChangeText={(value) => setFullName(value)}
        />
      </View>
      {/* Email */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'outfit' }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Enter Password'
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity onPress={OnCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 30
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: 'center'
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY
  },
  signInText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    textAlign: 'center'
  }
});
