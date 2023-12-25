



// Get the snackbars div
const snack401 = document.getElementById("snackbar401");
const snack404 = document.getElementById("snackbar404");


// Function Snackbar////////////////////////////////////////////////////////////////////
function snackbar(x) {
 
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 
/////////////////////////////////////////////////////////////////////////////////////////




// Gestion du formulaire login///////////////////////////////////////////////////////////

const formLogin = document.querySelector(".form-login")
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  // récupération des valeurs saisies dans input du form
  const login = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
  };

  // création de la charge utile
  const payLoad = JSON.stringify(login);


  // envoi de la requête
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

      // Récupération des données
      const userId = data.userId;
      const token = data.token;

      // Sauvegarde dans le localStorage
      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("token", token);

      // Test de la sauvegarde
      const testUserId = window.localStorage.getItem("userId");
      console.log("Test UserId from localStorage:", testUserId);

      const testToken = window.localStorage.getItem("token");
      console.log("Test UserId from localStorage:", testToken);

      // Redirection vers la page d'accueil
      window.location.href='http://127.0.0.1:5500/FrontEnd/index.html'

      

    })

    // Affichage de l'erreur si promesse rejetée
    .catch((response) => {
      
      // Appel fonction snackbar 401
      if(response.status === 401)
      {snackbar(snack401)}

      // Appel fonction snackbar 404
      if(response.status = 404)
      {snackbar(snack404)};
      
    });









});//////////////////////////////////////////////////////////////////////////////////////////


