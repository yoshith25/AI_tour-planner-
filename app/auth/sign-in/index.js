import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../configs/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const OnSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter both email and password', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        ToastAndroid.show('Signed In Successfully', ToastAndroid.SHORT);
        router.replace('/mytrip');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Let's Sign You In</Text>
        <Text style={styles.subHeaderText}>Welcome Back</Text>
        <Text style={styles.subHeaderText}>You've been missed</Text>
      </View>

      {/* Email */}
      <View style={{ marginTop: 10 }}>
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

      <TouchableOpacity onPress={OnSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'outfit-bold'
  },
  subHeaderText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'outfit',
    color: Colors.GRAY
  },
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
  signUpButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY
  },
  signUpText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    textAlign: 'center'
  }
});
