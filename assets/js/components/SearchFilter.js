// โมดูลระบบค้นหาและกรองประเภทสินค้า
(function (global) {
  'use strict';

  global.SEStore = global.SEStore || {};

  function initSearchFilter(options) {
    const config = Object.assign({
      inputSelector: '#searchInput',
      btnSelector: '#btnSearch',
      selectSelector: '#categoryFilter',
      gridSelector: '#productGrid'
    }, options);

    const input = document.querySelector(config.inputSelector);
    const btn = document.querySelector(config.btnSelector);
    const select = document.querySelector(config.selectSelector);

    // ฟังก์ชันกรองรายการสินค้าตามคำค้นหาและประเภทที่เลือก
    function filter() {
      const keyword = (input ? input.value : '').trim().toLowerCase();
      const selectedType = select ? select.value : 'all';
      const allProducts = (global.SEStore.getData && global.SEStore.getData().products) || [];

      const filtered = allProducts.filter(item => {
        const matchKeyword = !keyword ||
          item.name.toLowerCase().includes(keyword) ||
          item.code.toLowerCase().includes(keyword);

        const matchType = (selectedType === 'all') || (item.type === selectedType);

        return matchKeyword && matchType;
      });

      if (global.SEStore.renderProducts) {
        global.SEStore.renderProducts(config.gridSelector, filtered);
      }
    }

    // ผูก Event ให้ช่องค้นหา (พิมพ์ค้นหา และกดปุ่ม Enter)
    if (input) {
      input.addEventListener('input', filter);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          filter();
        }
      });
    }

    // ผูก Event ให้ปุ่ม Search
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filter();
      });
    }

    // ผูก Event ให้ดรอปดาวน์เลือกประเภทสินค้า
    if (select) {
      select.addEventListener('change', filter);
    }
  }

  global.SEStore.initSearchFilter = initSearchFilter;
})(window);
