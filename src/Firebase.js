import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCtKm9OvzQZEGkOa2J0xBIj9BIDvVlDX6s',
	authDomain: 'api-jesus-270200.firebaseapp.com',
	databaseURL: 'https://api-jesus-270200-default-rtdb.firebaseio.com',
	projectId: 'api-jesus-270200',
	storageBucket: 'api-jesus-270200.appspot.com',
	messagingSenderId: '558650763472',
	appId: '1:558650763472:web:e5d805dc1d1cb349e156d5',
	measurementId: 'G-Y4WY9450HY',
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();
