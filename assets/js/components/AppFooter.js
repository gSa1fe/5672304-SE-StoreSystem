// คอมโพเนนต์ส่วนท้ายหน้าเว็บ (App Footer)
class AppFooter extends HTMLElement {
  connectedCallback() {
    const currentYear = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <p>SE - Store System By Yannawut &copy; ${currentYear}</p>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('app-footer')) {
  customElements.define('app-footer', AppFooter);
}
