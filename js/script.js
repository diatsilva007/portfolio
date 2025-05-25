// Efeito particle em js
particlesJS("particles-js", {
  particles: {
    number: {
      value: 55,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
    },
  },
  retina_detect: true,
});

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

// Script para traduzir o site
let currentTranslations = {}; // Variável para armazenar as traduções atuais

function setLanguage(language) {
  fetch(`/translations/${language}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((translations) => {
      currentTranslations = translations;
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations[key] !== undefined) {
          element.textContent = translations[key];
        } else {
          console.warn(
            `Translation key "${key}" not found for language "${language}".`
          );
        }
      });
    })
    .catch((error) => {
      console.error("Error loading translation file:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed. Initializing scripts...");

  // --- Configuração Inicial de Idioma ---
  setLanguage("en"); // Define o idioma padrão como inglês

  // --- Lógica de Scroll para Classe no Body ---
  window.onscroll = function () {
    if (window.scrollY > 100) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  };

  // --- Efeito Glitch ---
  const glitchElement = document.querySelector(".glitch");
  if (glitchElement) {
    glitchElement.addEventListener("mouseover", () => {
      glitchElement.style.animation = "glitch-animation 0.2s infinite";
    });
    glitchElement.addEventListener("mouseout", () => {
      glitchElement.style.animation = "glitch-animation 2s infinite";
    });
  } else {
    // console.warn("Elemento .glitch não encontrado."); // Não crítico se não estiver em todas as páginas
  }

  // --- Menu Hambúrguer ---
  const menuHamburguer = document.querySelector(".menu-hamburguer");
  const navResponsive = document.querySelector(".nav-responsive");

  if (menuHamburguer && navResponsive) {
    function toggleMenu() {
      menuHamburguer.classList.toggle("change");
      navResponsive.style.display = menuHamburguer.classList.contains("change")
        ? "block"
        : "none";
    }

    menuHamburguer.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        menuHamburguer.classList.contains("change") &&
        !navResponsive.contains(event.target) &&
        !menuHamburguer.contains(event.target)
      ) {
        toggleMenu();
      }
    });
  } else {
    // console.warn("Elementos do menu hambúrguer (.menu-hamburguer ou .nav-responsive) não encontrados.");
  }

  // --- Efeito Typing ---
  const typingEffectElement = document.getElementById("typing-effect");
  if (typingEffectElement) {
    const texts = [
      "Front-End Developer",
      "Full-Stack Developer",
      "Software Engineer",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[textIndex];
      const speed = isDeleting ? 50 : 100;

      typingEffectElement.textContent = currentText.substring(0, charIndex);
      isDeleting ? charIndex-- : charIndex++;

      if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, speed);
      }
    }
    type();
  } else {
    // console.warn("Elemento #typing-effect não encontrado.");
  }

  // --- Botão "Leia Mais" (Genérico - se usado em várias páginas com os mesmos IDs) ---
  const leiaMaisBtn = document.getElementById("leiaMaisBtn");
  const leiaMaisContent = document.getElementById("leiaMais");

  if (leiaMaisBtn && leiaMaisContent) {
    leiaMaisBtn.addEventListener("click", function () {
      leiaMaisContent.classList.toggle("hidden-content");
      leiaMaisContent.classList.toggle("visible-content");
      // Atualizar texto do botão se necessário
      // e.g., this.textContent = leiaMaisContent.classList.contains("hidden-content") ? "Read More" : "Read Less";
    });
  }

  // ==========================================================================
  // Portfolio Swiper Initialization
  // ==========================================================================
  if (document.querySelector(".portfolio-swiper")) {
    const portfolioSwiper = new Swiper(".portfolio-swiper", {
      effect: "coverflow", // Habilita o efeito Coverflow
      grabCursor: true, // Muda o cursor para "mãozinha"
      centeredSlides: true, // Slide ativo fica centralizado
      slidesPerView: "auto", // Swiper determina o número de slides visíveis com base no tamanho
      spaceBetween: 25, // Espaço entre os slides
      loop: true, // Habilita o loop contínuo

      coverflowEffect: {
        rotate: 45, // Rotação dos slides laterais
        stretch: 0, // Distância (em px) para esticar o slide. 0 para não esticar.
        depth: 120, // Profundidade do efeito (quanto menor, mais "achatado")
        modifier: 1, // Multiplicador do efeito (1 = efeito normal)
        slideShadows: true, // Habilita sombras nos slides laterais
      },

      autoplay: {
        delay: 2000, // Tempo em milissegundos entre as transições
        disableOnInteraction: false, // O autoplay não será desabilitado após interações do usuário (como swipe manual)
        pauseOnMouseEnter: true, // Pausa o autoplay quando o mouse estiver sobre o carrossel
      },

      // Paginação
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // Permite clicar nos bullets da paginação para navegar
      },

      // Botões de Navegação
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // Breakpoints para responsividade (ajuste conforme necessário)
      breakpoints: {
        // Para telas muito pequenas, podemos voltar a 1 slide visível ou ajustar o coverflow
        320: {
          slidesPerView: 1.2, // Mostra um pouco do próximo slide
          spaceBetween: 15,
          coverflowEffect: {
            // Ajustes específicos do coverflow para telas pequenas
            rotate: 50,
            depth: 100,
            modifier: 1,
          },
        },
        // Quando a largura da janela é >= 768px (ajustado de 640px para um breakpoint mais comum)
        640: {
          slidesPerView: 2.5, // Ajuste para o efeito coverflow
          spaceBetween: 30,
        },
        // Quando a largura da janela é >= 1024px
        1024: {
          slidesPerView: 3, // Mostrar 3 slides em telas maiores para coverflow
          spaceBetween: 30,
        },
        // Quando a largura da janela é >= 1200px
        1200: {
          slidesPerView: 3.5, // Permite ver partes dos slides adjacentes de forma mais clara
          spaceBetween: 35,
        },
      },

      // Opcional: Se estiver usando animações AOS nos slides e elas não dispararem corretamente
      // após a transição de slides, você pode precisar atualizar o AOS.
      on: {
        slideChangeTransitionEnd: function () {
          if (typeof AOS !== "undefined") {
            AOS.refresh(); // Atualiza as animações AOS
          }
        },
        // Se o modal não estiver abrindo após a inicialização do Swiper,
        // pode ser necessário re-atribuir os event listeners dos botões do modal
        // após a inicialização do Swiper ou em cada mudança de slide.
        // No entanto, como os listeners são delegados ou aplicados a elementos que
        // já existem, isso geralmente não é necessário se o HTML do modal estiver correto.
      },
    });
    console.log("Portfolio Swiper inicializado.");
  } else {
    console.warn(
      "Container do Portfolio Swiper (.portfolio-swiper) não encontrado."
    );
  }

});
// Fim do script