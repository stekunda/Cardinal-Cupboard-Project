async function timeout(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove(
        "form__message--success",
        "form__message--error"
    );
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(
        ".form__input-error-message"
    ).textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__i nput--error");
    inputElement.parentElement.querySelector(
        ".form__input-error-message"
    ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const calendar = document.querySelector("#calendar");

    // When "Don't have an account? Create Account" is clicked, show Create Account form
    document
        .querySelector("#linkCreateAccount")
        .addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.classList.add("form--hidden");
            createAccountForm.classList.remove("form--hidden");
        });

    // When "Already have an acoount? Sign in" is clicked, show Login form
    document.querySelector("#linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    //
    //
    //
    //
    //

    const loginUser = document.getElementById("loginUser");
    const password = document.getElementById("loginPassword");
    const username = document.getElementById("loginUsername");
    const addUser = document.getElementById("addUser");

    const baseUrl = "http://localhost:8000/holler";

    loginUser.addEventListener("click", postInfo);
    addUser.addEventListener("click", registerUser);

    async function registerUser(e) {
        e.preventDefault();
        await timeout(1000);
        window.location = "../calendarTools/calendar.html";
    }

    async function postInfo(e) {
        e.preventDefault();
        console.log(password);
        if (password.value == "" && username.value == "") {
            return;
        }
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parcel: username.value + "\n" + password.value,
            }),
        });
        if (res.status == 200) {
            await timeout(1000);
            window.location = "../calendarTools/calendar.html";
        } else {
            await timeout(1000);
            setFormMessage(
                loginForm,
                "error",
                "Invalid username/password combination"
            );
        }
    }

    //
    //
    //
    //
    //
    document.querySelectorAll(".form__input").forEach((inputElement) => {
        inputElement.addEventListener("blur", (e) => {
            if (
                e.target.id === "signupUsername" &&
                e.target.value.length > 0 &&
                e.target.value.length < 10
            ) {
                setInputError(
                    inputElement,
                    "Username must be at least 10 characters in length"
                );
            }
        });

        inputElement.addEventListener("input", (e) => {
            clearInputError(inputElement);
        });
    });
});
