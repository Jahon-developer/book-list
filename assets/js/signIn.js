document.querySelector(".SignIn_form").addEventListener("submit", (e) => {
    e.preventDefault();
    let username = e.target.username;
    let password = e.target.pass;
    let LocalUserName = JSON.parse(window.localStorage.getItem("Userdata")).userName;
    let LocalPassword = JSON.parse(window.localStorage.getItem("Userdata")).password;

    if (username.value === LocalUserName && password.value === LocalPassword) {
        document.querySelector(".message").textContent = ""
        username.style.borderColor = "#EBEBEB";
        password.style.borderColor = "#EBEBEB";
        document.querySelector("label[for='username']").style.color = "#151515";
        document.querySelector("label[for='pass']").style.color = "#151515";
        window.location.href = "http://127.0.0.1:5500/Pages/Main.html";
    } else {
        document.querySelector(".message").textContent = "Parol mos emas!"
        username.style.borderColor = "#FF4D4F";
        password.style.borderColor = "#FF4D4F";
        document.querySelector("label[for='username']").style.color = "#FF4D4F";
        document.querySelector("label[for='pass']").style.color = "#FF4D4F";
    }
})