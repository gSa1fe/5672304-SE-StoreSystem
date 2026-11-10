# SE - Store System

โครงงานรายวิชา **5672304 การพัฒนาเว็บด้วยเทคโนโลยีสมัยใหม่ (Modern Web Programming)**  
สาขาวิชาวิศวกรรมซอฟต์แวร์ คณะเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยราชภัฏลำปาง

---

## สถาปัตยกรรมระดับองค์กร (Clean Architecture & Directory Layout)

ระบบได้รับการจัดระเบียบโครงสร้างไดเรกทอรีใหม่ตามมาตรฐาน **Layered Architecture** เพื่อความยั่งยืนในการดูแลรักษา (Maintainability) และรองรับการเติบโตของหน้าเว็บในอนาคต (Scalability):

```text
5672304-Store/
├── assets/
│   ├── css/
│   │   ├── style.css                # Master Bundle Aggregator (@import)
│   │   ├── core/                    # Tokens และ Base Reset
│   │   │   ├── variables.css        # ตัวแปรสี Dark Mode Monochrome, Radii, Typography
│   │   │   └── base.css             # CSS Reset, Box-sizing และ Base Layout Container
│   │   ├── components/              # คอมโพเนนต์ UI อิสระ (OOCSS)
│   │   │   ├── navbar.css           # Header, Brand Logo, Navigation และ Mobile Drawer
│   │   │   ├── carousel.css         # สไลด์แบนเนอร์ ปุ่มควบคุม และ Dots Indicator
│   │   │   ├── card.css             # การ์ดสินค้าขายดี และ Grid แค็ตตาล็อก 6 คอลัมน์
│   │   │   ├── form.css             # แถบค้นหา ช่องกรอก ปุ่ม และ Dropdown ตัวกรอง
│   │   │   └── footer.css           # ส่วนท้ายหน้าเว็บแบบ Text-Only
│   │   └── pages/                   # สไตล์เฉพาะหน้าเพจ
│   │       └── login.css            # สไตล์เฉพาะฟอร์มการ์ดหน้าเข้าสู่ระบบ
│   │
│   ├── js/
│   │   ├── main.js                  # Application Entrypoint สำหรับ index.html
│   │   ├── core/                    # การตั้งค่าส่วนกลาง
│   │   │   └── config.js            # Immutable Config, Selectors, SVG Icons และ Utilities
│   │   ├── models/                  # Domain Entities (OOP)
│   │   │   └── Product.js           # OOP Class แทนข้อมูลสินค้าพร้อม Business Logic & Getters
│   │   ├── services/                # บริการดึงข้อมูลและจัดการ State
│   │   │   └── ProductService.js    # Data Fetching Service & Template Rendering
│   │   ├── components/              # คอมโพเนนต์ UI และคอนโทรลเลอร์
│   │   │   ├── AppHeader.js         # Web Component: <app-header>
│   │   │   ├── AppFooter.js         # Web Component: <app-footer>
│   │   │   ├── Slider.js            # Banner Carousel Controller
│   │   │   └── SearchFilter.js      # Debounced Search & Category Filter Controller
│   │   └── pages/                   # สคริปต์เฉพาะหน้าเพจ
│   │       └── login.js             # ควบคุมฟอร์มการเข้าสู่ระบบ
│   │
│   └── images/
│       ├── branding/                # โลโก้เว็บไซต์ (logo.png)
│       ├── banners/                 # ภาพแบนเนอร์ประชาสัมพันธ์
│       └── products/                # ภาพสินค้า
├── data/
│   └── products.json                # ข้อมูลสินค้าสำหรับ Fetch API
├── docs/                            # เอกสารโจทย์ปฏิบัติการ (ModernWeb_LAB.pdf)
├── pages/
│   └── login.html                   # หน้าเข้าสู่ระบบ (ใช้งาน <app-header> และ <app-footer>)
├── index.html                       # หน้าหลัก (4 ส่วนตามโครงสร้าง DOM ในเอกสาร)
└── README.md                        # เอกสารอธิบายระบบและสถาปัตยกรรม
```

---

## จุดเด่นของสถาปัตยกรรมใหม่

1. **ไม่มีไฟล์ตกหล่นหรือลอยเคว้ง (Zero Stray Files):**
   - แยกไฟล์เป็นหมวดหมู่ชัดเจน: `core/`, `models/`, `services/`, `components/`, `pages/`
   - ไม่มีไฟล์คอมโพเนนต์หรือไฟล์เฉพาะหน้าเพจตกค้างอยู่ที่ Root ของโฟลเดอร์ `js` หรือ `css`
2. **ขจัดโค้ดซ้ำซ้อน (DRY Principle):**
   - ส่วน Header Navbar และ Footer ถูกสร้างเป็น Web Components (`<app-header>`, `<app-footer>`) 
   - เมื่อเพิ่มหน้าเพจใหม่ สามารถเรียกใช้คอมโพเนนต์ได้ทันทีโดยไม่ต้องคัดลอกโค้ด HTML ซ้ำ
3. **OOP Domain Model:**
   - ข้อมูลสินค้าถูกแปลงเป็น Object ของคลาส `Product` เพื่อให้เรียกใช้ Getters (`formattedPrice`, `formattedStock`) ได้อย่างเป็นมาตรฐาน
4. **OOCSS & Co-location:**
   - ทุกคอมโพเนนต์ CSS มี Media Query สำหรับ Responsive อยู่ในไฟล์ของตัวเอง (Self-contained) ทำให้บำรุงรักษาง่าย ไม่ขัดแย้งกับส่วนอื่น
