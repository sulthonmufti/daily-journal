# Daily Journal with Mood Tracker

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png" width="180" alt="MERN Stack Logo" />
</div>

[![MongoDB](https://img.shields.io/badge/MongoDB-v9.6.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-v8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Aplikasi journaling pribadi berbasis web yang memungkinkan pengguna mencatat pikiran harian, melacak pola suasana hati (mood), serta menganalisis tren emosi sepanjang waktu.

---

## 🚀 Tech Stack

Project ini dikembangkan menggunakan **MERN Stack**:

| Layer        | Teknologi                                                 |
| ------------ | --------------------------------------------------------- |
| **Frontend** | React 19 + Vite, TailwindCSS v4, React Router v7, Zustand |
| **Backend**  | Node.js + Express.js v5, JWT, Zod, Nodemailer             |
| **Database** | MongoDB Atlas + Mongoose ODM v9                           |

---

## 📂 Struktur Direktori

```text
daily-journal/
├── client/                       # Aplikasi Frontend (React + Vite)
│   └── src/
│       ├── components/
│       │   └── Layout/
│       │       ├── MainLayout.jsx    # Layout utama dengan Sidebar
│       │       └── Sidebar.jsx       # Komponen sidebar navigasi
│       ├── pages/
│       │   ├── Login.jsx             # Halaman login
│       │   └── Register.jsx          # Halaman registrasi
│       ├── store/
│       │   └── useAuthStore.js       # Zustand store: user, token, login/logout
│       ├── App.jsx                   # Root component, routing & ProtectedRoute
│       ├── App.css                   # Global styles
│       ├── index.css                 # TailwindCSS import
│       └── main.jsx                  # Entry point React
│
├── server/                       # Aplikasi Backend (Node.js + Express.js)
│   └── src/
│       ├── config/
│       │   └── db.js                 # Koneksi MongoDB (Mongoose)
│       ├── controllers/
│       │   └── auth.ctrl.js          # Handler HTTP untuk autentikasi
│       ├── models/
│       │   ├── User.js               # Schema user & akun
│       │   ├── JournalEntry.js       # Schema entri jurnal harian
│       │   ├── MoodTag.js            # Schema mood tag (emoji + warna)
│       │   ├── EntryTag.js           # Schema relasi entry-mood (many-to-many)
│       │   └── EntryMedia.js         # Schema lampiran media
│       ├── routes/
│       │   └── auth.routes.js        # Router endpoint autentikasi
│       ├── services/
│       │   └── AuthService.js        # Business logic: register, login, forgot/reset password
│       ├── utils/
│       │   └── sendEmail.js          # Utility pengiriman email (Nodemailer)
│       ├── app.js                    # Inisialisasi Express & middlewares
│       └── server.js                 # Entry point backend
│   ├── .env.example                  # Template environment variables
│   ├── test-api.js                   # Script pengujian endpoint API
│   └── test-email.js                 # Script pengujian pengiriman email
│
├── docker-compose.yml
├── MERN_DailyJournal_Architecture.txt  # Dokumen arsitektur lengkap
└── README.md
```

---

## 🛠️ Current Features

**Authentication & Security**

- User registration & login dengan JWT-based stateless authentication
- Password hashing menggunakan bcrypt
- Forgot password flow dengan email token reset (Nodemailer)
- Protected routes — akses otomatis diarahkan berdasarkan status autentikasi

**Backend Architecture**

- Layered architecture: Controller → Service → Route pattern untuk separation of concerns
- 5 Mongoose models siap pakai: `User`, `JournalEntry`, `MoodTag`, `EntryTag`, `EntryMedia`
- Request validation dengan Zod schema
- Environment-based configuration (`.env`)

**Frontend Application**

- React 19 + Vite dengan TailwindCSS v4 untuk modern UI
- Global state management menggunakan Zustand (auth state persisted ke localStorage)
- Responsive sidebar navigation layout
- Halaman Login & Register dengan form validation

> Project ini sedang dalam pengembangan aktif — fitur baru ditambahkan secara berkala.

---

## ⚙️ Cara Menjalankan Project (Local Development)

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm** (bawaan Node.js)
- Akun **MongoDB Atlas** (atau MongoDB lokal)
- _(Opsional)_ Akun **Mailtrap** untuk testing email

### 1. Clone Repository

```bash
git clone https://github.com/sulthonmufti/daily-journal.git
cd daily-journal
```

### 2. Setup Backend (Server)

```bash
# Masuk ke direktori server
cd server

# Install dependencies
npm install

# Buat file .env dari template
cp .env.example .env
```

Edit file `server/.env` dan isi dengan kredensial Anda:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/daily-journal
JWT_SECRET=masukkan_secret_key_anda

# Kredensial Email Testing (Mailtrap)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=salin_username_dari_mailtrap
EMAIL_PASS=salin_password_dari_mailtrap
```

Jalankan server:

```bash
node src/server.js
```

Server akan berjalan di **http://localhost:5000**.

### 3. Setup Frontend (Client)

Buka terminal baru:

```bash
# Masuk ke direktori client
cd client

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di **http://localhost:5173**.

### 4. Akses Aplikasi

| Service         | URL                                            |
| --------------- | ---------------------------------------------- |
| **Frontend**    | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://localhost:5000](http://localhost:5000) |

---

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE) — bebas digunakan, dimodifikasi, dan didistribusikan.
