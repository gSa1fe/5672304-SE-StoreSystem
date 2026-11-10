// โมดูลควบคุมสไลด์ภาพแบนเนอร์ (เลื่อนอัตโนมัติ และปุ่มควบคุม)
(function (global) {
  'use strict';

  global.SEStore = global.SEStore || {};

  function initSlider(options) {
    const config = Object.assign({
      trackSelector: '#carouselTrack',
      slidesSelector: '.carousel-slide',
      prevBtnSelector: '#carouselPrev',
      nextBtnSelector: '#carouselNext',
      dotsContainerSelector: '#carouselDots',
      intervalMs: 4000
    }, options);

    const track = document.querySelector(config.trackSelector);
    const prevBtn = document.querySelector(config.prevBtnSelector);
    const nextBtn = document.querySelector(config.nextBtnSelector);
    const dotsContainer = document.querySelector(config.dotsContainerSelector);

    if (!track) return;
    const slides = track.querySelectorAll(config.slidesSelector);
    if (slides.length === 0) return;

    let currentIndex = 0;
    const total = slides.length;
    let timer = null;

    // สร้างจุดบอกตำแหน่งสไลด์ (Dots)
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `dot-btn ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => goTo(idx));
        dotsContainer.appendChild(dot);
      });
    }

    // อัปเดตตำแหน่งรางสไลด์และสถานะจุด Dots
    function update() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot-btn');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    // เลื่อนไปยังสไลด์ที่ระบุ
    function goTo(idx) {
      currentIndex = (idx + total) % total;
      update();
      restartTimer();
    }

    // เลื่อนไปสไลด์ถัดไป
    function next() {
      goTo(currentIndex + 1);
    }

    // เลื่อนกลับสไลด์ก่อนหน้า
    function prev() {
      goTo(currentIndex - 1);
    }

    // เริ่มนับเวลาเลื่อนอัตโนมัติ
    function startTimer() {
      stopTimer();
      timer = setInterval(next, config.intervalMs);
    }

    // หยุดนับเวลา
    function stopTimer() {
      if (timer) clearInterval(timer);
    }

    // รีเซ็ตการนับเวลาใหม่เมื่อผู้ใช้กดเปลี่ยนสไลด์เอง
    function restartTimer() {
      stopTimer();
      startTimer();
    }

    if (nextBtn) nextBtn.onclick = next;
    if (prevBtn) prevBtn.onclick = prev;

    startTimer();
  }

  global.SEStore.initSlider = initSlider;
})(window);
