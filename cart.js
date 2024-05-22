// const cart = JSON.parse(localStorage.getItem("cart")) || [];
// const products = JSON.parse(localStorage.getItem("products")) || [];
const productUrl = "http://localhost:3000/Products";
const cartElement = document.querySelector(".cart");

const btn = cartElement.addEventListener('click', addCart)

const maindiv = document.getElementById(cart)


function displayCart() {
  //const cartElement = document.getElementById("cart");
  let cartElement= " "; // Clear previous contents
  productUrl.forEach((item) => {
    console.log("item: ", item);
    const product = products.find((p) => p.id === item.ProductId);
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.innerHTML = `<h1>${product.Pname}</h1> <img src="${product.imageurl}" alt =""> <h2>Price:${product.Pprice}</h2> <p>${product.Pquantity}</p>`;
    cartElement.appendChild(itemElement);
  });
}
displayCart();

async function addCart(pro) {
  let addedProduct ={
    pName : products.Pname
  }
  
}