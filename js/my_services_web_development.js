// Script para alternar visibilidade do conteúdo "Leia Mais"
document.getElementById("leiaMaisBtn").addEventListener("click", function () {
  var content = document.getElementById("leiaMais");
  if (content.classList.contains("hidden-content")) {
    content.classList.remove("hidden-content");
    content.classList.add("visible-content");
  } else {
    content.classList.remove("visible-content");
    content.classList.add("hidden-content");
  }
});

// JavaScript (para adicionar a classe quando o usuário rolar para baixo)
window.onscroll = function () {
  const footer = document.querySelector("footer");
  if (window.scrollY > 100) {
    // Muda a classe após o scroll de 100px
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};

function toggleMenu() {
  const nav = document.querySelector(".nav-responsive");
  menuHamburguer.classList.toggle("change");

  if (menuHamburguer.classList.contains("change")) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}

// Adiciona evento de clique ao menu hambúrguer
const menuHamburguer = document.querySelector(".menu-hamburguer");
menuHamburguer.addEventListener("click", (event) => {
  event.stopPropagation(); // Impede que o clique se propague para o documento
  toggleMenu();
});

// Adiciona evento de clique ao documento
document.addEventListener("click", (event) => {
  const nav = document.querySelector(".nav-responsive");
  if (menuHamburguer.classList.contains("change")) {
    if (!nav.contains(event.target) && !menuHamburguer.contains(event.target)) {
      toggleMenu();
    }
  }
});

// Script para traduzir o site
function setLanguage(language) {
  fetch(`/translations/${language}.json`)
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[key];
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en"); // Define o idioma padrão como inglês
});
