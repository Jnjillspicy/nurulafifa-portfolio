const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
  observer.observe(el);
});

const projects = {
  copywriting: {
    kicker: 'PROJECT 01 / COPYWRITING',
    title: 'Copywriting',
    role: 'Role · Social media copywriter',
    image: 'assets/copywriting.jpg',
    alt: 'Copywriting project examples',
    description: `
      <p class="modal-description">
        Developed social media captions and supporting copy for Ashento Digital,
        Twin Production Official and Cetakers Digital, with attention to audience,
        platform context and brand communication.
      </p>
      <ul>
        <li>Caption writing for social media</li>
        <li>Content wording and messaging</li>
        <li>Adapting copy for different brand accounts</li>
      </ul>
    `,
    links: [
      ['Portfolio evidence', 'assets/copywriter-slide.png']
    ]
  },
  scriptwriting: {
    kicker: 'PROJECT 02 / SCRIPTWRITING',
    title: 'Scriptwriting',
    role: 'Role · Script writer',
    image: 'assets/scriptwriting.jpg',
    alt: 'Scriptwriting project examples',
    description: `
      <p class="modal-description">
        Created scripts for content and advertising needs, supported by daily trend
        research to keep topics relevant and engaging.
      </p>
      <ul>
        <li>Short-form content scripts</li>
        <li>Advertising scripts</li>
        <li>Trend research and content development</li>
      </ul>
    `,
    links: [
      ['Portfolio evidence', 'assets/scriptwriter-slide.png']
    ]
  },
  talent: {
    kicker: 'PROJECT 03 / TALENT',
    title: 'Talent & On-Camera',
    role: 'Role · Talent · Voice over · Dubbing',
    image: 'assets/talent.jpg',
    alt: 'Talent project examples',
    description: `
      <p class="modal-description">
        Supported social content as an on-camera talent and voice contributor,
        communicating messages naturally while adapting delivery to the character
        and needs of each brand.
      </p>
      <ul>
        <li>On-camera talent for short-form content</li>
        <li>Dubbing and voice over</li>
        <li>Natural, audience-focused presentation</li>
      </ul>
    `,
    links: [
      ['Talent evidence', 'assets/talent-slide.png'],
      ['Talent detail', 'assets/talent-detail-slide.png']
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalRole = document.getElementById('modalRole');
const modalDescription = document.getElementById('modalDescription');
const modalLinks = document.getElementById('modalLinks');

function openProject(key) {
  const project = projects[key];
  if (!project) return;

  modalImage.src = project.image;
  modalImage.alt = project.alt;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalRole.textContent = project.role;
  modalDescription.innerHTML = project.description;

  modalLinks.innerHTML = project.links.map(([label, href]) =>
    `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`
  ).join('');

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeProject);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeProject();
  }
});
