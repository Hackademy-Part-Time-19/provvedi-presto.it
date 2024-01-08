function vaiAcatalogo() {
  let categoria = document.getElementById("inputCategoria").value;
  let prezzo = document.getElementById("inputPrezzo").value;
  let nome = document.getElementById("inputNome").value;

  window.location.href = `catalogo.html?prezzo=${prezzo}&nome=${nome}&categoria=${categoria}`;
}

window.addEventListener("load", function () {
  console.log("nuova pagina");

  if (window.location.href.includes("catalogo.html")) {
    console.log("pagina catalogo");

    let url = new URL(window.location.href);

    let prezzo = url.searchParams.get("prezzo");

    let nome = url.searchParams.get("nome");

    let categoria = url.searchParams.get("categoria");

    let limiteinferiorePrezzo;
    let limitesuperiorePrezzo;
    if (prezzo == "20-50") {
      limiteinferiorePrezzo = 20;
      limitesuperiorePrezzo = 50;
    } else if (prezzo == "50-100") {
      limiteinferiorePrezzo = 50;
      limitesuperiorePrezzo = 100;
    } else if (prezzo == "100-200") {
      limiteinferiorePrezzo = 100;
      limitesuperiorePrezzo = 200;
    } else if (prezzo == "200-300") {
      limiteinferiorePrezzo = 200;
      limitesuperiorePrezzo = 300;
    } else if (prezzo == "300-500") {
      limiteinferiorePrezzo = 300;
      limitesuperiorePrezzo = 500;
    } else if (prezzo == "500") {
      limiteinferiorePrezzo = 500;
    }

    filtraprodottiCatalogo(
      nome,
      limiteinferiorePrezzo,
      limitesuperiorePrezzo,
      categoria
    );
  }
  if (window.location.href.includes("sezione-registrazione.html")) {
    let token = localStorage.getItem("tokenUser");
    console.log("sono il token" + token);
  } else if (window.location.href.includes("prodotto.html")) {
    let url = new URL(window.location.href);
    let idprodotto = url.searchParams.get("idprodotto");
    ottieniprodottoid(idprodotto);
  } else {
    console.log("no catalogo");
  }
});

function vaiallapaginaprodotto(id) {
  window.location.href = `pagina-prodotto.html?idprodotto=${id}`;
}

function ottieniprodottoid(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      let prodotto = data;
      console.log(prodotto);

      document.getElementById("imgprodotto").src = prodotto.image;
      document.getElementById("titoloprodotto").innerText = prodotto.title;
      document.getElementById("descrizioneprodotto").innerText =
        prodotto.description;
      document.getElementById(
        "prezzoprodotto"
      ).innerHTML = `EUR ${prodotto.price}`;
    })
    .catch((error) => console.log(error));
}

function filtraprodottiCatalogo(
  nome,
  limiteinferiore,
  limiteSuperiore,
  categoria
) {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loadingprodotti").style.opacity = "0";
      setTimeout(function () {
        document.getElementById("loadingprodotti").style.display = "none";
      }, 200);
      let prodotti = data;

      prodotti = data.filter((prodotto) => {
        if (limiteSuperiore != undefined && nome != "" && categoria != "") {
          return (
            prodotto.price >= limiteinferiore &&
            prodotto.price <= limiteSuperiore &&
            prodotto.title.startsWith(nome) &&
            prodotto.category == categoria
          );
        } else if (
          limiteSuperiore == undefined &&
          nome != "" &&
          nome != undefined &&
          categoria != ""
        ) {
          return (
            prodotto.price >= limiteinferiore &&
            prodotto.title.startsWith(nome) &&
            prodotto.category == categoria
          );
        } else if (
          limiteSuperiore == undefined &&
          nome == "" &&
          categoria != ""
        ) {
          return (
            prodotto.price >= limiteinferiore && prodotto.category == categoria
          );
        } else if (
          limiteSuperiore == undefined &&
          nome != "" &&
          categoria == ""
        ) {
          return (
            prodotto.price >= limiteinferiore && prodotto.title.startsWith(nome)
          );
        } else if (
          limiteSuperiore != undefined &&
          nome == "" &&
          categoria != ""
        ) {
          return (
            prodotto.price >= limiteinferiore &&
            prodotto.price < limiteSuperiore &&
            prodotto.category == categoria
          );
        } else if (categoria != "" && categoria != undefined) {
          return prodotto.category == categoria;
        }
      });
      for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];
        document.getElementById("contenitore-prodotti").innerHTML += `
        <div onclick="vaiallapaginaprodotto(${prodotti[i].id})" style = "width: 400px; height:560px; background-color: rgb(50,50,50);margin-top:20px;">
          
            <img src = "${prodotti[i].image}" style = "width: 100%; height: 350px; object-fit: contain;">
            <div style = "margin-left: 5%; margin-right: 5%;">
              <h5 style = "color: white; position: relative; left: 10px; font-size: 16px;">${prodotti[i].title}</h5>
              <div style = "overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* number of lines to show */
                      line-clamp: 2; 
              -webkit-box-orient: vertical;">
              <p style = " color: white; opacity: 0.8; position: relative; left: 10px; font-size: 14px;">${prodotti[i].description}</p>
              </div>
              <h5 style = "color: white;">${prodotti[i].price}</h5>
            </div>
          
        </div>`;
      }
    })

    .catch((error) => console.log(error));
}
