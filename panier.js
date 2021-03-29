

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
     const postData = {
        contact: {},
        products: [],
      }
    postData.contact = {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('secondname').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }
    for (x of panier) {
        postData.products.push(x._id);
      }
    console.log(postData)

    sessionStorage.setItem("postData",postData);
    sessionStorage.setItem('prix',prixTotal/100);

    
    
    fetch('http://localhost:3000/api/teddies/order', {

        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(response => console.log(response.orderId));

});


