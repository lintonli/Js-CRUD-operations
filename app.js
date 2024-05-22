// let Product = JSON.parse(localStorage.getItem("products")) || [];
// let Cart = JSON.parse(localStorage.getItem("cart")) || [];
const productUrl = "http://localhost:3000/Products";
let isEdit = false;
let editProductId;

const maindiv = document.querySelector(".prods");
const productprice = document.getElementById("Pprice");
const imageUrl = document.getElementById("imageurl");
const productname = document.getElementById("Pname");
const productQuantity = document.getElementById("Pquantity");
const button = document.getElementById("btn");
const btn = document.getElementsByClassName("edit");


function getProducts(){
  fetch(productUrl).then(
    res => res.json()
  ).then (list => {
    displayProduct(list)
  })
  // console.log(list);
}

getProducts()

async function addProduct() {
  if (!isEdit) {
    // console.log("add");
    let newProduct = {
      // id: Math.ceil(Math.random() * 1000),
      Pname: productname.value,
      imageurl: imageUrl.value,
      Pprice: parseFloat(productprice.value),
      Pquantity: parseFloat(productQuantity.value),
    };

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
    updateProduct(editProductId);
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
      html+=
      ` <div class="comm">
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
      maindiv.innerHTML = html 
    });
  }
}

async function editProduct(id) {
  // const product = Product.find((prod) => prod.id === productId);
  //   console.log("edit product -> ", product);
  let response = await fetch(productUrl + id);
  let prod = await response.json();

  productname.value = product.Pname;
  imageUrl.value = product.imageurl;
  productprice.value = product.Pprice;
  productQuantity.value = product.Pquantity;
  button.textContent = "Update";
  editProductId = product;
  isEdit = true;
  console.log(product);
}

async function updateProduct(id) {
  let response = await fetch(productUrl + id);
  let prod = await response.json();


  // prepopulate(prod)
  console.log(prod);
  if (prod.id) {
    editProduct(product);
    console.log(product);

    btn.addEventListener("click", async () => {
      if (btn.textContent === "update") {
        let updatedProduct = {
          Pname: productname.value,
          Pprice: productprice.value,
          Pquantity: productQuantity.value,
          imageurl: imageUrl.value,
          id,
        };
        await sendRequest(updatedProduct);
      }
    });
  }

  // isEdit = false;
  // //   console.log("products updated (after)", Product);

  resetForm();
}

// function prepopulate(prod) {
// //for prepopulating 
//     Pname.value = prod.Pname,
//     Pprice.value = prod.Pprice,
//     Pquantity.value = prod.Pquantity,
//     imageurl.value =  prod.imageUrl,
//     id = prod.id
//     btn.textContent = "Edit"
// }


async function sendRequest({ id, ...updatedProduct }) {
  await fetch(productUrl + id, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
  });
}
async function deleteProduct(id) {
  await fetch(productUrl + id, {
    method: "DELETE",
  });
}

function addCart(ProductId, quantity,product) {
  const Prod = product.find((item) => item.id === ProductId);
  //   console.log("Product (add to cart) -> ", Product);
  if (!Prod || Prod.Pquantity < quantity) {
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

function resetForm() {
  console.log("reset form");
  productname.value = "";
  imageUrl.value = "";
  productprice.value = "";
  productQuantity.value = "";
  button.textContent = "Add Product";
  button.onclick = addProduct;
}
button.addEventListener("click", addProduct);
