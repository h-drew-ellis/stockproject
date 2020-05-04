
console.log('test1');
// get elements
let txtEmail = document.getElementById("txtEmail")
let txtPassword = document.getElementById("txtPassword")
let btnLogin = document.getElementById("btnLogin")
let btnSignUp = document.getElementById("btnSignUp")
let btnLogout = document.getElementById("btnLogout")
let googleSignInButton = document.getElementById("google-sign-in-button")
let object = document.getElementById("object")
let errorPre = document.getElementById("errorPre")
let phoneSignInButton = document.getElementById("phone-sign-in-button")
let phone = document.getElementById("phone")

// create references
const database = firebase.database()
let rootRef = database.ref()

let auth = firebase.auth()

rootRef.on('value', (snapshot)=>{
    snapshotValue = snapshot.val()
    console.log(snapshotValue)
})

// firebase.database().ref('users/' + 'user1').set({
//     username: 'jogn'
// })

// error popup 
//  dbRefObject.on('value', snap =>  {
// preObject.innerText = JSON.stringify(snap.val(), null, 3)
    // })


btnLogin.addEventListener('click', e => {
    const email = txtEmail.value
    const pass = txtPassword.value
    logIn(email, pass)
})

btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value
    const pass = txtPassword.value
    signUp(email, pass)
})

googleSignInButton.addEventListener('click', e=>{
    signInGoogle()
    console.log('google clicked')
})

phoneSignInButton.addEventListener('click', e => {
    numberLogin(phone.value)
    console.log('phone clicked')
})

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut()
})

function logIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            let emailKey = email.substr(0, email.indexOf("@"))
            firebase.database().ref("users/" + emailKey).set({
                email: email,
                password: password,
                name: 'anon'
            })
            alert("User succesfully logged in")
        })
        .catch(function(error) {
            alert("User cannot login")
            console.log(error)
        })
}
function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            let emailKey = email.substr(0, email.indexOf("@"))
            firebase.database().ref("users/" + emailKey).set({
                email: email,
                password: password,
                name: 'anon'
            })
            alert("User Account Created")
        })
        .catch(function (error) {
            alert("User cannot be created")
            errorPre.innerHTML = (error.message)
            console.log(error.message)
        })
}
function getProfileData() {
    let user = firebase.auth().currentUser
    if (user != null) {
        console.log("User = ", user)
    } else {
        alert("There is not authenticated user!")
    }
}

function logout() {
    firebase.auth().signOut()
        .then(function () {
            alert("user signed out")
        })
        .catch(function (error) {
            alert("Something went wrong")
        })
}

function updateProfile() {
    let user = firebase.auth().currentUser
    if (user != null) {
        user.updateProfile({
            displayName: "Updated Name"
        })
        user.updateEmail("test@update.com").then(function () {
            alert("Email Updated")
        }).catch(function (error) {
            alert("email not updated")
        })
    } else {
        alert("There is no user!")
    }
}

function verifyUser() {
    let user = firebase.auth().currentUser
    user.sendEmailVerification().then(function () {
        alert("Email sent!")
    }).catch("Email not sent!")
}

function deleteUser() {
    let user = firebase.auth().currentUser
    user.delete().then(function () {
        alert("user deleted!")
    }).catch(function (error) {
        alert("User not deleted!")
    })
}

function resetPassword() {
    let user = firebase.auth().currentUser
    firebase.auth().sendPasswordResetEmail(user.email).then(function () {
        alert("Email sent!")
    }).catch("Email not sent!")
}

function signInGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            alert("User authenticated")
            let user = result.user
            console.log("User ====== ", user)
        })
        .catch(function (error) {
            alert("Authentication failed!")
        })
}

// anonymous authentication - anon users can access data not allowed for nonregistered users
function anonymousLogin() {
    firebase.auth().signInAnonymously().then(function () {
        alert("OK")
    }).catch(function (error) {
        alert("something is wrong!")
    })
}

function numberLogin(phoneNumber) {
    console.log("numberLogin called!")
    let appVerifier = new firebase.auth.RecaptchaVerifier('todo: add recaptcha div')

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            let code = window.prompt("please, enter the 6 digit code!")
            return confirmationResult.confirm(code)
        }).then((result) => {
            document.getElementById('todo: recaptcha div').innerHTML = "Authenticated"
        }).catch((error) => {
            console.log("Error ======= ", error)
            document.getElementById('todo: recaptcha div').innerHTML = "Not Authenticated"
        })
}