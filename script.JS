// NESTORA WEBSITE JAVASCRIPT

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();

        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        const popup = document.querySelector(".success-popup");
        const popupName = document.querySelector(".popup-name");

        popupName.textContent = name;
        popup.classList.add("show");

        contactForm.reset();

    });

}

function closePopup() {
    document.querySelector(".success-popup").classList.remove("show");
}
