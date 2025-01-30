// script.js// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB05Iz2lt09Wi0ciuoP3tOlnA-3h-pnAyw",
  authDomain: "lawyerly-b366c.firebaseapp.com",
  projectId: "lawyerly-b366c",
  storageBucket: "lawyerly-b366c.firebasestorage.app",
  messagingSenderId: "81871011557",
  appId: "1:81871011557:web:07ee3c54e7830ee0501e0c",
  measurementId: "G-1B86ZZ7D21"
};
/** AUTHENTICATION SYSTEM **/
// Auth Elements
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const authToggle = document.getElementById('toggleAuth');
const authError = document.getElementById('authError');
let isSignUp = false;

// Event Listeners
document.getElementById('signInButton').addEventListener('click', () => {
  isSignUp = false;
  authTitle.textContent = 'Sign In';
  authModal.style.display = 'block';
});

document.getElementById('signUpButton').addEventListener('click', () => {
  isSignUp = true;
  authTitle.textContent = 'Sign Up';
  authModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
  authModal.style.display = 'none';
});

authToggle.addEventListener('click', (e) => {
  e.preventDefault();
  isSignUp = !isSignUp;
  authTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
  authSubmit.textContent = isSignUp ? 'Sign Up' : 'Sign In';
  document.getElementById('toggleAuth').textContent = isSignUp ? 'Sign In' : 'Sign Up';
});

// Email/Password Auth
authSubmit.addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;

  try {
    if (isSignUp) {
      await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(auth.currentUser.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
    authModal.style.display = 'none';
  } catch (error) {
    authError.textContent = error.message;
  }
});

// Google Sign-In
document.getElementById('googleSignIn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(async (result) => {
      await db.collection('users').doc(result.user.uid).set({
        email: result.user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    })
    .catch((error) => {
      authError.textContent = error.message;
    });
});

// Sign Out
document.getElementById('signOutButton').addEventListener('click', () => {
  auth.signOut();
});

// Auth State Listener
auth.onAuthStateChanged(user => {
  const signInBtn = document.getElementById('signInButton');
  const signUpBtn = document.getElementById('signUpButton');
  const signOutBtn = document.getElementById('signOutButton');

  if (user) {
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    signOutBtn.style.display = 'block';
    document.querySelector('nav h1').textContent = Lawyerly | ${user.email};
  } else {
    signInBtn.style.display = 'block';
    signUpBtn.style.display = 'block';
    signOutBtn.style.display = 'none';
    document.querySelector('nav h1').textContent = 'Lawyerly';
  }
})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your submission. We will contact you shortly.');
    this.reset();
});
