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
