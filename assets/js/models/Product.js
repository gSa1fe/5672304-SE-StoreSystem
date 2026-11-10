// คลาสข้อมูลสินค้า (Product Model)
(function (global) {
  'use strict';

  global.SEStore = global.SEStore || {};

  class Product {
    // กำหนดคุณสมบัติพื้นฐานของสินค้า
    constructor({ id, code, type, name, price, stock, image } = {}) {
      this.id = id;
      this.code = code || '';
      this.type = type || '';
      this.name = name || '';
      this.price = Number(price) || 0;
      this.stock = Number(stock) || 0;
      this.image = image || '';
    }

    // ราคาพร้อมหน่วย bath ตามโจทย์ LAB
    get formattedPrice() {
      return `${this.price.toFixed(2)} bath`;
    }

    // จำนวนสินค้าในคลังพร้อมหน่วย items
    get formattedStock() {
      return `${this.stock} items`;
    }

    // ตรวจสอบว่าสินค้ามีในสต็อกหรือไม่
    isInStock() {
      return this.stock > 0;
    }
  }

  global.SEStore.Product = Product;

})(window);
