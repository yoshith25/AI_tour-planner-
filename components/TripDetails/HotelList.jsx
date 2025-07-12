import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;

const HotelList = ({ hotelList }) => {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    // Fetch images for each hotel in hotelList
    const fetchHotelImages = async () => {
      const images = {};
      for (const hotel of hotelList) {
        const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
        images[hotel.hotel_name] = imageUrl;
      }
      setHotelImages(images);
    };

    fetchHotelImages();
  }, [hotelList]);

  const fetchImageFromPixabay = async (searchTerm) => {
    const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL;
      } else {
        throw new Error('No images found');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  if (!hotelList || hotelList.length === 0) {
    return (
      <View style={styles.noHotelsContainer}>
        <Text style={styles.noHotelsText}>No hotel details available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {hotelList.map((hotel, index) => (
        <TouchableOpacity
          key={index}
          style={styles.hotelCard}
          onPress={() => handlePressHotel(hotel)}
        >
          <Image
            source={{
              uri:
                hotelImages[hotel.hotel_name] ||
                'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
            }}
            style={styles.hotelImage}
          />
          <View style={styles.hotelDetails}>
            <Text style={styles.hotelName} numberOfLines={2}>
              {hotel.hotel_name}
            </Text>
            <Text style={styles.hotelAddress} numberOfLines={2}>
              {hotel.hotel_address}
            </Text>
            <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
            <Text style={styles.hotelRating}>{hotel.rating} ⭐</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => handleBookHotel(hotel.booking_url)}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const handlePressHotel = (hotel) => {
  console.log('Pressed hotel:', hotel);
};

const handleBookHotel = (bookingUrl) => {
  console.log('Booking hotel:', bookingUrl);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  hotelCard: {
    backgroundColor: '#fff',
    marginRight: 20,
    width: windowWidth * 0.75,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  hotelImage: {
    width: windowWidth * 0.75, 
    height: 230,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  hotelDetails: {
    padding: 15,
    flex: 1,
  },
  hotelName: {
    fontSize: 18, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hotelAddress: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: 6,
  },
  hotelRating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d4af37',
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  noHotelsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  noHotelsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default HotelList;
