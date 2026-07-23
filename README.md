# 🃏 Fantasy Character Generator & Player Card Deck

Ứng dụng tạo thẻ nhân vật viễn tưởng (Fantasy Player Card Generator) tương tác, tích hợp tạo ảnh chân thực/cartoon AI và tiểu sử nhân vật tự động bằng AI (Google Gemini).

---

## 📖 Mô tả dự án (Project Overview)

**Fantasy Character Generator** cho phép bạn khởi tạo các thẻ nhân vật nhập vai (RPG / Fantasy Player Cards) với đầy đủ chỉ số, ngoại hình, kỹ năng đặc trưng, tiểu sử và ảnh chân dung độc đáo. 

### ✨ Các tính năng nổi bật:
- 🃏 **Thiết kế Player Card cao cấp**: Giao diện dạng thẻ bài người chơi có viền kim loại sang trọng, hiển thị nổi bật các chỉ số sinh tồn: **Health (HP)**, **Mana (MP)**, và **Strength (STR)**.
- 🎨 **Tạo chân dung Cartoon / Game Avatar bằng AI**: Tích hợp server-side Google Gemini (`gemini-3.1-flash-lite-image`) & dịch vụ fallback tự động vẽ nên ảnh nhân vật độc bản theo từng hệ Class & Race.
- 📜 **Tạo tiểu sử nhân vật bằng AI (Generate Backstory)**: Nút sinh câu chuyện nguồn gốc 1-2 câu kịch tính bằng Gemini AI (`gemini-2.5-flash`).
- 🎴 **Bộ sưu tập "My Deck" (Save to Deck)**: Lưu các nhân vật ưa thích vào bộ bài cá nhân, xem lại danh sách và xuất file dữ liệu đội hình (`Export My Deck`).
- 🎲 **Mô phỏng gieo xúc xắc & Âm thanh Web Audio**: Hiệu ứng xúc xắc d4/d6/d20 quay sống động kèm âm thanh sống động.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Motion (Framer Motion), Lucide React.
- **Backend**: Node.js, Express, esbuild, tsx.
- **AI Integration**: Google Gen AI SDK (`@google/genai`) với Google Gemini API.

---

## 🚀 Hướng dẫn cài đặt & Thiết lập (Setup & Installation)

### 1. Yêu cầu tiền đề (Prerequisites)
- **Node.js**: Phiên bản 18.0.0 trở lên.
- **npm**: Đi kèm với Node.js.

### 2. Cài đặt các thư viện (Install Dependencies)
Mở terminal trong thư mục dự án và chạy:
```bash
npm install
```

### 3. Cấu hình biến môi trường (Environment Variables)
Tạo file `.env` từ file mẫu `.env.example`:
```bash
cp .env.example .env
```
Mở `.env` và thêm khóa Gemini API của bạn (nếu có):
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```
> *Lưu ý*: Nếu không cung cấp `GEMINI_API_KEY`, ứng dụng sẽ tự động chuyển sang cơ chế fallback sinh ảnh và tiểu sử thủ công/procedural mà không làm gián đoạn trải nghiệm.

---

## 🏃‍♂️ Chạy ứng dụng (Running the Application)

### Chạy ở môi trường phát triển (Development Mode)
```bash
npm run dev
```
Trình duyệt sẽ mở ứng dụng tại địa chỉ: `http://localhost:3000`

### Biên dịch & Chạy bản sản xuất (Production Build & Start)
```bash
npm run build
npm start
```

---

## 📁 Cấu trúc thư mục chính (Project Structure)

```text
.
├── server.ts                 # Backend Express server (xử lý API Gemini AI & tĩnh)
├── src/
│   ├── App.tsx               # Component chính & giao diện ứng dụng
│   ├── components/           # Các component UI (CharacterCard, PortraitGenerator, PartyDrawer, ...)
│   ├── data/                 # Dữ liệu mẫu Class, Race, Trang bị
│   ├── utils/                # Hàm sinh nhân vật, hiệu ứng âm thanh
│   └── types.ts              # Định nghĩa kiểu dữ liệu TypeScript
├── package.json              # Khai báo thư viện & kịch bản chạy
└── README.md                 # Tài liệu hướng dẫn dự án
```
