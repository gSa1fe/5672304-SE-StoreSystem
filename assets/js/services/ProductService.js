// บริการจัดการข้อมูลสินค้าและการสร้างการ์ดแสดงผลบนหน้าเว็บ
(function (global) {
  'use strict';

  global.SEStore = global.SEStore || {};

  const { CONFIG, ICONS, UTILS, Product } = global.SEStore;

  // ข้อมูลสำรองกรณีเปิดไฟล์ตรงโดยไม่ผ่านเซิร์ฟเวอร์ (file://)
  const MOCK_DATA = Object.freeze({
    banners: [
      { id: 1, image: "assets/images/banners/banner1.svg", alt: "Banner 1" },
      { id: 2, image: "assets/images/banners/banner2.svg", alt: "Banner 2" },
      { id: 3, image: "assets/images/banners/banner3.svg", alt: "Banner 3" }
    ],
    bestSellers: [
      { id: 1, name: "มาม่าบะหมี่กึ่งสำเร็จรูป", price: 72.00, image: "assets/images/products/best1.svg" },
      { id: 2, name: "ซีอิ๊ว ภูเขาทอง", price: 175.00, image: "assets/images/products/best2.svg" },
      { id: 3, name: "มาลี เงาะกระป๋อง", price: 76.00, image: "assets/images/products/best3.svg" },
      { id: 4, name: "ทิปโก้แคนเบอร์รี่", price: 135.00, image: "assets/images/products/best4.svg" },
      { id: 5, name: "องุ่น (A Ngoon) น้ำมันถั่วเหลือง", price: 41.00, image: "assets/images/products/best5.svg" }
    ],
    products: [
      { id: 501, code: "รหัสสินค้า501", type: "บริโภค-สำเร็จรูป", name: "มาม่าบะหมี่", price: 12.00, stock: 100, image: "assets/images/products/prod501.svg" },
      { id: 502, code: "รหัสสินค้า502", type: "บริโภค-สำเร็จรูป", name: "ซีอิ๊ว ภูเขาทอง", price: 175.00, stock: 130, image: "assets/images/products/prod502.svg" },
      { id: 503, code: "รหัสสินค้า503", type: "บริโภค-สำเร็จรูป", name: "มาลี เงาะกระป๋อง", price: 76.00, stock: 100, image: "assets/images/products/prod503.svg" },
      { id: 504, code: "รหัสสินค้า504", type: "บริโภค-สำเร็จรูป", name: "ทิปโก้แคนเบอร์รี่", price: 135.00, stock: 100, image: "assets/images/products/prod504.svg" },
      { id: 505, code: "รหัสสินค้า505", type: "บริโภค-เครื่องปรุง", name: "องุ่น (A Ngoon) น้ำมันถั่วเหลือง", price: 41.00, stock: 100, image: "assets/images/products/prod505.svg" },
      { id: 506, code: "รหัสสินค้า506", type: "บริโภค-เครื่องปรุง", name: "เด็กสมบูรณ์ ซีอิ๊วดำ", price: 23.00, stock: 70, image: "assets/images/products/prod506.svg" }
    ]
  });

  const state = {
    banners: [],
    bestSellers: [],
    products: []
  };

  // ดึงข้อมูลสินค้าจากไฟล์ JSON หรือใช้ข้อมูลสำรองหากเกิดข้อผิดพลาด
  async function loadData(url = CONFIG.API.PRODUCTS_URL) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      state.banners = Array.isArray(data.banners) ? data.banners : [];
      state.bestSellers = Array.isArray(data.bestSellers) ? data.bestSellers : [];
      state.products = Array.isArray(data.products)
        ? data.products.map(item => (Product ? new Product(item) : item))
        : [];
    } catch (error) {
      console.warn('[SEStore] Live fetch unavailable, using offline fallback data:', error.message);
      state.banners = [...MOCK_DATA.banners];
      state.bestSellers = [...MOCK_DATA.bestSellers];
      state.products = MOCK_DATA.products.map(item => (Product ? new Product(item) : item));
    }
    return state;
  }

  // สร้าง HTML สำหรับแต่ละสไลด์ของแบนเนอร์
  function createBannerSlideHtml(banner) {
    const imgUrl = UTILS.escapeHtml(banner.image);
    const altText = UTILS.escapeHtml(banner.alt || 'Promotional Banner');
    return `
      <div class="carousel-slide">
        <img src="${imgUrl}" alt="${altText}">
      </div>
    `;
  }

  // นำรูปแบนเนอร์ไปแสดงผลบนหน้าเว็บ
  function renderBanners(target, banners = state.banners) {
    const track = typeof target === 'string' ? document.querySelector(target) : target;
    if (!track) return;
    track.innerHTML = banners.map(createBannerSlideHtml).join('');
  }

  // สร้าง HTML สำหรับการ์ดสินค้าขายดี
  function createBestSellerCardHtml(item) {
    const name = UTILS.escapeHtml(item.name);
    const image = UTILS.escapeHtml(item.image);
    const formattedPrice = UTILS.formatCurrency(item.price);

    return `
      <article class="best-card">
        <div class="best-card-img">
          <img src="${image}" alt="${name}" loading="lazy">
        </div>
        <div class="best-card-name" title="${name}">${name}</div>
        <div class="best-card-price">
          ${ICONS.tag}
          <span>${formattedPrice}</span>
        </div>
      </article>
    `;
  }

  // นำสินค้าขายดีไปแสดงผลในกริด
  function renderBestSellers(target, items = state.bestSellers) {
    const grid = typeof target === 'string' ? document.querySelector(target) : target;
    if (!grid) return;
    grid.innerHTML = items.map(createBestSellerCardHtml).join('');
  }

  // นำประเภทสินค้าที่ไม่ซ้ำไปใส่ในตัวเลือกลงดรอปดาวน์
  function renderCategories(target, products = state.products) {
    const select = typeof target === 'string' ? document.querySelector(target) : target;
    if (!select) return;

    const uniqueTypes = [...new Set(products.map(p => p.type).filter(Boolean))];
    const defaultOption = `<option value="${CONFIG.I18N.CATEGORY_ALL_VALUE}">${CONFIG.I18N.CATEGORY_ALL_LABEL}</option>`;
    const categoryOptions = uniqueTypes.map(type => {
      const safeType = UTILS.escapeHtml(type);
      return `<option value="${safeType}">${safeType}</option>`;
    }).join('');

    select.innerHTML = defaultOption + categoryOptions;
  }

  // สร้าง HTML สำหรับการ์ดสินค้าแต่ละรายการ
  function createProductCardHtml(item) {
    const code = UTILS.escapeHtml(item.code);
    const type = UTILS.escapeHtml(item.type);
    const name = UTILS.escapeHtml(item.name);
    const image = UTILS.escapeHtml(item.image);
    const formattedPrice = item.formattedPrice || UTILS.formatCurrency(item.price, CONFIG.I18N.CURRENCY_CODE_EN);
    const formattedStock = item.formattedStock || UTILS.formatStock(item.stock);

    return `
      <article class="product-card">
        <div class="product-card-img">
          <img src="${image}" alt="${name}" loading="lazy">
        </div>
        <div class="product-card-info">
          <div class="product-code">
            ${ICONS.tag}
            <span>${code}</span>
          </div>
          <div class="product-detail-line">
            ${ICONS.folder}
            <span>Type : ${type}</span>
          </div>
          <div class="product-detail-line" title="${name}">
            ${ICONS.card}
            <span>Name : <strong>${name}</strong></span>
          </div>
          <div class="product-detail-line">
            ${ICONS.price}
            <span>Price : ${formattedPrice}</span>
          </div>
          <div class="product-detail-line">
            ${ICONS.inventory}
            <span>Stock In : ${formattedStock}</span>
          </div>
        </div>
      </article>
    `;
  }

  // นำรายการสินค้าทั้งหมดไปแสดงผลในตารางกริด
  function renderProducts(target, products = state.products) {
    const grid = typeof target === 'string' ? document.querySelector(target) : target;
    if (!grid) return;

    if (!Array.isArray(products) || products.length === 0) {
      grid.innerHTML = `<div class="empty-state">${CONFIG.I18N.EMPTY_SEARCH_LABEL}</div>`;
      return;
    }

    grid.innerHTML = products.map(createProductCardHtml).join('');
  }

  // ส่งออกสำเนาข้อมูลปัจจุบันในระบบ
  function getData() {
    return {
      banners: [...state.banners],
      bestSellers: [...state.bestSellers],
      products: [...state.products]
    };
  }

  global.SEStore.loadData = loadData;
  global.SEStore.getData = getData;
  global.SEStore.renderBanners = renderBanners;
  global.SEStore.renderBestSellers = renderBestSellers;
  global.SEStore.renderCategories = renderCategories;
  global.SEStore.renderProducts = renderProducts;

})(window);
