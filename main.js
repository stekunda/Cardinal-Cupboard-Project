/*const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("index.html", function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write("Error: File Not Found");
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function (error) {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Server is listening on port " + port);
    }
});
*/

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document
        .querySelector("#linkCreateAccount")
        .addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.classList.add("form--hidden");
            createAccountForm.classList.remove("form--hidden");
        });

    document.querySelector("#linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
});
