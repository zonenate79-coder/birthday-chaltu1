/**
 * ===================================================================
 * 🌸 FOR DIYA - MAIN APP LOGIC (Connected to EDIT-HERE.js & Folders)
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Apply Theme Color (Pink for girls, Blue for boys)
  const theme = (typeof THEME_COLOR !== "undefined" && THEME_COLOR.toLowerCase() === "blue") ? "blue" : "pink";
  document.documentElement.setAttribute("data-theme", theme);

  // 1. Lock scrolling on intro screen (Stuck in place like Diya reference)
  document.documentElement.classList.add("intro-locked");
  document.body.classList.add("intro-locked");

  const introScreen = document.getElementById("intro-screen");
  if (introScreen) {
    const lockScroll = (e) => {
      if (!introScreen.classList.contains("hidden")) {
        e.preventDefault();
      }
    };
    introScreen.addEventListener("touchmove", lockScroll, { passive: false });
    introScreen.addEventListener("wheel", lockScroll, { passive: false });
  }

  // 2. Initialize UI texts and elements from EDIT-HERE.js
  initTexts();
  initPetals(theme);
  initOurStory(theme);
  initPhotoMemories(theme);
  initThingsILove();
  initMemoryJar();
  initOpenWhenLetters();
  initAudioPlayer();
  initBucketList();
  initFinalLetter();

  // Create Lucide Icons
  if (window.lucide) lucide.createIcons();

  // 3. Setup Intro Screen Transition ("Come in 💖")
  const enterBtn = document.getElementById("enter-btn");
  enterBtn.addEventListener("click", () => {
    // Unlock scrolling for main website
    document.documentElement.classList.remove("intro-locked");
    document.body.classList.remove("intro-locked");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    const mainContent = document.getElementById("main-content");
    introScreen.style.transition = "opacity 0.7s ease";
    introScreen.style.opacity = "0";
    introScreen.style.pointerEvents = "none";
    mainContent.style.opacity = "1";

    setTimeout(() => {
      introScreen.classList.add("hidden");
    }, 700);

    // Auto-play background music from music/song.mp4
    playAudio();

    // Soft celebration confetti
    triggerConfetti();
  });

  // 3. Setup "Contents" Menu Dropdown
  const contentsBtn = document.getElementById("contents-btn");
  const contentsDropdown = document.getElementById("contents-dropdown");
  contentsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    contentsDropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    contentsDropdown.classList.add("hidden");
  });

  contentsDropdown.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      contentsDropdown.classList.add("hidden");
    });
  });
});

// --- Dynamic Text Initialization ---
function initTexts() {
  const theme = (typeof THEME_COLOR !== "undefined" && THEME_COLOR.toLowerCase() === "blue") ? "blue" : "pink";
  const floral = theme === "blue" ? "💙" : "🌸";
  const star   = theme === "blue" ? "⭐" : "💖";

  // Tab title — automatically uses BIRTHDAY_NAME & updates emoji to match theme
  let rawTitle = (typeof PAGE_TITLE !== "undefined" && PAGE_TITLE && PAGE_TITLE.trim() !== "")
    ? PAGE_TITLE.replace(/\b(Sarah|Diya)\b/gi, BIRTHDAY_NAME).replace(/\{name\}/gi, BIRTHDAY_NAME)
    : `For ${BIRTHDAY_NAME} ${floral}`;

  const finalTitle = theme === "blue"
    ? rawTitle.replace(/🌸/g, "💙").replace(/💖/g, "💙").replace(/💕/g, "💙")
    : rawTitle;
  document.getElementById("tab-title").textContent = finalTitle;
  document.title = finalTitle;

  // Nav brand
  document.getElementById("nav-brand").textContent = BIRTHDAY_NAME;

  // Intro Screen
  document.getElementById("intro-heading").textContent = INTRO_HEADING;
  document.getElementById("intro-name").textContent = BIRTHDAY_NAME;

  let introPara = (typeof INTRO_PARAGRAPH !== "undefined" && INTRO_PARAGRAPH)
    ? INTRO_PARAGRAPH.replace(/\b(Sarah|Diya)\b/gi, BIRTHDAY_NAME).replace(/\{name\}/gi, BIRTHDAY_NAME)
    : `For the love of my life. To the person I love the most in this whole world. To the person that makes my day brighter every day just by being you, ${BIRTHDAY_NAME}.`;
  document.getElementById("intro-paragraph").textContent = introPara;

  document.getElementById("intro-btn-text").textContent = theme === "blue"
    ? INTRO_BUTTON_TEXT.replace("💖", "💙")
    : INTRO_BUTTON_TEXT;

  document.getElementById("letter-salutation").textContent = `${BIRTHDAY_NAME},`;
  document.getElementById("letter-signature").textContent = BOYFRIEND_NAME;
  document.getElementById("footer-text").textContent =
    `Made by hand for ${BIRTHDAY_NAME} ${star} • A few things are tucked away here.`;

  // "That's the story so far." heading — swap 🌸 to 💙 in blue theme
  const finalHeading = document.getElementById("final-heading");
  if (finalHeading) {
    finalHeading.innerHTML = finalHeading.innerHTML
      .replace(/🌸/g, floral)
      .replace(/💕/g, floral);
  }

  const navLinkFinal = document.getElementById("nav-link-final");
  if (navLinkFinal && theme === "blue") {
    navLinkFinal.textContent = "That's the story so far. 💙";
  }

  // "To many more adventures together" text
  const bucketQuote = document.getElementById("bucket-quote");
  if (bucketQuote) {
    bucketQuote.textContent = theme === "blue"
      ? "To many more adventures together ⭐"
      : "To many more adventures together 🌸";
  }
}

// --- Floating Falling Sakura Petals & Hearts (Adapts to Theme) ---
function initPetals(theme = "pink") {
  const container = document.getElementById("petals-container");
  const count = 18;

  const icons = theme === "blue" 
    ? ["✨", "💙", "⭐", "💫"] 
    : ["🌸", "💖", "✨", "💕"];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const isIcon = Math.random() > 0.6;

    if (isIcon) {
      el.className = "petal heart";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
    } else {
      el.className = "petal";
      const size = Math.floor(Math.random() * 12) + 12;
      el.style.width = `${size}px`;
      el.style.height = `${Math.floor(size * 1.3)}px`;
      if (theme === "blue") {
        el.style.background = "radial-gradient(circle at 40% 40%, #bae6fd, #7dd3fc)";
      }
    }

    el.style.left = `${Math.floor(Math.random() * 100)}%`;
    el.style.animationDuration = `${(Math.random() * 6 + 7).toFixed(1)}s`;
    el.style.animationDelay = `${(Math.random() * 8).toFixed(1)}s`;
    container.appendChild(el);
  }
}

// --- Our Story Timeline ---
function initOurStory(theme = "pink") {
  const container = document.getElementById("story-timeline");
  container.innerHTML = OUR_STORY_EVENTS.map(ev => {
    let icon = ev.icon || "•";
    let desc = ev.description || "";
    if (theme === "blue") {
      icon = icon.replace(/🌸/g, "⭐").replace(/💖/g, "💙").replace(/💕/g, "💙").replace(/🌹/g, "⭐");
      desc = desc.replace(/🌸/g, "⭐").replace(/💖/g, "💙").replace(/💕/g, "💙");
    }
    return `
    <div class="relative group">
      <div class="absolute -left-[41px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full border-4 shadow flex items-center justify-center text-[10px] text-white" style="background-color: var(--theme-dot); border-color: var(--bg-primary);">
        ${icon}
      </div>
      <div>
        <h3 class="font-handwriting text-2xl font-bold text-[#2d2522] group-hover:text-[var(--theme-accent)] transition-colors">
          ${escapeHtml(ev.title)}
        </h3>
        <p class="text-sm sm:text-base text-[#6d5e57] mt-1 font-light leading-relaxed">
          ${escapeHtml(desc)}
        </p>
      </div>
    </div>
  `;
  }).join("");
}

// --- Photo Memories (Polaroids from photo-memories/ folder) ---
let currentLightboxIndex = 0;
const photosList = [];

function initPhotoMemories(theme = "pink") {
  const grid = document.getElementById("polaroids-grid");
  const rotations = [-2.5, 2.0, -1.5, 3.0, -2.0, 1.8];

  // Populate photosList using photo-memories/ folder
  for (let i = 0; i < PHOTO_MEMORIES_CAPTIONS.length; i++) {
    photosList.push({
      url: `photo-memories/${i + 1}.jpg`,
      caption: PHOTO_MEMORIES_CAPTIONS[i]
    });
  }

  grid.innerHTML = photosList.map((photo, index) => {
    const rot = rotations[index % rotations.length];
    // Alternate left/right alignment like Diya reference
    const align = index % 2 === 0 ? "self-start ml-4 sm:ml-8" : "self-end mr-4 sm:mr-8";
    let caption = photo.caption;
    if (theme === "blue") {
      caption = caption.replace(/🌸/g, "⭐").replace(/💖/g, "💙").replace(/💕/g, "💙");
    }
    return `
      <div class="polaroid-card max-w-[180px] sm:max-w-[200px] w-full my-1 ${align}" style="transform: rotate(${rot}deg);" onclick="openLightbox(${index})">
        <div class="polaroid-tape"></div>
        <div class="w-full aspect-[4/4.2] bg-slate-900/10 overflow-hidden rounded mb-2">
          <img src="${photo.url}" alt="${escapeHtml(caption)}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
        </div>
        <p class="font-handwriting text-xs sm:text-sm text-[#2d2522] text-center px-1 leading-snug">
          ${escapeHtml(caption)}
        </p>
      </div>
    `;
  }).join("");

  // Lightbox Controls
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => navigateLightbox(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => navigateLightbox(1));

  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightbox-modal");
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    }
  });
}

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  updateLightbox();
  document.getElementById("lightbox-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) lucide.createIcons();
};

function closeLightbox() {
  document.getElementById("lightbox-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + photosList.length) % photosList.length;
  updateLightbox();
}

function updateLightbox() {
  const photo = photosList[currentLightboxIndex];
  document.getElementById("lightbox-img").src = photo.url;
  const theme = (typeof THEME_COLOR !== "undefined" && THEME_COLOR.toLowerCase() === "blue") ? "blue" : "pink";
  let caption = photo.caption;
  if (theme === "blue") {
    caption = caption.replace(/🌸/g, "⭐").replace(/💖/g, "💙").replace(/💕/g, "💙");
  }
  document.getElementById("lightbox-caption").textContent = caption;
  document.getElementById("lightbox-counter").textContent = `${currentLightboxIndex + 1} of ${photosList.length}`;
}

// --- Things I Love About You (Accordions) ---
function initThingsILove() {
  const container = document.getElementById("love-accordion-container");
  container.innerHTML = THINGS_I_LOVE.map((item, index) => `
    <div class="rounded-2xl bg-white border border-[var(--theme-card-border)] shadow-sm overflow-hidden transition-all duration-300">
      <button class="w-full px-5 py-4 flex items-center justify-between text-left text-base sm:text-lg font-handwriting font-bold text-[#3d3430] hover:opacity-80 transition-colors" onclick="toggleAccordion(${index})">
        <span id="acc-title-${index}">${escapeHtml(item.title)}</span>
        <i data-lucide="chevron-down" id="acc-icon-${index}" class="w-5 h-5 theme-accent-color transition-transform duration-300"></i>
      </button>
      <div id="acc-content-${index}" class="hidden px-5 pb-5 pt-1 text-sm sm:text-base text-[#6d5e57] font-light leading-relaxed border-t border-[var(--theme-card-border)]/40">
        ${escapeHtml(item.content)}
      </div>
    </div>
  `).join("");
}

window.toggleAccordion = function(index) {
  const content = document.getElementById(`acc-content-${index}`);
  const icon = document.getElementById(`acc-icon-${index}`);
  const title = document.getElementById(`acc-title-${index}`);
  const isHidden = content.classList.contains("hidden");

  if (isHidden) {
    content.classList.remove("hidden");
    icon.classList.add("rotate-180");
    if (title) title.style.color = "var(--theme-accent)";
  } else {
    content.classList.add("hidden");
    icon.classList.remove("rotate-180");
    if (title) title.style.color = "#3d3430";
  }
};

// --- Memory Jar (from memory-jar/ folder) ---
let currentJarIndex = 0;

function initMemoryJar() {
  const jar = document.getElementById("jar-interactive");
  jar.addEventListener("click", () => {
    jar.classList.add("jar-wiggle");
    setTimeout(() => jar.classList.remove("jar-wiggle"), 500);

    if (!MEMORY_JAR_ITEMS || MEMORY_JAR_ITEMS.length === 0) return;

    const memory = MEMORY_JAR_ITEMS[currentJarIndex % MEMORY_JAR_ITEMS.length];
    const imageNumber = (currentJarIndex % MEMORY_JAR_ITEMS.length) + 1;
    currentJarIndex++;

    const resultBox = document.getElementById("jar-result");
    const jarImg = document.getElementById("jar-img");
    const jarLabel = document.getElementById("jar-label");
    const jarCaption = document.getElementById("jar-caption");

    jarImg.src = `memory-jar/${imageNumber}.jpg`;
    jarLabel.textContent = `[${memory.id || 'MEMORY'}]`;
    jarCaption.textContent = memory.caption;

    resultBox.classList.remove("hidden");
    requestAnimationFrame(() => {
      resultBox.classList.remove("scale-95", "opacity-0");
      resultBox.classList.add("scale-100", "opacity-100");
    });

    triggerConfetti(0.4);
  });
}

// --- Open When Letters (Posta - Matches Image 3) ---
function initOpenWhenLetters() {
  const grid = document.getElementById("envelopes-grid");
  grid.innerHTML = OPEN_WHEN_LETTERS.map((letter, index) => `
    <div class="envelope-card group" id="envelope-${index}" onclick="openLetterModal(${index})">
      <div class="envelope-flap"></div>
      <div class="relative z-10 px-4 text-center">
        <h4 class="font-handwriting text-lg sm:text-xl font-bold text-[#2d2522]">
          ${escapeHtml(letter.title)}
        </h4>
      </div>
    </div>
  `).join("");

  document.getElementById("close-letter-modal").addEventListener("click", () => {
    document.getElementById("letter-modal").classList.add("hidden");
  });
}

window.openLetterModal = function(index) {
  const letter = OPEN_WHEN_LETTERS[index];
  document.getElementById("modal-letter-title").textContent = letter.title;
  document.getElementById("modal-letter-content").textContent = letter.content;

  const env = document.getElementById(`envelope-${index}`);
  if (env) env.classList.add("opened");

  document.getElementById("letter-modal").classList.remove("hidden");
};

// --- Audio Player & Spinning Vinyl (Native Browser Audio with nodownload) ---
function initAudioPlayer() {
  const audio = document.getElementById("bg-audio");
  const vinyl = document.getElementById("vinyl-disc");

  if (!audio) return;

  if (vinyl) {
    audio.addEventListener("play", () => {
      vinyl.classList.add("vinyl-spinning");
    });
    audio.addEventListener("pause", () => {
      vinyl.classList.remove("vinyl-spinning");
    });
  }

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    playAudio();
  });
}

function playAudio() {
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.play().catch(err => {
      console.log("Audio autoplay restricted. User can press play manually.", err);
    });
  }
}

function pauseAudio() {
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.pause();
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// --- Bucket List (Checklist) ---
function initBucketList() {
  const container = document.getElementById("bucket-items-container");
  container.innerHTML = BUCKET_LIST.map((item, index) => `
    <div class="flex items-center gap-3">
      <input type="checkbox" id="task-${index}" class="custom-checkbox hidden" ${item.done ? "checked" : ""} onchange="updateBucketCount()">
      <label for="task-${index}" class="flex items-center gap-3 cursor-pointer select-none">
        <div class="check-icon w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all" style="border-color: var(--theme-card-border);">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
        </div>
        <span class="task-text text-base font-handwriting text-[#3d3430] font-medium">${escapeHtml(item.text)}</span>
      </label>
    </div>
  `).join("");

  updateBucketCount();
}

window.updateBucketCount = function() {
  const all = document.querySelectorAll("#bucket-items-container input[type='checkbox']");
  const done = Array.from(all).filter(cb => cb.checked).length;
  document.getElementById("bucket-counter").textContent = `${done} of ${all.length} done`;
};

// --- Final Love Letter Reveal ---
function initFinalLetter() {
  const revealBtn = document.getElementById("reveal-letter-btn");
  const letterContainer = document.getElementById("letter-container");
  const paragraphsContainer = document.getElementById("letter-paragraphs");

  paragraphsContainer.innerHTML = FINAL_LETTER.paragraphs.map(p => `
    <p>${escapeHtml(p)}</p>
  `).join("");

  revealBtn.addEventListener("click", () => {
    letterContainer.classList.remove("hidden");
    revealBtn.classList.add("hidden");
    letterContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    triggerConfetti(0.8);
  });
}

// --- Utilities ---
function triggerConfetti(scale = 1) {
  if (typeof confetti !== "function") return;
  const theme = (typeof THEME_COLOR !== "undefined" && THEME_COLOR.toLowerCase() === "blue") ? "blue" : "pink";
  const colors = theme === "blue"
    ? ['#38bdf8', '#60a5fa', '#93c5fd', '#bfdbfe', '#ffffff']
    : ['#f47285', '#fda4af', '#fecdd3', '#fb7185', '#ffffff'];
  confetti({
    particleCount: Math.floor(70 * scale),
    spread: 60,
    origin: { y: 0.65 },
    colors: colors
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
