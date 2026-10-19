document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const header = document.querySelector(".site-header");
  const handleHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderState();
  window.addEventListener("scroll", handleHeaderState);

  const countdown = document.getElementById("heroCountdown");
  if (countdown) {
    const eventDate = new Date("2027-01-27T00:00:00+04:00");
    const deadline = eventDate.getTime();

    const countdownParts = {
      days: countdown.querySelector("[data-countdown-days]"),
      hours: countdown.querySelector("[data-countdown-hours]"),
      minutes: countdown.querySelector("[data-countdown-minutes]"),
      seconds: countdown.querySelector("[data-countdown-seconds]"),
    };
    const countdownLabel = document.querySelector(".hero-countdown-label");

    const updateCountdown = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const format = (value) => String(value).padStart(2, "0");

      countdownParts.days.textContent = format(days);
      countdownParts.hours.textContent = format(hours);
      countdownParts.minutes.textContent = format(minutes);
      countdownParts.seconds.textContent = format(seconds);
      countdown.setAttribute(
        "aria-label",
        `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds remaining`,
      );

      if (remaining === 0 && countdownLabel) {
        countdownLabel.textContent = "The countdown is complete";
      }
    };

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  const heroStats = document.querySelector(".hero-stats");
  const statCounters = heroStats
    ? heroStats.querySelectorAll("[data-count-value]")
    : [];

  if (statCounters.length) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      const animateCounter = (counter) => {
        const target = Number(counter.dataset.countValue);
        const suffix = counter.dataset.countSuffix || "";
        const duration = 1500;
        const startTime = performance.now();

        counter.textContent = `0${suffix}`;

        const updateCounter = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          counter.textContent = `${Math.round(target * easedProgress)}${suffix}`;

          if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
          }
        };

        window.requestAnimationFrame(updateCounter);
      };

      if ("IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              statCounters.forEach(animateCounter);
              statsObserver.disconnect();
            }
          },
          { threshold: 0.35 },
        );

        statsObserver.observe(heroStats);
      } else {
        statCounters.forEach(animateCounter);
      }
    }
  }

  const revealSections = document.querySelectorAll(
    "main section:not(.hero-section)",
  );
  const revealDirections = ["reveal-left", "reveal-right", "reveal-up"];

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 80px 0px",
      },
    );

    revealSections.forEach((section, index) => {
      const direction = revealDirections[index % revealDirections.length];
      section.classList.add(direction, "reveal-pending");
      section.style.transitionDelay = "0ms";
      revealObserver.observe(section);
    });
  } else {
    revealSections.forEach((section, index) => {
      const direction = revealDirections[index % revealDirections.length];
      section.classList.add(direction, "is-visible");
    });
  }

  if (typeof Swiper !== "undefined") {
    const heroSlider = document.querySelector(".hero-background-slider");
    if (heroSlider) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      new Swiper(heroSlider, {
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        speed: 1100,
        allowTouchMove: false,
        autoplay: prefersReducedMotion
          ? false
          : {
              delay: 5000,
              disableOnInteraction: false,
            },
      });
    }

    new Swiper(".testimonial-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
      autoplay: {
        delay: 3400,
        disableOnInteraction: false,
      },
    });
  }
});
