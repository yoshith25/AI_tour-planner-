# AI Tour Planner App - README

## Overview

The **AI Tour Planner App** is designed to provide personalized travel itineraries using a combination of AI and external APIs. The app allows users to plan trips, select destinations, choose dates, view travel details, and book flights. The AI-driven planner curates tailored suggestions based on user preferences and offers images for planned activities to create an immersive travel experience.

## Features

- **AI-Powered Itinerary**: Generates personalized travel plans using **Gemini AI** based on user inputs.
- **Flight Booking**: Fetch and display flight options with details such as flight number, airline, departure, arrival, and price.
- **Image Support**: Automatically retrieves relevant images for activities using the **Pixabay API**.
- **Interactive Maps**: Integrates with **Google Maps Places API** to suggest destinations and provide location-based details.
- **Firebase Integration**: Manages user authentication and stores trip data using **Firebase**.

## Technologies Used

- **React Native**: Framework for building cross-platform mobile apps.
- **Firebase**: Used for user authentication and data storage.
  - Firebase Authentication: Manages user sign-in and account creation.
  - Firebase Firestore: Stores trip data including itineraries, flight details, and preferences.
- **Google Maps Places API**: Fetches destination suggestions and provides geographic data.
- **Pixabay API**: Fetches images related to activities and destinations.
- **Gemini AI**: Generates personalized recommendations and itineraries for users.

## APIs

- **Google Maps Places API**: Used for location-based suggestions and maps integration.
- **Pixabay API**: Fetches images for trip activities based on user-selected destinations or activities.
- **Gemini AI**: Drives the AI itinerary planning and recommendation engine.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ankith-sara/Team_Alpha/ai-tour-planner.git
   cd ai-tour-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project and add your app's credentials in `firebaseConfig.js`.
   - Enable Firebase Authentication and Firestore.

4. Set up API keys:
   - Google Maps Places API: Obtain a key from [Google Cloud](https://console.cloud.google.com/).
   - Pixabay API: Sign up and get an API key from [Pixabay](https://pixabay.com/api/docs/).
   - Gemini AI: Obtain the API access details as per the documentation.

5. Run the app:
   ```bash
   npm start
   ```

## Usage

1. **User Registration**: Users can sign up or log in using their email and password.
2. **Plan a Trip**: Users can select travel dates and destinations. AI curates the itinerary and provides activity recommendations.
3. **View Flight Details**: The app fetches flight options and displays them with details like time, price, and airline.
4. **Book Flights**: Users can book flights by clicking the "Book Now" button, which redirects to the booking page.
5. **View Trip Summary**: Users can review their planned trip, including day-wise activities, timings, and relevant images.

## Technical Feasibility

- **Firebase**: Used for real-time data storage and user management.
- **Google Maps API**: Provides precise location-based information, enhancing the travel planning experience.
- **Gemini AI**: Offers dynamic, personalized suggestions, making the trip planning process more efficient.
- **Pixabay API**: Provides high-quality images to enhance the user interface, showcasing trip destinations visually.

## Acknowledgments

- **Firebase**: For authentication and cloud storage.
- **Google Maps Places API**: For geographic data and suggestions.
- **Gemini AI**: For intelligent recommendations and itinerary generation.
- **Pixabay API**: For providing free, high-quality images to enrich the user experience.

--- 

Feel free to customize this README for your project, including links to specific documentation or repositories.