
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBuV5onuCaxH3fRiRIiNKo8su-3aagz93s",
  authDomain: "social-media-85b20.firebaseapp.com",
  projectId: "social-media-85b20",
  storageBucket: "social-media-85b20.appspot.com",
  messagingSenderId: "159678614150",
  appId: "1:159678614150:web:7d23e6e6792e53a0c29f07"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUpEmail = document.querySelector('.signupemail')
const firstName = document.querySelector('.firstName')
const surName = document.querySelector('.surName')
const phoneNumber = document.querySelector('.phoneNumber')
const signUpPassword = document.querySelector('.signUpPassword')

// Login Input Get

const loginEmail = document.querySelector('.loginEmail')
const loginPassword = document.querySelector('.loginPassword')



// Signup Handler get  and put function

const signUpBtn = document.querySelector('#signup')

// Login Handler function and get 

const loginBtn = document.querySelector('#login')


// User Creating Account 

async function signUpHandler  (){
  try {
    let response = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)

    console.log(response)
    if (response.user) {
      addUserHandler(response.user.uid)
    }


  } catch (error) {
    console.error(error)
  }

}

signUpBtn.addEventListener('click', signUpHandler)




// User  Login Function 


function loginHandler() {


  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if (user) {
        window.location.href = 'dash/index.html'
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
    });
}

loginBtn.addEventListener('click', loginHandler)




async function addUserHandler(uid) {



  try {
    let response = await setDoc(doc(db, "users", uid), {

      firstName: firstName.value,
      surName: surName.value,
      phoneNumber: phoneNumber.value,
      signUpEmail: signUpEmail.value,
    });
  } catch (error) {
    console.error(error)
  }
}










