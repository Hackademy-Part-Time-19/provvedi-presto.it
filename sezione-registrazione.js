function lightmoderegistrazione() {
  document.getElementById("nav").style.backgroundColor = "white";
  document.getElementById("titolo").style.color = "black";
  document.getElementById("ordini").style.color = "black";
  document.getElementById("carrello").style.display = "none";
  document.getElementById("carrello2").style.display = "block";
  document.getElementById("foot").style.backgroundColor = "white";
  document.getElementById("footinfo").style.backgroundColor = "white";
  document.getElementById("tutto").style.backgroundColor = "white";
  document.getElementById("black").style.color = "black";
  document.getElementById("black2").style.color = "black";
  document.getElementById("black3").style.color = "black";
  document.getElementById("black4").style.color = "black";
  document.getElementById("figlio-navbar").style.backgroundColor = "white";
  document.getElementById("black5").style.color = "black";
  document.getElementById("luce").style.display = "none";
  document.getElementById("ombra").style.display = "block";
  document.getElementById("contenitore-titolo").style.color = "black";
}

function darkmoderegistrazione() {
  document.getElementById("nav").style.backgroundColor = "black";
  document.getElementById("titolo").style.color = "white";
  document.getElementById("ordini").style.color = "white";
  document.getElementById("carrello").style.display = "block";
  document.getElementById("carrello2").style.display = "none";
  document.getElementById("foot").style.backgroundColor = "black";
  document.getElementById("footinfo").style.backgroundColor = "black";
  document.getElementById("tutto").style.backgroundColor = "black";
  document.getElementById("black").style.color = "white";
  document.getElementById("black2").style.color = "white";
  document.getElementById("black3").style.color = "white";
  document.getElementById("black4").style.color = "white";
  document.getElementById("figlio-navbar").style.backgroundColor = "black";
  document.getElementById("black5").style.color = "white";
  document.getElementById("luce").style.display = "block";
  document.getElementById("ombra").style.display = "none";
  document.getElementById("contenitore-titolo").style.color = "white";
}

function vaiAregistrazione() {
  window.location.href = "sezione-registrazione.html";
}

function registrati() {
  let nome = document.getElementById("nome-input").value;
  let cognome = document.getElementById("cognome-input").value;
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;

  console.log("sono nella funzione di registrazione");
  console.log(nome);
  console.log(cognome);
  console.log(email);
  console.log(password);
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      // expiresInMins: 60, // optional
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("questo è il messaggio del server" + data?.message);
      if (data?.message != null) {
        console.log("autenticazione fallita");
        document.getElementById("errore-dati").style.display = "block";
      } else {
        localStorage.setItem("tokenUser", data.token);
        console.log("token settato");
        window.location.href = "post-registrazione.html";
      }
    });
}

if (window.location.href.includes("sezione-registrazione.html")) {
  let token = localStorage.getItem("tokenUser");
  if (token != null) {
    window.location.href = "post-registrazione.html";
  }
}
