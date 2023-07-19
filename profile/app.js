let di = document.querySelector('.online')

function displayShow() {
    let settingMenu = document.querySelector('.setting-menu')
    settingMenu.classList.toggle('setting-menu-height')
}
di.addEventListener('click', displayShow)










// FireBase

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    query,
    where,
    getDocs,
    getDoc,
    getAuth,
    onAuthStateChanged,
    app,
    auth,
    db
} from '../firebaseConfig.js'








onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const userData = await getUserData(uid);
        updateProfile(userData.userData, userData.posts);
    } else {
        console.error("error")
    }
});



async function getUserData(uid) {
    try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // Fetch associated posts
            const postsQuerySnapshot = await getDocs(query(collection(db, "posts"), where("authorId", "==", uid)));
            const posts = [];
            postsQuerySnapshot.forEach((postDoc) => {
                const postData = postDoc.data();
                posts.push({
                    postId: postDoc.id,
                    postContent: postData.postContent
                });
            });

            return {
                userData: userData,
                posts: posts
            };
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
}
function updateProfile(userData, posts) {

    console.log(userData)
    console.log(posts)



    // Display posts
    const postContainer = document.querySelector('.post-container');
    postContainer.innerHTML = '';

    posts.forEach((post) => {
        const postElement = document.createElement('div')
        postElement.setAttribute('class', 'box')
        const content = ` <div class="post-row">
        <div class="user-profile">
            <img src="/assets/profile-pic.png" alt="">
            <div>
                <p>${userData?.firstName}</p>
                <span>June 5 2023,9:40Pm</span>
            </div>
        </div>
        <a href="" style="text-decoration: none; color: #9a9a9a;"><i class="fas fa-ellipsis-v"></i></a>
    </div>
    
    <p class="post-text">
       ${post.postContent}
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