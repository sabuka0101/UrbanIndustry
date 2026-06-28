getProducts();
async function getProducts() {
  const data = await fetch("/api/products");
  const products = await data.json();
  for (let i = 0; i < products.length; i++) {
    renderProducts(products[i]);
  }
}
const cards = document.querySelector("#cards");

function renderProducts(product) {
  const card = document.createElement("div");
  card.dataset.id = product._id;
  card.id = "card";
  card.className =
    "rounded-xl shadow-sm shadow-gray-400 w-72 pb-2 max-sm:w-full";
  const img = document.createElement("img");
  img.setAttribute("src", product.imgUrl || "");
  img.className = "rounded-t-xl h-[20rem] object-cover max-sm:w-full";
  card.appendChild(img);
  const p1 = document.createElement("p");
  p1.className = "text-gray-500 ml-5 font-spaceGrotesk font-medium mt-4";
  p1.textContent = product.category;
  card.appendChild(p1);
  const p2 = document.createElement("p");
  p2.className = "text-gray-800 ml-5 font-spaceGrotesk font-semibold";
  p2.textContent = product.productName;
  card.appendChild(p2);
  const cardDiv = document.createElement("div");
  cardDiv.className = "flex justify-between mr-2 max-sm:mr-2";
  card.appendChild(cardDiv);
  const cardDivP = document.createElement("p");
  cardDivP.className =
    "text-blue-400 ml-5 font-semibold text-2xl mt-3 font-estedad";
  cardDivP.textContent = `${product.price}.00 GEL`;
  cardDiv.appendChild(cardDivP);
  const cardDivBtn = document.createElement("button");
  cardDivBtn.className =
    "text-white bg-gradient-to-r from-sky-500 to-sky-300 rounded-xl pr-4 pl-4 text-sm font-semibold";
  cardDivBtn.textContent = "Add";
  cardDivBtn.addEventListener("click", () => {
    addProductCart(card);
  });
  cardDiv.appendChild(cardDivBtn);
  cards.appendChild(card);
}

document.querySelector("#shopBtn").addEventListener("click", () => {
  document.querySelector("#cards").scrollIntoView({ behavior: "smooth" });
});

async function addProductCart(card) {
  const id = card.dataset.id;
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    });
    const data = await res.json();
  } catch (err) {
    console.log(err.message);
  }
}
