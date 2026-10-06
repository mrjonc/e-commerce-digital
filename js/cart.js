// -------- GERENCIAMENTO DO CARRINHO --------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Salva o carrinho no localStorage e atualiza a interface
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();

  if (document.getElementById("cart-items-list")) {
    renderCartModal();
  }

  if (document.getElementById("checkout-list")) {
    renderCheckout();
  }
}

// Adiciona produto ao carrinho
function addToCart(productId) {
  if (typeof products === "undefined") return;

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

// Atualiza a quantidade de um item
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

// Remove item do carrinho
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}

// Limpa o carrinho
function clearCart() {
  cart = [];
  saveCart();
}

// Atualiza a contagem no ícone do carrinho
function updateCartBadge() {
  const cartBtn = document.getElementById("cart");
  if (!cartBtn) return;

  let badge = cartBtn.querySelector(".cart-badge");
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (!badge) {
    badge = document.createElement("span");
    badge.className = "cart-badge";
    cartBtn.appendChild(badge);
  }

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

// RENDERIZAÇÃO DO MODAL DO CARRINHO (INDEX.HTML)
function renderCartModal() {
  const itemsList = document.getElementById("cart-items-list");
  const totalPriceEl = document.getElementById("cart-total-price");

  if (!itemsList) return;

  itemsList.innerHTML = "";

  if (cart.length === 0) {
    itemsList.innerHTML =
      '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    if (totalPriceEl) totalPriceEl.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const title = item.title || item.nome || "Curso";
    const price = Number(item.price || item.preco || 0);
    const quantity = item.quantity || 1;
    const subtotal = price * quantity;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-info">
        <h4>${title}</h4>
        <p>R$ ${price.toFixed(2).replace(".", ",")} cada</p>
      </div>
      <div class="cart-item-actions">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    itemsList.appendChild(itemEl);
  });

  if (totalPriceEl) {
    totalPriceEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

// Alterna visibilidade do modal no index.html
function toggleCartModal() {
  const modalContainer = document.getElementById("cart-modal");
  if (modalContainer) {
    modalContainer.classList.toggle("open");
  }
}

// RENDERIZAÇÃO DA PÁGINA DE CHECKOUT (CHECKOUT.HTML)
function renderCheckout() {
  const checkoutList = document.getElementById("checkout-list");
  const subtotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");
  const checkoutSumarySection = document.querySelector(".checkout-summary");

  if (!checkoutList) return;

  checkoutList.innerHTML = "";

  if (cart.length === 0) {
    checkoutList.innerHTML = `
      <div class="empty-checkout">
        <p>Seu carrinho está vazio.</p>
        <a href="./index.html" class="btn-voltar-loja">Voltar para a loja</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
    if (totalEl) totalEl.textContent = "R$ 0,00";

    const finishBtn = document.getElementById("btn-finish-order");
    const clearBtn = document.getElementById("btn-clear-cart");
    if (finishBtn) finishBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;

    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const title = item.title || item.nome || "Curso";
    const price = Number(item.price || item.preco || 0);
    const quantity = item.quantity || 1;
    const itemSubtotal = price * quantity;
    total += itemSubtotal;

    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `
      <div class="checkout-item-info">
        <h4>${title} (x${quantity})</h4>
        <span class="price">R$ ${itemSubtotal.toFixed(2).replace(".", ",")}</span>
      </div>
    `;
    checkoutList.appendChild(row);
  });

  const formattedTotal = `R$ ${total.toFixed(2).replace(".", ",")}`;
  if (subtotalEl) subtotalEl.textContent = formattedTotal;
  if (totalEl) totalEl.textContent = formattedTotal;

  const finishBtn = document.getElementById("btn-finish-order");
  const clearBtn = document.getElementById("btn-clear-cart");
  if (finishBtn) finishBtn.disabled = false;
  if (clearBtn) clearBtn.disabled = false;
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // 1. Configurações do Modal no index.html
  const cartIconBtn = document.getElementById("cart");
  if (cartIconBtn) {
    cartIconBtn.addEventListener("click", toggleCartModal);
  }

  const closeCartBtn = document.getElementById("close-cart");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", toggleCartModal);
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }
      window.location.href = "./checkout.html";
    });
  }

  renderCartModal();

  // 2. Configurações da Página de Checkout (checkout.html)
  if (document.getElementById("checkout-list")) {
    renderCheckout();

    // Botão de Esvaziar Carrinho
    const btnClear = document.getElementById("btn-clear-cart");
    if (btnClear) {
      btnClear.addEventListener("click", (e) => {
        e.preventDefault(); // Evita recarregar a página
        if (cart.length === 0) return;

        if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
          clearCart();
        }
      });
    }

    // Submissão do Formulário de Checkout (Finalizar Compra)
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio do form padrão do HTML

        if (cart.length === 0) {
          alert("Seu carrinho está vazio!");
          return;
        }

        const name = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        alert(
          `Obrigado pela compra, ${name}!\nUm e-mail de confirmação foi enviado para ${email}.`,
        );

        clearCart();
        window.location.href = "./index.html"; // Redireciona para a home
      });
    }
  }
});
