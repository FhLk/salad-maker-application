# Salad Maker Application

## Introduction
แอปพลิเคชัน Salad Maker ช่วยให้คุณสร้างสูตรสลัดที่อร่อยและมีประโยชน์ได้ง่ายๆ เพียงไม่กี่คลิก เลือกวัตถุดิบที่คุณชอบ และแอปจะคำนวณแคลอรี่ให้โดยอัตโนมัติ

## เทคโนโลยีที่ใช้
* **Next.js:** Framework สำหรับสร้างเว็บแอปพลิเคชัน React แบบ Server-side rendering
* **Tailwind CSS:** Utility-first CSS framework สำหรับสร้าง UI ได้อย่างรวดเร็ว
* **SweetAlert2:** Library สำหรับสร้าง alert และ dialog ที่สวยงาม
* **json-server:** สำหรับสร้าง REST API แบบง่ายๆ สำหรับการพัฒนา

## การติดตั้งและใช้งาน

### Client-side
1. Clone repository
2. ติดตั้ง dependencies: `npm install`
3. Run development server: `npm run dev`
4. เปิดเว็บเบราว์เซอร์ไปที่ http://localhost:3000

### Server-side
1. ติดตั้ง json-server: `npm install json-server`
2. Run json-server: `npx json-server --watch database/database.json --port 8000`

## Features
* **List Ingredients:** แสดงรายการวัตถุดิบทั้งหมด
* **Additional Ingredients:** เพิ่มวัตถุดิบใหม่ลงในสูตร
* **Calculate Calories:** คำนวณแคลอรี่ของสูตรโดยอัตโนมัติ
* **List Recipes:** แสดงรายการสูตรทั้งหมด
* **Edit Recipes:** แก้ไขสูตรอาหารที่มีอยู่
* **Delete Recipe:** ลบสูตรอาหาร

## API Endpoints
* **GET /ingredients:** ดึงข้อมูลวัตถุดิบทั้งหมด
* **GET /recipes:** ดึงข้อมูลสูตรอาหารทั้งหมด
* **GET /recipes/[id]:** ดึงข้อมูลสูตรอาหารตาม ID
* **POST /recipes/:** สร้างสูตรอาหารใหม่
* **PATCH /recipes/[id]:** แก้ไขสูตรอาหาร
* **DELETE /recipes/[id]:** ลบสูตรอาหาร

## โครงสร้างข้อมูล
* **ingredients:**
  * id: รหัสประจำวัตถุดิบ
  * ingredient: ชื่อวัตถุดิบ
  * category: หมวดหมู่
  * image: รูปภาพ
  * calories: แคลอรี่ต่อหน่วย
* **recipes:**
  * id: รหัสประจำสูตร
  * name: ชื่อสูตร
  * ingredients: รายการวัตถุดิบที่ใช้ในสูตร
  * calories: แคลอรี่ทั้งหมดของสูตร