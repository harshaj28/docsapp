  import firebase from 'firebase';
  import "firebase/auth";
  import "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyDPe4Dw8Vjh-6TT1wUDV3ybuOAE_a4NRZY",
    authDomain: "docs-app-441d0.firebaseapp.com",
    projectId: "docs-app-441d0",
    storageBucket: "docs-app-441d0.appspot.com",
    messagingSenderId: "992795790296",
    appId: "1:992795790296:web:201d94ce47ec8d1afb00ad"
  };
  
  if (!firebase.apps.length) {
      var fire = firebase.initializeApp(firebaseConfig);
    
   }else {
     fire = firebase.app();
   }
  export default fire;