// --------REFERENCIAS DO DOM--------
const productsContainer = document.getElementById("products-container");
const categoryButtons = document.querySelectorAll(".nav .buttons button");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");

let activeCategory = "Todos";

//--------LISTAGEM DE PRODUTOS--------
function renderProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML =
      '<p class="no-results">Nenhum curso encontrado.</p>';
    return;
  }

  productList.forEach((product) => {
    const productCard = `
  <div class="product-card">
    <span class="product-badge">${product.level}</span>
    <img src="${product.image}" alt="${product.title}" class="product-image"/>

    <div class="product-info">
      <span class="product-category">${product.category}</span>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-instructor">${product.instructor}</p>
      <p class="product-duration">${product.duration}</p>

      <div class="product-footer">
        <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
        <button class="btn-add-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
  `;

    productsContainer.innerHTML += productCard;
  });
}

// --------FILTRAGEM DE TIPOS DE CURSOS--------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

function filterAndRender(categoryName) {
  if (categoryName === "Todos" || !categoryName) {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(
    (product) => product.category === categoryName,
  );

  renderProducts(filteredProducts);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    filterAndRender(selectedCategory);
  });
});

// --------BUSCA POR TEXTO--------

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Todos" || !activeCategory
        ? true
        : product.category === activeCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm) ||
      product.instructor.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderProducts(filteredProducts);
}

searchInput.addEventListener("input", applyFilters);
searchBtn.addEventListener("click", applyFilters);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    activeCategory = button.dataset.category;
    applyFilters();
  });
});

// --------ADICIONAR AO CARRINHO--------
productsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-add-cart")) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (typeof products !== "undefined") {
    renderProducts(products);
  }
});

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  const icon = menuToggle.querySelector("i");

  const setOpen = (open) => {
    navMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  };

  menuToggle.addEventListener("click", () => {
    setOpen(!navMenu.classList.contains("open"));
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.closest("button")) setOpen(false);
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}
