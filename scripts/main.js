/**
 * NEWRICHARD BEAUTY & HAIR & BARBERSHOP
 * Interactive Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initServiceFilter();
  initServiceModal();
  initContactForm();
  initBookingModal();
  initSmoothScroll();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!hamburgerBtn || !drawer || !overlay) return;

  const openMenu = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. SERVICE CATEGORY FILTERING
   ========================================================================== */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. SERVICE DETAIL MODAL (FULL TEXT FROM SPEC)
   ========================================================================== */
const serviceDetailsData = {
  "corte-de-cabelo": {
    title: "Corte de Cabelo",
    subtitle: "newRichard • Cabelos & Estilo",
    content: "Você quer mudar o corte de cabelo, não aguenta mais o visual e olhar tanta revista só deixa você mais confusa? Conheça nossos profissionais que vão fazer a sua cabeça.<br><br>Aqui você encontra profissionais que se inspiram nas principais tendências mundiais. Além disso, você pode escolher um corte do seu estilo no nosso catálogo, com muitos modelos desenvolvidos pelos nossos profissionais.<br><br>Camadas, franjas em diagonal, degradês, cortes retos, curtos, médios, longos, enfim, temos de tudo para oferecer a você! Pergunte a um de nossos especialistas qual é o tipo que melhor se enquadra no seu rosto, na estrutura dos seus cabelos e, o mais importante, na sua personalidade.",
    unit: "Salão Principal — 5 Andares"
  },
  "arte-unhas": {
    title: "Arte Unhas",
    subtitle: "newRichard • Esmalteria & Cuidados",
    content: "Decoração, unhas de porcelana, unhas Nova York e de silicone.<br><br>Utilizamos materiais descartáveis e esterilizados com o que há de mais avançado em termo de bio-segurança, a autoclave, rigorosamente aprovada pelo Ministério da Saúde para sua total tranquilidade e beleza duradoura.",
    unit: "Esmalteria NewRichard"
  },
  "manicures": {
    title: "Manicures & Pedicures",
    subtitle: "newRichard • Esmalteria & Cuidados",
    content: "As melhores e mais atualizadas manicures do mercado estão aqui no NewRichard. Protocolos completos de higienização, esmaltação tradicional e em gel, com acabamento impecável.<br><br>Marque um horário e venha conferir o padrão de atendimento que nos consagrou.",
    unit: "Esmalteria NewRichard"
  },
  "banho-de-lua": {
    title: "Banho de Lua",
    subtitle: "newRichard • Estética Corporal",
    content: "Um banho de beleza com ação anti-stress. Doura os pelos, esfolia e hidrata profundamente a pele, promovendo a renovação das células e proporcionando um toque aveludado inigualável.<br><br>Para um serviço completo, finalize com um banho de imersão e óleos essenciais. Uma experiência revigorante e relaxante.",
    unit: "Spa & Estética NewRichard"
  },
  "depilacao": {
    title: "Depilação Tradicional",
    subtitle: "newRichard • Estética & Cuidados",
    content: "Trabalhamos com cera industrializada, quente ou fria de primeira linha, sob todos os cuidados rigorosos de higiene, dentro de todos os padrões de biossegurança e conforto exigidos pela vigilância sanitária.",
    unit: "Estética & Depilação"
  },
  "depilacao-linha": {
    title: "Depilação com Linha",
    subtitle: "Técnica Egípcia / Chinesa",
    content: "A depilação com linha, também conhecida como depilação chinesa ou egípcia, é uma técnica milenar de altíssima precisão usada há séculos no Oriente e consagrada nos maiores salões da Europa e EUA.<br><br>É um método 100% higiênico, que elimina até 95% dos pelos sem agredir ou manchar a pele, afina a quantidade dos fios, mantém a área depilada por muito mais tempo, remove inclusive penugens imperceptíveis e confere um clareamento e iluminação naturais à derme.",
    unit: "Estética Facial"
  },
  "penteado": {
    title: "Penteados de Alta Costura",
    subtitle: "newRichard • Festas & Galas",
    content: "O penteado sempre coroa as ocasiões inesquecíveis. Nossos hair stylists dominam as últimas tendências internacionais para cada estação do ano.<br><br>Penteados clássicos, desconstruídos, semi-presos, tranças sofisticadas e coques esculturais que realçam a elegância e atraem olhares em grandes eventos ou celebrações exclusivas.",
    unit: "Salão Principal"
  },
  "dia-de-noiva": {
    title: "Dia de Noiva VIP",
    subtitle: "Experiência Exclusiva & Suíte Privativa",
    content: "Tratamento VIP para o dia mais especial da sua vida. O pacote completo inclui: banho de lua, depilação completa (axila, virilha, buço e sobrancelha), massagem corporal relaxante, hidromassagem, sauna privativa, almoço gourmet, mesa de frutas frescas e champanhe, pé e mão impecáveis, penteado exclusivo e maquiagem de alta fixação.<br><br>Tudo preparado em uma suíte privativa e luxuosa para você viver momentos mágicos e inesquecíveis.",
    unit: "Suíte Presidencial de Noivas"
  },
  "balayagem-ombre": {
    title: "Balayagem e Ombré Hair",
    subtitle: "Técnicas de Iluminação & Cor Mundial",
    content: "Quando as grandes celebridades começaram a desfilar com cabelos radiantes, com brilho tridimensional sem perder a naturalidade, todas as atenções se voltaram para a Balayagem e o Ombré Hair.<br><br>A <strong>Balayage</strong> cria mechas luminosas distribuídas estrategicamente por toda a cabeça, ideal para clarear e valorizar o movimento. O <strong>Ombré Hair</strong> proporciona uma transição suave e degradê a partir da raiz ou comprimento até pontas mais claras com efeito degradê suave.<br><br>Nossos coloristas premiados utilizam produtos de ponta (Wella / L'Oréal) para garantir fios saudáveis, macios e reluzentes.",
    unit: "Color Studio NewRichard"
  },
  "podologa": {
    title: "Podologia Clínica & Bem-Estar",
    subtitle: "newRichard • Saúde dos Pés",
    content: "Atendimento especializado com profissional podóloga qualificada, realizando a extração cuidadosa de calosidades, hiperqueratoses, tratamento e desencravamento de unhas, reflexologia e hidratação profunda.<br><br>Equipamentos 100% esterilizados em autoclave e procedimentos que garantem alívio, saúde e estética aos seus pés.",
    unit: "Gabinete de Podologia"
  },
  "coloracao": {
    title: "Coloração & Tonalização Avançada",
    subtitle: "newRichard • Color Specialists",
    content: "Desde as primeiras civilizações as mulheres transformam a cor dos cabelos para expressar sua força e elegância. No NewRichard, unimos essa paixão às mais modernas técnicas globais de colorimetria, coberturas de fios brancos com efeito luminoso e proteção máxima da fibra capilar.",
    unit: "Color Studio NewRichard"
  },
  "maquiagem-definitiva": {
    title: "Maquiagem Definitiva & Micropigmentação",
    subtitle: "newRichard • Estética Facial",
    content: "A Maquiagem Definitiva tem como objetivo realçar sua beleza de forma harmônica e natural, conferindo simetria perfeita às sobrancelhas e contorno aos olhos e lábios, sem a necessidade de retoques constantes no dia a dia.",
    unit: "Gabinete de Micropigmentação"
  },
  "maquiagem": {
    title: "Maquiagem Profissional (Social & Editorial)",
    subtitle: "newRichard • Make-up Artists",
    content: "Mais ousada ou com um glow natural minimalista: nossos maquiadores são verdadeiros artistas que dominam técnicas de contorno, iluminação e durabilidade com cosméticos internacionais das marcas mais consagradas.<br><br>Pronta para casamentos, formaturas, fotos e eventos marcantes.",
    unit: "Make-up Lounge"
  },
  "permanente-cilios": {
    title: "Permanente & Lifting de Cílios",
    subtitle: "newRichard • Olhar Marcante",
    content: "Ideal para quem deseja cílios naturalmente curvados, alongados e com efeito rímel prolongado, abrindo o olhar com elegância e praticidade para sua rotina diária.",
    unit: "Lash Lounge"
  },
  "barbershop": {
    title: "BarberShop By NewRichard",
    subtitle: "Tradição, Toalha Quente & Cerveja Gelada",
    content: "Os bons tempos voltaram! Toalha quente, navalha e tesoura em um espaço exclusivo dedicado aos homens que prezam por estilo e bem-estar.<br><br>Cortes masculinos modernos e clássicos, barba desenhada na navalha com hidratação de óleos nobres, e uma cerveja gelada em um ambiente exclusivo na Rua Marechal Deodoro, 38.",
    unit: "BarberShop — Rua Mal. Deodoro, 38"
  }
};

function initServiceModal() {
  const modalBackdrop = document.getElementById('serviceModal');
  if (!modalBackdrop) return;

  const modalTitle = document.getElementById('modalServiceTitle');
  const modalSubtitle = document.getElementById('modalServiceSubtitle');
  const modalBody = document.getElementById('modalServiceBody');
  const modalUnit = document.getElementById('modalServiceUnit');
  const modalBookBtn = document.getElementById('modalServiceBookBtn');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');

  const openServiceModal = (serviceId) => {
    const data = serviceDetailsData[serviceId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.content;
    modalUnit.textContent = data.unit;

    const encodedText = encodeURIComponent(`Olá! Gostaria de agendar o serviço de ${data.title} no NewRichard.`);
    modalBookBtn.href = `https://wa.me/5522997638612?text=${encodedText}`;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-service-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service-trigger');
      openServiceModal(serviceId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#inputName').value.trim();
    const email = form.querySelector('#inputEmail').value.trim();
    const unit = form.querySelector('#inputUnit')?.value || 'Geral';
    const message = form.querySelector('#inputMessage').value.trim();

    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Submit animation simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Enviando dados...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Mensagem enviada com sucesso!</strong><br>Obrigado, ${name}. Um consultor da equipe NewRichard entrará em contato em breve via e-mail ou WhatsApp.`;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1000);
  });
}

/* ==========================================================================
   6. QUICK BOOKING / WHATSAPP CONCIERGE MODAL
   ========================================================================== */
function initBookingModal() {
  const bookingModal = document.getElementById('bookingModal');
  if (!bookingModal) return;

  const openBtns = document.querySelectorAll('[data-open-booking]');
  const closeBtn = bookingModal.querySelector('.modal-close-btn');
  const bookingForm = document.getElementById('quickBookingForm');

  const openModal = () => {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value;
      const service = document.getElementById('bookService').value;
      const unit = document.getElementById('bookUnit').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;

      const whatsappText = `Olá! Meu nome é ${name}. Gostaria de agendar no NewRichard:%0A- Serviço: ${service}%0A- Espaço: ${unit}%0A- Data sugerida: ${date} às ${time}.%0APoderiam confirmar a disponibilidade?`;
      
      const waUrl = `https://wa.me/5522997638612?text=${whatsappText}`;
      window.open(waUrl, '_blank');
      closeModal();
    });
  }
}

/* ==========================================================================
   7. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
