# Student Progress Dashboard (Local Standalone Mode)

เว็บแอปพลิเคชันสำหรับนักศึกษาเพื่อติดตามความก้าวหน้าการเรียน บันทึกสรุปบทเรียนประจำวัน และจัดการงานที่มอบหมาย
พร้อมใช้งานในโหมด **Local Standalone** (ไม่ต้องเชื่อมต่อ Supabase) สามารถ Deploy ขึ้น **Vercel** ได้ทันที!

## 🚀 ฟีเจอร์หลัก (Features)

- **📚 Lesson Summaries:** บันทึกสรุปบทเรียน แยกตามวิชา พร้อมแท็ก วันที่ และเนื้อหา
- **✅ Assignment Tracker:** ติดตามงาน/การบ้าน แยกประเภท (การบ้าน, โปรเจกต์, สอบ), ระดับความสำคัญ (สูง, กลาง, ต่ำ) พร้อมปุ่มติ๊กสถานะเสร็จ
- **📊 Dashboard & Stats:** สถิติจำนวนสรุปบทเรียน, งานคงค้าง, งานที่เสร็จแล้ว และงานที่เกินกำหนด
- **🇹🇭 Multi-language:** รองรับภาษาไทย (ค่าเริ่มต้น) และภาษาอังกฤษ พร้อมปุ่มสลับภาษา
- **🎨 Modern Design System:**
  - ธีมสี Contrast ดำ 70% / ขาว 30%
  - ฟอนต์หัวข้อ: **Playpen Sans Thai**
  - ฟอนต์เนื้อหา: **Sarabun**
  - Grid System รองรับ Mobile, Tablet, Desktop

---

## 🛠️ วิธีการรันในเครื่อง (Local Setup)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดบราวเซอร์ที่: **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ การ Deploy ขึ้น Vercel

1. Push โค้ดทั้งหมดขึ้น **GitHub**
2. ไปที่ **[Vercel Dashboard](https://vercel.com/new)** แล้วกด **Import Repository**
3. กดปุ่ม **Deploy** ได้ทันที (ไม่ต้องตั้งค่า Environment Variables ในโหมด Local Standalone)
