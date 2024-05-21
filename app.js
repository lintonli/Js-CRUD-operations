let Product = JSON.parse(localStorage.getItem("products")) || [];
let Cart = JSON.parse(localStorage.getItem("cart")) || [];
let isEdit = false;
let editProductId;

const maindiv = document.querySelector(".prods");
const productprice = document.getElementById("Pprice");
const imageUrl = document.getElementById("imageurl");
const productname = document.getElementById("Pname");
const productQuantity = document.getElementById("Pquantity");
const button = document.getElementById("btn");

button.addEventListener("click", addProduct);

let act = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  if (!isEdit) {
    // console.log("add");
    let newProduct = {
      id: Math.ceil(Math.random() * 1000),
      Pname: productname.value,
      imageurl: imageUrl.value,
      Pprice: parseFloat(productprice.value),
      Pquantity: parseFloat(productQuantity.value),
    };
    Product.push(newProduct);
  } else {
    updateProduct(editProductId);
  }
  saveProducts();
  displayProduct();
}

function displayProduct() {
  //   console.log("products (display products) -> ", Product);
  maindiv.innerHTML = "";
  if (Product.length === 0) {
    maindiv.innerHTML = "No Products found";
  } else {
    Product.forEach((prod) => {
      const prodElement = document.createElement("div");
      prodElement.className = "item";
      prodElement.innerHTML = `
        <h1>${prod.Pname}</h1>
        <img src="${prod.imageurl}" alt="">
        <h3>${prod.Pprice}</h3>

        <p>${prod.Pquantity}</p>
<div class="comm">
         <button class="delete" onclick="deleteProduct(${prod.id})">Delete</button>
         <button class ="edit" onclick="editProduct(${prod.id})">Edit</button>
         </div>
         <button class ="cart" onclick="addCart(${prod.id})">Add to Cart</button>
        `;
      maindiv.appendChild(prodElement);
    });
  }
}

function editProduct(productId) {
  const product = Product.find((prod) => prod.id === productId);
  //   console.log("edit product -> ", product);
  if (product) {
    productname.value = product.Pname;
    imageUrl.value = product.imageurl;
    productprice.value = product.Pprice;
    productQuantity.value = product.Pquantity;
    button.textContent = "Update";
    editProductId = productId;
    isEdit = true;
  }
}

function updateProduct(productId) {
  //   const product = Product.find((prod) => prod.id === productId);
  //   console.log("products updated (before)", Product);
  Product = Product.map((product) => {
    let productToUpdate = product;
    if (product.id === productId) {
      productToUpdate.Pname = productname.value;
      productToUpdate.imageurl = imageUrl.value;
      productToUpdate.Pprice = parseFloat(productprice.value);
      productToUpdate.Pquantity = parseInt(productQuantity.value);
      return productToUpdate;
    }
    return productToUpdate;
  });
  isEdit = false;
  //   console.log("products updated (after)", Product);

  //   if (product) {
  //     product.name = productname.value;
  //     product.price = parseFloat(productprice.value);
  //     product.quantity = parseInt(productQuantity.value);
  //     resetForm();
  //     saveProducts();
  //     displayProduct();
  //   }

  resetForm();
}

function deleteProduct(productId) {
  const delproducts = Product.filter((prod) => prod.id !== productId);
  Product = delproducts;
  saveProducts();
  displayProduct();
}

function addCart(ProductId, quantity) {
  const Prod = Product.find((item) => item.id === ProductId);
  //   console.log("Product (add to cart) -> ", Product);
  if (!Prod || Prod.quantity < quantity) {
    console.log("Not enough stock");
  }
  if (Prod) {
    console.log("Product already in cart");
  }
  const cartItem = Cart.find((item) => item.ProductId === ProductId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    Cart.push({
      ProductId: ProductId,
      ProductName: Prod.Pname,
      image: Prod.imageurl,
      quantity: Prod.Pquantity,
    });

    Prod.quantity -= quantity;
  }
  saveProducts();
  displayProduct();
}
// const cartElement = document.querySelector(".cart");

// function displayCart() {
//   //const cartElement = document.getElementById("cart");
//   cartElement.innerHTML = ""; // Clear previous contents
//   Cart.forEach((item) => {
//     const product = Product.find((p) => p.id === item.ProductId);
//     const itemElement = document.createElement("div");
//     itemElement.className = "item";
//     itemElement.innerHTML = `<h1>${product.Pname}</h1> <h2>Price:${product.Pprice}</h2> <p>${product.Pquantity}</p>`;
//     cartElement.appendChild(itemElement);
//   });
// }

function resetForm() {
  console.log("reset form");
  productname.value = "";
  imageUrl.value = "";
  productprice.value = "";
  productQuantity.value = "";
  button.textContent = "Add Product";
  button.onclick = addProduct;
}

function saveProducts() {
  localStorage.setItem("cart", JSON.stringify(Cart));
  localStorage.setItem("products", JSON.stringify(Product));
}
displayProduct();
