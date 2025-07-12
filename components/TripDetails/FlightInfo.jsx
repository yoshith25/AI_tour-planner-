import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import moment from 'moment/moment';
import { Colors } from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;

const FlightInfo = ({ flightData }) => {
  if (!flightData || flightData.length === 0) {
    return (
      <View style={styles.noFlightsContainer}>
        <Text style={styles.noFlightsText}>No flight details available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {flightData.map((flight, index) => (
        <TouchableOpacity
          key={index}
          style={styles.flightCard}
          onPress={() => handlePressFlight(flight)}
        >
          <Text style={styles.flightText}>Flight Number: <Text style={styles.bold}>{flight.flight_number}</Text></Text>
          <Text style={styles.flightText}>Airline: <Text style={styles.bold}>{flight.airline}</Text></Text>
          <Text style={styles.flightText}>
            Departure: {flight.departure_city} at {flight.departure_time} on {moment(flight.departure_date).format("MMM Do, YYYY")}
          </Text>
          <Text style={styles.flightText}>
            Arrival: {flight.arrival_city} at {flight.arrival_time} on {moment(flight.arrival_date).format("MMM Do, YYYY")}
          </Text>
          <Text style={styles.flightPriceText}>Price: <Text style={styles.price}>{flight.price}</Text></Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleBookFlight(flight.booking_url)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const handlePressFlight = (flight) => {
  console.log('Pressed flight:', flight);
};

const handleBookFlight = (bookingUrl) => {
  console.log('Booking flight:', bookingUrl);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  flightCard: {
    backgroundColor: '#fff',
    marginRight: 16,
    width: windowWidth * 0.75, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15, 
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8, 
    elevation: 5,
    padding: 25,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  flightText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6, 
  },
  flightPriceText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  bold: {
    fontWeight: '600', 
    color: Colors.PRIMARY, 
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.SECONDARY, 
  },
  bookButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  noFlightsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  noFlightsText: {
    fontSize: 18,
    color: '#888', 
  },
});

export default FlightInfo;
