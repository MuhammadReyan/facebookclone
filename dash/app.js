
// // FireBase

import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    setDoc,
    addDoc,
    collection,
    getDocs,
    getAuth,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    updateDoc,
    deleteDoc,
    app

} from '../firebaseConfig.js'

const logOut = document.getElementById('logOut')
const signOutBtn = document.getElementById('signOut')
const postBtn = document.getElementById('postBtn')
const postInput = document.querySelector('.postInput')
const postContainer = document.querySelector('.post-container')
const uploadImage = document.getElementById('uploadImage')
const curentUser = document.querySelector('.curentUser')
const dashBoardpp = document.querySelector('.pp')


let currentLoggedInUser;
let ppLogInProfile;
let globalId;
let editLogic = false

editLogic ? postBtn.innerText = 'Update' : postBtn.innerText = 'Post'


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
            const { surName, signUpEmail, phoneNumber, firstName, profilePicture } = docSnap.data()
            ppLogInProfile = profilePicture
            // userNameHTML.textContent = surName
            // emailAddressHTML.textContent = signUpEmail
            // mobNumHTML.textContent = phoneNumber
            // firstName.textContent = firstName
            curentUser.innerHTML = firstName
            dashBoardpp.src = profilePicture || '/assets/pp.jpg'


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
// async function postHandler() {
//     confirm("Data Post")
//     const file = uploadImage.files[0]

//     // Create the file metadata
//     /** @type {any} */
//     const metadata = {
//         contentType: 'image/jpeg'
//     };




//     // Upload file and metadata to the object 'images/mountains.jpg'
//     const storageRef = ref(storage, 'images/' + file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {
//             // A full list of error codes is available at
//             // https://firebase.google.com/docs/storage/web/handle-errors
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     // User doesn't have permission to access the object
//                     break;
//                 case 'storage/canceled':
//                     // User canceled the upload
//                     break;

//                 // ...

//                 case 'storage/unknown':
//                     // Unknown error occurred, inspect error.serverResponse
//                     break;
//             }
//         },
//         () => {
//             // Upload completed successfully, now we can get the download URL
//             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//                 console.log('File available at', downloadURL);
//                 try {
//                     const response = await addDoc(collection(db, "posts"), {
//                         postContent: postInput.value,
//                         authorId: currentLoggedInUser,
//                         postImageUrl: downloadURL

//                     });
//                     getPosts()

//                     let modal = document.getElementById('exampleModal');
//                     let modalInstance = bootstrap.Modal.getInstance(modal);
//                     modalInstance.hide();
//                     // console.log(response.id)
//                 } catch (e) {
//                     console.error("Error adding document: ", e);
//                 }


//                 // await setDoc(doc(db, "users", currentLoggedInUser), {
//                 //     firstName: firstName.value,
//                 //     surName: surName.value,
//                 //     mobileNumber: mobileNumber.value,
//                 //     profilePicture: downloadURL
//                 // });
//             });
//         }
//     );
// }















































// }

async function postHandler() {
    confirm("Data Post");

    const file = uploadImage.files[0];

    // Check if an image file is selected
    if (file) {
        // If an image is selected, proceed with the image upload
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',

            console.log(error),
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    savePostData(downloadURL);
                });
            }
        );
    } else {
        // If no image is selected
        savePostData(null);
    }
}

async function savePostData(downloadURL) {
    try {
        const response = await addDoc(collection(db, "posts"), {
            postContent: postInput.value,
            authorId: currentLoggedInUser,
            postImageUrl: downloadURL
        });
        getPosts();

        postInput.value = "";
        uploadImage.value = "";

        let modal = document.getElementById('exampleModal');
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}




























































// Update  Function
















































async function updatePostHandler() {
    let shouldUpload = confirm("Data Post");
    const file = shouldUpload ? uploadImage.files[0] : null;

    // Create the file metadata
    if (shouldUpload && file) {
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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

                    try {
                        const washingtonRef = doc(db, "posts", globalId);
                        const response = await updateDoc(washingtonRef, {
                            postContent: postInput.value,
                            authorId: currentLoggedInUser,
                            postImageUrl: downloadURL
                        });
                        let modal = document.getElementById('exampleModal');
                        let modalInstance = bootstrap.Modal.getInstance(modal);
                        modalInstance.hide();
                        getPosts();
                        // edithoja()

                        // console.log(response.id)
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }

                    // await setDoc(doc(db, "users", currentLoggedInUser), {
                    //     firstName: firstName.value,
                    //     surName: surName.value,
                    //     mobileNumber: mobileNumber.value,
                    //     profilePicture: downloadURL
                    // });
                });
            }
        );
    } else {
        // If the user does not upload a picture, 
        try {
            const washingtonRef = doc(db, "posts", globalId);
            const response = await updateDoc(washingtonRef, {
                postContent: postInput.value,
                authorId: currentLoggedInUser,
                postImageUrl: null // Set to null when no image is uploaded
            });
            let modal = document.getElementById('exampleModal');
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            getPosts();
            // edithoja()
            // console.log(response.id)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}




// EDIT FUNCTION

function editPostHandler(postId) {

    editLogic = true
    postBtn.innerText = "Update"
    postBtn.removeEventListener('click', postHandler)
    postBtn.addEventListener('click', updatePostHandler)
    globalId = postId
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();


}

// Delete Post 

async function deletePostHandler(postId) {
    let confirmBox = confirm("Are you Sure Delete Your Post ?")

    if (confirmBox === true) {

        await deleteDoc(doc(db, "posts", postId));
        alert("Your Post Successfully Deleted")
        getPosts()
    }
}




window.deletePostHandler = deletePostHandler
window.editPostHandler = editPostHandler

// Get Post

async function getPosts() {
    postContainer.innerHTML = ''

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let postId = doc.id
        const { authorId, postContent, postImageUrl } = doc.data()


        const authorDetails = await getAuthorData(authorId)
        const postElement = document.createElement('div')
        postElement.setAttribute('class', 'box')
        const content = ` <div class="post-row">
        <div class="user-profile">
            <img src=${authorDetails.profilePicture || '/assets/pp.jpg'} alt="">
            <div>
                <p>${authorDetails?.firstName}</p>
                <span>June 5 2023,9:40Pm</span>
            </div>
        </div>

        ${authorId === currentLoggedInUser ? `

     <div class="dropdown">
     <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
     </button>
     <ul class="dropdown-menu">
       <li><a class="dropdown-item" href="#"    onclick="editPostHandler('${postId}')"       >Edit</a></li>
       <li><a class="dropdown-item" href="#"              onclick="deletePostHandler('${postId}')"         >Delete</a></li>
     </ul>
   </div>

  ` : ''
            }


    </div >
    
    <p class="post-text">
       ${postContent}
    </p>
    <img src=${postImageUrl} alt="" class="post-img img-fluid">

    <div class="post-row">
        <div class="activity-icons">
            <div><img src="/assets/like-blue.png" alt="">100</div>
            <div><img src="/assets/comments.png" alt="">90</div>
            <div><img src="/assets/share.png" alt="">15</div>
        </div>
        <div class="post-profile-icon">
            <img src=${ppLogInProfile || '/assets/pp.jpg'} alt="">
            <i class="fas fa-caret-down"></i>
        </div>
    </div> `




        postElement.innerHTML = content

        postContainer.appendChild(postElement)



    });

}








async function getAuthorData(authorUid) {
    try {

        const docRef = doc(db, "users", authorUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            return docSnap.data()
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error)
    }
}



