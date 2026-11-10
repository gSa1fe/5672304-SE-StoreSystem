// สคริปต์ควบคุมการทำงานของหน้าเข้าสู่ระบบ
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (!loginForm) return;

  // ตรวจสอบความถูกต้องของข้อมูลก่อนส่งฟอร์ม
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = (usernameInput ? usernameInput.value : '').trim();
    const password = (passwordInput ? passwordInput.value : '').trim();

    if (!username || !password) {
      alert('กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน');
      return;
    }

    // จำลองการเข้าสู่ระบบ
    alert(`เข้าสู่ระบบสำเร็จในชื่อ: ${username}`);
  });
});
