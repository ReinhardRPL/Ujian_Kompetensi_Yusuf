# 🎮 GameStationX - Physical Media Collector Portal

GameStationX adalah platform e-commerce modern yang dirancang khusus untuk para kolektor media fisik game (Console, Games, & Accessories).


## ⚙️ Instalasi & Konfigurasi

### 1. Persiapan Database
1.  Buka XAMPP dan aktifkan **Apache** & **MySQL**.
2.  Masuk ke `phpMyAdmin` dan buat database baru bernama `gamestation_db`.
3.  Import file `.sql` kamu atau buat tabel sesuai struktur di atas.

### 2. Konfigurasi Backend
1.  Buka folder backend melalui terminal.
2.  Instal dependensi:
    ```bash
    npm install express mysql cors nodemon
    ```
3.  Jalankan server:
    ```bash
    nodemon server.js
    ```

### 3. Konfigurasi Frontend
1.  Buka folder frontend melalui terminal.
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi:
    ```bash
    npm run dev
    ```

---
