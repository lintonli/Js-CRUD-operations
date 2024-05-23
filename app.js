// let Product = JSON.parse(localStorage.getItem("products")) || [];
let Cart = JSON.parse(localStorage.getItem("cart")) || [];
const productUrl = "http://localhost:3000/Products";
let isEdit = false;
// let editProductId;

const maindiv = document.querySelector(".prods");
const productprice = document.getElementById("Pprice");
const imageUrl = document.getElementById("imageurl");
const productname = document.getElementById("Pname");
const productQuantity = document.getElementById("Pquantity");
const button = document.getElementById("btn");
let id;
// const btn = document.getElementsByClassName("edit");

function getProducts() {
  fetch(productUrl)
    .then((res) => res.json())
    .then((list) => {
      displayProduct(list);
    });
  // console.log(list);
}

getProducts();

async function addProduct() {
  if (!isEdit) {
    // console.log("add");
    let newProduct = {
      // id: Math.ceil(Math.random() * 1000),
      Pname: productname.value,
      imageurl: imageUrl.value,
      Pprice: parseFloat(productprice.value),
      Pquantity: parseFloat(productQuantity.value),
      id: parseFloat(id.value),
    };
    console.log(newProduct.id);
    //Product.push(newProduct);
    if (button.textContent === "Add Product") {
      await fetch(productUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
    }
    alert("Product successfully added");
    getProducts();
  } else {
    updateProduct(id);
  }
  // saveProducts();
  // displayProduct(list);
}
async function getProducts() {
  const products = await fetch(productUrl);
  const list = await products.json();
  displayProduct(list);
}
getProducts();

function displayProduct(list) {
  //   console.log("products (display products) -> ", Product);
  let html = "";
  if (list.length === 0) {
    html = "No Products found";
  } else {
    list.forEach((prod) => {
      // const prodElement = document.createElement("div");
      // prodElement.className = "item";
      // prodElement.innerHTML =
      html += ` <div class="comm">
        <h1>Product: ${prod.Pname}</h1>
        <img src="${prod.imageurl}" alt="">
        <h3>Price: ${prod.Pprice}</h3>

        <p>Quantity: ${prod.Pquantity}</p>

         <button class="delete" onclick="deleteProduct('${prod.id}')">Delete</button>
         <button class ="edit" onclick="editProduct('${prod.id}')">Edit</button>
         <button class ="cart" onclick="addCart('${prod.id}')">Add to Cart</button>
         </div>
        `;
      // maindiv.appendChild(prodElement);
      maindiv.innerHTML = html;
    });
  }
}

async function editProduct(id) {
  // let product = JSON.parse(productData);
  let response = await fetch(productUrl + "/" + id);
  let product = await response.json();

  productname.value = product.Pname;
  imageUrl.value = product.imageurl;
  productprice.value = product.Pprice;
  productQuantity.value = product.Pquantity;
  button.textContent = "Update";
  // editProductId = product.id;
  isEdit = true;
  // console.log(product.Pname);
}

async function updateProduct(id) {
  // let response = await fetch(productUrl + "/" + id);
  // let prod = await response.json();

  // // // prepopulate(prod)
  // // console.log(prod);
  // if (prod.id) {
  //   editProduct(id);
  //   console.log(product);

  button.addEventListener("click", async () => {
    if (btn.textContent === "Update") {
      let updatedProduct = {
        Pname: productname.value,
        Pprice: productprice.value,
        Pquantity: productQuantity.value,
        imageurl: imageUrl.value,
        id,
      };
      console.log(updatedProduct);
      await sendRequest(updatedProduct);
    }
  });
  // }

  isEdit = false;
  // //   console.log("products updated (after)", Product);

  resetForm();
}

async function sendRequest({ id, ...updatedProduct }) {
  await fetch(`${productUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
  });
  alert("Product edited successfully");
}
async function deleteProduct(id) {
  await fetch(`${productUrl}/${id}`, {
    method: "DELETE",
  });
}
function resetForm() {
  // console.log("reset form");
  productname.value = "";
  imageUrl.value = "";
  productprice.value = "";
  productQuantity.value = "";
  button.textContent = "Add Product";
  button.onclick = addProduct;
}
button.addEventListener("click", addProduct);

// //cart

async function addCart(ProductId, quantity) {
  // const Prod = product.find((item) => item.id === ProductId);
  //   console.log("Product (add to cart) -> ", Product);
  const response = await fetch(productUrl);
  const products = await response.json();
  const prod = products.find((p) => p.id === ProductId);

  // let Prod = product;

  if (!prod || prod.Pquantity < quantity) {
    console.log("Not enough stock");
  }
  // if (prod) {
  //   console.log("Product already in cart");
  // }
  const cartItem = Cart.find((item) => item.ProductId === ProductId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    Cart.push({
      ProductId: ProductId,
      ProductName: prod.Pname,
      image: prod.imageurl,
      quantity: prod.Pquantity,
    });

    prod.quantity -= quantity;
    updateProduct(id);
  }
  saveProducts();
  // displayProduct();
}
function saveProducts() {
  localStorage.setItem("cart", JSON.stringify(Cart));
}
