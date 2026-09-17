// NESTORA WEBSITE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector(".contact-form");
    const popup = document.querySelector(".success-popup");

    if (contactForm && popup) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.querySelector("#name");

            if (name && name.value.trim() === "") {
                alert("Please enter your name.");
                return;
            }

            popup.classList.add("show");

            contactForm.reset();
        });
    }

});

function closePopup() {
    const popup = document.querySelector(".success-popup");

    if (popup) {
        popup.classList.remove("show");
    }
}
