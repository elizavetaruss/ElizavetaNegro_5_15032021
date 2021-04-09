let firstName = document.getElementById('firstname');

let sessionFirstName = sessionStorage.getItem("postData");
firstName.innerHTML = sessionFirstName;


let commande = document.getElementById('commande');

let sessionCommande = sessionStorage.getItem("orderId");
commande.innerHTML = sessionCommande;


let prix = document.getElementById('prix');

let sessionPrix = sessionStorage.getItem("prix");
prix.innerHTML = sessionPrix;

sessionStorage.clear();