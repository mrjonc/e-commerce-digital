// --------LIGHT/DARK MODE--------
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });
});

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
