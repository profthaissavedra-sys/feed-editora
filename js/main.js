// =============================================
//  FEED EDITORA — main.js
//  Pequenas interações do site
// =============================================

// --- 1. MARCAR O LINK ATIVO NO MENU ---
// Pega o nome do arquivo atual (ex: "catalogo.html")
const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

// Percorre todos os links do menu
document.querySelectorAll('.menu a').forEach(link => {
  const href = link.getAttribute('href');

  // Remove a classe "ativo" de todos primeiro
  link.classList.remove('ativo');

  // Adiciona "ativo" apenas no link que corresponde à página atual
  if (href === paginaAtual) {
    link.classList.add('ativo');
  }
});


// --- 2. ANIMAÇÃO DE ENTRADA AO ROLAR (scroll) ---
// Cria um "observador" que detecta quando elementos entram na tela
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      // Quando o elemento aparece na tela, adiciona a classe que dispara a animação
      entrada.target.classList.add('visivel');
    }
  });
}, {
  threshold: 0.1 // dispara quando 10% do elemento está visível
});

// Aplica o observador em cards e seções
document.querySelectorAll('.area-card, .livro-card, .numero-item').forEach(el => {
  el.classList.add('animar'); // classe inicial (escondido)
  observador.observe(el);
});


// --- 3. CSS PARA A ANIMAÇÃO (injetado via JS) ---
const estiloAnimacao = document.createElement('style');
estiloAnimacao.textContent = `
  .animar {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .animar.visivel {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(estiloAnimacao);
