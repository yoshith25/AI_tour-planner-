import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { auth, db } from './../../configs/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserTripList from './../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips);
    console.log('Updated userTrips:', trips);
    setLoading(false);
  };

  const handleAddNewTrip = () => {
    router.push('/create-trip/search-place'); 
  };

  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: "100%"
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
        }}>My Trips</Text>
        <TouchableOpacity onPress={handleAddNewTrip}>
          <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
      {userTrips?.length === 0 ?
        <StartNewTripCard />
        : <UserTripList userTrips={userTrips} />
      }
    </ScrollView>
  );
}
