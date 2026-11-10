// จุดเริ่มต้นการทำงานหลักของหน้าเว็บ
document.addEventListener('DOMContentLoaded', async () => {
  'use strict';

  const { CONFIG, loadData, renderBanners, renderBestSellers, renderCategories, renderProducts, initSlider, initSearchFilter } = window.SEStore || {};

  if (!CONFIG || typeof loadData !== 'function') {
    console.error('[SEStore] Essential core services missing.');
    return;
  }

  const { SELECTORS, API } = CONFIG;

  try {
    // 1. โหลดข้อมูลสินค้าและแบนเนอร์
    const data = await loadData(API.PRODUCTS_URL);

    // 2. แสดงสไลด์ภาพประชาสัมพันธ์และเริ่มทำงาน
    if (typeof renderBanners === 'function') {
      renderBanners(SELECTORS.CAROUSEL_TRACK, data.banners);
      if (typeof initSlider === 'function') {
        initSlider();
      }
    }

    // 3. แสดงรายการสินค้าขายดี 5 รายการ
    if (typeof renderBestSellers === 'function') {
      renderBestSellers(SELECTORS.BEST_SELLER_GRID, data.bestSellers);
    }

    // 4. สร้างตัวเลือกหมวดหมู่สินค้าในดรอปดาวน์
    if (typeof renderCategories === 'function') {
      renderCategories(SELECTORS.CATEGORY_FILTER, data.products);
    }

    // 5. แสดงรายการสินค้าทั้งหมด 6 รายการ
    if (typeof renderProducts === 'function') {
      renderProducts(SELECTORS.CATALOG_GRID, data.products);
    }

    // 6. ผูกการทำงานระบบค้นหาและตัวกรองสินค้า
    if (typeof initSearchFilter === 'function') {
      initSearchFilter();
    }
  } catch (error) {
    console.error('[SEStore] Initialization error:', error);
  }
});
