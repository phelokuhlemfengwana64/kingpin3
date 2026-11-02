document.addEventListener("DOMContentLoaded", () => {
  // Keep the footer year current.
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  // Mobile navigation.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  // Accordion: open one answer at a time.
  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".accordion-trigger").forEach(item => {
        item.setAttribute("aria-expanded", "false");
        item.querySelector("span").textContent = "＋";
        item.nextElementSibling.hidden = true;
      });
      if (shouldOpen) {
        trigger.setAttribute("aria-expanded", "true");
        trigger.querySelector("span").textContent = "−";
        panel.hidden = false;
      }
    });
  });

  // Reveal animation using Intersection Observer.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Gallery search, category filtering and sorting (DOM manipulation).
  const grid = document.getElementById("galleryGrid");
  if (grid) {
    const search = document.getElementById("gallerySearch");
    const filter = document.getElementById("galleryFilter");
    const sort = document.getElementById("gallerySort");
    const count = document.getElementById("galleryCount");
    const noResults = document.getElementById("noResults");
    const cards = Array.from(grid.querySelectorAll(".product-card"));

    function updateGallery() {
      const term = search.value.trim().toLowerCase();
      const category = filter.value;
      const visibleCards = cards.filter(card => {
        const matchesText = card.dataset.name.toLowerCase().includes(term) ||
          card.textContent.toLowerCase().includes(term);
        const matchesCategory = category === "all" || card.dataset.category === category;
        card.hidden = !(matchesText && matchesCategory);
        return matchesText && matchesCategory;
      });
      if (sort.value !== "default") {
        visibleCards.sort((a, b) => {
          const result = a.dataset.name.localeCompare(b.dataset.name);
          return sort.value === "az" ? result : -result;
        });
        visibleCards.forEach(card => grid.appendChild(card));
      } else {
        cards.forEach(card => grid.appendChild(card));
      }
      count.textContent = `Showing ${visibleCards.length} of ${cards.length} gallery items`;
      noResults.hidden = visibleCards.length !== 0;
    }
    [search, filter, sort].forEach(control => control.addEventListener("input", updateGallery));
    updateGallery();

    // Accessible lightbox with previous/next controls and keyboard support.
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    const openButtons = Array.from(grid.querySelectorAll(".lightbox-open"));
    let currentIndex = 0;
    function showImage(index) {
      currentIndex = (index + openButtons.length) % openButtons.length;
      const button = openButtons[currentIndex];
      lightboxImage.src = button.dataset.image;
      lightboxImage.alt = button.querySelector("img").alt;
      caption.textContent = button.dataset.caption;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    }
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
    openButtons.forEach((button, index) => button.addEventListener("click", () => showImage(index)));
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(currentIndex - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentIndex + 1));
    lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", event => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  // Client-side validation + AJAX submission for Netlify Forms.
  // Netlify receives the request only after deployment and form detection.
  document.querySelectorAll("[data-ajax-form]").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      status.textContent = "";
      status.className = "form-status";
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please correct the highlighted fields before submitting.";
        status.classList.add("error");
        return;
      }
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      try {
        const formData = new FormData(form);
        const body = new URLSearchParams();
        for (const [key, value] of formData.entries()) body.append(key, value);
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString()
        });
        if (!response.ok) throw new Error("The form service did not accept the request.");
        status.textContent = "Thank you. Your form has been submitted successfully.";
        status.classList.add("success");
        form.reset();
      } catch (error) {
        status.textContent = "The form could not be sent. Please check that this website is deployed on Netlify with form detection enabled, then try again.";
        status.classList.add("error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  });
});
