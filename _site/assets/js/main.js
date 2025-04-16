document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".team-card");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const role = button.getAttribute("data-role");
  
        cards.forEach(card => {
          if (role === "all" || card.getAttribute("data-role") === role) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  });