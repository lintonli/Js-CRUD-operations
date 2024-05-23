const cart = JSON.parse(localStorage.getItem("cart")) || [];
// const products = JSON.parse(localStorage.getItem("products")) || [];
const products = "http://localhost:3000/Products";
// const cartElement = document.querySelector(".cart");

function displayCart() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = ""; // Clear previous contents
  cart.forEach((item) => {
    console.log("item: ", item);
    // const product = products.find((p) => p.id === item.ProductId);
    // const product = getProducts();
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.innerHTML = `<h1>${product.Pname}</h1> <img src="${product.imageurl}" alt =""> <h2>Price:${product.Pprice}</h2> <p>${product.Pquantity}</p>`;
    cartElement.appendChild(itemElement);
  });
}
displayCart();
