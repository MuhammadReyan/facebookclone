



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { setDoc, doc, getDoc, getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"




const firebaseConfig = {
    apiKey: "AIzaSyBuV5onuCaxH3fRiRIiNKo8su-3aagz93s",
    authDomain: "social-media-85b20.firebaseapp.com",
    projectId: "social-media-85b20",
    storageBucket: "social-media-85b20.appspot.com",
    messagingSenderId: "159678614150",
    appId: "1:159678614150:web:7d23e6e6792e53a0c29f07"
};









const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const myUsersArea = document.querySelector('.myUsersArea')


async function getAllUsers() {


    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        getUserData(doc.id)
        const { surName, signUpEmail, phoneNumber } = doc.data()

        const columnHtml = document.createElement('div')
        columnHtml.setAttribute('class', 'col')

        const content = `
        <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${surName}</h5>
                <p class="card-text">User Email: ${signUpEmail} <br/> User Phone: ${phoneNumber}</p>
                <a href="../profile/index.html" onclick ="${updateProfile()}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
        `
        columnHtml.innerHTML = content

        myUsersArea.appendChild(columnHtml)
    });
}
getAllUsers()

// get one user 





