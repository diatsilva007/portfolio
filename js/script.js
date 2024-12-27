/* Script.js here... */

/* Transformar menu hamburguer em um x */
const menuHamburguer = document.querySelector(".menu-hamburguer");
menuHamburguer.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  const nav = document.querySelector(".nav-responsive");
  menuHamburguer.classList.toggle("change");

  if (menuHamburguer.classList.contains("change")) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}

/* Código para telefone de formulário */
function mascaraTelefone(input) {
    // Remove tudo o que não for número
    let telefone = input.value.replace(/\D/g, '');

    // Formatação (XX) XXXXX-XXXX
    if (telefone.length <= 10) {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
    } else {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Mantém o formato
    }

    input.value = telefone;
}