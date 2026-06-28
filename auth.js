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

  if (loginEmail.value === "")
    return setError(loginEmailError, loginEmail, "Email Field is empty");
  if (!loginEmail.value.includes("@"))
    return setError(loginEmailError, loginEmail, "Field should include @");
  if (loginPassword.value === "")
    return setError(
      loginPasswordError,
      loginPassword,
      "Password Field is empty",
    );

  clearError(loginEmailError, loginEmail);
  clearError(loginPasswordError, loginPassword);

  await loginUser();
});

async function loginUser() {
  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });

    const data = await res.json();

    if (res.status === 401) {
      if (data.emailNotFound)
        return setError(loginEmailError, loginEmail, data.message);
      if (data.passwordIncorrect)
        return setError(loginPasswordError, loginPassword, data.message);
    }

    if (!res.ok)
      return setError(
        loginEmailError,
        loginEmail,
        data.message || "Something went wrong",
      );

    localStorage.setItem("token", data.token);
    window.location.href = data.role === "admin" ? "/admin" : "/";
  } catch (err) {
    console.error("Login failed:", err);
    setError(loginEmailError, loginEmail, "Something went wrong. Try again.");
  }
}

document
  .querySelector("#registerBtn")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    if (registerEmail.value === "")
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
    if (registerPassword.value === "")
      return setError(
        registerPasswordError,
        registerPassword,
        "Password Field is empty",
      );
    if (registerPassword.value.length < 8)
      return setError(
        registerPasswordError,
        registerPassword,
        "Password must be at least 8 characters",
      );
    if (registerPassword.value === "password")
      return setError(
        registerPasswordError,
        registerPassword,
        "Password can't be 'password'",
      );

    clearError(registerEmailError, registerEmail);
    clearError(registerPasswordError, registerPassword);

    await registerUser();
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

    if (data.emailExists)
      return setError(registerEmailError, registerEmail, data.message);

    if (!res.ok)
      return setError(
        registerEmailError,
        registerEmail,
        data.message || "Something went wrong",
      );

    alert("Registered! Please log in.");
    loginTab.click();
  } catch (err) {
    console.error("Register failed:", err);
    setError(
      registerEmailError,
      registerEmail,
      "Something went wrong. Try again.",
    );
  }
}

function setError(errorMessage, inputField, message) {
  errorMessage.innerText = message;
  errorMessage.classList.remove("hidden");
  inputField.classList.add("border-red-600");
}

function clearError(errorMessage, inputField) {
  errorMessage.classList.add("hidden");
  inputField.classList.remove("border-red-600");
}
