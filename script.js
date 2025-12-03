// Navegação entre telas
function navegarPara(telaId) {
    // Remove classe active de todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Adiciona classe active na tela desejada
    const telaAlvo = document.getElementById(telaId);
    if (telaAlvo) {
        telaAlvo.classList.add('active');

        // Scroll para o topo
        window.scrollTo(0, 0);

        // Fecha o menu se estiver aberto
        document.querySelector('.nav-list').classList.remove('active');

        // Reinicia animações da tela
        reiniciarAnimacoes(telaAlvo);
    }
}

// Reiniciar animações quando entrar na tela
function reiniciarAnimacoes(tela) {
    const elementos = tela.querySelectorAll('.card, .tri-card, .explanation-box, .charges');
    elementos.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
}

// Toggle do menu de navegação
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('navMenu');
    const navList = document.querySelector('.nav-list');

    if (!navMenu.contains(e.target) && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
});

// Modal para imagem ampliada
function abrirModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');

    modal.classList.add('active');
    modalImg.src = src;
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModal();
    }
});

// Suporte a gestos de swipe para mobile
let touchStartX = 0;
let touchEndX = 0;

const telas = ['inicio', 'introducao', 'cargas', 'conflito', 'evitativo', 'ciclo', 'solucao', 'infografico', 'contato'];

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const threshold = 50; // Mínimo de pixels para considerar swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < threshold) return;

    const telaAtual = document.querySelector('.screen.active');
    const indexAtual = telas.indexOf(telaAtual.id);

    if (diff > 0 && indexAtual < telas.length - 1) {
        // Swipe para esquerda - próxima tela
        navegarPara(telas[indexAtual + 1]);
    } else if (diff < 0 && indexAtual > 0) {
        // Swipe para direita - tela anterior
        navegarPara(telas[indexAtual - 1]);
    }
}

// Configuração do botão WhatsApp - Drº Alessandro
const LINK_WHATSAPP = 'https://api.whatsapp.com/send?phone=556196933802&text=%F0%9F%91%8B%20Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20trabalho%20e%20atendimento%20do%20Dr%C2%BA%20Alessandro%20para%20Terapia';

document.addEventListener('DOMContentLoaded', function() {
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.href = LINK_WHATSAPP;
    }
});

// Animação das barras de carga afetiva
function animarCargas() {
    const cargas = document.querySelectorAll('.charges');
    cargas.forEach((carga, index) => {
        carga.style.animationDelay = `${index * 0.2}s`;
    });
}

// Efeito de partículas no background (opcional)
function criarParticulas() {
    const container = document.body;

    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: flutuar ${Math.random() * 10 + 10}s infinite;
        `;
        container.appendChild(particula);
    }
}

// Adicionar CSS das partículas dinamicamente
const styleParticulas = document.createElement('style');
styleParticulas.textContent = `
    @keyframes flutuar {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
        }
        50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(styleParticulas);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    criarParticulas();
    animarCargas();

    // Pré-carregar imagens
    const imagens = ['Infográfico.png', 'Cisalhamento.png'];
    imagens.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Service Worker para funcionar offline (PWA básico)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Descomente a linha abaixo quando criar o service-worker.js
        // navigator.serviceWorker.register('/service-worker.js');
    });
}

// Analytics de navegação (opcional)
function trackNavigation(tela) {
    // Integre aqui com Google Analytics ou similar se desejar
    console.log(`Usuário navegou para: ${tela}`);
}

// Versão do app
const APP_VERSION = '1.0.0';
console.log(`TRI App v${APP_VERSION} carregado com sucesso!`);
