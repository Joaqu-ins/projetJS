const snack401 = document.getElementById("snack401");
const snack404 = document.getElementById("snack404");
const snackEmail = document.getElementById("snackEmail");
const snackPassW = document.getElementById("snackPassW")
const aLogout = document.getElementById("a-logout");
const navAlogin = document.getElementById("nav-a-login");
const formLogin = document.querySelector(".form-login");

// putting in bold the link "login"
navAlogin.style.fontWeight = "bold";

function snackbar(x) {
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// Managing login form
formLogin.addEventListener("submit", function (event) {///////////////////////////////////
  event.preventDefault();

  if (document.querySelector("[name=email]").value === "") { snackbar(snackEmail) };
  if (document.querySelector("[name=password]").value === "") { snackbar(snackPassW) };

  const login = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
  };

  // making payload
  const payLoad = JSON.stringify(login);


  // sending request
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payLoad
  })

    .then((response) => {
      // 1. check response.ok
      if (response.ok) {
        return response.json();
      }
      // 2. reject promise if response is not ok
      else {
        return Promise.reject(response);
      }
    })

    .then(data => {

      const userId = data.userId;
      const token = data.token;

      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("token", token);
      window.location.href = 'http://127.0.0.1:5500/index.html'

      const btnChangeWork = document.getElementById("btn-change-Work");
      btnChangeWork.style.display = "block";
    })

    // Display the error message
    .catch((response) => {

      // Appel fonction snackbar 401
      if (response.status === 401) { snackbar(snack401) };
      // Appel fonction snackbar 404
      if (response.status = 404) { snackbar(snack404) };
    });



});///////////////////////////////////////////////////////////////////////////////////


