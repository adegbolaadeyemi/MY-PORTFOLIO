document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  lucide.createIcons();

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 3. Scroll Reveal Animation using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const scrollSections = document.querySelectorAll(".scroll-section");
  scrollSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // 4. ScrollSpy Active Nav Link State
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. Contact Form Submission Toast/Feedback
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = `<span>Sending...</span>`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = `<span>Message Sent!</span> <i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.remove("bg-brand-500", "hover:bg-brand-600");
        btn.classList.add("bg-emerald-600");
        lucide.createIcons();
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("bg-emerald-600");
          btn.classList.add("bg-brand-500", "hover:bg-brand-600");
          btn.disabled = false;
          lucide.createIcons();
        }, 3000);
      }, 1000);
    });
  }
});

// 6. Project Modal Logic
function openModal(title) {
  const modal = document.getElementById("project-modal");
  const modalCard = document.getElementById("modal-card");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");

  if (!modal || !modalTitle || !modalDesc) return;

  modalTitle.textContent = title;
  modalDesc.textContent = `Detailed overview and dynamic preview for ${title}. Built using HTML, CSS, JavaScript, and modular components with high-performance responsive layout practices.`;

  modal.classList.remove("opacity-0", "pointer-events-none");
  modalCard.classList.remove("scale-95");
  modalCard.classList.add("scale-100");
}

function closeModal() {
  const modal = document.getElementById("project-modal");
  const modalCard = document.getElementById("modal-card");

  if (!modal) return;

  modalCard.classList.remove("scale-100");
  modalCard.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
}

// Close modal on backdrop click
document.getElementById("project-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "project-modal") {
    closeModal();
  }
});
