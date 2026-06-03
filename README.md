# Daily Journal with Mood Tracker

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png" width="180" alt="MERN Stack Logo" />
</div>

[![MongoDB](https://img.shields.io/badge/MongoDB-v9.6.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-v8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Docker](https://img.shields.io/badge/Docker-v3.8-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Aplikasi journaling pribadi berbasis web yang memungkinkan pengguna mencatat pikiran harian, melacak pola suasana hati (mood), serta menganalisis tren emosi sepanjang waktu.

---

## 🚀 Tech Stack

Project ini dikembangkan menggunakan **MERN Stack**:

- **Frontend**: React (Vite)
- **Backend**: Node.js & Express.js
- **Database**: MongoDB
- **DevOps / Tooling**: Docker & Docker Compose

---

## 🛠️ Status Project & Struktur Direktori

Infrastruktur dasar dan arsitektur project telah disiapkan. Berikut adalah struktur folder saat ini:

```text
daily-journal/
├── client/                 # Aplikasi Frontend (React + Vite)
│   ├── Dockerfile          # Docker configuration untuk frontend
│   └── ...
├── server/                 # Aplikasi Backend (Node.js + Express.js)
│   ├── Dockerfile          # Docker configuration untuk backend
│   └── ...
├── docker-compose.yml      # Konfigurasi orkestrasi container lokal
└── .gitignore              # Konfigurasi pengecualian file git
```

### Yang Telah Dikerjakan (Implemented Features):

- **Struktur Monorepo MERN**: Pemisahan direktori `client` dan `server`.
- **Inisialisasi Frontend**: Client menggunakan React + Vite dengan linting ESLint yang telah terkonfigurasi.
- **Inisialisasi Backend**: Server dengan dependensi dasar (`express`, `mongoose`, `dotenv`, `cors`).
- **Containerization**:
  - `client/Dockerfile` untuk development environment frontend.
  - `server/Dockerfile` untuk development environment backend.
  - [docker-compose.yml](file:///d:/VSCode/daily-journal/docker-compose.yml) untuk menjalankan database MongoDB, Backend Server, dan Frontend Client secara bersamaan dalam container terisolasi.
- **Git Configuration**: Konfigurasi file [.gitignore](file:///d:/VSCode/daily-journal/.gitignore) root untuk mengabaikan dependencies (`node_modules`), file sensitif (`.env`), dan dokumen internal lainnya.

---

## ⚙️ Cara Menjalankan Project (Local Development)

Pastikan Anda sudah menginstal **Docker** dan **Docker Compose** di komputer Anda.

1.  **Jalankan dengan Docker Compose**:
    Jalankan perintah berikut di root folder project untuk membangun image dan menjalankan semua service (MongoDB, Server, Client):

    ```bash
    docker-compose up --build
    ```

2.  **Akses Aplikasi**:
    - **Frontend**: [http://localhost:5173](http://localhost:5173)
    - **Backend API**: [http://localhost:5000](http://localhost:5000)
    - **MongoDB**: `localhost:27017`
