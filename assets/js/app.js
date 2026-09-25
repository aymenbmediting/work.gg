document.addEventListener("DOMContentLoaded", () => {
  const data = PORTFOLIO_DATA;

  // 1. Populate Profile Info & Futuristic Text Scramble
  const headerName = document.getElementById("header-name");
  const originalName = data.profile.name.toUpperCase();
  const alternateName = "VIDEO EDITOR";
  
  // Hacker Text Effect
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  function triggerHackerEffect(element, text) {
    if (!element) return;
    let iterations = 0;
    clearInterval(element.dataset.hackerInterval);
    element.dataset.hackerInterval = setInterval(() => {
      element.innerText = text.split("")
        .map((letter, index) => {
          if (letter === " ") return " ";
          if (index < iterations) return text[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");
      
      if (iterations >= text.length) {
        clearInterval(element.dataset.hackerInterval);
        element.innerText = text;
      }
      iterations += 1 / 3;
    }, 30);
  }

  // Initial load
  headerName.dataset.currentText = originalName;
  headerName.textContent = originalName;
  triggerHackerEffect(headerName, originalName);
  
  // Hover interaction
  headerName.addEventListener("mouseenter", () => {
    triggerHackerEffect(headerName, headerName.dataset.currentText);
  });

  // Automated 15-second cycle (10s name, 5s title)
  function startNameCycle() {
    setTimeout(() => {
      headerName.dataset.currentText = alternateName;
      triggerHackerEffect(headerName, alternateName);
      
      setTimeout(() => {
        headerName.dataset.currentText = originalName;
        triggerHackerEffect(headerName, originalName);
        startNameCycle(); // Loop
      }, 5000);
      
    }, 10000);
  }
  
  startNameCycle();

  // Populate Contact Info
  const emailLink = document.getElementById("contact-email");
  if (emailLink) {
    emailLink.href = `mailto:${data.profile.contact.email}`;
    document.getElementById("email-text").textContent = data.profile.contact.email;
  }
  
  const waLink = document.getElementById("contact-wa");
  if (waLink) {
    waLink.href = data.profile.contact.whatsapp || "#";
    // Optional: Make the text show the number or just keep it "WhatsApp"
    // document.getElementById("wa-text").textContent = "WhatsApp";
  }
  
  const igLink = document.getElementById("contact-ig");
  if (igLink) {
    igLink.href = data.profile.contact.instagram;
    document.getElementById("ig-text").textContent = "@aymen_bm__";
  }

  // 2. Build High-Performance Native Scroll Carousel
  window.isModalOpen = false;
  const cards = [];
  const marqueeTrack = document.getElementById("marquee-track");
  const videos = data.socialMediaVideos || [];

  function createCard(videoItem) {
    const card = document.createElement("div");
    card.className = "flex-shrink-0 w-[240px] sm:w-[280px] group relative rounded-[2rem] bg-[#111] overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-lg carousel-card";
    
    const posterPath = videoItem.poster || '';

    card.innerHTML = `
      <!-- Video Container with 9:16 Aspect Ratio -->
      <div class="aspect-[9/16] w-full bg-black relative overflow-hidden">
        
        <img 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 carousel-img" 
          src="${posterPath}" 
          alt="Video Thumbnail"
          loading="lazy">

        <!-- Hover Overlay with Play Button (Glassy & Subtle) -->
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center z-10 pointer-events-none">
          <div class="w-16 h-16 rounded-full bg-black/60 border border-white/20 text-white/80 group-hover:text-white group-hover:bg-white/20 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_4_20px_rgba(0,0,0,0.3)]">
            <i data-lucide="play" class="w-6 h-6 ml-1 fill-current"></i>
          </div>
        </div>

        <!-- Top Gradient with Category Pill -->
        <div class="absolute top-0 inset-x-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10 pointer-events-none">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white border border-white/10 shadow-sm">
            ${videoItem.category}
          </span>
          <div class="flex gap-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 shadow-sm">
              <i data-lucide="play-circle" class="w-3 h-3"></i>
              Original
            </span>
          </div>
        </div>

        <!-- Bottom Info Gradient -->
        <div class="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none">
          <h3 class="text-base md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate">
            ${videoItem.title}
          </h3>
          <div class="flex items-center gap-2 mt-1.5 flex-wrap">
            ${(videoItem.tags || []).slice(0, 3).map(tag => `
              <span class="text-xs text-gray-400 font-mono">#${tag}</span>
            `).join(" ")}
          </div>
        </div>
      </div>
    `;

    // Click anywhere on the card to open the Master HD video
    card.addEventListener("click", () => {
      openModal(videoItem);
    });

    return card;
  }

  // Populate the track with items twice for infinite auto-scrolling
  if (marqueeTrack && videos.length > 0) {
    videos.forEach(v => marqueeTrack.appendChild(createCard(v)));
    videos.forEach(v => marqueeTrack.appendChild(createCard(v))); // Duplicate for seamless looping
  }

  // 3. Build Horizontal Videos Grid
  const horizontalTrack = document.getElementById("horizontal-track");
  const hzVideos = data.horizontalVideos || [];

  function createHorizontalCard(videoItem) {
    const card = document.createElement("div");
    card.className = "w-full group relative rounded-3xl bg-[#111] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg";

    const posterPath = videoItem.poster || '';

    card.innerHTML = `
      <!-- Video Container with 16:9 Aspect Ratio -->
      <div class="aspect-video w-full bg-black relative overflow-hidden">
        
        <img 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src="${posterPath}" 
          alt="Horizontal Video Thumbnail"
          loading="lazy">

        <!-- Top Gradient with Category Pill -->
        <div class="absolute top-0 inset-x-0 p-3 sm:p-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 pointer-events-none">
          <span class="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/15 shadow-sm">
            ${videoItem.category}
          </span>
          <span class="px-2.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 backdrop-blur-md text-blue-300 border border-blue-500/30 flex items-center gap-1.5 shadow-sm">
            <i data-lucide="monitor" class="w-3 h-3"></i>
            16:9 Cut
          </span>
        </div>

        <!-- Center Play Button (Always visible on mobile & desktop, glowing on hover/active) -->
        <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transform group-hover:scale-110 group-active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.45)]">
            <i data-lucide="play" class="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white text-white"></i>
          </div>
        </div>

        <!-- Bottom Info Gradient -->
        <div class="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/85 to-transparent z-10 pointer-events-none">
          <div class="flex items-center justify-between">
            <h3 class="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors truncate">
              ${videoItem.title}
            </h3>
            <span class="text-[11px] font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform flex-shrink-0">
              Watch Cut <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </span>
          </div>
          <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
            ${(videoItem.tags || []).slice(0, 3).map(tag => `
              <span class="text-[10px] md:text-xs text-gray-300/80 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">#${tag}</span>
            `).join(" ")}
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(videoItem, true);
    });

    return card;
  }

  if (horizontalTrack && hzVideos.length > 0) {
    hzVideos.forEach(v => horizontalTrack.appendChild(createHorizontalCard(v)));
  }

  if (window.lucide) window.lucide.createIcons();

  // 4. Smooth Infinite Auto-Scroll Logic
  const carouselTrackWrapper = document.getElementById("carousel-track");
  
  if (carouselTrackWrapper && marqueeTrack) {
    let scrollSpeed = 0.5; // pixels per frame
    let isInteracting = false;
    
    // Pause auto-scroll on hover or touch
    carouselTrackWrapper.addEventListener("mouseenter", () => isInteracting = true);
    carouselTrackWrapper.addEventListener("mouseleave", () => isInteracting = false);
    
    carouselTrackWrapper.addEventListener("touchstart", () => isInteracting = true, {passive: true});
    carouselTrackWrapper.addEventListener("touchend", () => {
      // Resume shortly after touching ends
      setTimeout(() => isInteracting = false, 1000);
    });

    // Check if the carousel is visible before animating to save CPU
    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0 });
    observer.observe(carouselTrackWrapper);

    function animateScroll() {
      if (!isInteracting && !window.isModalOpen && isVisible) {
        carouselTrackWrapper.scrollLeft += scrollSpeed;
        
        // The track width is doubled because we appended items twice.
        // We reset the scroll exactly halfway to create an infinite seamless loop.
        if (carouselTrackWrapper.scrollLeft >= marqueeTrack.scrollWidth / 2) {
          carouselTrackWrapper.scrollLeft -= marqueeTrack.scrollWidth / 2;
        } else if (carouselTrackWrapper.scrollLeft <= 0) {
          // If the user manually scrolled all the way to the left, bump it to the middle
          carouselTrackWrapper.scrollLeft += marqueeTrack.scrollWidth / 2;
        }
      }
      requestAnimationFrame(animateScroll);
    }
    
    // Start loop
    animateScroll();
  }

  // Manual nudge buttons
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  if (prevBtn && carouselTrackWrapper) {
    prevBtn.addEventListener("click", () => {
      carouselTrackWrapper.scrollBy({ left: -344, behavior: "smooth" });
    });
  }
  if (nextBtn && carouselTrackWrapper) {
    nextBtn.addEventListener("click", () => {
      carouselTrackWrapper.scrollBy({ left: 344, behavior: "smooth" });
    });
  }

  // 4. Custom Video Modal with Dual Architecture (Vertical Reels & Horizontal Theater)
  const modal = document.getElementById("video-modal");
  
  // Vertical View Elements
  const verticalView = document.getElementById("modal-card");
  const verticalVideo = document.getElementById("modal-vertical-video");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalCat = document.getElementById("modal-category");
  const modalVideoContainer = document.getElementById("modal-video-container");
  const modalProgressBar = document.getElementById("modal-progress-bar");
  const modalProgressContainer = document.getElementById("modal-progress-container");
  const modalPlayIndicator = document.getElementById("modal-play-indicator");
  const modalPlayIcon = document.getElementById("modal-play-icon");
  const modalOrderBtn = document.getElementById("modal-order-btn");
  const modalQualityBtn = document.getElementById("modal-quality-btn");
  const modalQualityBadge = document.getElementById("modal-quality-badge");
  const modalQualityDot = document.getElementById("modal-quality-dot");
  const modalMuteBtn = document.getElementById("modal-mute-btn");
  const modalMuteIcon = document.getElementById("modal-mute-icon");
  const modalLikeBtn = document.getElementById("modal-like-btn");
  const modalLikeIcon = document.getElementById("modal-like-icon");
  const modalVertLikeCount = document.getElementById("modal-vert-like-count");
  const modalCommentBtn = document.getElementById("modal-comment-btn");
  const modalVertCommentCount = document.getElementById("modal-vert-comment-count");
  const heartPop = document.getElementById("modal-heart-pop");

  // Horizontal View Elements (100% Outside Player Controls)
  const horizontalView = document.getElementById("modal-horizontal-view");
  const horizontalVideo = document.getElementById("modal-horizontal-video");
  const modalHzCloseBack = document.getElementById("modal-hz-close-back");
  const modalHzCloseBtn = document.getElementById("modal-hz-close-btn");
  const modalHzCategoryBadge = document.getElementById("modal-hz-category-badge");
  const modalHzQualityBtn = document.getElementById("modal-hz-quality-btn");
  const modalHzQualityBadge = document.getElementById("modal-hz-quality-badge");
  const modalHzQualityDot = document.getElementById("modal-hz-quality-dot");
  const modalHzMuteBtn = document.getElementById("modal-hz-mute-btn");
  const modalHzMuteIcon = document.getElementById("modal-hz-mute-icon");
  const modalHzVideoContainer = document.getElementById("modal-hz-video-container");
  const modalHzCenterPlay = document.getElementById("modal-hz-center-play");
  const modalHzCenterPlayIcon = document.getElementById("modal-hz-center-play-icon");
  const modalHzFlashIndicator = document.getElementById("modal-hz-flash-indicator");
  const modalHzFlashIcon = document.getElementById("modal-hz-flash-icon");
  const modalHzProgressContainer = document.getElementById("modal-hz-progress-container");
  const modalHzProgressBar = document.getElementById("modal-hz-progress-bar");
  const modalHzProgressThumb = document.getElementById("modal-hz-progress-thumb");
  const modalHzPlayPauseBtn = document.getElementById("modal-hz-play-pause-btn");
  const modalHzTransportIcon = document.getElementById("modal-hz-transport-icon");
  const modalHzTransportText = document.getElementById("modal-hz-transport-text");
  const modalHzTimeDisplay = document.getElementById("modal-hz-time-display");
  const modalHzFullscreenBtn = document.getElementById("modal-hz-fullscreen-btn");
  const modalHzTitle = document.getElementById("modal-hz-title");
  const modalHzTags = document.getElementById("modal-hz-tags");
  const modalHzLikeBtn = document.getElementById("modal-hz-like-btn");
  const modalHzLikeIcon = document.getElementById("modal-hz-like-icon");
  const modalHzLikeText = document.getElementById("modal-hz-like-text");
  const modalHzLikeCount = document.getElementById("modal-hz-like-count");
  const modalHzCommentBtn = document.getElementById("modal-hz-comment-btn");
  const modalHzCommentCount = document.getElementById("modal-hz-comment-count");
  const modalHzOrderBtn = document.getElementById("modal-hz-order-btn");

  // Comments Drawer
  const commentsDrawer = document.getElementById("comments-drawer");
  const closeCommentsBtn = document.getElementById("close-comments");
  const commentsList = document.getElementById("comments-list");
  const drawerReviewBtn = document.getElementById("drawer-review-btn");

  // State Management
  let currentModalVideo = null;
  let currentItemData = null;
  let currentVideoIndex = 0;
  let isCurrentHorizontal = false;
  let isMuted = false;

  const isMobileClient = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
  let preferredQuality = isMobileClient ? 'SD' : 'HD';
  let preloaderVideo = null;

  const defaultLikesMap = {
    'sm-10': 142,
    'sm-11': 98,
    'sm-5': 115,
    'sm-6': 87,
    'sm-7': 156,
    'sm-12': 74,
    'sm-2': 168,
    'sm-3': 92,
    'sm-4': 110,
    'sm-8': 135,
    'sm-9': 214,
    'sm-1': 89,
    'hz-1': 184,
    'hz-2': 195
  };

  function getItemBaseLikes(item) {
    if (!item) return 95;
    if (item.likes) return item.likes;
    return defaultLikesMap[item.id] || 95;
  }

  function getStorageKey(prefix, item) {
    const keyBase = item.title ? item.title.trim() : item.id;
    return `${prefix}_${keyBase}`;
  }

  function isItemLiked(item) {
    if (!item) return false;
    const storageKey = getStorageKey('liked', item);
    return localStorage.getItem(storageKey) === 'true';
  }

  function getDisplayLikes(item) {
    const base = getItemBaseLikes(item);
    return isItemLiked(item) ? base + 1 : base;
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function preloadAdjacentVideo(url) {
    if (!url) return;
    if (!preloaderVideo) {
      preloaderVideo = document.createElement("video");
      preloaderVideo.preload = "auto";
      preloaderVideo.muted = true;
    }
    preloaderVideo.src = url;
  }

  function updateQualityBadges() {
    [modalQualityBadge, modalHzQualityBadge].forEach(b => {
      if (b) b.textContent = preferredQuality;
    });
    const dotClass = (preferredQuality === 'HD')
      ? "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]"
      : "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse";
    [modalQualityDot, modalHzQualityDot].forEach(d => {
      if (d) d.className = dotClass;
    });
  }

  function toggleQuality() {
    if (!currentModalVideo || !currentItemData) return;
    preferredQuality = (preferredQuality === 'SD') ? 'HD' : 'SD';
    updateQualityBadges();

    const curTime = currentModalVideo.currentTime;
    const isPaused = currentModalVideo.paused;
    const targetSrc = (preferredQuality === 'HD' || isCurrentHorizontal)
      ? currentItemData.masterSrc
      : (currentItemData.mobileSrc || currentItemData.masterSrc);

    currentModalVideo.src = targetSrc;
    currentModalVideo.currentTime = curTime;
    if (!isPaused) {
      currentModalVideo.play().catch(() => {});
    }
  }

  // Dynamic Lucide icon helper
  function renderLucide(container, iconName, classes = "") {
    if (!container) return;
    container.innerHTML = `<i data-lucide="${iconName}" class="${classes}"></i>`;
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({ root: container });
    }
  }

  function updateMuteIcons() {
    const isMutedNow = currentModalVideo ? currentModalVideo.muted : isMuted;
    const iconName = isMutedNow ? "volume-x" : "volume-2";
    
    const vMuteBox = document.getElementById("modal-mute-icon-box");
    const hzMuteBox = document.getElementById("modal-hz-mute-icon-box");
    if (vMuteBox) renderLucide(vMuteBox, iconName, "w-5 h-5");
    if (hzMuteBox) renderLucide(hzMuteBox, iconName, "w-4 h-4 sm:w-5 sm:h-5");
  }

  function toggleMute() {
    if (!currentModalVideo) return;
    isMuted = !currentModalVideo.muted;
    currentModalVideo.muted = isMuted;
    updateMuteIcons();
  }

  function updateLikeUI() {
    if (!currentItemData) return;
    const liked = isItemLiked(currentItemData);
    const count = getDisplayLikes(currentItemData);

    // Vertical UI
    const vIconBox = document.getElementById("modal-like-icon-box");
    const vBtn = document.getElementById("modal-like-btn");
    const vCount = document.getElementById("modal-vert-like-count");
    if (vIconBox) {
      renderLucide(vIconBox, "heart", `w-5 h-5 sm:w-6 sm:h-6 transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-white"}`);
      if (vBtn) {
        if (liked) vBtn.classList.add("border-red-500/50");
        else vBtn.classList.remove("border-red-500/50");
      }
    }
    if (vCount) vCount.textContent = count;

    // Horizontal UI
    const hzIconBox = document.getElementById("modal-hz-like-icon-box");
    const hzBtn = document.getElementById("modal-hz-like-btn");
    const hzCount = document.getElementById("modal-hz-like-count");
    const hzText = document.getElementById("modal-hz-like-text");
    if (hzIconBox) {
      renderLucide(hzIconBox, "heart", `w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : ""}`);
      if (hzBtn) {
        if (liked) {
          hzBtn.classList.add("border-red-500/50", "text-red-400");
          hzBtn.classList.remove("text-white");
        } else {
          hzBtn.classList.remove("border-red-500/50", "text-red-400");
          hzBtn.classList.add("text-white");
        }
      }
      if (hzText) hzText.textContent = liked ? "Liked" : "Like";
    }
    if (hzCount) hzCount.textContent = count;
  }

  function toggleLike() {
    if (!currentItemData) return;
    const storageKey = getStorageKey('liked', currentItemData);
    const liked = isItemLiked(currentItemData);
    if (liked) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, "true");
    }
    updateLikeUI();
  }

  function updatePlayPauseUI(isPlaying) {
    if (isCurrentHorizontal) {
      const centerPlay = document.getElementById("modal-hz-center-play");
      if (centerPlay) {
        centerPlay.classList.toggle("opacity-0", isPlaying);
        centerPlay.classList.toggle("pointer-events-none", isPlaying);
      }
      const transportIconBox = document.getElementById("modal-hz-transport-icon-box");
      if (transportIconBox) {
        renderLucide(transportIconBox, isPlaying ? "pause" : "play", "w-3.5 h-3.5 fill-current");
      }
      const transportText = document.getElementById("modal-hz-transport-text");
      if (transportText) {
        transportText.textContent = isPlaying ? "Pause" : "Play";
      }
      const flashInd = document.getElementById("modal-hz-flash-indicator");
      const flashIconBox = document.getElementById("modal-hz-flash-icon-box");
      if (flashInd && flashIconBox) {
        renderLucide(flashIconBox, isPlaying ? "play" : "pause", "w-6 h-6 fill-white");
        flashInd.classList.remove("opacity-0");
        setTimeout(() => flashInd.classList.add("opacity-0"), 250);
      }
    } else {
      const playInd = document.getElementById("modal-play-indicator");
      if (playInd) {
        if (isPlaying) {
          playInd.classList.add("opacity-0");
        } else {
          playInd.classList.remove("opacity-0");
        }
      }
    }
  }

  function togglePlayPause() {
    if (!currentModalVideo) return;
    if (currentModalVideo.paused) {
      currentModalVideo.play().then(() => {
        updatePlayPauseUI(true);
      }).catch(() => {});
    } else {
      currentModalVideo.pause();
      updatePlayPauseUI(false);
    }
  }

  let lastHzUpdate = 0;
  function syncHorizontalProgress() {
    if (!currentModalVideo) return;
    const now = Date.now();
    if (now - lastHzUpdate < 150) return; // Throttle to ~6fps
    lastHzUpdate = now;

    const cur = currentModalVideo.currentTime || 0;
    const dur = currentModalVideo.duration || 0;
    if (dur > 0) {
      const pct = (cur / dur);
      if (modalHzProgressBar) modalHzProgressBar.style.transform = `scaleX(${pct})`;
      if (modalHzProgressThumb) modalHzProgressThumb.style.transform = `translateX(${pct * 100}%)`;
    }
    if (modalHzTimeDisplay) {
      modalHzTimeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
    }
  }

  function syncVerticalProgress() {
    if (!currentModalVideo || currentModalVideo.paused || currentModalVideo.ended) return;
    if (currentModalVideo.duration && modalProgressBar) {
      const progress = (currentModalVideo.currentTime / currentModalVideo.duration);
      modalProgressBar.style.transform = `scaleX(${progress})`;
    }
  }

  function populateComments(item) {
    if (!commentsList) return;
    commentsList.innerHTML = "";
    const simulatedComments = [
      { name: "Brand Creative Director", role: "Vogue / Luxury Brand", text: "Incredible pacing and cinematic color. The cut outperformed our previous campaign by 3x on retention!", time: "2 days ago" },
      { name: "Executive Producer", role: "Commercial Studio", text: "The color grade is pure cinema. Master-level precision and seamless audio sync 🔥", time: "1 week ago" },
      { name: "E-Commerce Founder", role: "Direct-to-Consumer", text: "Delivered way ahead of schedule. Scaled our ROAS to 4.2x with this creative spot.", time: "2 weeks ago" }
    ];
    const commentsToDisplay = item.comments && item.comments.length ? item.comments : simulatedComments;
    commentsToDisplay.forEach(c => {
      commentsList.innerHTML += `
        <div class="flex gap-3 items-start bg-white/[0.03] p-3 rounded-2xl border border-white/10 hover:border-white/20 transition">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex-shrink-0 flex items-center justify-center border border-white/15 text-blue-300">
            <i data-lucide="user-check" class="w-4 h-4"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <span class="text-white text-xs font-semibold truncate">${c.name}</span>
              <div class="flex items-center text-amber-400 text-[10px] gap-0.5">
                ★★★★★
              </div>
            </div>
            ${c.role ? `<span class="text-[10px] text-gray-400 font-mono block">${c.role}</span>` : ''}
            <p class="text-gray-300 text-xs mt-1 leading-relaxed">${c.text}</p>
            <span class="text-gray-500 text-[9px] mt-1.5 block">${c.time}</span>
          </div>
        </div>
      `;
    });
    if (drawerReviewBtn) {
      drawerReviewBtn.href = `mailto:aymen.bm.editing@gmail.com?subject=Review%20for%20Project:%20${encodeURIComponent(item.title)}`;
    }
  }

  function openModal(item, isHorizontal = false) {
    if (!modal) return;
    window.isModalOpen = true;
    isCurrentHorizontal = isHorizontal;
    currentItemData = item;

    // Free GPU for video playback
    const canvasBg = document.getElementById("canvas");
    if (canvasBg) canvasBg.style.display = 'none';

    if (isHorizontal) {
      if (verticalView) verticalView.classList.add("hidden");
      if (horizontalView) horizontalView.classList.remove("hidden");

      currentModalVideo = horizontalVideo;
      currentVideoIndex = -1;

      // Populate Outside Player Info (Top Bar & Bottom Bar)
      if (modalHzTitle) modalHzTitle.textContent = item.title;
      if (modalHzCategoryBadge) modalHzCategoryBadge.textContent = item.category || "16:9 Cinema";

      if (modalHzTags) {
        modalHzTags.innerHTML = (item.tags || []).map(tag => `
          <span class="text-xs text-blue-300 font-mono bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/25">#${tag}</span>
        `).join(" ");
      }

      if (modalHzOrderBtn) {
        modalHzOrderBtn.href = `mailto:aymen.bm.editing@gmail.com?subject=Inquire%20About%20Project:%20${encodeURIComponent(item.title)}`;
      }

      const commentsCount = (item.comments || []).length || 2;
      // Reset transport UI
      if (modalHzTransportText) modalHzTransportText.textContent = "Play";
      const transportIconBox = document.getElementById("modal-hz-transport-icon-box");
      if (transportIconBox) renderLucide(transportIconBox, "play", "w-3.5 h-3.5 fill-current");
      if (modalHzTimeDisplay) modalHzTimeDisplay.textContent = "0:00 / 0:00";
      if (modalHzProgressBar) modalHzProgressBar.style.width = "0%";
      if (modalHzCenterPlay) {
        modalHzCenterPlay.classList.remove("opacity-0");
        modalHzCenterPlay.classList.remove("pointer-events-none");
      }

    } else {
      if (horizontalView) horizontalView.classList.add("hidden");
      if (verticalView) verticalView.classList.remove("hidden");

      currentModalVideo = verticalVideo;
      currentVideoIndex = videos.findIndex(v => v.id === item.id);

      // Populate Vertical Info
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalCat) modalCat.textContent = item.category;

      if (modalOrderBtn) {
        modalOrderBtn.href = `mailto:aymen.bm.editing@gmail.com?subject=Order%20Similar%20Edit:%20${encodeURIComponent(item.title)}`;
      }

      const commentsCount = (item.comments || []).length || 3;
      if (modalVertCommentCount) modalVertCommentCount.textContent = commentsCount;

      // Preload next adjacent reel
      if (currentVideoIndex >= 0 && currentVideoIndex < videos.length - 1) {
        const nextItem = videos[currentVideoIndex + 1];
        const nextSrc = (preferredQuality === 'HD') ? nextItem.masterSrc : (nextItem.mobileSrc || nextItem.masterSrc);
        preloadAdjacentVideo(nextSrc);
      }
    }

    if (!currentModalVideo) return;

    // Load active video source
    const activeVideoSrc = (preferredQuality === 'HD' || isHorizontal)
      ? item.masterSrc
      : (item.mobileSrc || item.masterSrc);

    if (currentModalVideo.src) {
      currentModalVideo.pause();
      currentModalVideo.src = "";
      currentModalVideo.removeAttribute("src");
      try { currentModalVideo.load(); } catch(e) {}
    }

    currentModalVideo.src = activeVideoSrc;
    currentModalVideo.currentTime = 0;
    currentModalVideo.muted = isMuted;

    updateQualityBadges();
    updateMuteIcons();
    updateLikeUI();
    populateComments(item);

    // Playback Listeners
    currentModalVideo.onplay = () => {
      updatePlayPauseUI(true);
      if (isHorizontal) syncHorizontalProgress();
      else syncVerticalProgress();
    };

    currentModalVideo.onpause = () => {
      updatePlayPauseUI(false);
    };

    let lastVertUpdate = 0;
    currentModalVideo.ontimeupdate = () => {
      if (isHorizontal) {
        syncHorizontalProgress();
      } else {
        const now = Date.now();
        if (now - lastVertUpdate < 150) return;
        lastVertUpdate = now;
        syncVerticalProgress();
      }
    };

    currentModalVideo.onloadedmetadata = () => {
      if (isHorizontal) syncHorizontalProgress();
    };

    // Attempt Autoplay
    currentModalVideo.play().then(() => {
      updatePlayPauseUI(true);
    }).catch(() => {
      // Browser blocked audio autoplay -> fallback to muted
      currentModalVideo.muted = true;
      isMuted = true;
      updateMuteIcons();
      currentModalVideo.play().then(() => {
        updatePlayPauseUI(true);
      }).catch(() => {
        updatePlayPauseUI(false);
      });
    });

    // Lock Body Scroll
    document.body.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden';

    // Show Modal
    modal.classList.remove("opacity-0", "pointer-events-none");
    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("opacity-0", "pointer-events-none");

    [verticalVideo, horizontalVideo].forEach(v => {
      if (v) {
        v.pause();
        v.src = "";
        v.removeAttribute("src");
        try { v.load(); } catch(e) {}
      }
    });

    currentModalVideo = null;
    currentItemData = null;

    if (preloaderVideo) {
      preloaderVideo.pause();
      preloaderVideo.src = "";
      preloaderVideo.removeAttribute("src");
      try { preloaderVideo.load(); } catch(e) {}
    }

    if (commentsDrawer) commentsDrawer.classList.add("translate-y-full");
    if (modalPlayIndicator) modalPlayIndicator.classList.add("opacity-0");
    if (modalHzCenterPlay) {
      modalHzCenterPlay.classList.add("opacity-0");
      modalHzCenterPlay.classList.add("pointer-events-none");
    }

    // Unlock Body Scroll
    document.body.style.overscrollBehavior = 'auto';
    document.body.style.overflow = 'auto';

    // Resume Background WebGL on Desktop
    window.isModalOpen = false;
    const canvasBg = document.getElementById("canvas");
    if (canvasBg && window.matchMedia('(min-width: 768px)').matches) {
      canvasBg.style.display = 'block';
    }
  }

  // --- BUTTON EVENT LISTENERS --- //

  // Quality Toggle
  [modalQualityBtn, modalHzQualityBtn].forEach(btn => {
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleQuality();
      };
    }
  });

  // Mute Toggle
  [modalMuteBtn, modalHzMuteBtn].forEach(btn => {
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleMute();
      };
    }
  });

  // Like Toggle
  [modalLikeBtn, modalHzLikeBtn].forEach(btn => {
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleLike();
      };
    }
  });

  // Comments Drawer Toggle
  [modalCommentBtn, modalHzCommentBtn].forEach(btn => {
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        if (commentsDrawer) commentsDrawer.classList.toggle("translate-y-full");
      };
    }
  });

  if (closeCommentsBtn) {
    closeCommentsBtn.onclick = (e) => {
      e.stopPropagation();
      if (commentsDrawer) commentsDrawer.classList.add("translate-y-full");
    };
  }

  // Close Modal Triggers
  [modalClose, modalHzCloseBtn, modalHzCloseBack].forEach(btn => {
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        closeModal();
      };
    }
  });

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // Horizontal Video Interactions
  if (modalHzVideoContainer) {
    modalHzVideoContainer.onclick = (e) => {
      e.stopPropagation();
      togglePlayPause();
    };
  }

  if (modalHzPlayPauseBtn) {
    modalHzPlayPauseBtn.onclick = (e) => {
      e.stopPropagation();
      togglePlayPause();
    };
  }

  if (modalHzCenterPlay) {
    modalHzCenterPlay.onclick = (e) => {
      e.stopPropagation();
      togglePlayPause();
    };
  }

  // Horizontal Progress Scrubber (Click & Drag with Pointer Capture)
  if (modalHzProgressContainer) {
    let isSeekingHz = false;
    const seekHz = (e) => {
      if (!currentModalVideo || !currentModalVideo.duration) return;
      const rect = modalHzProgressContainer.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const pos = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      currentModalVideo.currentTime = pos * currentModalVideo.duration;
      syncHorizontalProgress();
    };

    modalHzProgressContainer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      isSeekingHz = true;
      try { modalHzProgressContainer.setPointerCapture(e.pointerId); } catch(_) {}
      seekHz(e);
    });

    modalHzProgressContainer.addEventListener('pointermove', (e) => {
      if (isSeekingHz) {
        e.stopPropagation();
        seekHz(e);
      }
    });

    const stopSeek = (e) => {
      if (isSeekingHz) {
        isSeekingHz = false;
        try { modalHzProgressContainer.releasePointerCapture(e.pointerId); } catch(_) {}
      }
    };

    modalHzProgressContainer.addEventListener('pointerup', stopSeek);
    modalHzProgressContainer.addEventListener('pointercancel', stopSeek);
  }

  // Horizontal Fullscreen Button
  if (modalHzFullscreenBtn) {
    modalHzFullscreenBtn.onclick = (e) => {
      e.stopPropagation();
      const playerBox = document.getElementById("modal-hz-player-box");
      if (!playerBox) return;
      if (!document.fullscreenElement) {
        if (playerBox.requestFullscreen) playerBox.requestFullscreen();
        else if (horizontalVideo && horizontalVideo.webkitEnterFullscreen) horizontalVideo.webkitEnterFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    };
  }

  // Vertical Tap to Play/Pause & Double Tap Heart Pop
  let lastTap = 0;
  function triggerHeartPop() {
    if (!heartPop) return;
    heartPop.classList.remove("opacity-0", "animate-heart-pop");
    void heartPop.offsetWidth;
    heartPop.classList.add("animate-heart-pop");
    if (currentItemData && !isItemLiked(currentItemData)) {
      toggleLike();
    }
  }

  if (modalVideoContainer) {
    modalVideoContainer.onclick = (e) => {
      if (e.target.closest('#comments-drawer') || e.target.closest('button') || e.target.closest('a')) return;
      const now = Date.now();
      if (now - lastTap < 300) {
        triggerHeartPop();
        lastTap = 0;
        return;
      }
      lastTap = now;
      setTimeout(() => {
        if (Date.now() - lastTap >= 280 && lastTap !== 0) {
          togglePlayPause();
        }
      }, 290);
    };
  }

  // Vertical Seek interaction
  if (modalProgressContainer) {
    modalProgressContainer.onpointerdown = (e) => {
      e.stopPropagation();
      if (!currentModalVideo || !currentModalVideo.duration) return;
      const rect = modalProgressContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      currentModalVideo.currentTime = Math.max(0, Math.min(pos, 1)) * currentModalVideo.duration;
    };
  }

  // Keyboard Navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.code === "Space" && window.isModalOpen) {
      e.preventDefault();
      togglePlayPause();
    }
    if ((e.key === "m" || e.key === "M") && window.isModalOpen) {
      toggleMute();
    }
    if (e.key === "ArrowLeft" && window.isModalOpen && currentModalVideo) {
      currentModalVideo.currentTime = Math.max(0, currentModalVideo.currentTime - 5);
    }
    if (e.key === "ArrowRight" && window.isModalOpen && currentModalVideo) {
      currentModalVideo.currentTime = Math.min(currentModalVideo.duration || 0, currentModalVideo.currentTime + 5);
    }
  });

  // Vertical Mobile Gestures (Swipe Next/Prev Reel, Swipe Right Dismiss)
  let touchStartX = 0;
  let touchStartY = 0;

  if (modalVideoContainer) {
    modalVideoContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    modalVideoContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchStartY - touchEndY;

      const modalCard = document.getElementById("modal-card");
      if (!modalCard) return;
      const isAnimating = modalCard.classList.contains('swipe-up-out') || 
                          modalCard.classList.contains('swipe-down-out') || 
                          modalCard.classList.contains('swipe-right-out');
      if (isAnimating) return;

      // 1. Gesture Dismiss: Swipe Right (iOS/Reels standard)
      if (deltaX > 80 && Math.abs(deltaY) < 70) {
        modalCard.classList.add('swipe-right-out');
        setTimeout(() => {
          closeModal();
          modalCard.classList.remove('swipe-right-out');
        }, 260);
        return;
      }

      // 2. Vertical Swiping (Up / Down)
      if (deltaY > 55) {
        // Swiped UP -> Next Video
        if (currentVideoIndex >= 0 && currentVideoIndex < videos.length - 1) {
          modalCard.classList.add('swipe-up-out');
          setTimeout(() => {
            openModal(videos[currentVideoIndex + 1]);
            modalCard.classList.remove('swipe-up-out');
            modalCard.classList.add('swipe-up-in');
            setTimeout(() => modalCard.classList.remove('swipe-up-in'), 300);
          }, 280);
        }
      } else if (deltaY < -55) {
        // Swiped DOWN -> Prev Video (or Pull-Down Dismiss if on first video)
        if (currentVideoIndex > 0) {
          modalCard.classList.add('swipe-down-out');
          setTimeout(() => {
            openModal(videos[currentVideoIndex - 1]);
            modalCard.classList.remove('swipe-down-out');
            modalCard.classList.add('swipe-down-in');
            setTimeout(() => modalCard.classList.remove('swipe-down-in'), 300);
          }, 280);
        } else if (currentVideoIndex === 0) {
          // Pull down to dismiss
          modalCard.classList.add('swipe-down-out');
          setTimeout(() => {
            closeModal();
            modalCard.classList.remove('swipe-down-out');
          }, 260);
        }
      }
    }, { passive: true });
  }

  // 5. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 6. Smooth Background Parallax on mouse move (Desktop only)
  const bgImg = document.getElementById("dynamic-bg-img");
  const hasMousePointer = window.matchMedia('(pointer: fine)').matches;
  if (bgImg && hasMousePointer) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (window.innerWidth / 2 - e.clientX) / 60;
      mouseY = (window.innerHeight / 2 - e.clientY) / 60;
    }, { passive: true });

    function animateParallax() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      bgImg.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateParallax);
    }
    animateParallax();
  }
});
