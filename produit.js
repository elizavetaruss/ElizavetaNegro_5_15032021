


if (sessionStorage.getItem("monPanier")){
    console.log("panier existe");
}else {
    console.log("création du panier");
    let init = [];
    sessionStorage.setItem('monPanier', (JSON.stringify(init)));
 };

let parametres = new URLSearchParams(document.location.search);
let id = parametres.get("id");
console.log(id);

fetch('http://localhost:3000/api/teddies/'+ id)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let teddy = data;
    const divId = document.getElementById('product');
    let div = document.createElement("div");
    div.innerHTML = `<article id='ourson_produit'>
    <h4>${teddy.name}</h4>
    <img class="teddies_size" src="${teddy.imageUrl}" alt="${teddy.name}">
    <p> ${teddy.description}</p>
    <p> Prix: ${teddy.price/100}€</p>
    </article>`;
   
    divId.appendChild(div);

    teddy.colors.forEach(function (element, key) {
        document.getElementById('color')[key] = new Option(element, key);
    });

    document.getElementById('btnCart');
    let button = btnCart;

    let panier = JSON.parse(sessionStorage.getItem("monPanier"));

    button.addEventListener('click', function () {
        panier.push(teddy);
        sessionStorage.setItem("monPanier", JSON.stringify(panier));
        location.reload();
    });



});












