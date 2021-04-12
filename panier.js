

let panier = JSON.parse(sessionStorage.getItem("monPanier"));
console.log(panier);
try {
  var prixTotal = panier.reduce(function(prev, cur){
      return prev + cur.price;
  }, 0);
  console.log(prixTotal/100);
}
catch (err) {
  alert('Panier vide.');
  window.location = 'index.html';

}




const html = panier.map(teddy => {
    return `<article id="panierTeddies">
    <h4>${teddy.name}</h4>
    <img class="img_panier_teddies" src="${teddy.imageUrl}" alt="${teddy.name}">
    <p> Prix: ${teddy.price/100}€</p>
    </article>`
  })

  .join('');
    document.querySelector('#produit_panier').insertAdjacentHTML ("afterbegin", html);


const panierTotal = document.getElementById('prixtotalpanier');
panierTotal.innerHTML = `<p class="prixtotal"> Prix total: ${prixTotal/100}€</p>`;


let firstName = document.getElementById('firstname').value;

var sendOrder = document.getElementById('validationPanier');
sendOrder.addEventListener('click', function () {

  document.getElementById('erreurFirstname').innerHTML = "";
  document.getElementById('erreurLastname').innerHTML = "";
  document.getElementById('erreurEmail').innerHTML = "";
  document.getElementById('erreurCity').innerHTML = "";

  var validateFirstname = document.getElementById('firstname').value;
  var firstnameRGEX = /^[A-Z]'?[a-zA-Z]+(-[a-zA-Z]+)?$/;
  var firstnameResult = firstnameRGEX.test(validateFirstname);
  var erreurTotal = true;
  if(firstnameResult == false)
  {
    document.getElementById('erreurFirstname').innerHTML = "Please enter a valid first name";
    erreurTotal=false;
  }


  var validateLastname = document.getElementById('secondname').value;
  var lastnameRGEX = /^[A-Z]'?[a-zA-Z]+(-[a-zA-Z]+)?$/;
  var lastnameResult = lastnameRGEX.test(validateLastname);
  if(lastnameResult == false)
  {
    document.getElementById('erreurLastname').innerHTML = "Please enter a valid last name";
    erreurTotal=false;
  }


  var validateEmail = document.getElementById('email').value;
  var emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var emailResult = emailRGEX.test(validateEmail);
  if(emailResult == false)
  {
    document.getElementById('erreurEmail').innerHTML = "Please enter a valid email";
    erreurTotal=false;
  
  }

  var validateAddress = document.getElementById('address').value;
  var addressRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
  var addressResult = addressRGEX.test(validateAddress);
  if(addressResult == false)
  {
    document.getElementById('erreurAddress').innerHTML = "Please enter a valid address";
    erreurTotal=false;
  
  }

  var validateCity = document.getElementById('city').value;
  var cityRGEX = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  var cityResult = cityRGEX.test(validateCity);
  if(cityResult == false)
  {
  document.getElementById('erreurCity').innerHTML = "Please enter a valid city";
  erreurTotal=false;

  }

  if (erreurTotal == false)
  {
   return false;
  }
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

    sessionStorage.setItem("postData",postData.contact.firstName);
    sessionStorage.setItem('prix',prixTotal/100);

    
    
    fetch('http://localhost:3000/api/teddies/order', {

        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(response => {
        sessionStorage.setItem('orderId',response.orderId)
        setTimeout(function(){ window.location = 'commande.html'; }, 1000);
      })

      .catch(err => {
        alert('Problème avec le serveur. Revenez plus tard');
      })
      
      



});


