/**
 * TravelSearch Official Website - Interactive Scripts
 * Domain: https://travelsearch.site
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearchDemo();
  initShowcaseTabs();
  initFaqAccordion();
  initDownloadActions();
});

/* ==========================================================================
   Navigation Bar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking outside or clicking any link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // Active link on scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  });
}

/* ==========================================================================
   Live Search Simulator Demo
   ========================================================================== */
const sampleData = {
  flights: [
    {
      airline: 'Iberia Express',
      tag: 'Más rápido',
      tagType: 'best',
      departTime: '08:45',
      arriveTime: '10:55',
      origin: 'Madrid (MAD)',
      dest: 'París (CDG)',
      duration: '2h 10m',
      stops: 'Vuelo directo',
      price: '84 €'
    },
    {
      airline: 'Air France',
      tag: 'Recomendado',
      tagType: 'best',
      departTime: '14:20',
      arriveTime: '16:35',
      origin: 'Madrid (MAD)',
      dest: 'París (CDG)',
      duration: '2h 15m',
      stops: 'Vuelo directo',
      price: '96 €'
    },
    {
      airline: 'Lufthansa',
      tag: 'Económico',
      tagType: 'eco',
      departTime: '06:30',
      arriveTime: '11:40',
      origin: 'Madrid (MAD)',
      dest: 'París (CDG)',
      duration: '5h 10m',
      stops: '1 escala (FRA)',
      price: '72 €'
    }
  ],
  hotels: [
    {
      airline: 'Grand Hotel Montmartre ★★★★',
      tag: 'Excelente 4.9',
      tagType: 'best',
      departTime: 'Check-in: 15:00',
      arriveTime: 'Check-out: 11:00',
      origin: 'París, Francia',
      dest: 'Cerca de Sacré-Cœur',
      duration: 'Wifi + Piscina',
      stops: 'Cancelación gratis',
      price: '118 € / noche'
    },
    {
      airline: 'Hôtel Le Marais Boutique ★★★★',
      tag: 'Más popular',
      tagType: 'best',
      departTime: 'Check-in: 14:00',
      arriveTime: 'Check-out: 12:00',
      origin: 'París, Francia',
      dest: 'Barrio Le Marais',
      duration: 'Desayuno incluido',
      stops: 'Habitación Deluxe',
      price: '142 € / noche'
    },
    {
      airline: 'Eiffel View Suites ★★★',
      tag: 'Mejor precio',
      tagType: 'eco',
      departTime: 'Check-in: 15:00',
      arriveTime: 'Check-out: 11:00',
      origin: 'París, Francia',
      dest: 'Vistas a Torre Eiffel',
      duration: 'Metro a 100m',
      stops: 'Tarifa flexible',
      price: '94 € / noche'
    }
  ],
  cars: [
    {
      airline: 'Volkswagen Golf o similar',
      tag: 'Compacto',
      tagType: 'best',
      departTime: 'Recogida: Aeropuerto CDG',
      arriveTime: 'Devolución: Aeropuerto CDG',
      origin: 'Manual • 5 Plazas',
      dest: 'Aire Acondicionado',
      duration: 'Km ilimitados',
      stops: 'Seguro sin franquicia',
      price: '34 € / día'
    },
    {
      airline: 'Nissan Qashqai SUV',
      tag: 'SUV Familiar',
      tagType: 'best',
      departTime: 'Recogida: Aeropuerto CDG',
      arriveTime: 'Devolución: Aeropuerto CDG',
      origin: 'Automático • 5 Plazas',
      dest: 'Maletero Grande',
      duration: 'Km ilimitados',
      stops: 'GPS Incluido',
      price: '52 € / día'
    },
    {
      airline: 'Fiat 500 Hybrid',
      tag: 'Económico',
      tagType: 'eco',
      departTime: 'Recogida: Estación Central',
      arriveTime: 'Devolución: Estación Central',
      origin: 'Manual • 4 Plazas',
      dest: 'Bajo consumo',
      duration: 'Urbano y ágil',
      stops: 'Cancelación gratis',
      price: '26 € / día'
    }
  ]
};

function initSearchDemo() {
  const tabButtons = document.querySelectorAll('.demo-type-btn');
  const searchBtn = document.getElementById('btnDemoSearch');
  const cardsContainer = document.getElementById('demoCardsContainer');
  const resultsCount = document.getElementById('demoResultsCount');
  const labelOrigin = document.getElementById('labelOrigin');
  const labelDest = document.getElementById('labelDest');
  const inputOrigin = document.getElementById('inputOrigin');
  const inputDest = document.getElementById('inputDest');

  let currentCategory = 'flights';

  function renderCategory(cat) {
    currentCategory = cat;
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === cat);
    });

    if (cat === 'flights') {
      labelOrigin.textContent = 'Origen';
      labelDest.textContent = 'Destino';
      inputOrigin.value = 'Madrid (MAD)';
      inputDest.value = 'París (CDG)';
    } else if (cat === 'hotels') {
      labelOrigin.textContent = 'Ciudad o Destino';
      labelDest.textContent = 'Tipo de Alojamiento';
      inputOrigin.value = 'París, Francia';
      inputDest.value = 'Hotel con encanto';
    } else if (cat === 'cars') {
      labelOrigin.textContent = 'Lugar de recogida';
      labelDest.textContent = 'Categoría';
      inputOrigin.value = 'Aeropuerto Charles de Gaulle (CDG)';
      inputDest.value = 'Compacto o SUV';
    }

    renderCards(cat);
  }

  function renderCards(cat) {
    const items = sampleData[cat] || sampleData.flights;
    if (!cardsContainer) return;

    if (resultsCount) {
      resultsCount.textContent = `${items.length} opciones encontradas`;
    }

    cardsContainer.innerHTML = items.map(item => `
      <div class="travel-result-card">
        <div class="card-top-row">
          <div class="airline-badge">
            <span>✈</span>
            <strong>${item.airline}</strong>
          </div>
          <span class="tag-badge ${item.tagType}">${item.tag}</span>
        </div>
        <div class="card-route-row">
          <div class="route-endpoint">
            <span class="endpoint-time">${item.departTime}</span>
            <span class="endpoint-city">${item.origin}</span>
          </div>
          <div class="route-middle">
            <span class="route-duration">${item.duration}</span>
            <div class="route-line"></div>
            <span class="route-stops">${item.stops}</span>
          </div>
          <div class="route-endpoint" style="text-align: right;">
            <span class="endpoint-time">${item.arriveTime}</span>
            <span class="endpoint-city">${item.dest}</span>
          </div>
        </div>
        <div class="card-bottom-row">
          <div class="price-group">
            <span class="price-label">Precio final estimado</span>
            <span class="price-value">${item.price}</span>
          </div>
          <a href="#descargar" class="btn-card-action">Ver en la app</a>
        </div>
      </div>
    `).join('');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      renderCategory(btn.dataset.type);
    });
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchBtn.innerHTML = `<span>Buscando...</span>`;
      setTimeout(() => {
        searchBtn.innerHTML = `<span>Buscar en la app</span>`;
        renderCards(currentCategory);
        showToast(`Búsqueda actualizada para ${inputDest.value}`);
      }, 350);
    });
  }

  // Initial render
  renderCategory('flights');
}

/* ==========================================================================
   Showcase Interactive App Screen Selector
   ========================================================================== */
const showcaseScreens = {
  vuelos: {
    title: 'Búsqueda de Vuelos Completa y Precisa',
    desc: 'Explora aeropuertos de todo el mundo con códigos IATA, selecciona fechas de ida y vuelta o solo ida, y compara aerolíneas en una cuadrícula limpia diseñada con Jetpack Compose.',
    specs: [
      'Filtro por escalas: Vuelos directos, 1 escala o múltiples',
      'Selección de cabina: Turista, Premium Economy, Business y Primera',
      'Detalles de tarifas, equipaje incluido y políticas de cancelación',
      'Guardado instantáneo en Favoritos con un solo toque'
    ],
    screenBadge: 'Vuelos • Madrid → París',
    screenHtml: `
      <div style="background:#0284c7;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="font-size:0.75rem;opacity:0.9;">Vuelo Seleccionado</div>
        <div style="font-size:1.15rem;font-weight:800;">MAD → CDG • 84 €</div>
        <div style="font-size:0.75rem;">Iberia Express • Directo • 2h 10m</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:12px;border-radius:12px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:0.85rem;color:#0f172a;">Horario de salida</div>
        <div style="font-size:0.8rem;color:#64748b;">08:45 Barajas T4 → 10:55 Charles de Gaulle T2</div>
      </div>
      <div style="background:#f1f5f9;border-radius:8px;padding:8px 12px;font-size:0.75rem;color:#0369a1;font-weight:600;">
        ✓ Equipaje de mano incluido • Selección de asiento
      </div>
    `
  },
  hoteles: {
    title: 'Hoteles y Alojamientos con Transparencia Total',
    desc: 'Encuentra desde hoteles boutique en el centro hasta resorts de lujo. Filtra por número de huéspedes, estrellas, comodidades como piscina y wifi, y revisa fotos y opiniones verificadas.',
    specs: [
      'Filtros por categoría (3 a 5 estrellas) y precio por noche',
      'Listado de servicios: Desayuno incluido, piscina, gimnasio, parking',
      'Ubicación exacta y distancia a puntos de interés',
      'Precios finales sin comisiones ocultas ni sorpresas'
    ],
    screenBadge: 'Hoteles • París, Le Marais',
    screenHtml: `
      <div style="background:#0d9488;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="font-size:0.75rem;opacity:0.9;">Hotel Destacado ★★★★</div>
        <div style="font-size:1.15rem;font-weight:800;">Hôtel Le Marais • 118 €</div>
        <div style="font-size:0.75rem;">Cancelación gratuita hasta 24h antes</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:12px;border-radius:12px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:0.85rem;color:#0f172a;">Habitación Doble Superior</div>
        <div style="font-size:0.8rem;color:#64748b;">1 Cama Queen • Vistas a la ciudad • Baño privado</div>
      </div>
      <div style="background:#ccfbf1;border-radius:8px;padding:8px 12px;font-size:0.75rem;color:#0f766e;font-weight:600;">
        ★ 4.9/5 Excelente (482 valoraciones)
      </div>
    `
  },
  coches: {
    title: 'Alquiler de Coches para Viajar a tu Ritmo',
    desc: 'Compara vehículos de las mejores compañías de alquiler. Selecciona utilitarios económicos, coches familiares o SUVs modernos para tus escapadas por carretera.',
    specs: [
      'Categorías: Económico, Compacto, Intermedio, SUV y Premium',
      'Transmisión: Manual o Automática a elección',
      'Información transparente de depósito, franquicia y cobertura total',
      'Puntos de recogida en aeropuertos, estaciones de tren o centros urbanos'
    ],
    screenBadge: 'Coches • Aeropuerto CDG',
    screenHtml: `
      <div style="background:#f59e0b;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="font-size:0.75rem;opacity:0.9;">Vehículo Recomendado</div>
        <div style="font-size:1.15rem;font-weight:800;">Volkswagen Golf • 34 €/día</div>
        <div style="font-size:0.75rem;">Recogida en Terminal • Kilometraje ilimitado</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:12px;border-radius:12px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:0.85rem;color:#0f172a;">Características del coche</div>
        <div style="font-size:0.8rem;color:#64748b;">5 Plazas • 2 Maletas • Aire acondicionado • Apple CarPlay</div>
      </div>
      <div style="background:#fef3c7;border-radius:8px;padding:8px 12px;font-size:0.75rem;color:#b45309;font-weight:600;">
        ✓ Sin gastos de cancelación • Seguro a todo riesgo opcional
      </div>
    `
  },
  perfil: {
    title: 'Modo Invitado y Registro Fluido sin Fricción',
    desc: 'Disfruta de libertad total: explora y busca sin necesidad de registrarte. Cuando quieras reservar, un formulario ultrarrápido creará tu perfil en un paso para gestionar tus viajes.',
    specs: [
      'Navegación 100% libre como Invitado sin datos obligatorios previos',
      'Flujo de registro ágil activado únicamente al decidir comprar o reservar',
      'Sección "Mis Viajes" con historial de vuelos, hoteles y coches reservados',
      'Nivel TravelSearch Explorer y puntos acumulables en tus aventuras'
    ],
    screenBadge: 'Perfil • Modo Invitado / Registrado',
    screenHtml: `
      <div style="background:#7c3aed;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-weight:800;">TS</div>
          <div>
            <div style="font-size:0.95rem;font-weight:800;">Perfil de Viajero</div>
            <div style="font-size:0.75rem;opacity:0.85;">Estado: Invitado (Explorador)</div>
          </div>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:12px;border-radius:12px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:0.82rem;color:#0f172a;">Mis Reservas & Itinerarios</div>
        <div style="font-size:0.75rem;color:#64748b;margin-top:4px;">Crea tu perfil con un toque para asociar tus billetes y acceder sin conexión.</div>
      </div>
      <div style="background:#ede9fe;border-radius:8px;padding:8px 12px;font-size:0.75rem;color:#6d28d9;font-weight:600;">
        ★ 2.450 Puntos de bienvenida disponibles
      </div>
    `
  },
  ajustes: {
    title: 'Personalización Completa y Ajustes Locales',
    desc: 'Adapta TravelSearch a tus gustos. Cambia entre divisa Euro (€), Dólar ($), Libra (£) o Yen (¥), activa el tema oscuro AMOLED y gestiona alertas de precio inteligentes.',
    specs: [
      'Multidivisa instantánea: EUR, USD, GBP y JPY',
      'Modo Claro, Oscuro o Automático según el sistema Android',
      'Configuración de aeropuerto de origen preferido (ej. MAD, BCN, CDG)',
      'Todos los datos se guardan en el almacenamiento local seguro del dispositivo'
    ],
    screenBadge: 'Ajustes • Preferencias',
    screenHtml: `
      <div style="background:#1e293b;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="font-size:0.75rem;color:#94a3b8;">Configuración Rápida</div>
        <div style="font-size:1.05rem;font-weight:800;">Moneda: EUR (€) • Tema: Sistema</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:10px 12px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.8rem;font-weight:700;color:#0f172a;">Alertas de mejores precios</span>
        <span style="color:#10b981;font-weight:800;font-size:0.8rem;">Activado</span>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;padding:10px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.8rem;font-weight:700;color:#0f172a;">Aeropuerto Predeterminado</span>
        <span style="color:#0284c7;font-weight:700;font-size:0.8rem;">MAD (Madrid)</span>
      </div>
    `
  }
};

function initShowcaseTabs() {
  const buttons = document.querySelectorAll('.showcase-tab-btn');
  const infoTitle = document.getElementById('showcaseTitle');
  const infoDesc = document.getElementById('showcaseDesc');
  const specsContainer = document.getElementById('showcaseSpecs');
  const screenBadge = document.getElementById('mockupScreenBadge');
  const screenContent = document.getElementById('mockupContentArea');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.dataset.screen;
      const data = showcaseScreens[screenKey];
      if (!data) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (infoTitle) infoTitle.textContent = data.title;
      if (infoDesc) infoDesc.textContent = data.desc;
      if (screenBadge) screenBadge.textContent = data.screenBadge;
      if (screenContent) screenContent.innerHTML = data.screenHtml;

      if (specsContainer) {
        specsContainer.innerHTML = data.specs.map(spec => `
          <div class="spec-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${spec}</span>
          </div>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        items.forEach(other => other.classList.remove('active'));
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   Download Actions & Toast Feedback
   ========================================================================== */
function initDownloadActions() {
  const btnDownload = document.getElementById('btnDownloadApk');
  const btnHeroDownload = document.getElementById('btnHeroDownload');
  const btnCopyLink = document.getElementById('btnCopyLink');

  function handleDownloadClick(e) {
    showToast('Iniciando descarga de TravelSearch APK (v1.2.0)...');
  }

  if (btnDownload) {
    btnDownload.addEventListener('click', handleDownloadClick);
  }

  if (btnHeroDownload) {
    btnHeroDownload.addEventListener('click', handleDownloadClick);
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const downloadUrl = 'https://travelsearch.site/download/travelsearch.apk';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(downloadUrl).then(() => {
          showToast('¡Enlace de descarga copiado al portapapeles!');
        }).catch(() => {
          fallbackCopyText(downloadUrl);
        });
      } else {
        fallbackCopyText(downloadUrl);
      }
    });
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showToast('¡Enlace de descarga copiado al portapapeles!');
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}
