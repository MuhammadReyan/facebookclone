



// Start Javascript


const email = document.querySelector('#email')
const loginPassword = document.querySelector('#password')
const firstName = document.querySelector('#recipient-name')
const surName = document.querySelector('#recipient-surname')
const mobNum = document.querySelector('#recipient-mobile')
const password = document.querySelector('#recipient-pass')
const signupEmail = document.querySelector('#recipient-email')


const loginBtn = document.querySelector('#login')

const signupBtn = document.querySelector('#signup')

let useer = JSON.parse(localStorage.getItem('useer')) || []



let date;
let month;
let year;
let gender;








loginBtn.addEventListener('click', loginHandler)
signupBtn.addEventListener('click', signHandler)


function loginHandler() {

    if (!email.value || !loginPassword.value) return alert("Please write email and password to continue process")


    const userFound = useer.filter((user) => {
        console.log("user email in userFound filter", user.email)
        return user.email === email.value
    })
    if (!userFound.length){

        // console.log(userFound.length)
        
        return alert("This user is not registered, kindly create an account first")
    } 
    
    if (userFound[0].password   ==  loginPassword.value) {
        alert("user is logging in")

        localStorage.setItem('isLoggedInUser', JSON.stringify(userFound[0]))


        window.location.href = "./dash/index.html";


    } else {
        alert("password is incorrect")
    }

}




function signHandler() {





    const userFound = useer.filter((user) => {
        console.log("user email in userFound filter", user.signupEmail)
        return user.signupEmail === signupEmail.value
    })

    if (userFound.length) return alert("Email address already in use, please use another email address")

    // mobile number validation


    console.log("user mil gaya ==>>>", userFound)

    const modal = document.getElementById('exampleModal')

    console.log(modal)

    modal.classList.toggle('show')




















    if (firstName.value !== "" && surName.value !== "" && mobNum.value !== "" && password.value !== "" && date !== undefined && month !== undefined && year !== undefined && gender !== undefined) {

        if (password.value.length < 8) return alert("Contain 8 Character")


        let userObject = {

            firstName: firstName.value,
            surName: surName.value,
            mobNum: mobNum.value,
            password: password.value,
            date: `${year} ${month} ${date}`,
            email: signupEmail.value,
            gender


        }


        useer.push(userObject)

        localStorage.setItem('useer', JSON.stringify(useer))



        alert("Done")


        firstName.value = ""
        surName.value = ""
        mobNum.value = ""
        password.value = ""
        gender = ""


    }
    else {
        alert("Fill Info Correctly")
    }




}

function getDateHandler(d) {
    // console.log(d, "dateHandler working")
    date = d
}
function getMonthHandler(m) {
    // console.log(m, "monthHandler working")
    month = m
}
function getYearHandler(y) {
    // console.log(y, "yearHandler working")
    year = y
}
function getGenderHandler(g) {
    // console.log(g, "genderHandler working")
    gender = g
}












