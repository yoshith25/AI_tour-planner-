import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors'
import { CreateTripContext } from './../../context/CreateTripContext'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={{
      padding: 20,
      paddingTop: 85,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <GooglePlacesAutocomplete
        placeholder='Search Place'
        fetchDetails={true} // Ensure fetchDetails is set to true
        onPress={(data, details = null) => {
          if (details) {
            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details.geometry?.location,
                photoRef: details.photos?.[0]?.photo_reference,
                url: details.url
              }
            });
            router.push('/create-trip/select-traveler');
          } else {
            console.log('Details not available');
          }
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY, // Ensure the key is set correctly
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20
          }
        }}
      />
    </View>
  )
}
