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
