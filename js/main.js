// --------LIGHT/DARK MODE--------
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
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

const productsContainer = document.getElementById("products-container");
const categoryButtons = document.querySelectorAll(".nav .buttons button");

//--------LISTAGEM DE PRODUTOS--------
function renderProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p>Nenhum curso encontrado.</p>";
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
