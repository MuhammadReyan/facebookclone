

// FireBase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { getAuth, onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"

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

// const signUpEmail = document.querySelector('.signupemail')
// const firstName = document.querySelector('.firstName')
// const surName = document.querySelector('.surName')
// const phoneNumber = document.querySelector('.phoneNumber')
// const signUpPassword = document.querySelector('.signUpPassword')
const logOut = document.getElementById('logOut')
const signOutBtn = document.getElementById('signOut')
const postBtn = document.getElementById('postBtn')
const postInput = document.querySelector('.postInput')
const postContainer = document.querySelector('.post-container')
// const userNameHTML = document.querySelector('.userName')


function displayShow() {
    let settingMenu = document.querySelector('.setting-menu')
    settingMenu.classList.toggle('setting-menu-height')
}
signOutBtn.addEventListener('click', displayShow)

const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signout successfully")
        window.location.href = '/index.html'
    }).catch((error) => {
        // An error happened.
    });

}
logOut.addEventListener('click', logoutHandler)

getPosts()

let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid)
        getUserData(uid)
        currentLoggedInUser = uid
        // ...
    } else {
        // User is signed out
        // ...
        console.log("sign out")
        window.location.href = './index.html'
    }
});

async function getUserData(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { surName, signUpEmail, phoneNumber, firstName, } = docSnap.data()
            // userNameHTML.textContent = surName
            // emailAddressHTML.textContent = signUpEmail
            // mobNumHTML.textContent = phoneNumber
            // firstName.textContent = firstName

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}



// POSTING WORK

postBtn.addEventListener('click', postHandler)

async function postHandler() {
    // console.log(postInputBox.value)
    // console.log(currentLoggedInUser, "==>>currentLoggedInUser")
    confirm("Data Post")
    try {
        const response = await addDoc(collection(db, "posts"), {
            postContent: postInput.value,
            authorId: currentLoggedInUser
        });
        getPosts()

        let modal = document.getElementById('exampleModal');
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        // console.log(response.id)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


async function getPosts() {
    postContainer.innerHTML = ' '

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const { authorId, postContent } = doc.data()


        const authorDetails = await getAuthorData(authorId)

        const postElement = document.createElement('div')
        postElement.setAttribute('class', 'box')
        const content = ` <div class="post-row">
        <div class="user-profile">
            <img src="/assets/profile-pic.png" alt="">
            <div>
                <p>${authorDetails?.firstName}</p>
                <span>June 5 2023,9:40Pm</span>
            </div>
        </div>
        <a href="" style="text-decoration: none; color: #9a9a9a;"><i class="fas fa-ellipsis-v"></i></a>
    </div>
    
    <p class="post-text">
       ${postContent}
    </p>
    <img src="/assets/feed-image-1.png" alt="" class="post-img img-fluid">

    <div class="post-row">
        <div class="activity-icons">
            <div><img src="/assets/like-blue.png" alt="">100</div>
            <div><img src="/assets/comments.png" alt="">90</div>
            <div><img src="/assets/share.png" alt="">15</div>
        </div>
        <div class="post-profile-icon">
            <img src="/assets/profile-pic.png" alt="">
            <i class="fa-solid fa-caret-down"></i>
        </div>
    </div> `
        postElement.innerHTML = content

       
    
    

        postContainer.prepend(postElement)

        

    });






}

async function getAuthorData(authorUid) {
    console.log(authorUid, "==>>authorUid")
    try {

    const docRef = doc(db, "users", authorUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
   } catch (error) {
    console.log(error)
   }
}