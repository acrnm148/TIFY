// import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
// import { db,authService } from "./firebase.js";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   getAuth,
//   signInWithCustomToken
// } from 'firebase/auth';

const FirebaseAuth = (ftoken:string) => {
//     const auth = getAuth();
//     signInWithCustomToken(auth, ftoken)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(userCredential);
//         console.log("firebase logged in");
//         return "FireBaseAuthentication Success";
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(error.code);
//         console.log(error.message);
//         return "FireBaseAuthentication Fail";
//         // ...
//       });
    return "FireBaseAuthentication Success";
  };

  export default FirebaseAuth;