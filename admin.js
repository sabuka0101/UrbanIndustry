async function verifyAdmin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/auth";
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
      return;
    }

    if (payload.role !== "admin") {
      window.location.href = "/auth";
    }
  } catch (err) {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }
}
await verifyAdmin();

const body = document.body;
const editCloseBtn = document.querySelector("#editCloseBtn");
const editProduct = document.querySelector("#editProduct");
const editProductBox = document.querySelector("#editProductBox");
const editProductName = document.querySelector("#editProductName");
const editProductDes = document.querySelector("#editProductDes");
const editProductPrice = document.querySelector("#editProductPrice");
const editProductStock = document.querySelector("#editProductStock");
const editProductCategory = document.querySelector("#editProductCategory");
const editProductSize = document.querySelectorAll(".editProductSize");
const editProductSubmit = document.querySelector("#editProductSubmit");
const editProductImg = document.querySelector("#editProductImg");
const newProductBtn = document.querySelector("#newProductBtn");
const newProductBox = document.querySelector("#newProductBox");
const newProduct = document.querySelector("#newProduct");
const productCloseBtn = document.querySelector("#productCloseBtn");
const newProductName = document.querySelector("#newProductName");
const newProductDes = document.querySelector("#newProductDes");
const newProductPrice = document.querySelector("#newProductPrice");
const newProductStock = document.querySelector("#newProductStock");
const newProductCategory = document.querySelector("#newProductCategory");
const newProductSize = document.querySelectorAll(".newProductSize");
const newProductImg = document.querySelector("#newProductImg");
const newProductSubmit = document.querySelector("#newProductSubmit");
const tbody = document.querySelector("#productsTable tbody");
const usersTbody = document.querySelector("#usersTbody");
const productsTabBtn = document.querySelector("#productsTabBtn");
const usersTabBtn = document.querySelector("#usersTabBtn");
const productsTable = document.querySelector("#productsTable");
const usersTable = document.querySelector("#usersTable");

productsTabBtn.addEventListener("click", () => {
  productsTable.classList.remove("hidden");
  usersTable.classList.add("hidden");
  newProductBtn.classList.remove("hidden");
  productsTabBtn.classList.add("bg-sky-500", "text-white");
  productsTabBtn.classList.remove("text-gray-600", "hover:bg-gray-100");
  usersTabBtn.classList.remove("bg-sky-500", "text-white");
  usersTabBtn.classList.add("text-gray-600", "hover:bg-gray-100");
});

usersTabBtn.addEventListener("click", () => {
  usersTable.classList.remove("hidden");
  productsTable.classList.add("hidden");
  newProductBtn.classList.add("hidden");
  usersTabBtn.classList.add("bg-sky-500", "text-white");
  usersTabBtn.classList.remove("text-gray-600", "hover:bg-gray-100");
  productsTabBtn.classList.remove("bg-sky-500", "text-white");
  productsTabBtn.classList.add("text-gray-600", "hover:bg-gray-100");
});

getProducts();
async function getProducts() {
  const data = await fetch("/api/products");
  const products = await data.json();
  console.log(products);
  for (let i = 0; i < products.length; i++) {
    addRow(products[i]);
  }
  lucide.createIcons();
}

function addRow(product) {
  const tr = document.createElement("tr");
  tr.dataset.id = product._id;

  const tdInfo = document.createElement("td");
  tdInfo.className = "px-6 py-4";

  const flexDiv = document.createElement("div");
  flexDiv.className = "flex items-center gap-3";

  const img = document.createElement("img");
  img.setAttribute("src", product.imgUrl || "");
  img.className = "h-16 w-16 object-cover rounded-xl";

  const textDiv = document.createElement("div");

  const pName = document.createElement("p");
  pName.className = "text-gray-800 font-semibold";
  pName.textContent = product.productName;

  const pCategory = document.createElement("p");
  pCategory.className = "text-sm text-gray-500";
  pCategory.textContent = product.category;

  textDiv.append(pName, pCategory);
  flexDiv.append(img, textDiv);
  tdInfo.appendChild(flexDiv);

  const tdPrice = document.createElement("td");
  tdPrice.className = "px-6 py-4 font-estedad";
  tdPrice.textContent = product.price;

  const tdStock = document.createElement("td");
  tdStock.className = "px-6 py-4";

  const stockSpan = document.createElement("span");
  stockSpan.className =
    "bg-sky-500 px-4 py-[0.1rem] rounded-lg text-white font-semibold text-sm";
  stockSpan.textContent = `${product.stock} in stock`;

  tdStock.appendChild(stockSpan);

  const tdActions = document.createElement("td");
  tdActions.className = "px-6 py-4";

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex justify-end gap-3";

  const editBtn = document.createElement("button");
  editBtn.className = "hover:bg-sky-200 p-1 rounded-lg editBtn";

  const editIcon = document.createElement("i");
  editIcon.setAttribute("data-lucide", "pencil");
  editIcon.className = "size-5";
  editBtn.appendChild(editIcon);
  editBtn.addEventListener("click", openEdit);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "hover:bg-sky-200 p-1 rounded-lg";

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("data-lucide", "trash-2");
  deleteIcon.className = "size-5 text-red-500";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener("click", deleteProducts);

  actionsDiv.append(editBtn, deleteBtn);
  tdActions.appendChild(actionsDiv);

  tr.append(tdInfo, tdPrice, tdStock, tdActions);
  tbody.appendChild(tr);
}

function closeProduct() {
  newProductBox.classList.add("scale-95", "opacity-0");
  newProduct.classList.add("hidden");
}
function openProduct() {
  newProduct.classList.remove("hidden");
  newProduct.classList.add("flex");
  setTimeout(() => {
    newProductBox.classList.remove("scale-95", "opacity-0");
  }, 10);
}

function closeEdit() {
  editProductBox.classList.add("scale-95", "opacity-0");
  editProduct.classList.add("hidden");
}

let currentEditId = null;

async function openEdit(e) {
  const tr = e.target.closest("tr");
  currentEditId = tr.dataset.id;

  try {
    const res = await fetch(`/api/products/${currentEditId}`);
    const product = await res.json();

    editProductName.value = product.productName;
    editProductDes.value = product.description;
    editProductPrice.value = product.price;
    editProductStock.value = product.stock;
    editProductCategory.value = product.category;

    [...editProductSize].forEach((cb) => {
      cb.checked = product.sizes.includes(cb.value);
    });

    editFileName.textContent = product.imgUrl
      ? "Current image"
      : "No file chosen";
  } catch (err) {
    console.log(err.message);
  }

  editProduct.classList.remove("hidden");
  editProduct.classList.add("flex");
  setTimeout(() => {
    editProductBox.classList.remove("scale-95", "opacity-0");
  }, 10);
  console.log(currentEditId);
}

function editProducts() {
  editProductImg.addEventListener("change", (e) => {
    const name = e.target.files[0]?.name || "No file chosen";
    document.querySelector("#editFileName").textContent = name;
  });
  editProductSubmit.addEventListener("click", async () => {
    const selectedSizes = [...editProductSize]
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const editproductData = {
      productName: editProductName.value,
      description: editProductDes.value,
      price: editProductPrice.value,
      stock: editProductStock.value,
      category: editProductCategory.value,
      sizes: selectedSizes,
      imgUrl: editProductImg.files[0],
    };
    try {
      const res = await fetch(`/api/products/${currentEditId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editproductData),
      });
      const data = await res.json();
      console.log(data);
      closeEdit();
    } catch (err) {
      console.log(err.message);
    }
  });
}
editProducts();

let currentDeleteId = null;

async function deleteProducts(e) {
  const tr = e.target.closest("tr");
  currentDeleteId = tr.dataset.id;

  try {
    const res = await fetch(`/api/products/${currentDeleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    window.location.reload();
  } catch (err) {
    console.log(err.message);
  }
}

function createProducts() {
  newProductImg.addEventListener("change", (e) => {
    const name = e.target.files[0]?.name || "No file chosen";
    document.querySelector("#fileName").textContent = name;
  });

  newProductSubmit.addEventListener("click", async () => {
    const selectedSizes = [...newProductSize]
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const productData = {
      productName: newProductName.value,
      description: newProductDes.value,
      price: newProductPrice.value,
      stock: newProductStock.value,
      category: newProductCategory.value,
      sizes: selectedSizes,
      imgUrl: newProductImg.files[0],
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      window.location.reload();
      console.log(data);
      closeProduct();
    } catch (err) {
      console.error(err);
    }
  });
}
createProducts();

productCloseBtn.addEventListener("click", closeProduct);
newProductBtn.addEventListener("click", openProduct);
editCloseBtn.addEventListener("click", closeEdit);

async function getUsers() {
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const users = await res.json();
  users.forEach((user) => addUserRow(user));
}

function addUserRow(user) {
  const tr = document.createElement("tr");
  tr.className = "border-b border-gray-100";

  const tdName = document.createElement("td");
  tdName.className = "px-6 py-4 text-gray-800 font-medium";
  tdName.textContent = user.name;

  const tdEmail = document.createElement("td");
  tdEmail.className = "px-6 py-4 text-gray-600";
  tdEmail.textContent = user.email;

  const tdRole = document.createElement("td");
  tdRole.className = "px-6 py-4";

  const roleSpan = document.createElement("span");
  roleSpan.textContent = user.role;
  roleSpan.className =
    user.role === "admin"
      ? "bg-sky-500 text-white text-sm px-3 py-1 rounded-lg font-semibold"
      : "bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg font-semibold";

  tdRole.appendChild(roleSpan);

  const tdActions = document.createElement("td");
  tdActions.className = "px-6 py-4";

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex justify-end gap-3";

  const editBtn = document.createElement("button");
  editBtn.className = "hover:bg-sky-200 p-1 rounded-lg";
  editBtn.addEventListener("click", () => toggleRole(user));
  const editIcon = document.createElement("i");
  editIcon.setAttribute("data-lucide", "pencil");
  editIcon.className = "size-5";
  editBtn.appendChild(editIcon);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "hover:bg-sky-200 p-1 rounded-lg";
  deleteBtn.addEventListener("click", () => deleteUser(user));
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("data-lucide", "trash-2");
  deleteIcon.className = "size-5 text-red-500";
  deleteBtn.appendChild(deleteIcon);

  actionsDiv.append(editBtn, deleteBtn);
  tdActions.appendChild(actionsDiv);

  tr.append(tdName, tdEmail, tdRole, tdActions);
  usersTbody.appendChild(tr);
  lucide.createIcons();
}

getUsers();

async function deleteUser(user) {
  if (!confirm(`Delete ${user.name}?`)) return;
  try {
    const res = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.ok) window.location.reload();
  } catch (err) {
    console.log(err.message);
  }
}

async function toggleRole(user) {
  const newRole = user.role === "admin" ? "user" : "admin";
  if (!confirm(`Change ${user.name}'s role to ${newRole}?`)) return;
  try {
    const res = await fetch(`/api/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) window.location.reload();
  } catch (err) {
    console.log(err.message);
  }
}
