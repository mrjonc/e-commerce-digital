// -------- GERENCIAMENTO DO CARRINHO (localStorage) --------

// 1. Obtém os itens do localStorage ou inicializa um array vazio
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Salva o carrinho no localStorage e atualiza os elementos da interface
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartModal();
}

// 3. Adiciona um produto ao carrinho
function addToCart(productId) {
  // O array `products` precisa estar disponível no escopo global (definido em products.js)
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
}

// 4. Altera a quantidade de um item (+1 ou -1)
function updateQuantity(productId, amount) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += amount;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCart();
}

// 5. Remove um item completamente do carrinho
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}

// 6. Atualiza o contador de itens no ícone do carrinho no header
function updateCartBadge() {
  const cartBtn = document.getElementById("cart");
  if (!cartBtn) return;

  let badge = cartBtn.querySelector(".cart-badge");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!badge) {
    badge = document.createElement("span");
    badge.className = "cart-badge";
    cartBtn.appendChild(badge);
  }

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

// 7. Renderiza o modal/drawer do carrinho (Gera a estrutura dinamicamente)
function renderCartModal() {
  let modalContainer = document.getElementById("cart-modal");

  // Cria a estrutura do modal caso ela ainda não exista no DOM
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "cart-modal";
    modalContainer.className = "cart-modal";
    modalContainer.innerHTML = `
      <div class="cart-modal-content">
        <div class="cart-modal-header">
          <h2>Seu Carrinho</h2>
          <button id="close-cart" class="close-cart-btn">&times;</button>
        </div>
        <div id="cart-items-list" class="cart-items-list"></div>
        <div class="cart-modal-footer">
          <p>Total: <strong id="cart-total-price">R$ 0,00</strong></p>
          <button id="checkout-btn" class="checkout-btn">Finalizar Compra</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalContainer);

    // Eventos do Modal
    document
      .getElementById("close-cart")
      .addEventListener("click", toggleCartModal);

    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) toggleCartModal();
    });
  }

  const itemsList = document.getElementById("cart-items-list");
  const totalPriceEl = document.getElementById("cart-total-price");

  itemsList.innerHTML = "";

  if (cart.length === 0) {
    itemsList.innerHTML =
      '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    totalPriceEl.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>R$ ${item.price.toFixed(2).replace(".", ",")} cada</p>
      </div>
      <div class="cart-item-actions">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    itemsList.appendChild(itemEl);
  });

  totalPriceEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// 8. Alterna a visibilidade do modal do carrinho
function toggleCartModal() {
  const modalContainer = document.getElementById("cart-modal");
  if (modalContainer) {
    modalContainer.classList.toggle("open");
  }
}

// -------- INICIALIZAÇÃO DO CARRINHO --------
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart");
  if (cartBtn) {
    cartBtn.addEventListener("click", toggleCartModal);
  }

  updateCartBadge();
  renderCartModal();
});
