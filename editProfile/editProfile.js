import {
    storage, ref, uploadBytesResumable, doc,
    db, getDoc, auth, onAuthStateChanged, getDownloadURL, setDoc
} from "../firebaseConfig.js"

const firstName = document.querySelector('.firstName')
const surName = document.querySelector('.surName')
const mobileNumber = document.querySelector('.phoneNumber')
const profilePicture = document.getElementById('profilePicture')
const editBtn = document.getElementById('editBtn')
let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

        getUserData(uid)
        currentLoggedInUser = uid
        // ...
    } else {
        // User is signed out
        // ...
        // console.log("sign out")
        window.location.href = '../login/login.html'
    }
});

async function getUserData(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { surName: userNameFromDB, firstName: firstNameFromDB, phNum } = docSnap.data()
            surName.value = userNameFromDB
            firstName.value = firstNameFromDB
            mobileNumber.value = phNum
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}

editBtn.addEventListener('click', editProfileHandler)












function editProfileHandler() {
    console.log(surName.value, firstName.value, mobileNumber.value, profilePicture.files[0], "edit button working properly")


    const file = profilePicture.files[0]


    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                await setDoc(doc(db, "users", currentLoggedInUser), {
                    firstName: firstName.value,
                    surName: surName.value,
                    mobileNumber: mobileNumber.value,
                    profilePicture: downloadURL
                });
            });
        }
    );
}