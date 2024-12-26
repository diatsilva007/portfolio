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

/* Verifica se o usuário já tem uma preferência de tema salva*/
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
}

/* Seleciona o botão para alternar o tema */
const toggleButton = document.getElementById('toggle-theme');

/* Adiciona um ouvinte de evento para trocar os temas ao clicar no botão */
toggleButton.addEventListener('click', () => {
    /* Alterna a classe "dark-mode" no body */
    document.body.classList.toggle('dark-mode');

    /* Salva a preferência do tema no localStorage */
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
});