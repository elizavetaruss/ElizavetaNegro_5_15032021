const teddy1_result = document.getElementById("Teddy1")
const teddy2_result = document.getElementById("Teddy2")
const teddy3_result = document.getElementById("Teddy3")


fetch('http://localhost:3000/api/teddies')
.then(res => res.json())
.then(data => {

    teddy1_result.innerHTML = `<img src ="${data.imageUrl}" />`
})