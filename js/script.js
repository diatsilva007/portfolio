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
  /* Remove tudo o que não for número */
  let telefone = input.value.replace(/\D/g, "");

  /* Formatação (XX) XXXXX-XXXX */
  if (telefone.length <= 10) {
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); // Formato (XX) XXXXX-XXXX
  } else {
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); // Mantém o formato
  }

  input.value = telefone;
}

/* Efeito typing com apagar */
const texts = ["Front-End Developer", "Full-Stack Developer", "Jr. Software Engineer",];
const typingEffect = document.getElementById("typing-effect");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];
  const speed = isDeleting ? 50 : 100; // Velocidade de digitação e apagamento

  if (isDeleting) {
    typingEffect.textContent = currentText.substring(0, charIndex--);
  } else {
    typingEffect.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000); // Pausa antes de apagar
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // Avança para o próximo texto
    setTimeout(type, 500); // Pausa antes de começar a digitar o próximo
  } else {
    setTimeout(type, speed);
  }
}

type();

 // Script para alternar visibilidade do conteúdo "Leia Mais"
 document.getElementById('leiaMaisBtn').addEventListener('click', function () {
  var content = document.getElementById('leiaMais');
  if (content.classList.contains('hidden-content')) {
      content.classList.remove('hidden-content');
      content.classList.add('visible-content');
  } else {
      content.classList.remove('visible-content');
      content.classList.add('hidden-content');
  }
});