document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation logic
  const tabButtons = document.querySelectorAll(".tab-btn");
  const pages = document.querySelectorAll(".page");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Reset all buttons/pages
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      pages.forEach((page) => page.classList.remove("active"));

      // Activate selected
      button.classList.add("active");
      const targetPage = document.getElementById(button.dataset.target);
      targetPage.classList.add("active");
    });
  });

  // Attach clone logic
  const addCloneListener = (btn) => {
    btn.addEventListener("click", handleClone);
  };

  const handleClone = (e) => {
    const originalCard = e.target.closest(".card");
    const clonedCard = originalCard.cloneNode(true);

    // Mark as cloned
    clonedCard.classList.add("cloned");

    // Modify details
    modifyClonedCard(clonedCard);

    // Add fade-in effect
    clonedCard.style.opacity = "0";
    clonedCard.style.transform = "scale(0.9)";

    // Rebind button event
    const cloneBtn = clonedCard.querySelector(".clone-btn");
    addCloneListener(cloneBtn);

    // Append to page
    const parentPage = originalCard.closest(".page");
    parentPage.appendChild(clonedCard);

    // Animate
    requestAnimationFrame(() => {
      clonedCard.style.transition = "all 0.4s ease";
      clonedCard.style.opacity = "1";
      clonedCard.style.transform = "scale(1)";
    });
  };

  const modifyClonedCard = (card) => {
    const title = card.querySelector("h3");
    const details = card.querySelector("p");
    const type = card.dataset.type;

    if (!title.textContent.startsWith("Cloned:")) {
      title.textContent = "Cloned: " + title.textContent;
    }

    switch (type) {
      case "food":
        const orderId = Math.floor(1000 + Math.random() * 9000);
        details.textContent = `New Order ID #${orderId}. Same items, new delivery.`;
        break;
      case "banking":
        const planId = "PLAN-" + Math.random().toString(36).substr(2, 5).toUpperCase();
        details.textContent = `New plan instance created with ID: ${planId}. Ready for customization.`;
        break;
      case "ecommerce":
        const colors = ["Red", "Blue", "Black", "Green"];
        const sizes = ["S", "M", "L", "XL"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        details.textContent = `Details: Size ${randomSize}, Color ${randomColor}. Pure cotton fabric.`;
        break;
      case "ride":
        const vehicles = ["Premium", "SUV", "Eco-Friendly"];
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        details.textContent = `Details: Same route, but with a ${randomVehicle} vehicle.`;
        break;
    }
  };

  // Attach listeners to initial buttons
  document.querySelectorAll(".clone-btn").forEach(addCloneListener);
});
