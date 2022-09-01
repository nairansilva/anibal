importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    // REPLACE BY YOUR FIREBASE CONFIG HERE
    apiKey: "AIzaSyCR7pv4AmrqrgbKtdoRXlLJbhI-fqgrUYA",
    authDomain: "quintaldoanibal-95de3.firebaseapp.com",
    projectId: "quintaldoanibal-95de3",
    storageBucket: "quintaldoanibal-95de3.appspot.com",
    messagingSenderId: "284392082682",
    appId: "1:284392082682:web:6e75f4ddacccdf8c9a0d43",
    measurementId: "G-VCY65KQM9Z"
});

const messaging = firebase.messaging();
