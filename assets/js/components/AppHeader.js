// คอมโพเนนต์แถบเมนูด้านบน (App Header)
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._handleHamburgerClick = this._handleHamburgerClick.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleSearchLinkClick = this._handleSearchLinkClick.bind(this);
  }

  // รายการเมนูนำทางของเว็บไซต์
  static get NAV_ITEMS() {
    return [
      {
        id: 'home',
        label: 'หน้าหลัก',
        getPath: (base) => `${base}/index.html`,
        iconSvg: '<svg class="ui-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
      },
      {
        id: 'best-sellers',
        label: 'สินค้าขายดี',
        getPath: (base) => `${base}/index.html#bestSellers`,
        iconSvg: '<svg class="ui-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
      },
      {
        id: 'products',
        label: 'สินค้า',
        getPath: (base) => `${base}/index.html#allProducts`,
        iconSvg: '<svg class="ui-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 6.33 7 5.5 7z"/></svg>'
      },
      {
        id: 'search',
        label: 'ค้นหา',
        getPath: (base) => `${base}/index.html#allProducts`,
        action: 'focus-search',
        iconSvg: '<svg class="ui-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
      },
      {
        id: 'login',
        label: 'เข้าสู่ระบบ',
        getPath: (base) => `${base}/pages/login.html`,
        iconSvg: '<svg class="ui-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  get basePath() {
    return this.getAttribute('base-path') || '.';
  }

  get activePage() {
    return this.getAttribute('active-page') || 'home';
  }

  // สร้างโครงสร้าง HTML ของ Header และปุ่มเมนู
  render() {
    const base = this.basePath;
    const active = this.activePage;

    const navItemsHtml = AppHeader.NAV_ITEMS.map((item) => {
      const isActive = item.id === active;
      const activeClass = isActive ? 'active' : '';
      const href = item.getPath(base);
      const actionAttr = item.action ? `data-action="${item.action}"` : '';

      return `
        <li class="nav-item">
          <a href="${href}" class="nav-link ${activeClass}" ${actionAttr}>
            ${item.iconSvg}
            <span>${item.label}</span>
          </a>
        </li>
      `;
    }).join('');

    this.innerHTML = `
      <header class="site-header">
        <div class="container nav-wrapper">
          <a href="${base}/index.html" class="brand-group">
            <img src="${base}/assets/images/branding/logo.png" alt="SE - Store System" class="brand-logo">
            <span class="brand-name">SE - Store System</span>
          </a>

          <button type="button" id="hamburgerBtn" class="hamburger-btn" aria-label="Toggle Navigation">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <ul id="navMenu" class="nav-menu">
            ${navItemsHtml}
          </ul>
        </div>
      </header>
    `;
  }

  // ผูก Event ให้ปุ่ม Hamburger และปุ่มลัดค้นหา
  bindEvents() {
    this._hamburgerBtn = this.querySelector('#hamburgerBtn');
    this._navMenu = this.querySelector('#navMenu');

    if (this._hamburgerBtn && this._navMenu) {
      this._hamburgerBtn.addEventListener('click', this._handleHamburgerClick);
      document.addEventListener('click', this._handleOutsideClick);
    }

    const searchLinks = this.querySelectorAll('[data-action="focus-search"]');
    searchLinks.forEach((link) => {
      link.addEventListener('click', this._handleSearchLinkClick);
    });
  }

  unbindEvents() {
    if (this._hamburgerBtn) {
      this._hamburgerBtn.removeEventListener('click', this._handleHamburgerClick);
    }
    document.removeEventListener('click', this._handleOutsideClick);
  }

  // สลับการเปิด-ปิดเมนูบนหน้าจอมือถือ
  _handleHamburgerClick(e) {
    e.stopPropagation();
    if (this._navMenu) {
      this._navMenu.classList.toggle('is-open');
    }
  }

  // ปิดเมนูเมื่อคลิกพื้นที่ด้านนอก
  _handleOutsideClick(e) {
    if (this._navMenu && !this.contains(e.target)) {
      this._navMenu.classList.remove('is-open');
    }
  }

  // โฟกัสไปที่ช่องค้นหาสินค้าเมื่อกดเมนูค้นหา
  _handleSearchLinkClick() {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }
}

if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}
