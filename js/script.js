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
        const translationValue = translations[key];

        if (translationValue !== undefined) {
          // Tratar placeholders de input/textarea
          if (
            (element.tagName === "INPUT" || element.tagName === "TEXTAREA") &&
            element.placeholder &&
            key.startsWith("form-placeholder-")
          ) {
            element.placeholder = translationValue;
          }
          // Tratar elementos que podem conter HTML (como o rodapé com &copy;)
          else if (element.id === "footer" && key === "footer") {
            const currentYear = new Date().getFullYear(); // Obtém o ano atual
            element.innerHTML = translationValue.replace("{YEAR}", currentYear); // Substitui {YEAR} pelo ano atual
          }
          // Tratar outros elementos com textContent
          else {
            element.textContent = translations[key];
          }
        } else {
          console.warn(
            `Translation key "${key}" not found for language "${language}". Element:`,
            element
          );
        }
      });
      // Atualizar o lang da tag <html>
      document.documentElement.lang = language === "pt" ? "pt-br" : language;
    })
    .catch((error) => {
      console.error("Error loading translation file:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed. Initializing scripts...");

  // --- Configuração Inicial de Idioma (será tratada pela nova lógica abaixo) ---
  // setLanguage("en"); // REMOVIDO - A nova lógica de idioma cuidará disso.

  // Atualizar o ano no rodapé
  const currentYearSpan = document.getElementById("currentYear"); // Corrigido para 'currentYear'
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  // ==========================================================================
  // LÓGICA DE IDIOMA
  // ==========================================================================
  const languageButtons = document.querySelectorAll(".language-switcher");
  let activeLanguage = localStorage.getItem("selectedLanguage") || "pt"; // Padrão 'pt'

  function updateActiveButtonVisuals(selectedLang) {
    languageButtons.forEach((button) => {
      if (button.dataset.lang === selectedLang) {
        button.classList.add("active-lang");
        button.setAttribute("aria-pressed", "true");
      } else {
        button.classList.remove("active-lang");
        button.setAttribute("aria-pressed", "false");
      }
    });
  }

  function changeAndApplyLanguage(lang) {
    // 1. Chamar a função de tradução existente (setLanguage definida globalmente neste arquivo)
    setLanguage(lang); // Esta função busca o JSON e atualiza o DOM

    // 2. Atualizar o idioma ativo na lógica e no localStorage
    activeLanguage = lang;
    localStorage.setItem("selectedLanguage", lang);

    // 3. Atualizar o estado visual dos botões de bandeira
    updateActiveButtonVisuals(lang);

    // 4. O atributo lang da tag <html> já é atualizado dentro da função setLanguage.
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const langToSet = this.dataset.lang;
      changeAndApplyLanguage(langToSet);
    });
  });

  changeAndApplyLanguage(activeLanguage); // Aplicar idioma inicial
});

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
      disableOnInteraction: true, // O autoplay SERÁ desabilitado após interações do usuário (swipe, botões, etc.)
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

  // --- MELHORIA DE USABILIDADE PARA MOBILE: Pausar autoplay ao clicar no slide ---
  // Adicionado após a inicialização do portfolioSwiper
  const portfolioSlides = document.querySelectorAll(
    ".portfolio-swiper .swiper-slide"
  );
  portfolioSlides.forEach((slide) => {
    slide.addEventListener("click", function () {
      // Verifica se é uma visualização móvel (ex: largura da tela menor que 640px,
      // que é o breakpoint onde o layout do swiper começa a mudar no seu código)
      // Ajuste o valor 640 conforme os breakpoints do seu Swiper/CSS, se necessário.
      if (window.innerWidth < 640) {
        // Usando 640px baseado nos seus breakpoints do Swiper
        if (
          portfolioSwiper &&
          portfolioSwiper.autoplay &&
          portfolioSwiper.autoplay.running
        ) {
          portfolioSwiper.autoplay.stop();
        }
      }
    });
  });

  // --- MELHORIA ADICIONAL: Reiniciar autoplay ao clicar fora do Swiper ---
  // Este listener é adicionado ao documento para capturar cliques.
  // Ele só é relevante e funcional se o portfolioSwiper foi inicializado.
  document.addEventListener("click", function (event) {
    // Verifica se:
    // 1. A instância do portfolioSwiper existe e seu elemento DOM (portfolioSwiper.el) também.
    // 2. O clique NÃO ocorreu dentro do elemento do Swiper (ou seja, o clique foi fora).
    // 3. O autoplay do Swiper existe.
    // 4. O autoplay não está rodando atualmente.
    // 5. A configuração `disableOnInteraction` está ativa (o que significa que o autoplay foi parado por uma interação).
    if (
      portfolioSwiper &&
      portfolioSwiper.el &&
      !portfolioSwiper.el.contains(event.target) &&
      portfolioSwiper.autoplay &&
      !portfolioSwiper.autoplay.running &&
      portfolioSwiper.params.autoplay.disableOnInteraction
    ) {
      // Se todas as condições acima forem verdadeiras, reinicia o autoplay.
      portfolioSwiper.autoplay.start();
    }
  });
} else {
  console.warn(
    "Container do Portfolio Swiper (.portfolio-swiper) não encontrado."
  );
}
// ==========================================================================

// Máscara de telefone para o formulário de contato
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
// ======================================================================================================

// ======================================================================================================
// Código para o formulário de contato

document.addEventListener("DOMContentLoaded", () => {
  // Unificando com o listener existente
  const contactForm = document.getElementById("contactForm");
  const formStatusMessage = document.getElementById("form-submission-status");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Previne o envio padrão do formulário
      handleFormSubmit();
    });

    // Adicionar event listeners para validação em tempo real (on input/blur)
    const inputsToValidate = contactForm.querySelectorAll(
      "input[required], textarea[required]"
    );
    inputsToValidate.forEach((input) => {
      input.addEventListener("input", () => validateField(input));
      input.addEventListener("blur", () => validateField(input)); // Corrigido: 'R=>' para '=>'
    });
  }
  function validateField(field) {
    let isValid = true;
    let errorMessage = "";
    const fieldId = field.id;
    const errorDisplay = document.getElementById(`${fieldId}ErrorMessage`);
    const inputBox = field.closest(".input-box"); // Para adicionar/remover classes de ícone

    // Remover classes de erro/sucesso e ocultar mensagem antes de revalidar
    field.classList.remove("error-field", "valid-field");
    if (inputBox) {
      // Textarea não terá ícone diretamente, mas o input sim
      // A lógica de mostrar/ocultar ícone é melhor tratada pelas classes .valid-field/.error-field no CSS
      // e o JS apenas adiciona/remove essas classes do input/textarea.
      // O CSS já cuida de mostrar o ícone baseado na classe do input.
    }
    if (errorDisplay) {
      errorDisplay.textContent = "";
      errorDisplay.classList.remove("visible");
    }

    // Lógica de validação específica para cada campo
    if (field.hasAttribute("required") && field.value.trim() === "") {
      isValid = false;
      errorMessage = "Este campo é obrigatório."; // Você pode usar chaves de tradução aqui
    } else {
      if (field.type === "email") {
        if (!isValidEmail(field.value.trim())) {
          isValid = false;
          errorMessage =
            currentTranslations["error-invalid-email"] ||
            "Por favor, insira um e-mail válido.";
        }
      }
      // Adicione mais validações aqui (ex: telefone, assunto, etc.)
      if (field.id === "phone") {
        // Exemplo: validar se o telefone (após a máscara) tem um mínimo de dígitos
        const phoneDigits = field.value.replace(/\D/g, ""); // Remove não dígitos
        if (phoneDigits.length < 10) {
          // Exemplo: mínimo de 10 dígitos
          isValid = false;
          errorMessage =
            currentTranslations["error-invalid-phone"] ||
            "Por favor, insira um telefone válido.";
        }
      }
    }

    if (!isValid) {
      field.classList.add("error-field");
      if (errorDisplay) {
        errorDisplay.textContent = errorMessage;
        errorDisplay.classList.add("visible");
      }
    } else {
      field.classList.add("valid-field");
      // O ícone de check é o feedback de sucesso.
    }
    return isValid;
  }

  function validateAllFields() {
    let isFormValid = true;
    const fieldsToValidate = contactForm.querySelectorAll(
      "input[required], textarea[required]"
    );
    fieldsToValidate.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  async function handleFormSubmit() {
    clearStatusMessage(); // Limpa mensagens de status anteriores
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!validateAllFields()) {
      showStatusMessage(
        currentTranslations["error-form-invalid"] ||
          "Por favor, corrija os erros no formulário.",
        "error"
      );
      return; // Impede o envio se a validação falhar
    }

    // Adicionar estado de carregamento ao botão
    submitButton.classList.add("loading");
    submitButton.disabled = true;
    const originalButtonText = submitButton.textContent; // Salva o texto original

    // Usar a tradução atual para "Enviando..."
    const sendingText =
      currentTranslations["form-button-sending"] ||
      (document.documentElement.lang === "en" ? "Sending" : "Enviando");

    // O CSS já cuida dos "..." com .loading::after, então não precisamos do span aqui.
    submitButton.textContent = sendingText;

    // Simulação de envio AJAX (substitua pelo seu código de envio real)
    // Se você está usando Formspree e quer manter o envio padrão,
    // você pode remover o event.preventDefault() e esta parte de AJAX.
    // Mas para feedback sem recarregar a página, AJAX é melhor.

    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute("action");

    try {
      // Verifica o campo honeypot
      if (formData.get("honeypot") && formData.get("honeypot").trim() !== "") {
        console.warn("Honeypot field filled. Likely spam.");
        showStatusMessage(
          currentTranslations["error-form-submit"] ||
            "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
          "error"
        ); // Mensagem genérica para spam
        // Não envie o formulário
        return; // Importante: sair da função aqui
      }

      const response = await fetch(formAction, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showStatusMessage(
          currentTranslations["success-form-submit"] ||
            "Mensagem enviada com sucesso!",
          "success"
        );
        contactForm.reset(); // Limpa o formulário
        // Limpar classes de validação dos campos
        contactForm
          .querySelectorAll(".valid-field, .error-field")
          .forEach((el) => {
            el.classList.remove("valid-field", "error-field");
          });
        contactForm.querySelectorAll(".form-message.visible").forEach((el) => {
          el.classList.remove("visible");
          el.textContent = "";
        });
      } else {
        // Tenta obter a mensagem de erro do Formspree
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          const formspreeError = data.errors
            .map((err) => err.message)
            .join(", ");
          showStatusMessage(
            `${
              currentTranslations["error-prefix"] || "Erro"
            }: ${formspreeError}`,
            "error"
          );
        } else {
          console.error("Formspree error response (no detailed errors):", data); // Adicione este log
          showStatusMessage(
            currentTranslations["error-form-submit"] ||
              "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      showStatusMessage(
        currentTranslations["error-connection"] ||
          "Ocorreu um erro de conexão. Verifique sua internet e tente novamente.",
        "error"
      );
    } finally {
      // Remover estado de carregamento do botão
      submitButton.classList.remove("loading");
      submitButton.disabled = false;
      // Restaurar texto original do botão (considerando tradução)
      const buttonTranslateKey = submitButton.getAttribute("data-translate");
      let translatedButtonText = originalButtonText; // Fallback para o texto que estava antes do "Sending"
      if (buttonTranslateKey && currentTranslations[buttonTranslateKey]) {
        translatedButtonText = currentTranslations[buttonTranslateKey];
      } else if (document.documentElement.lang === "en") {
        // Fallback específico se a chave não for encontrada mas o idioma for inglês
        translatedButtonText = "Send Message";
      }
      submitButton.textContent = translatedButtonText;
    }
  }

  function isValidEmail(email) {
    // Expressão regular simples para validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showStatusMessage(message, type) {
    // type pode ser 'success' ou 'error'
    formStatusMessage.textContent = message;
    formStatusMessage.className = "form-submission-status-message"; // Reseta classes
    formStatusMessage.classList.add(type); // Adiciona success ou error
    formStatusMessage.style.display = "block"; // Torna visível
  }

  function clearStatusMessage() {
    formStatusMessage.textContent = "";
    formStatusMessage.style.display = "none";
    formStatusMessage.className = "form-submission-status-message"; // Reseta classes
  }

  // Função para máscara de telefone (você já tem uma, mas para referência)
  // window.mascaraTelefone = function(telefoneInput) { ... }
  // A função mascaraTelefone já está definida globalmente neste arquivo.
});
// Fim do código para o formulário de contato

// ==========================================================================
// Testimonials Swiper Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Garante que o DOM está carregado
  const testimonials = [
    {
      text: "Quero agradecer à DAS Digital Solutions pelo excelente trabalho realizado em nosso site! O resultado ficou super didático, criativo e com uma navegação fácil e intuitiva. Parabéns pela dedicação e profissionalismo. Super recomendo!",
      author: "Geisiane da Costa",
      role: "Gerente da Mega Dogão Carioca",
      avatar: "img/avatars/Geisiane-da-Costa.jpg", // Substitua pela URL real
      // Adicione a chave 'translateKeyText', 'translateKeyAuthor', 'translateKeyRole' se for traduzir dinamicamente
    },
    {
      text: "A aplicação web que o Diogo desenvolveu para nós superou todas as expectativas. É intuitiva, rápida e melhorou significativamente nosso fluxo de trabalho.",
      author: "Carlos Pereira",
      role: "Diretor de Operações, Designs Criativos Co.",
      avatar: "https://placehold.co/100x100/00eeff/1f242d?text=CP", // Substitua pela URL real
    },
    {
      text: "Profissionalismo exemplar e um olhar atento aos detalhes. O Diogo entregou um produto de alta qualidade dentro do prazo.",
      author: "Mariana Costa",
      role: "CEO, Inovações Digitais",
      avatar: "https://placehold.co/100x100/00eeff/1f242d?text=MC", // Substitua pela URL real
    },
    // Para adicionar um novo depoimento, basta adicionar um novo objeto aqui.
    // Localize as imagens: Certifique-se de que as imagens reais dos avatares estejam em alguma pasta dentro do seu projeto (por exemplo, uma pasta img/avatars/).
    // Exemplo:
    // {
    //     text: "Novo depoimento incrível sobre o trabalho.",
    //     author: "Cliente Satisfeito",
    //     role: "Empreendedor",
    //     avatar: "url_da_imagem_do_avatar.jpg"
    // }
  ];

  const testimonialWrapper = document.getElementById("testimonial-wrapper");
  if (testimonialWrapper) {
    testimonials.forEach((testimonial) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      // Você pode adicionar atributos data-translate aqui se os textos dos depoimentos também precisarem de tradução
      slide.innerHTML = `
                <div class="testimonial-box">
                    <div class="testimonial-header">
                        <img src="${testimonial.avatar}" alt="Avatar de ${testimonial.author}" class="testimonial-avatar">
                        <i class="fas fa-quote-left testimonial-quote-icon"></i>
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-footer">
                        <h4 class="testimonial-author">${testimonial.author}</h4>
                        <p class="testimonial-role">${testimonial.role}</p>
                    </div>
                </div>
            `;
      testimonialWrapper.appendChild(slide);
    });

    const testimonialSwiperInstance = new Swiper(".testimonial-swiper", {
      // Salva a instância
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      speed: 1200, // Aumenta a velocidade da transição para mais suavidade (em ms)
      autoplay: {
        delay: 4000, // Diminui o tempo para uma rotação mais frequente
        disableOnInteraction: false, // Continua o autoplay após interação manual
        pauseOnMouseEnter: true, // Pausa quando o mouse entra no contêiner do Swiper
      },
      pagination: {
        el: ".testimonial-swiper-pagination", // Seletor único para paginação
        clickable: true,
      },
      navigation: false, // Desabilita as setas de navegação
      breakpoints: {
        // Responsividade
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2.5, // Mostrar parte do próximo para incentivar a rolagem/descoberta
          spaceBetween: 40,
        },
      },
    });
    console.log("Testimonial Swiper inicializado.");
  } else {
    console.warn(
      "Container do Testimonial Swiper (#testimonial-wrapper) não encontrado."
    );
  }
});

// ==========================================================================
// Testimonials Parallax Mouse Effect
// ==========================================================================
// Este bloco também inicializa o data-attribute para o scroll parallax
document.addEventListener("DOMContentLoaded", () => {
  const testimonialsSection = document.querySelector(".testimonials");
  const testimonialSwiperContainer = testimonialsSection
    ? testimonialsSection.querySelector(".testimonial-swiper")
    : null;

  if (testimonialsSection && testimonialSwiperContainer) {
    const parallaxIntensityMouse = 8; // Quão forte o efeito parallax do MOUSE será.
    // Valores menores = mais sutil.
    // Inicializa o data-attribute que será usado pelo scroll parallax e lido aqui
    testimonialSwiperContainer.dataset.scrollTranslateY = 0;

    testimonialsSection.addEventListener("mousemove", (e) => {
      const rect = testimonialsSection.getBoundingClientRect();
      // Calcula a posição do mouse relativa ao centro da seção de depoimentos
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normaliza a posição do mouse (de -1 a 1)
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateY = deltaX * parallaxIntensityMouse;
      const rotateX = -deltaY * parallaxIntensityMouse;

      // Lê o valor do translateY definido pelo parallax de scroll
      const scrollTranslateY = parseFloat(
        testimonialSwiperContainer.dataset.scrollTranslateY || 0
      );

      testimonialSwiperContainer.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98) translateY(${scrollTranslateY}px)`;

      // Armazena a última posição do mouse para o scroll parallax poder "simular" um mousemove
      testimonialsSection.lastHoverClientX = e.clientX;
      testimonialsSection.lastHoverClientY = e.clientY;
    });

    testimonialsSection.addEventListener("mouseleave", () => {
      const scrollTranslateY = parseFloat(
        testimonialSwiperContainer.dataset.scrollTranslateY || 0
      );
      testimonialSwiperContainer.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(${scrollTranslateY}px)`;
    });
  }
});
// ======================================================================================================

// ==========================================================================
// Testimonials Scroll Parallax Effect (NOVO)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const testimonialsSection = document.querySelector(".testimonials");
  const testimonialSwiperContainer = testimonialsSection
    ? testimonialsSection.querySelector(".testimonial-swiper")
    : null;

  if (testimonialsSection && testimonialSwiperContainer) {
    const scrollParallaxIntensity = 0.1; // Intensidade do parallax de scroll. Valores entre 0.05 e 0.2 são geralmente sutis.

    function applyScrollParallax() {
      const sectionRect = testimonialsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let translateY = 0;

      if (sectionRect.bottom >= 0 && sectionRect.top <= windowHeight) {
        const sectionCenterY = sectionRect.top + sectionRect.height / 2;
        const viewportCenterY = windowHeight / 2;
        const difference = sectionCenterY - viewportCenterY;
        translateY = difference * scrollParallaxIntensity;
      }

      testimonialSwiperContainer.dataset.scrollTranslateY =
        translateY.toFixed(2);

      if (testimonialsSection.matches(":hover")) {
        const lastX =
          testimonialsSection.lastHoverClientX ||
          sectionRect.left + sectionRect.width / 2;
        const lastY =
          testimonialsSection.lastHoverClientY ||
          sectionRect.top + sectionRect.height / 2;
        const mouseMoveEvent = new MouseEvent("mousemove", {
          clientX: lastX,
          clientY: lastY,
          bubbles: true,
          cancelable: true,
        });
        testimonialsSection.dispatchEvent(mouseMoveEvent);
      } else {
        testimonialSwiperContainer.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(${translateY}px)`;
      }
    }

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            applyScrollParallax();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    applyScrollParallax();
  }
});
// ======================================================================================================
