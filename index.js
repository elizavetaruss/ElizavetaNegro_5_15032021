fetch('http://localhost:3000/api/teddies')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const html = data.map(teddy => {
      return `<article id='ourson'>
      <h4>${teddy.name}</h4>
      <img class="teddies_size" src="${teddy.imageUrl}" alt="${teddy.name}">
      <p> ${teddy.description}</p>
      <p> Prix: ${teddy.price/100}€</p>
      <p><a href="product.html?id=${teddy._id}" class="btn btn-primary" role="button">Découvrir</a></p>
      </article>`
    })
    .join('');
    document.querySelector('#produits').insertAdjacentHTML ("afterbegin", html);
  })
  .catch(err => {
    alert('Problème avec le serveur. Revenez plus tard');
  })
