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
    const eventDate = new Date("2027-04-14T00:00:00+04:00");
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

    const homeSpeakersWrapper = document.querySelector(
      "#home-speakers-wrapper",
    );
    if (homeSpeakersWrapper) {
      const speakers = [
        ["Dr. Jassim M. Al Awadi", "Chief Human Resources Officer", "Emirates NBD", "Dr. Jassim M. Al Awadi BB.jpg", "https://www.linkedin.com/in/dr-jassim-al-awadi-bb-769b3611/", "speaker-tone-blue"],
        ["Haitham Akl", "Chief Human Resources Officer", "Dow", "Haitham Akl.jpg.jpeg", "https://www.linkedin.com/in/haitham-akl/", "speaker-tone-teal"],
        ["Praveen Raveendran", "Group Chief HR Officer", "ARM Group of Companies", "Praveen Raveendran.jpeg", "https://www.linkedin.com/in/praveen-raveendran/", "speaker-tone-violet"],
        ["Dipankar Gupta", "Chief Human Resources Officer", "Home Box, Landmark Group", "Dipankar.jpg", "https://www.linkedin.com/in/dipankar-gupta-5a39a01/", "speaker-tone-coral"],
        ["Akbar Khan", "Chief Human Resources Officer", "Al Tayer Motors", "Akbar Khan.png", "https://www.linkedin.com/in/akbarkhan1/", "speaker-tone-rose"],
        ["Neha Khicha", "Head of HR", "The Hershey Company", "Neha Khicha.jpg", "https://www.linkedin.com/in/neha-khicha-26ab742/", "speaker-tone-sky"],
        ["Hashem Shmaisani", "Digital L&D Delivery Lead", "Government Entity", "Hashem.png", "https://www.linkedin.com/in/hashemcs/", "speaker-tone-green"],
        ["Perry Nakkeeran", "Head of HR", "Choithrams Group", "Perry Nakkeeran (1).png", "https://www.linkedin.com/in/perry-nakkeeran-8868b822/", "speaker-tone-blue"],
        ["Svetlana Knyazeva", "Head of HR", "International SOS", "Svetlana Knyazeva.jpg", "https://www.linkedin.com/in/svetlana-knyazeva-83795b14/", "speaker-tone-teal"],
        ["Capt (Dr) Pranav Prasoon Thakur", "Chief People Officer", "TruKKer", "Capt (Dr) Pranav Prasoon Thakur.png", "https://www.linkedin.com/in/capt-dr-pranav-prasoon-thakur-0a893539/", "speaker-tone-coral"],
        ["Hani Saleh", "CHRO", "Zand Bank", "Hani Saleh.jpg", "https://www.linkedin.com/in/hanisaleh/", "speaker-tone-teal"],
        ["Liesbeth Schiavo", "HR Director", "Haworth", "Liesbeth Schiavo.jpg", "https://www.linkedin.com/in/liesbeth-schiavo-32446520/", "speaker-tone-violet"],
        ["Yusra Baqi", "Chief Human Resources Officer", "Aafaq Islamic Finance PSC", "Yusra Baqi.JPG", "https://www.linkedin.com/in/yusra-baqi/", "speaker-tone-blue"],
        ["Hasan Amin", "Head of Human Resources", "FTM International", "hasan-amin.png", "https://www.linkedin.com/in/hasan-amin/", "speaker-tone-green"],
        ["Anuja Rungachary", "Senior Manager - HR", "Abela & Co.", "Anuja Rungachary.jpg", "https://www.linkedin.com/in/anuja-rungachary-0b4b1229/", "speaker-tone-violet"],
        ["Dr. Mira Zakharia", "General Manager Human Resources", "Rotana Hotels", "Dr. Mira Zakharia.png", "https://www.linkedin.com/in/dr-mira-zakharia-6a0a13122/", "speaker-tone-sky"],
        ["Malvika Varma", "Head - Talent Development & Culture", "PRIME Health", "Malvika Varma.png", "https://www.linkedin.com/in/malvika-varma-3586538/", "speaker-tone-rose"],
        ["Samar Samy", "Regional Human Resources Director - South Cluster", "Gulf Cryo", "Samar Samy.jpg", "https://www.linkedin.com/in/samar-msamy/", "speaker-tone-green"],
        ["Khalid Ahmad Ahli", "Executive Director Human Capital and General Admin", "Ports, Customs & Free Zone Corporation (PCFC)", "Khalid Ahmad Ahli.jpg", "https://www.linkedin.com/in/khalid-ahli-chartered-fcipd-09b72a82/", "speaker-tone-blue"],
        ["Kinan A. Bahnassi", "Senior Adviser to the Secretary-General | Policy & Strategy", "Education, Human Development, and Community Development Council", "Dr. Kinan Bahnassi.png", "https://www.linkedin.com/in/kinan-bahnassi/", "speaker-tone-teal"],
      ];

      homeSpeakersWrapper.innerHTML = speakers
        .map(([name, role, company, image, link, tone], index) => {
          const initials = name
            .replace(/^(Dr\.|Capt\s*\(Dr\))\s*/i, "")
            .split(/\s+/)
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const imageMarkup = image
            ? `<img src="./images/speakers/${encodeURI(image)}" alt="${name}" loading="lazy" decoding="async" />`
            : `<span class="speaker-card-initials" aria-hidden="true">${initials}</span>`;

          return `
            <div class="swiper-slide">
              <a class="speaker-card home-speaker-card" href="${link}" target="_blank" rel="noopener noreferrer" aria-label="View ${name}'s LinkedIn profile">
                <div class="speaker-card-portrait ${tone}">
                  ${imageMarkup}
                  <span class="speaker-card-number">${String(index + 1).padStart(2, "0")}</span>
                </div>
                <div class="speaker-card-content">
                  <span class="speaker-card-label">FEATURED SPEAKER</span>
                  <h3>${name}</h3>
                  <p class="speaker-card-designation">${role}</p>
                  <span class="speaker-card-divider" aria-hidden="true"></span>
                  <p class="speaker-card-company">${company}</p>
                </div>
              </a>
            </div>`;
        })
        .join("");

      new Swiper(".home-speakers-swiper", {
        loop: true,
        slidesPerView: 1.15,
        spaceBetween: 12,
        navigation: {
          nextEl: ".home-speakers-next",
          prevEl: ".home-speakers-prev",
        },
        pagination: {
          el: ".home-speakers-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 3800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          576: { slidesPerView: 2, spaceBetween: 16 },
          992: { slidesPerView: 3, spaceBetween: 18 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        },
      });
    }
  }
});
