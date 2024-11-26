document.querySelector(".formSignUp").addEventListener("submit", (e) => {
    e.preventDefault();
    let userName = e.target.username;
    let pass = e.target.pass;
    let confirmPass = e.target.confirmPass;

    if (pass.value === confirmPass.value) {
        console.log("Bir xil");
        document.querySelector(".message").textContent = ""
        confirmPass.style.borderColor = "#EBEBEB";
        document.querySelector("label[for='confirmPass']").style.color = "#151515";
        window.localStorage.setItem("Userdata", JSON.stringify({
            userName: userName.value,
            password: pass.value
        }))

        window.location.href = "http://127.0.0.1:5500/signIn.html";

    } else if (pass.value !== confirmPass.value) {
        console.log("Bir xil emas");
        document.querySelector(".message").textContent = "Parol mos emas!"
        confirmPass.style.borderColor = "#FF4D4F";
        document.querySelector("label[for='confirmPass']").style.color = "#FF4D4F";
    }
})