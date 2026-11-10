// ค่าคงที่และการตั้งค่าส่วนกลางของเว็บไซต์
(function (global) {
  'use strict';

  global.SEStore = global.SEStore || {};

  // ค่าคงที่ของระบบ (การดึงข้อมูล, เวลาสไลด์, ตัวเลือก DOM, ข้อความ)
  const CONFIG = Object.freeze({
    API: Object.freeze({
      PRODUCTS_URL: 'data/products.json'
    }),
    SLIDER: Object.freeze({
      AUTO_PLAY_INTERVAL_MS: 4000,
      TRANSITION_SPEED_MS: 350
    }),
    SELECTORS: Object.freeze({
      // เมนูด้านบน
      HAMBURGER_BTN: '#hamburgerBtn',
      NAV_MENU: '#navMenu',
      NAV_SEARCH_LINK: '[data-action="focus-search"]',

      // สไลด์ภาพแบนเนอร์
      CAROUSEL_TRACK: '#carouselTrack',
      CAROUSEL_SLIDE: '.carousel-slide',
      CAROUSEL_PREV: '#carouselPrev',
      CAROUSEL_NEXT: '#carouselNext',
      CAROUSEL_DOTS: '#carouselDots',

      // สินค้าขายดี
      BEST_SELLER_GRID: '#bestSellerGrid',

      // สินค้าทั้งหมดและช่องค้นหา
      CATALOG_GRID: '#productGrid',
      SEARCH_INPUT: '#searchInput',
      SEARCH_BTN: '#btnSearch',
      CATEGORY_FILTER: '#categoryFilter'
    }),
    I18N: Object.freeze({
      CURRENCY_SUFFIX: 'บาท',
      CURRENCY_CODE_EN: 'bath',
      STOCK_SUFFIX: 'items',
      CATEGORY_ALL_VALUE: 'all',
      CATEGORY_ALL_LABEL: 'เลือกประเภทสินค้า',
      EMPTY_SEARCH_LABEL: 'ไม่พบรายการสินค้าที่ค้นหา',
      LOAD_ERROR_LABEL: 'ไม่สามารถโหลดข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง'
    })
  });

  // คลังไอคอน SVG ส่วนกลางสำหรับเรียกใช้ซ้ำ
  const ICONS = Object.freeze({
    tag: '<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>',
    folder: '<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
    card: '<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
    price: '<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/></svg>',
    inventory: '<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/></svg>'
  });

  // ฟังก์ชันตัวช่วยสำหรับจัดการข้อความและตัวเลข
  const UTILS = Object.freeze({
    // กรองอักขระพิเศษเพื่อป้องกัน XSS
    escapeHtml(str) {
      if (typeof str !== 'string') return String(str ?? '');
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    // จัดรูปแบบราคาเป็นทศนิยม 2 ตำแหน่ง
    formatCurrency(amount, unit = CONFIG.I18N.CURRENCY_SUFFIX) {
      const num = Number(amount) || 0;
      return `${num.toFixed(2)} ${unit}`;
    },
    // จัดรูปแบบจำนวนสินค้าในสต็อก
    formatStock(stock, unit = CONFIG.I18N.STOCK_SUFFIX) {
      const num = Number(stock) || 0;
      return `${num} ${unit}`;
    },
    // หน่วงเวลาการทำงานเพื่อลดการประมวลผลซ้ำซ้อน
    debounce(fn, delayMs = 150) {
      let timeoutId = null;
      return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
      };
    }
  });

  global.SEStore.CONFIG = CONFIG;
  global.SEStore.ICONS = ICONS;
  global.SEStore.UTILS = UTILS;
})(window);
