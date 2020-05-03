console.log("test")

   // ############################################################ \\ 
  // 🔥🔥🔥🔥🔥See Link Below for features here + extra🔥🔥🔥🔥🔥 \\
 // https://github.com/firebase/firebaseui-web/blob/master/README.md \\
// ################################################################## \\ 


// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());



let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectURL) {
            // let redirectURL = '</sign-in.html>'
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        },
        autoUpgradeAnonymousUsers : true
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // NOTE: Succesfully logged in, if you're not redirected in 5s...
    signInSuccessUrl: '</index_1588363206.html>', // placeholder 
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
// The start method will wait until the DOM is loaded.

  // ################################################################# \\ 
 // 🔥🔥🔥🔥🔥🔥🔥🔥🔥Beginning Firebase UI Logic🔥🔥🔥🔥🔥🔥🔥🔥🔥 \\
// ##################################################################### \\ 

// start method will wait until the DOM is loaded
// NOTE: Isn't that already done in the index.hmtl file with defer? What's the difference?
ui.start('#firebaseui-auth-container', uiConfig);

// Need this to check status when the user is authenticating through third party methods
if (ui.isPendingRedirect()){ // if pending redirect is true... else... pass
    ui.start('#firebaseui-auth-container', uiConfig)
}

firebase.auth().useDeviceLanguage()

      // ########################################################### \\ 
     // 🔥🔥🔥🔥🔥🔥🔥🔥🔥Phone reCAPTcha Logic🔥🔥🔥🔥🔥🔥🔥🔥🔥 \\
    // ############################################################### \\ 

// invisible recaptcha
    // error - reCAPTcha container not yet created
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in button', {
    'size': 'invisisble',
    'callback': function(response){
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit()
    }
})
// reCAPTCHA widget - can specify parameters - see https://firebase.google.com/docs/auth/web/phone-auth#use-the-recaptcha-widget
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

let phoneNumber = getPhoneNumberFromUserInput();
let appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function(confirmationResult){
        // SMS sent. Prompt user to type the code from the message,
        // then sign the user in with confirmationResult.confirm(code)
        window.confirmationResult = confirmationresult
    }).catch(function(error){
        // Error; SMS not sent
        // ...

        // resets captcha
        grecaptcha.reset(window.recaptchaWidgetId);
    })


// sign in the user with the verification code 
    // NOTE: Chain to successful captcha confirmation?
let code = getCodeFromUserInput()
confirmationResult.confirm(code).then(function(result){
    // User signed in successfully
    var user = result.user;
    // ...
}).catch(function(error){
    // User couldn't sign in (bad verification code?)
    // ...
})

// look into testing - https://firebase.google.com/docs/auth/web/phone-auth#integration-testing

        // ################################################################## \\ 
       // 🔥🔥🔥🔥🔥🔥🔥🔥🔥Handling Anonymous user data🔥🔥🔥🔥🔥🔥🔥🔥🔥 \\
      // ###################################################################### \\ 

// temp variable to hold the anonymous user data if needed.
// let data = null
// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;
ui.start('#firebaseui-auth-container', {

})


console.log('test')

