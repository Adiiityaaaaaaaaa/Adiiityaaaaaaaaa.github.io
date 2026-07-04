// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Project filtering
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card[data-tags]");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.tags.split(" ").includes(filter);
      card.classList.toggle("hidden", !match);
    });
  });
});
