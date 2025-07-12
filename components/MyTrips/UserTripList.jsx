import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import moment from "moment";
import axios from "axios";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

const fetchImage = async (locationName) => {
    const apiKey = '44938756-d9d562ffdaf712150c470c59e';
    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: apiKey,
                q: locationName,
                image_type: 'photo',
            },
        });
        return response.data.hits.length > 0 ? response.data.hits[0].largeImageURL : null;
    } catch (error) {
        console.error("Error fetching image from Pixabay:", error);
        return null; 
    }
};

export default function UserTripList({ userTrips }) {
    const [imageUrls, setImageUrls] = useState({});
    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState(userTrips);
    const router = useRouter();

    useEffect(() => {
        const fetchAllImages = async () => {
            const images = {};
            for (let i = 0; i < trips.length; i++) {
                const trip = trips[i];
                const locationName = JSON.parse(trip.tripData).locationInfo.name;
                const imageUrl = await fetchImage(locationName);
                images[i] = imageUrl || require('./../../assets/images/pl.jpg'); 
            }
            setImageUrls(images);
            setLoading(false);
        };

        if (trips && trips.length > 0) {
            fetchAllImages();
        }
    }, [trips]);

    const handleDelete = (index) => {
        const updatedTrips = trips.filter((trip, i) => i !== index);
        setTrips(updatedTrips);
        setImageUrls((prevImageUrls) => {
            const updatedImageUrls = { ...prevImageUrls };
            delete updatedImageUrls[index]; 
            return updatedImageUrls;
        });
    };

    const deleteTrip = (index) => {
        Alert.alert(
            "Delete Trip",
            "Are you sure you want to delete this trip?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDelete(index) },
            ],
            { cancelable: true }
        );
    };

    const addNewTrip = (newTrip) => {
        const isDuplicate = trips.some(
            (trip) => JSON.parse(trip.tripData).locationInfo.name === newTrip.locationInfo.name
        );

        if (isDuplicate) {
            Alert.alert("Duplicate Trip", "This location has already been added.");
            return;
        }

        setTrips((prevTrips) => [newTrip, ...prevTrips]);
    };

    if (!trips || trips.length === 0) {
        return <Text style={styles.noTripsText}>No trips available</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {trips.map((trip, index) => { 
                    const parsedTrip = JSON.parse(trip.tripData);
                    return (
                        <View style={styles.tripCard} key={index}>
                            {loading ? (
                                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                            ) : (
                                <Image source={imageUrls[index] ? { uri: imageUrls[index] } : require('./../../assets/images/pl.jpg')} style={styles.image} />
                            )}
                            <View style={styles.infoContainer}>
                                <Text style={styles.location}>🌍 {parsedTrip.locationInfo.name}</Text>
                                <Text style={styles.dates}>
                                    📅 {moment(parsedTrip.startDate).format("MMM Do")} - {moment(parsedTrip.endDate).format("MMM Do, YYYY")}
                                </Text>
                                <Text style={styles.travelers}>🚌 {parsedTrip.traveler.title} - {parsedTrip.traveler.desc}</Text>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => router.push({ pathname: '/trip-detail', params: { trip: JSON.stringify(trip) } })}>
                                        <Text style={styles.buttonText}>See Your Plans</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTrip(index)}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f8f8f8",
        flex: 1,
    },
    tripCard: {
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 16,
    },
    location: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    dates: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    travelers: {
        fontSize: 14,
        color: "#888",
        marginBottom: 12,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginRight: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: Colors.RED,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    deleteButtonText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: "bold",
    },
    noTripsText: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.GRAY,
        marginTop: 20,
    },
});
