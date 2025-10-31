
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");

  // ✅ Check if elements exist before using them
  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close when clicking outside the modal box
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  } else {
    console.error("❌ One or more elements not found in the DOM!");
  }
});
