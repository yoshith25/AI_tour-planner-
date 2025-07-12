import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';

export default function GenerateTrip() {
    const { tripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        GenerateAiTrip();
    }, []);

    const GenerateAiTrip = async () => {
        try {
            setLoading(true);

            const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData?.locationInfo?.name)
                .replace('{totalDays}', tripData.totalNoOfDays)
                .replace('{totalNight}', tripData.totalNoOfDays - 1)
                .replace('{traveler}', tripData.traveler?.title)
                .replace('{budget}', tripData.budget)
                .replace('{totalDays}', tripData.totalNoOfDays)
                .replace('{totalNight}', tripData.totalNoOfDays - 1);

            console.log(FINAL_PROMPT);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const responseText = await result.response.text(); // Awaiting text conversion
            const tripResp = JSON.parse(responseText);

            setLoading(false);

            const docId = Date.now().toString();
            await setDoc(doc(db, 'UserTrips', docId), {
                userEmail: user.email,
                tripPlan: tripResp, // AI result
                tripData: JSON.stringify(tripData), // User selected data
                docId: docId,
            });

            router.push('(tabs)/mytrip');
        } catch (error) {
            setLoading(false);
            console.error("Error generating trip:", error);
        }
    };

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                textAlign: 'center',
            }}>
                Please Wait.....
            </Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 40,
            }}>
                We are working to generate your dream trip
            </Text>

            <Image source={require('./../../assets/images/plane.gif')}
                style={{
                    width: "100%",
                    objectFit: 'contain',
                    height: 300,
                }}
            />
            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 18,
                textAlign: 'center',
            }}>
                Do not Go Back
            </Text>
        </View>
    );
}
