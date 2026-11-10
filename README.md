# SE - Store System

โปรเจกต์ระบบหน้าร้านค้าออนไลน์ (E-Commerce Storefront)  
รายวิชา **5672304 การพัฒนาเว็บด้วยเทคโนโลยีสมัยใหม่ (Modern Web Programming)**  
สาขาวิชาวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยราชภัฏลำปาง

---

## ฟีเจอร์หลัก (Features)

- **แถบเมนูนำทาง (Navbar)**: แสดงโลโก้ เมนูลิงก์ และปุ่ม Hamburger สำหรับหน้าจอมือถือ (ทำเป็น Web Component `<app-header>` นำไปใช้ซ้ำได้ทุกหน้า)
- **สไลด์ประชาสัมพันธ์ (Banner Carousel)**: เลื่อนภาพอัตโนมัติทุก 4 วินาที มีปุ่มกดเลื่อนซ้าย-ขวา และจุดบอกตำแหน่งสไลด์ (Dots)
- **สินค้าขายดี (Best Sellers)**: แสดงสินค้าแนะนำ 5 รายการในรูปแบบการ์ด
- **แค็ตตาล็อกสินค้า (Product Catalog)**:
  - แสดงรายการสินค้าทั้งหมด 6 รายการในตารางกริด
  - ค้นหาสินค้าตามชื่อหรือรหัสสินค้าแบบ Real-time
  - กรองสินค้าตามประเภทสินค้าผ่าน Dropdown
- **หน้าเข้าสู่ระบบ (Login Page)**: หน้าฟอร์มล็อกอินแยกเฉพาะ พร้อมการตรวจสอบความถูกต้องของข้อมูล (Form Validation)
- **ส่วนท้ายเว็บ (Footer)**: แสดงข้อความลิขสิทธิ์แบบเรียบง่าย (`<app-footer>`)

---

## เทคโนโลยีที่ใช้ (Tech Stack)

- **HTML5**: โครงสร้างหน้าเว็บ Semantic HTML
- **CSS3**: จัดเลย์เอาต์ด้วย CSS Grid, Flexbox และ CSS Variables (ธีมมืด ขาว-ดำ ไม่มีเอฟเฟกต์ hover กวนตา)
- **JavaScript (Vanilla ES6+)**: เขียนแบบโมดูลแยกหน้าที่ชัดเจน ไม่พึ่งพา Library ภายนอก
- **Data Source**: ไฟล์ `data/products.json` สำหรับจำลองการดึงข้อมูลผ่าน Fetch API (มี Fallback รองรับการเปิดไฟล์ตรง)

---

## โครงสร้างโปรเจกต์ (Project Structure)

```text
5672304-Store/
├── assets/
│   ├── css/
│   │   ├── core/               # ตัวแปรสี ฟอนต์ และ CSS Reset
│   │   ├── components/         # สไตล์ของแต่ละส่วน เช่น navbar, card, form, carousel
│   │   ├── pages/              # สไตล์เฉพาะหน้า (login.css)
│   │   └── style.css           # รวมไฟล์ CSS ทั้งหมด
│   ├── js/
│   │   ├── core/               # ค่าคงที่ ไอคอน SVG และฟังก์ชันตัวช่วย (config.js)
│   │   ├── models/             # คลาสข้อมูลสินค้า (Product.js)
│   │   ├── services/           # ฟังก์ชันโหลดและจัดการข้อมูลสินค้า (ProductService.js)
│   │   ├── components/         # ตัวควบคุม UI (Slider, SearchFilter, Web Components)
│   │   ├── pages/              # สคริปต์เฉพาะหน้า (login.js)
│   │   └── main.js             # สคริปต์หลักเริ่มต้นทำงานหน้าแรก
│   └── images/                 # รูปภาพโลโก้ แบนเนอร์ และสินค้า
├── data/
│   └── products.json           # ข้อมูลสินค้าจำลอง
├── docs/                       # เอกสารประกอบแล็บ
├── pages/
│   └── login.html              # หน้าเข้าสู่ระบบ
├── index.html                  # หน้าหลักของร้านค้า
└── README.md                   # เอกสารอธิบายโปรเจกต์
```

---

## วิธีการเปิดใช้งาน (Getting Started)

เปิดดูหน้าเว็บได้ 2 แบบ:

1. **เปิดผ่าน Local Server (แนะนำ)**
   - ใช้ Extension เช่น **Live Server** ใน VS Code หรือ
   - รันคำสั่ง Python ผ่าน Terminal:
     ```bash
     python -m http.server 8080
     ```
     แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8080`

2. **เปิดไฟล์ตรง**
   - ดับเบิ้ลคลิกไฟล์ `index.html` เพื่อเปิดใช้งานบนเบราว์เซอร์ได้ทันที
