const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

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

document.querySelector("#loginBtn").addEventListener("click", async () => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.querySelector("#loginEmail").value,
      password: document.querySelector("#loginPassword").value,
    }),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) return alert(data.message);

  // localStorage.setItem("token", data.accessToken);
  // window.location.href = data.role === "admin" ? "/admin" : "/";
});

document.querySelector("#registerBtn").addEventListener("click", async () => {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.querySelector("#registerName").value,
      email: document.querySelector("#registerEmail").value,
      password: document.querySelector("#registerPassword").value,
    }),
  });
  const data = await res.json();
  if (!res.ok) return alert(data.message);

  alert("Registered! Please log in.");
  loginTab.click();
});
