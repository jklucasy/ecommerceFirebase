// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDPCEOfEHbkEWsv4K0CrqxZMw4hSeMVQwM",
    authDomain: "kodemiaecommerce.firebaseapp.com",
    databaseURL: "https://kodemiaecommerce-default-rtdb.firebaseio.com",
    projectId: "kodemiaecommerce",
    storageBucket: "kodemiaecommerce.appspot.com",
    messagingSenderId: "149203409607",
    appId: "1:149203409607:web:9e874da6b4f9b65935bce2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth=firebase.auth();
var database = firebase.database();

let userSession = auth.currentUser;