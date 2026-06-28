const cartItems = document.querySelector("#cartItems");
const emptyState = document.querySelector("#emptyState");
const subtotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");

getCart();

async function getCart() {
  try {
    const res = await fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const items = await res.json();

    if (!items.length) {
      emptyState.classList.remove("hidden");
      return;
    }

    let totalPrice = 0;

    items.forEach((item) => {
      const product = item.productId;
      totalPrice += product.price * item.quantity;
      renderCartItem(item, product);
    });

    subtotal.textContent = `${totalPrice}.00 GEL`;
    total.textContent = `${totalPrice}.00 GEL`;
  } catch (err) {
    console.log(err.message);
  }
}

function renderCartItem(item, product) {
  const div = document.createElement("div");
  div.className =
    "bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex gap-4 items-center";

  const img = document.createElement("img");
  img.src = product.imgUrl || "";
  img.className = "w-24 h-24 object-cover rounded-xl";

  const info = document.createElement("div");
  info.className = "flex-1";

  const name = document.createElement("p");
  name.className = "font-spaceGrotesk font-semibold text-gray-800 text-lg";
  name.textContent = product.productName;

  const category = document.createElement("p");
  category.className = "text-gray-500 text-sm";
  category.textContent = product.category;

  const price = document.createElement("p");
  price.className = "text-blue-400 font-semibold text-xl font-estedad mt-2";
  price.textContent = `${product.price}.00 GEL`;

  const quantity = document.createElement("p");
  quantity.className = "text-gray-500 text-sm mt-1";
  quantity.textContent = `Quantity: ${item.quantity}`;

  info.append(name, category, price, quantity);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "hover:bg-red-100 p-2 rounded-lg text-red-500";
  deleteBtn.innerHTML = `<i data-lucide="trash-2" class="size-5"></i>`;
  deleteBtn.addEventListener("click", () => removeItem(item._id));

  div.append(img, info, deleteBtn);
  cartItems.appendChild(div);
  lucide.createIcons();
}

async function removeItem(id) {
  try {
    const res = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) window.location.reload();
  } catch (err) {
    console.log(err.message);
  }
}
