const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginEmailError = document.querySelector("#loginEmailError");
const loginPasswordError = document.querySelector("#loginPasswordError");
const registerName = document.querySelector("#registerName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const registerEmailError = document.querySelector("#registerEmailError");
const registerPasswordError = document.querySelector("#registerPasswordError");
const inputs = document.querySelectorAll("input");

loginTab.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginTab.classList.add("text-sky-500", "border-b-2", "border-sky-500");
  loginTab.classList.remove("text-gray-400");
  registerTab.classList.add("text-gray-400");
  registerTab.classList.remove("text-sky-500", "border-b-2", "border-sky-500");
});

registerTab.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  registerTab.classList.add("text-sky-500", "border-b-2", "border-sky-500");
  registerTab.classList.remove("text-gray-400");
  loginTab.classList.add("text-gray-400");
  loginTab.classList.remove("text-sky-500", "border-b-2", "border-sky-500");
});

document.querySelector("#loginBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  const res = await fetch("/api/users");
  const users = await res.json();
  const userExists = users.find((user) => user.email === loginEmail.value);
  if (!userExists) {
    return setError(loginEmailError, loginEmail, "Email is incorrect");
  }
  if (loginEmail.value === "" || loginEmail.value == null)
    return setError(loginEmailError, loginEmail, "Email Field is empty");
  if (!loginEmail.value.includes("@"))
    return setError(loginEmailError, loginEmail, "Field should include @");
  loginEmail.classList.remove("border-red-600");
  loginEmailError.classList.add("hidden");
  if (userExists.password != loginPassword.value) {
    return setError(loginPasswordError, loginPassword, "Password is incorrect");
  }
  if (loginPassword.value === "" || loginPassword.value == null)
    return setError(
      loginPasswordError,
      loginPassword,
      "Password Field is empty",
    );
  loginPassword.classList.remove("border-red-600");
  loginPasswordError.classList.add("hidden");
  console.log("log in success");

  loginUser();
});

async function loginUser() {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  });
  const data = await res.json();
  if (!res.ok) return alert(data.message);

  // localStorage.setItem("token", data.accessToken);
  // window.location.href = data.role === "admin" ? "/admin" : "/";
}
document
  .querySelector("#registerBtn")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const res = await fetch("/api/users");
    const users = await res.json();
    const emailExists = users.find(
      (user) => user.email === registerEmail.value,
    );
    if (emailExists) {
      return setError(
        registerEmailError,
        registerEmail,
        "This email already exists",
      );
    }

    if (registerEmail.value === "" || registerEmail.value == null)
      return setError(
        registerEmailError,
        registerEmail,
        "Email Field is empty",
      );
    if (!registerEmail.value.includes("@"))
      return setError(
        registerEmailError,
        registerEmail,
        "Field should include @",
      );
    registerEmail.classList.remove("border-red-600");
    registerEmailError.classList.add("hidden");
    if (registerPassword.value === "" || registerPassword.value == null)
      return setError(
        registerPasswordError,
        registerPassword,
        "Password Field is empty",
      );
    if (registerPassword.value === "password")
      return setError(
        registerPasswordError,
        registerPassword,
        "Password can't be 'password'",
      );
    registerPassword.classList.remove("border-red-600");
    registerPasswordError.classList.add("hidden");
    registerUser();
  });

async function registerUser() {
  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) return alert(data.message);

    alert("Registered! Please log in.");
    loginTab.click();
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Something went wrong. Check the console.");
  }
}

function setError(errorMessage, inputField, message) {
  errorMessage.innerText = message;
  errorMessage.classList.remove("hidden");
  inputField.classList.add("border-red-600");
}
