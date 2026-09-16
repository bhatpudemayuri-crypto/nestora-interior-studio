// ================================
// NESTORA WEBSITE JAVASCRIPT
// ================================

// Consultation form interaction

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();

        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        alert(
            "Thank you, " + name +
            "! Your consultation request has been received."
        );

        contactForm.reset();

    });

}
