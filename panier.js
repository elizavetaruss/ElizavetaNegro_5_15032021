

let panier = JSON.parse(sessionStorage.getItem("monPanier"));
console.log(panier);

var prixTotal = panier.reduce(function(prev, cur){
    return prev + cur.price;
}, 0);
console.log(prixTotal/100);



const html = panier.map(teddy => {
    return `<article id="panierTeddies">
    <h4>${teddy.name}</h4>
    <img class="img_panier_teddies" src="${teddy.imageUrl}" alt="${teddy.name}">
    <p> Prix: ${teddy.price/100}€</p>
    <p><a href="" class="btn btn-primary" role="button">Supprimer</a></p>
    </article>`
  })

  .join('');
    document.querySelector('#produit_panier').insertAdjacentHTML ("afterbegin", html);


const panierTotal = document.getElementById('produit_panier');
let div = document.createElement("div");
div.innerHTML = `<p> Prix total: ${prixTotal/100}€<p></p>`;
panierTotal.appendChild(div);

let firstName = document.getElementById('firstname').value;

var sendOrder = document.getElementById('validationPanier');
sendOrder.addEventListener('click', function () {
    const contact = {
        firstName: 'Alice',
        lastName: 'Caroll',
        address: '56 rue Victor Hugo',
        city:'Nice',
        email:'alice.caroll@gmail.com',
    }
    const products = ['232','4353', '342'];
    const postData = {contact, products};
    const post = JSON.stringify(postData);

    sessionStorage.setItem("data",post);
    let sessionPrixTotal = sessionStorage.setItem('prix',prixTotal/100);
    console.log(post);

    fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        body: post,
        headers: {"Content-type": "application/json"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json));

});


