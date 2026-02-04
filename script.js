// Navegação suave e funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando A Arte de Aprender...');
    
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollEffects();
    initCourseSystem();
    initAnimations();
    initContactForm();
    
    console.log('✅ Sistema inicializado com sucesso!');
});

// Sistema de Navegação
function initNavigation() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Scroll suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#inicio') {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('#header').offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Efeitos de Scroll
function initScrollEffects() {
    // Header com efeito de scroll
    const header = document.querySelector('#header');
    
    function handleScroll() {
        if (!header) return;
        
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// SISTEMA DE CURSOS - VERSÃO SIMPLIFICADA E FUNCIONAL
function initCourseSystem() {
    console.log('📚 Iniciando sistema de cursos...');
    
    const courseButtons = document.querySelectorAll('.curso-btn[data-curso]');
    console.log(`🎯 Encontrados ${courseButtons.length} botões de curso`);
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const courseId = this.getAttribute('data-curso');
            console.log(`🖱️ Clicou no curso: ${courseId}`);
            
            // Mapeamento direto dos cursos
            const coursePages = {
                'bonecas-pano': 'cursos/bonecas-pano.html',
                'bonecas-ponteira': 'cursos/bonecas-ponteira.html',
                'tapetes-croche': 'cursos/tapetes-croche.html',
                'bolsas-croche': 'cursos/bolsas-croche.html',
                'desenho-ilustracao': 'cursos/desenho-ilustracao.html'
            };
            
            const pageUrl = coursePages[courseId];
            
            if (pageUrl) {
                console.log(`🚀 Redirecionando para: ${pageUrl}`);
                // REDIRECIONAMENTO DIRETO - SEM FALLBACK
                window.location.href = pageUrl;
            } else {
                console.error(`❌ Curso não encontrado: ${courseId}`);
                alert('Curso em desenvolvimento! Em breve disponível.');
            }
        });
    });
    
    // Sistema de modais para os botões de "Fechar"
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const cursoDetalhes = this.closest('.curso-detalhes');
            if (cursoDetalhes) {
                cursoDetalhes.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Sistema de Animações
function initAnimations() {
    // Adiciona classe fade-in para elementos
    addFadeInClass();
    
    // Configura observer para animações
    setupScrollAnimations();
}

function addFadeInClass() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const children = section.querySelectorAll('h2, h3, p, .criadora-card, .curso-card, .noticia-card');
        children.forEach(child => {
            if (!child.classList.contains('fade-in')) {
                child.classList.add('fade-in');
            }
        });
    });
}

function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        checkFade();
        window.addEventListener('scroll', checkFade);
    }
}

// Sistema de Formulário
function initContactForm() {
    const contactForm = document.querySelector('.contato-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
}

function handleFormSubmit(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    if (!validateForm(form)) {
        return;
    }
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#EA5B6F';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
    
    return isValid;
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 10000;
        border: 3px solid #C7DB9C;
    `;
    
    successDiv.innerHTML = `
        <h3 style="color: #C7DB9C; margin-bottom: 1rem;">✅ Mensagem Enviada!</h3>
        <p>Obrigado pelo seu contato. Retornaremos em breve!</p>
        <button onclick="this.parentElement.remove()" style="
            background: #77BEF0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            margin-top: 1rem;
            cursor: pointer;
        ">Fechar</button>
    `;
    
    document.body.appendChild(successDiv);
}

// Verificar se as páginas existem (apenas para debug)
function checkCoursePages() {
    console.log('🔍 Verificando páginas de cursos...');
    
    const courses = [
        'cursos/bonecas-pano.html',
        'cursos/bonecas-ponteira.html',
        'cursos/tapetes-croche.html',
        'cursos/bolsas-croche.html',
        'cursos/desenho-ilustracao.html'
    ];
    
    courses.forEach(url => {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                console.log(response.ok ? `✅ ${url}` : `❌ ${url}`);
            })
            .catch(() => {
                console.log(`❌ ${url} (não encontrada)`);
            });
    });
}

// Executar após carregamento completo
window.addEventListener('load', function() {
    console.log('📄 Página totalmente carregada');
    checkCoursePages();
});
// JavaScript específico para páginas de cursos
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Iniciando página de curso...');
    
    initCourseNavigation();
    initCourseModules();
    initDownloadButtons();
    
    console.log('✅ Página de curso inicializada!');
});

// Controle dos módulos (abrir/fechar)
function initCourseModules() {
    document.querySelectorAll('.modulo-titulo').forEach(titulo => {
        titulo.addEventListener('click', () => {
            const modulo = titulo.parentElement;
            modulo.classList.toggle('ativo');
            
            // Alterna o ícone
            const icon = titulo.querySelector('span');
            icon.textContent = modulo.classList.contains('ativo') ? '▼' : '▶';
        });
    });
}

// Navegação do curso
function initCourseNavigation() {
    // Navegação suave para seções internas
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#inicio') {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('#header').offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Botões de download
function initDownloadButtons() {
    // Simular download do molde
    document.querySelector('.btn-download').addEventListener('click', function(e) {
        e.preventDefault();
        alert('O download do molde para boneca de 55cm começará em instantes!');
        
        // Aqui você pode adicionar a lógica real de download
        // window.location.href = 'caminho/para/o/molde.pdf';
    });
}

// Controle de progresso (pode ser expandido)
function updateProgress(percent) {
    const progressBar = document.querySelector('.progresso-bar');
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
}

// Exemplo de uso: atualizar progresso quando uma aula for concluída
function markLessonComplete(lessonNumber) {
    const lesson = document.querySelector(`.aula-numero:nth-child(${lessonNumber})`);
    if (lesson) {
        lesson.parentElement.classList.add('aula-concluida');
        lesson.textContent = '✓';
        
        // Atualizar progresso (exemplo)
        const totalLessons = document.querySelectorAll('.aula').length;
        const completedLessons = document.querySelectorAll('.aula-concluida').length;
        const progress = (completedLessons / totalLessons) * 100;
        updateProgress(progress);
    }
}

