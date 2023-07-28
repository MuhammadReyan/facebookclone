
// FireBase

import {
    getAuth,
    getDocs,
    query,
    collection,
    getFirestore,
    db,
    app,
    auth,
    onAuthStateChanged,
    setDoc,
    doc
} from '../firebaseConfig.js'




const myUsersArea = document.querySelector('.myUsersArea')






let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        currentLoggedInUser = uid
        // ...
    } else {
        // User is signed out
        console.log("sign out")
        window.location.href = './index.html'
    }
});


















async function getAllUsers() {


    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.date())

        console.log(doc.data())
        const { surName, signUpEmail, phoneNumber, firstName, profilePicture, followers } = doc.data()


        const columnHtml = document.createElement('div')
        columnHtml.setAttribute('class', 'col')

        const content = `
        <div class="col">
        <div class="card" style="width: 18rem; ">
            <img src="${profilePicture !== 'undefined' && profilePicture || '/assets/pp.jpg'}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${firstName}  <span>${surName}   </span>   </h5>
                <p class="card-text">User Email: ${signUpEmail} <br/> User Phone: ${phoneNumber}</p>
                <a href="#"  class="btn btn-primary"  onclick='followAndUnfollowHandler("${doc.id}","${signUpEmail}","${phoneNumber}","${firstName}","${surName}","${profilePicture}","${followers}")'>${followers?.includes(currentLoggedInUser) ? 'UnFollow' : 'Follow'}</a>
            </div>
        </div>
    </div>
        `
        columnHtml.innerHTML = content

        myUsersArea.appendChild(columnHtml)
    });
}
getAllUsers()

//  Follow And Unfollow 



async function followAndUnfollowHandler(follwerId, signUpEmail, phoneNumber, firstName, surName, profilePic, followers) {


    console.log(follwerId, signUpEmail, phoneNumber, firstName, surName, profilePic, followers)



    const myFollowers = followers !== 'undefined' ? followers.split(',') : followers

    if (myFollowers?.includes(currentLoggedInUser)) {

        console.log("unfollowing")

        const myIndexNumber = myFollowers?.indexOf(currentLoggedInUser)

        myFollowers.splice(myIndexNumber, 1)

        console.log(myFollowers, "==>>myFollowers")


        await setDoc(doc(db, "users", follwerId), {
            firstName: firstName,
            signUpEmail: signUpEmail,
            surName: surName,
            phoneNumber: phoneNumber,
            profilePicture: profilePic,
            followers: myFollowers
        });
        location.reload()

    } else {
        await setDoc(doc(db, "users", follwerId), {
            firstName: firstName,
            signUpEmail: signUpEmail,
            surName: surName,
            phoneNumber: phoneNumber,
            profilePicture: profilePic,
            followers: myFollowers !== 'undefined' ? [...myFollowers, currentLoggedInUser] : [currentLoggedInUser]
        });

        console.log('followers functionality done')
        location.reload()
    }




}





window.followAndUnfollowHandler = followAndUnfollowHandler