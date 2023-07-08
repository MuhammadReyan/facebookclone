const isLoggedInUser = JSON.parse(localStorage.getItem('isLoggedInUser'))

// console.log(isLoggedInUser, "==>>isLoggedInUser")






const emailAddress = document.getElementById("emailAddress")
const name = document.getElementById("name")
const mobNum = document.getElementById("mobNum")
const gender = document.getElementById("gender")
const recipientName = document.getElementById('recipient-name')
const messageText = document.getElementById('message-text')
let postContainer = document.querySelector(".post-container")
const ajaBeta = document.querySelector('.ajabeta')

if (!isLoggedInUser) {
    window.location.href = "../index.html";
}
const posts = JSON.parse(localStorage.getItem('posts')) || []


posts.filter((post) => post.uerEmail === isLoggedInUser.email).forEach((post) => {

    let div = document.createElement('div')
    div.setAttribute('class', 'box')
    div.innerHTML = `<div class="post-row">
    <div class="user-profile">
        <img src="/assets/profile-pic.png" alt="">
        <div>
            <p>${post.userName}</p>
            <span>${post.date.split('T')[0]}<br> ${post.time}</span>
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
    </div>`


    postContainer.prepend(div)

})


























// emailAddress.innerText = isLoggedInUser.email
// name.innerText = isLoggedInUser.firstName + " " + isLoggedInUser.surName
// mobNum.innerText = isLoggedInUser.mobileNum
// gender.innerText = isLoggedInUser.gender

function logoutHandler() {
    localStorage.removeItem('isLoggedInUser')
    window.location.href = "../index.html";
}



ajaBeta.innerHTML = isLoggedInUser.firstName + " " + isLoggedInUser.surName
let idr = document.querySelector('.idrbhshow')
idr.innerHTML = isLoggedInUser.firstName + " " + isLoggedInUser.surName
document.querySelector('.isside').innerHTML = `${isLoggedInUser.firstName} ${isLoggedInUser.surName}`
console.log(ajaBeta)


function postHandler() {

    let div = document.createElement('div')
    div.setAttribute('class', 'box')

    div.innerHTML = `<div class="post-row">
<div class="user-profile">
    <img src="/assets/profile-pic.png" alt="">
    <div>
        <p>${isLoggedInUser.firstName} ${isLoggedInUser.surName}</p>
        <span>${new Date()} <br> ${new Date().toLocaleTimeString()}</span>
    </div>
</div>
<a href="" style="text-decoration: none; color: #9a9a9a;"><i class="fas fa-ellipsis-v"></i></a>
</div>

<p class="post-text">
${messageText.value || "No Description"}
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
</div>`

    postContainer.prepend(div)

    let modal = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();




    let postObj = {
        userName: `${isLoggedInUser.firstName} ${isLoggedInUser.surName} `,
        uerEmail: isLoggedInUser.email,
        description: messageText.value,
        postContent: recipientName.value,
        date: new Date(),
        time: new Date().toLocaleTimeString()


    }
    // console.log(postObj)



    posts.push(postObj)



    localStorage.setItem('posts', JSON.stringify(posts))
}


// FOR OF METHOD

// for (let post of posts) {
//     let div = document.createElement('div')
//     div.setAttribute('class', 'box')





//     div.innerHTML = `<div class="post-row">
//     <div class="user-profile">
//         <img src="/assets/profile-pic.png" alt="">
//         <div>
//             <p>${post.userName}</p>
//             <span>${post.date.split('T')[0]}<br> ${post.time}</span>
//         </div>
//     </div>
//     <a href="" style="text-decoration: none; color: #9a9a9a;"><i class="fas fa-ellipsis-v"></i></a>
//     </div>

//     <p class="post-text">
//     ${post.description}
//     </p>
//     <img src="/assets/feed-image-1.png" alt="" class="post-img img-fluid">

//     <div class="post-row">
//     <div class="activity-icons">
//         <div><img src="/assets/like-blue.png" alt="">100</div>
//         <div><img src="/assets/comments.png" alt="">90</div>
//         <div><img src="/assets/share.png" alt="">15</div>
//     </div>
//     <div class="post-profile-icon">
//         <img src="/assets/profile-pic.png" alt="">
//         <i class="fa-solid fa-caret-down"></i>
//     </div>
//     </div>`


//     postContainer.prepend(div)
// }


// Display Show Logout

function displayShow() {
    let settingMenu = document.querySelector('.setting-menu')
    settingMenu.classList.toggle('setting-menu-height')
}