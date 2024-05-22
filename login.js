const lbtn = document.getElementById("lbtn");
const baseUrl = "http://localhost:3000/Users";
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");

async function logUser() {
  const userNameValue = userName.value;
  const userPasswordValue = userPassword.value;

  const login = await getUser(userNameValue);

  if (login.length === 0) {
    alert("user not found");
  }
  if (
    login.userPassword === userPasswordValue &&
    login.userName === userNameValue
  ) {
    alert("login successful");
    window.location.href = "home.html";
  } else {
    alert("wrong user credentials");
  }
}
lbtn.addEventListener("click", logUser);

async function getUser(userName) {
  let user = await fetch(`${baseUrl}?userName=${userName}`);
  let val = await user.json();
  return val.length > 0 ? val[0] : null;
}
