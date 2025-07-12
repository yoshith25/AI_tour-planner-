import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig'; // Adjust path based on your project structure
import { Colors } from '../../constants/Colors';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Attempting to sign out...');
      await auth.signOut();
      console.log('Sign-out successful');
      router.replace('/auth/sign-up'); // Use replace to navigate to sign-up screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app developed by Ankith Kumar! [App Link]',
      });
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userIntroContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.userImage} />
          ) : (
            <Image source={require('./../../assets/images/pl.jpg')} style={styles.userImage} />
          )}
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share App</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Developed by Team Alpha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  userIntroContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 15,
    shadowColor: Colors.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 3,
    backgroundColor: Colors.WHITE,
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  shareButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  footer: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    color: Colors.GRAY,
  },
});

export default Profile;
