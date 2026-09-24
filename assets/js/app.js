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
  let isModalOpen = false;
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
    // Changed back to w-full for grid layout
    card.className = "w-full group relative rounded-3xl bg-[#111] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-lg";

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
        <div class="absolute top-0 inset-x-0 p-3 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10 pointer-events-none">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/10 shadow-sm">
            ${videoItem.category}
          </span>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 shadow-sm">
            <i data-lucide="monitor" class="w-3 h-3"></i>
            Original
          </span>
        </div>

        <!-- Hover Overlay with Play Button -->
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <div class="w-20 h-20 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-2xl">
            <i data-lucide="play" class="w-8 h-8 ml-1 fill-current"></i>
          </div>
        </div>

        <!-- Bottom Info Gradient -->
        <div class="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none">
          <h3 class="text-sm md:text-base font-bold text-white group-hover:text-blue-300 transition-colors truncate">
            ${videoItem.title}
          </h3>
          <div class="flex items-center gap-1.5 mt-1">
            ${(videoItem.tags || []).slice(0, 3).map(tag => `
              <span class="text-[10px] md:text-xs text-gray-400 font-mono">#${tag}</span>
            `).join(" ")}
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(videoItem, true);
    });

    // We do NOT push this to carouselCards because it doesn't need GIF processing
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
      if (!isInteracting && !isModalOpen && isVisible) {
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

  // 4. Custom Video Modal with Interactions
  const modal = document.getElementById("video-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalCat = document.getElementById("modal-category");
  const modalContainer = document.getElementById("modal-video-container");
  const modalProgressBar = document.getElementById("modal-progress-bar");
  const modalProgressContainer = document.getElementById("modal-progress-container");
  const modalPlayIndicator = document.getElementById("modal-play-indicator");
  const modalPlayIcon = document.getElementById("modal-play-icon");
  const modalOrderBtn = document.getElementById("modal-order-btn");
  
  const modalLikeBtn = document.getElementById("modal-like-btn");
  const modalLikeIcon = document.getElementById("modal-like-icon");
  const modalCommentBtn = document.getElementById("modal-comment-btn");
  const commentsDrawer = document.getElementById("comments-drawer");
  const closeCommentsBtn = document.getElementById("close-comments");
  const commentsList = document.getElementById("comments-list");

  let currentModalVideo = null;
  let currentItemData = null;
  let currentVideoIndex = 0;

  function openModal(item, isHorizontal = false) {
    if (!modal || !modalContainer) return;
    
    // Stop background animations and hide WebGL canvas to free 100% GPU for video
    isModalOpen = true;
    const canvasBg = document.getElementById("canvas");
    if (canvasBg) canvasBg.style.display = 'none';

    
    currentItemData = item;
    // We only support swiping for vertical videos right now
    currentVideoIndex = isHorizontal ? -1 : videos.findIndex(v => v.id === item.id);
    
    // UI Elements toggling
    const modalHzInfo = document.getElementById("modal-hz-info");
    const modalSocialGradient = document.getElementById("modal-social-gradient");
    const modalSocialInfo = document.getElementById("modal-social-info");
    const modalSocialActions = document.getElementById("modal-social-actions");
    const modalHzTitle = document.getElementById("modal-hz-title");
    const modalHzCat = document.getElementById("modal-hz-category");

    if (isHorizontal) {
      if (modalHzInfo) modalHzInfo.classList.remove("hidden");
      if (modalSocialGradient) modalSocialGradient.classList.add("hidden");
      if (modalSocialInfo) modalSocialInfo.classList.add("hidden");
      if (modalSocialActions) modalSocialActions.classList.add("hidden");
      if (modalHzTitle) modalHzTitle.textContent = item.title;
      if (modalHzCat) modalHzCat.textContent = item.category;
    } else {
      if (modalHzInfo) modalHzInfo.classList.add("hidden");
      if (modalSocialGradient) modalSocialGradient.classList.remove("hidden");
      if (modalSocialInfo) modalSocialInfo.classList.remove("hidden");
      if (modalSocialActions) modalSocialActions.classList.remove("hidden");
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalCat) modalCat.textContent = item.category;
    }

    // Setup Order button
    if (modalOrderBtn) {
      modalOrderBtn.href = `mailto:aymen.bm.editing@gmail.com?subject=Order%20Similar%20Edit:%20${encodeURIComponent(item.title)}`;
    }

    // Adjust modal layout based on orientation
    const modalCard = document.getElementById("modal-card") || document.querySelector("#video-modal > div");
    if (modalCard) {
      if (isHorizontal) {
        modalCard.className = "relative w-full h-auto max-h-screen sm:max-w-[1000px] flex flex-col bg-black sm:rounded-2xl sm:border sm:border-white/10 overflow-hidden shadow-2xl transition-all duration-300";
      } else {
        // True Native TikTok / Reels: edge-to-edge on mobile, 9:16 aspect on desktop
        modalCard.className = "relative w-full h-[100dvh] sm:h-[86vh] sm:aspect-[9/16] sm:w-auto rounded-none sm:rounded-[2rem] bg-black overflow-hidden shadow-2xl flex flex-col sm:border sm:border-white/20 transition-all duration-300";
      }
    }
    
    // Inject Custom Video Player seamlessly to prevent lag!
    const objectFitClass = isHorizontal ? "object-contain" : "object-cover";
    
    currentModalVideo = modalContainer.querySelector("video");
    if (!currentModalVideo) {
      currentModalVideo = document.createElement("video");
      currentModalVideo.autoplay = true;
      currentModalVideo.loop = true;
      currentModalVideo.playsInline = true;
      currentModalVideo.setAttribute('webkit-playsinline', '');
      currentModalVideo.disablePictureInPicture = true;
      currentModalVideo.preload = "auto";
      modalContainer.appendChild(currentModalVideo);
    }
    currentModalVideo.className = `w-full h-full ${objectFitClass} transition-opacity duration-300`;

    currentModalVideo.src = item.masterSrc;

    // Handle sound toggle state
    const modalMuteBtn = document.getElementById("modal-mute-btn");
    const modalMuteIcon = document.getElementById("modal-mute-icon");
    if (modalMuteBtn && modalMuteIcon) {
      modalMuteBtn.onclick = (e) => {
        e.stopPropagation();
        if (!currentModalVideo) return;
        currentModalVideo.muted = !currentModalVideo.muted;
        modalMuteIcon.setAttribute("data-lucide", currentModalVideo.muted ? "volume-x" : "volume-2");
        if (window.lucide) window.lucide.createIcons();
      };
    }

    // Auto-play handling for strict mobile browsers
    currentModalVideo.play().then(() => {
      modalPlayIndicator.classList.add("opacity-0");
    }).catch(() => {
      // If autoplay with sound was blocked, fallback to muted autoplay
      currentModalVideo.muted = true;
      if (modalMuteIcon) modalMuteIcon.setAttribute("data-lucide", "volume-x");
      currentModalVideo.play().then(() => {
        modalPlayIndicator.classList.add("opacity-0");
      }).catch(() => {
        modalPlayIndicator.classList.remove("opacity-0");
        modalPlayIcon.setAttribute("data-lucide", "play");
      });
      if (window.lucide) window.lucide.createIcons();
    });

    // Double-tap to Like & Tap to Play/Pause
    const heartPop = document.getElementById("modal-heart-pop");
    let lastTap = 0;

    function triggerHeartPop() {
      if (!heartPop) return;
      heartPop.classList.remove("opacity-0", "animate-heart-pop");
      void heartPop.offsetWidth;
      heartPop.classList.add("animate-heart-pop");
      if (modalLikeBtn && currentItemData) {
        const storageKey = getStorageKey('liked', currentItemData);
        if (!localStorage.getItem(storageKey)) {
          modalLikeBtn.click();
        }
      }
    }

    modalContainer.onclick = (e) => {
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
          if (!currentModalVideo) return;
          if (currentModalVideo.paused) {
            currentModalVideo.play();
            modalPlayIndicator.classList.add("opacity-0");
          } else {
            currentModalVideo.pause();
            modalPlayIcon.setAttribute("data-lucide", "play");
            if (window.lucide) window.lucide.createIcons();
            modalPlayIndicator.classList.remove("opacity-0");
          }
        }
      }, 290);
    };

    // Update Progress Bar (assigned via property to prevent duplicate listener accumulation)
    currentModalVideo.ontimeupdate = () => {
      if (!currentModalVideo.duration || !modalProgressBar) return;
      const progress = (currentModalVideo.currentTime / currentModalVideo.duration) * 100;
      modalProgressBar.style.width = `${progress}%`;
    };

    // Seek interaction (Pointer events for mobile & desktop)
    if (modalProgressContainer) {
      modalProgressContainer.onpointerdown = (e) => {
        e.stopPropagation(); 
        if (!currentModalVideo || !currentModalVideo.duration) return;
        const rect = modalProgressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        currentModalVideo.currentTime = Math.max(0, Math.min(pos, 1)) * currentModalVideo.duration;
      };
    }

    // Prevent "Pull to Refresh" on mobile while in the modal
    document.body.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    
    // -- INTERACTIONS -- //
    
    // Reset states
    commentsDrawer.classList.add("translate-y-full");
    modalLikeIcon.classList.remove("fill-red-500", "text-red-500");
    modalLikeBtn.classList.remove("border-red-500/50");

    // Check localStorage for Likes
    const storageKey = getStorageKey('liked', item);
    if (localStorage.getItem(storageKey)) {
      modalLikeIcon.classList.add("fill-red-500", "text-red-500");
      modalLikeBtn.classList.add("border-red-500/50");
    }

    // Populate Comments
    commentsList.innerHTML = "";
    const simulatedComments = [
      { name: "Client from Upwork", text: "Incredible pacing. Delivered exactly what I wanted!", time: "2 days ago" },
      { name: "Brand Owner", text: "The color grading on this is insane 🔥", time: "1 week ago" },
      { name: "Agency Director", text: "Great communication and very fast turnaround.", time: "1 month ago" }
    ];
    
    // If the data file has custom comments, use them, otherwise use fallback
    const commentsToDisplay = item.comments || simulatedComments;
    
    commentsToDisplay.forEach(c => {
      commentsList.innerHTML += `
        <div class="flex gap-3">
          <div class="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
            <i data-lucide="user" class="w-4 h-4 text-gray-300"></i>
          </div>
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-white text-xs font-semibold">${c.name}</span>
              <span class="text-gray-500 text-[10px]">${c.time}</span>
            </div>
            <p class="text-gray-300 text-xs mt-0.5">${c.text}</p>
          </div>
        </div>
      `;
    });

    // Show modal
    modal.classList.remove("opacity-0", "pointer-events-none");
    if (window.lucide) window.lucide.createIcons();
  }

  function getStorageKey(prefix, item) {
    const keyBase = item.title ? item.title.trim() : item.id;
    return `${prefix}_${keyBase}`;
  }

  // Like Button Click
  if (modalLikeBtn) {
    modalLikeBtn.addEventListener("click", () => {
      if (!currentItemData) return;
      const storageKey = getStorageKey('liked', currentItemData);
      const isLiked = localStorage.getItem(storageKey);
      if (isLiked) {
        localStorage.removeItem(storageKey);
        modalLikeIcon.classList.remove("fill-red-500", "text-red-500");
        modalLikeBtn.classList.remove("border-red-500/50");
      } else {
        localStorage.setItem(storageKey, "true");
        modalLikeIcon.classList.add("fill-red-500", "text-red-500");
        modalLikeBtn.classList.add("border-red-500/50");
      }
    });
  }

  // Comment Drawer Toggle
  if (modalCommentBtn && commentsDrawer) {
    modalCommentBtn.addEventListener("click", () => {
      commentsDrawer.classList.toggle("translate-y-full");
    });
  }
  if (closeCommentsBtn && commentsDrawer) {
    closeCommentsBtn.addEventListener("click", () => {
      commentsDrawer.classList.add("translate-y-full");
    });
  }

  function closeModal() {
    if (!modal || !modalContainer) return;
    modal.classList.add("opacity-0", "pointer-events-none");
    
    if (currentModalVideo) {
      currentModalVideo.pause();
      currentModalVideo.src = "";
      currentModalVideo.load(); // Forces browser to drop video memory
    }
    
    commentsDrawer.classList.add("translate-y-full"); // reset drawer
    if (modalPlayIndicator) modalPlayIndicator.classList.add("opacity-0");
    
    // Unlock background scroll
    document.body.style.overscrollBehavior = 'auto';
    document.body.style.overflow = 'auto';
    
    // Resume background animations
    isModalOpen = false;
    const canvasBg = document.getElementById("canvas");
    if (canvasBg) canvasBg.style.display = 'block';
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  
  // Close if clicked outside video
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 5. Full-Screen Native TikTok/Reels Gesture Engine
  let touchStartX = 0;
  let touchStartY = 0;
  
  if (modalContainer) {
    modalContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    modalContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchStartY - touchEndY;

      const modalCard = document.getElementById("modal-card") || modalContainer;
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
