// NESTORA WEBSITE JAVASCRIPT

function showPopup(event) {

    event.preventDefault();

    const popup = document.querySelector(".success-popup");

    if (popup) {
        popup.classList.add("show");
    }

    const form = document.querySelector(".contact-form");

    if (form) {
        form.reset();
    }
}

function closePopup() {

    const popup = document.querySelector(".success-popup");

    if (popup) {
        popup.classList.remove("show");
    }
}

