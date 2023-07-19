
import { auth, app, db, getFirestore, collection, addDoc, setDoc, doc, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig.js'

const firstName = document.querySelector('.firstName')
const surName = document.querySelector('.surName')
const signUpEmail = document.querySelector('.signupemail')
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

async function signUpHandler() {
  try {
    let response = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)

    console.log(response)
    if (response.user.uid) {
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
        alert("user login ")
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
    // console.log(response)
    window.location.href = 'index.html'
  } catch (error) {
    console.error(error)
  }
}










