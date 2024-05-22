const baseUrl = "http://localhost:3000/Users";
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const signbtn = document.getElementById("sbtn");
// const lbtn = document.getElementById("lbtn");

function validateInput(userName, userPassword, userEmail) {
  const usernameValid = userName.length >= 3; // Username should be at least 3 characters
  const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
    userPassword
  ); // Basic password strength check
  const emailValid = userEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
    : true; // Email format check, optional

  if (!usernameValid) {
    alert("Username must be at least 3 characters long.");
    return false;
  }
  if (!passwordValid) {
    alert(
      "Password must be 6 to 20 characters long and include at least one numeric digit, one uppercase and one lowercase letter."
    );
    return false;
  }
  if (!emailValid) {
    alert("Please enter a valid email address.");
    return false;
  }
  return true;
}

async function regUser(e) {
  e.preventDefault();
  let newUser = {
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };
  if (
    !validateInput(newUser.userName, newUser.userPassword, newUser.userEmail)
  ) {
    return;
  }

  if (sbtn.textContent !== "SIGN UP") {
    console.log("not possible");
  } else if (sbtn.textContent === "SIGN UP") {
    // const response = await fetch(baseUrl + "?userName=" + newUser.userName);
    // const users = await response.json();
    getUser();
    //remember users is not defined
    // if (users.length > 0) {
    //   alert("Username already exists. Please choose a different username.");
    //   return;
    //   // getUser(id);
    // }
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    console.log(newUser);
    alert("successfully registered");
    window.location.href = "login.html";
  }
}
signbtn.addEventListener("click", regUser);

//get all users from our database
async function getUser() {
  await fetch(baseUrl, await users.json());
}

async function getUser(userName) {
  // let user = await fetch(`${baseUrl}?userName=${userName}`);
  let user = await fetch(baseUrl + userName);
  let val = await user.json();

  if (val.userName === newUser.userName) {
    console.log("Username already taken kindly choose another");
  }
  return val;
}
