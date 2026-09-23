// =========================================================
// NESTORA WEBSITE JAVASCRIPT
// =========================================================


// ================================
// CONTACT POPUP
// ================================

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


// ================================
// CREATE ACCOUNT
// ================================

const createAccountForm = document.querySelector("#createAccountForm");

if (createAccountForm) {

    createAccountForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#fullName").value.trim();
        const email = document.querySelector("#createEmail").value.trim();
        const password = document.querySelector("#createPassword").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        const message = document.querySelector("#createMessage");

        if (password !== confirmPassword) {

            if (message) {
                message.textContent = "Passwords do not match.";
                message.style.color = "#9a5f5f";
            }

            return;
        }

        const account = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("nestoraAccount", JSON.stringify(account));

        if (message) {
            message.textContent = "Account created successfully. Welcome to Nestora!";
            message.style.color = "#7e6b58";
        }

        createAccountForm.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1200);

    });
}


// ================================
// LOGIN
// ================================

const loginForm = document.querySelector("#loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.querySelector("#loginEmail").value.trim();
        const password = document.querySelector("#loginPassword").value;

        const message = document.querySelector("#loginMessage");

        const savedAccount =
            JSON.parse(localStorage.getItem("nestoraAccount"));

        if (!savedAccount) {

            if (message) {
                message.textContent = "No account found. Please create an account first.";
                message.style.color = "#9a5f5f";
            }

            return;
        }

        if (
            email === savedAccount.email &&
            password === savedAccount.password
        ) {

            localStorage.setItem("nestoraLoggedIn", "true");

            if (message) {
                message.textContent = "Login successful. Welcome to Nestora!";
                message.style.color = "#7e6b58";
            }

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 800);

        } else {

            if (message) {
                message.textContent = "Incorrect email or password.";
                message.style.color = "#9a5f5f";
            }

        }

    });
}


// ================================
// PROFILE PAGE
// ================================

function loadProfile() {

    const account =
        JSON.parse(localStorage.getItem("nestoraAccount"));

    const loggedIn =
        localStorage.getItem("nestoraLoggedIn");

    if (!account || loggedIn !== "true") {
        return;
    }

    const profileName =
        document.querySelector("#profileName");

    const profileFullName =
        document.querySelector("#profileFullName");

    const profileEmail =
        document.querySelector("#profileEmail");

    if (profileName) {
        profileName.textContent = account.name;
    }

    if (profileFullName) {
        profileFullName.textContent = account.name;
    }

    if (profileEmail) {
        profileEmail.textContent = account.email;
    }

    loadInquiryHistory();
}


// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("nestoraLoggedIn");

    window.location.href = "login.html";
}


// ================================
// INQUIRY FORM
// ================================

const inquiryForm = document.querySelector("#inquiryForm");

if (inquiryForm) {

    const account =
        JSON.parse(localStorage.getItem("nestoraAccount"));

    if (account) {

        const nameField =
            document.querySelector("#inquiryName");

        const emailField =
            document.querySelector("#inquiryEmail");

        if (nameField) {
            nameField.value = account.name;
        }

        if (emailField) {
            emailField.value = account.email;
        }
    }


    inquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inquiry = {

            name: document.querySelector("#inquiryName").value,

            email: document.querySelector("#inquiryEmail").value,

            phone: document.querySelector("#inquiryPhone").value,

            service: document.querySelector("#inquiryService").value,

            projectType:
                document.querySelector("#inquiryProjectType").value,

            budget:
                document.querySelector("#inquiryBudget").value,

            location:
                document.querySelector("#inquiryLocation").value,

            message:
                document.querySelector("#inquiryMessage").value,

            date: new Date().toLocaleString(),

            status: "Received"
        };


        let inquiries =
            JSON.parse(localStorage.getItem("nestoraInquiries")) || [];

        inquiries.push(inquiry);

        localStorage.setItem(
            "nestoraInquiries",
            JSON.stringify(inquiries)
        );


        const popup =
            document.querySelector(".success-popup");

        if (popup) {
            popup.classList.add("show");
        }

        inquiryForm.reset();


        if (account) {

            const nameField =
                document.querySelector("#inquiryName");

            const emailField =
                document.querySelector("#inquiryEmail");

            if (nameField) {
                nameField.value = account.name;
            }

            if (emailField) {
                emailField.value = account.email;
            }
        }

    });
}


// ================================
// INQUIRY HISTORY
// ================================

function loadInquiryHistory() {

    const historyContainer =
        document.querySelector("#inquiryHistory");

    if (!historyContainer) {
        return;
    }

    const inquiries =
        JSON.parse(localStorage.getItem("nestoraInquiries")) || [];

    const account =
        JSON.parse(localStorage.getItem("nestoraAccount"));

    if (!account) {
        return;
    }

    const userInquiries =
        inquiries.filter(function (inquiry) {

            return inquiry.email === account.email;

        });


    if (userInquiries.length === 0) {

        historyContainer.innerHTML = `
            <div class="empty-inquiry">
                <h3>No inquiries yet</h3>
                <p>Your project inquiries will appear here.</p>
                <a href="inquiry.html" class="btn">
                    Make an Inquiry
                </a>
            </div>
        `;

        return;
    }


    historyContainer.innerHTML = userInquiries.map(function (inquiry) {

        return `
            <div class="inquiry-record">

                <h3>${inquiry.service || "Design Inquiry"}</h3>

                <p>
                    <strong>Project:</strong>
                    ${inquiry.projectType || "Not specified"}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${inquiry.location || "Not specified"}
                </p>

                <p>
                    <strong>Submitted:</strong>
                    ${inquiry.date}
                </p>

                <span class="inquiry-status">
                    ${inquiry.status}
                </span>

            </div>
        `;

    }).join("");
}


// ================================
// FAQ ACCORDION
// ================================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem =
            question.closest(".faq-item");

        document.querySelectorAll(".faq-item").forEach(function (item) {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });

        currentItem.classList.toggle("active");

    });

});


// ================================
// LOAD PROFILE
// ================================

document.addEventListener("DOMContentLoaded", function () {

    loadProfile();

});
