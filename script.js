// Constants
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_TIME = 2000;

const TYPING_PHRASES = [
  "Machine Learning Enthusiast",
  "Aspiring Data Scientist",
  "Proficient Front-End Developer",
];

const ACHIEVEMENT_DATA = {
  hackfest: {
    title: "Hackfest 2.0 - 1st Runners-Up",
    images: [
      "assets/hackfest-2.0/pic1.PNG",
      "assets/hackfest-2.0/pic2.JPG",
      "assets/hackfest-2.0/pic3.JPG",
      "assets/hackfest-2.0/pic4.jpeg",
    ],
  },
  "hack-horizon": {
    title: "Hack Horizon - First Place",
    images: [
      "assets/hackHorizon/pic1.jpg",
      "assets/hackHorizon/pic3.jpg",
      "assets/hackHorizon/pic2.jpg",
      "assets/hackHorizon/pic4.jpg",
      "assets/hackHorizon/pic5.jpg",
    ],
  },
  Mentoring: {
    title: "Mentoring students - WebDev",
    images: [
      "assets/webdev-mentoring/pic1.jpg",
      "assets/webdev-mentoring/pic2.jpg",
      "assets/webdev-mentoring/pic3.jpg",
      "assets/webdev-mentoring/pic4.jpg",
      "assets/webdev-mentoring/pic5.jpg",
    ],
  },
  webtopia: {
    title: "Webtopia - First Place",
    images: [
      "assets/webtopia/pic1.jpg",
      "assets/webtopia/pic2.jpg",
      "assets/webtopia/pic3.jpg",
      "assets/webtopia/pic4.jpg",
    ],
  },
  "ai-hackathon": {
    title: "AI Hackathon - First Place",
    images: [
      "assets/ai-hackathon/pic1.PNG",
      "assets/ai-hackathon/pic2.jpg",
      "assets/ai-hackathon/pic3.jpg",
    ],
  },
  csi: {
    title: "CSI National Level Project - Finalist",
    images: [
      "assets/csi-project-submission/pic1.jpg",
      "assets/csi-project-submission/pic2.jpg",
    ],
  },
  elechacks: {
    title: "ElecHacks 2.0 - First Place",
    images: ["assets/elechacks/pic1.jpg", "assets/elechacks/pic2.jpg"],
  },
  paper: {
    title: "Paper Presentation - Second Place",
    images: [
      "assets/abhigyan24-paperPresentation/pic1.jpg",
      "assets/abhigyan24-paperPresentation/pic2.jpg",
      "assets/abhigyan24-paperPresentation/pic3.jpg",
    ],
  },
};

// DOM Elements
const typingText = document.querySelector(".hero-content p");
const modal = document.getElementById("achievementModal");
const modalTitle = modal.querySelector(".modal-title");
const modalDescription = modal.querySelector(".modal-description");
const modalImages = modal.querySelector(".modal-images");
const closeModal = modal.querySelector(".close-modal");
const achievementItems = document.querySelectorAll(".achievement-item");
const parallaxBg = document.querySelector(".parallax-bg");
// const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

// Typing Animation State
let phraseIndex = 0;
let charIndex = 0;
let isTyping = true;

// Typing Animation Functions
function typeAnimation() {
  const currentPhrase = TYPING_PHRASES[phraseIndex];

  if (isTyping) {
    if (charIndex < currentPhrase.length) {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeAnimation, TYPING_SPEED);
    } else {
      isTyping = false;
      setTimeout(typeAnimation, PAUSE_TIME);
    }
  } else {
    if (charIndex > 0) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeAnimation, DELETING_SPEED);
    } else {
      isTyping = true;
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      setTimeout(typeAnimation, TYPING_SPEED);
    }
  }
}

// Slider Functions
function initializeSlider(
  containerSelector,
  itemSelector,
  prevBtnId,
  nextBtnId
) {
  const container = document.querySelector(containerSelector);
  const items = Array.from(container.querySelectorAll(itemSelector));
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  if (window.innerWidth <= 768) {
    return; // Do nothing for mobile
  }
  function getItemsPerView() {
    if (window.innerWidth > 1200) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }

  function updateActiveStates() {
    const itemsPerView = getItemsPerView();
    items.forEach((item, index) => {
      const isActive =
        index >= currentIndex && index < currentIndex + itemsPerView;
      item.classList.toggle("active", isActive);
    });
  }

  function updateSliderPosition() {
    const itemsPerView = getItemsPerView();
    const itemWidth =
      (container.offsetWidth -
        (itemsPerView + 1) *
          parseFloat(getComputedStyle(items[0]).marginRight)) /
      itemsPerView;
    const offset =
      currentIndex *
      (itemWidth + parseFloat(getComputedStyle(items[0]).marginRight));

    container.style.transform = `translateX(-${offset}px)`;
    updateActiveStates();

    const maxIndex = items.length - itemsPerView;
    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentIndex >= maxIndex);
  }

  function handleResize() {
    const itemsPerView = getItemsPerView();
    const maxIndex = items.length - itemsPerView;
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    updateSliderPosition();
  }

  // Event Listeners for Slider
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextBtn.addEventListener("click", () => {
    const itemsPerView = getItemsPerView();
    const maxIndex = items.length - itemsPerView;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", () => {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0 && currentIndex > 0) {
        currentIndex--;
      } else if (
        swipeDistance < 0 &&
        currentIndex < items.length - getItemsPerView()
      ) {
        currentIndex++;
      }
      updateSliderPosition();
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  handleResize();
  updateActiveStates();
}

// Modal Functions
function openModal(achievementKey) {
  const data = ACHIEVEMENT_DATA[achievementKey];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  modalImages.innerHTML = "";
  data.images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = data.title;
    img.className = "modal-image";
    modalImages.appendChild(img);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize typing animation
  typingText.classList.add("typing-cursor");
  typeAnimation();

  // Initialize sliders
  initializeSlider(
    ".projects-grid",
    ".project-card",
    "projectsPrev",
    "projectsNext"
  );
  initializeSlider(
    ".achievements-list",
    ".achievement-item",
    "achievementsPrev",
    "achievementsNext"
  );
});

window.addEventListener("scroll", () => {
  if (parallaxBg) {
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  }

  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Achievement Items Click Handlers
achievementItems.forEach((item, index) => {
  const achievementKeys = Object.keys(ACHIEVEMENT_DATA);
  item.addEventListener("click", () => {
    openModal(achievementKeys[index]);
  });
});

// Modal Close Handlers
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - navHeight,
        behavior: "smooth",
      });
    }
  });
});

// Resume Download Handler
document.querySelector(".resume-btn").addEventListener("click", () => {
  window.open("assets/vikramanResume.pdf", "_blank");
});
