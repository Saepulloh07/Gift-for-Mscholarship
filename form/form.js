import { ref, set, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { database } from './firebase-config.js';

// Initialize EmailJS with your public key
emailjs.init('RYQklIJerf5C9XsLW');

// Get the form and button elements
const form = document.getElementById('form');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Get form values
    const name = document.getElementById('to_name').value;
    const email = document.getElementById('to_email').value;
    const phone = document.getElementById('phone').value;

    // Create a new reference with a unique key
    const registrationsRef = ref(database, 'registrations');
    const newRegistrationRef = push(registrationsRef);

    // Save data to Firebase Realtime Database
    set(newRegistrationRef, {
        name: name,
        email: email,
        phone: phone,
        decription: decription
    }).then(() => {
        console.log('Data saved to Firebase.');
        alert('Registration successful!');
        form.reset();

        // Send confirmation email
        sendConfirmationEmail(name, email);
    }).catch((error) => {
        console.error('Firebase save error:', error);
        alert('There was an error saving your data. Please try again.');
    });
});

function sendConfirmationEmail(name, email) {
    const serviceID = 'default_service';
    const templateID = 'template_9m64vuy';

    emailjs.send(serviceID, templateID, {
        to_name: name,
        to_email: email,
        message: `Hello ${name}, your registration is confirmed!`
    }).then(() => {
        console.log('Confirmation email sent.');
    }).catch((error) => {
        console.error('Error sending confirmation email:', error);
    });
}
