# 🎵 Spotify Clone

A full-stack Spotify-inspired music streaming web application built with modern web technologies. This project recreates the core experience of Spotify with a responsive interface, authentication system, music library, playlists, and a custom music player.

The goal of this project was to build a real-world full-stack application while practicing modern React development, backend API creation, database management, authentication, and state management.

---

## 🚀 Features

### 🎧 Music Experience

* Browse available songs
* Play and control music with a custom player
* Play, pause, skip, and manage current tracks
* Playlist-based music playback
* Global player state management
* Shuffle, repeat, and a persistent Liked Songs library
* Recently played history
* **Drag-and-drop queue reordering** with per-track removal
* **Full keyboard shortcuts** — space to play/pause, arrow keys to seek and adjust volume, `m` to mute, `n`/`p` to skip, `l` to like
* Volume control with one-click mute
* **Synced lyrics display** on the Now Playing screen (toggle between waveform and lyrics view)

### 🔐 Authentication

* User registration and login
* Password hashing with bcrypt
* JWT-based authentication
* Protected backend routes

### 🎼 Music Library

* Fetch songs from backend API
* Display song details
* Organize songs into playlists
* Store music data using PostgreSQL

### 🎨 Frontend

* Spotify-inspired dark UI
* Responsive design
* React component architecture
* Client-side routing
* Modern user interface
* **Toast notification system** for all user actions (replacing native browser alerts) — likes, queue changes, playlist edits, auth, and admin actions all give clear, non-blocking feedback

### ⚙️ Backend

* REST API architecture
* User authentication system
* Song management endpoints
* PostgreSQL database integration

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Lucide React Icons
* Framer Motion

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt
* dotenv
* CORS

---

## 📂 Project Structure

```
spotify-clone/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.tsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database

SoundScape uses PostgreSQL for storing application data.

Main tables:

### Users

* User authentication information
* Password hashes
* User accounts

### Songs

* Song title
* Artist information
* Audio data
* Metadata

---

## 🔌 API Endpoints

### Authentication

```
POST /api/users/register
```

Create a new account.

```
POST /api/users/login
```

Login and receive authentication token.

---

### Songs

```
GET /api/songs
```

Fetch available songs.

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
[git clone <repository-url>](https://github.com/khushnoodahmad890-cloud/spotify-clone-react)
cd spotify-clone
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
https://spotify-clone-react-production.up.railway.app
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=spotify_clone
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots

<img width="1440" height="773" alt="screencapture-localhost-5173-register-2026-08-01-02_26_31" src="https://github.com/user-attachments/assets/5aa43636-f350-4b8c-93a5-e6d4a83247f8" />

<img width="1440" height="773" alt="screencapture-localhost-5173-login-2026-08-01-02_27_02" src="https://github.com/user-attachments/assets/c23a9cc8-c39c-49e6-ad9f-4843e15f07ae" />

<img width="1440" height="1362" alt="screencapture-localhost-5173-2026-08-01-02_17_01" src="https://github.com/user-attachments/assets/4c314a51-9a0c-441e-ab5f-d247b0ec7cd6" />

<img width="1440" height="1005" alt="screencapture-localhost-5173-now-playing-2026-08-01-02_17_56" src="https://github.com/user-attachments/assets/c64c564a-4bfc-4c3a-8c4a-2839d370b165" />

<img width="1440" height="1241" alt="screencapture-localhost-5173-premium-2026-08-01-02_18_28" src="https://github.com/user-attachments/assets/6c716696-3040-42ea-804b-83a2de822181" />

<img width="1440" height="1220" alt="screencapture-localhost-5173-admin-2026-08-01-02_18_42" src="https://github.com/user-attachments/assets/d4d158b5-fd5b-4397-8b76-841abd3918d4" />

<img width="1440" height="1070" alt="screencapture-localhost-5173-add-song-2026-08-01-02_18_55" src="https://github.com/user-attachments/assets/a34a64fe-083f-4cc0-a598-9c67e833979c" />

<img width="1440" height="1166" alt="screencapture-localhost-5173-billing-2026-08-01-02_19_07" src="https://github.com/user-attachments/assets/ed0307e3-a6b1-4b13-9ce3-dfa57ee0c749" />


## 🧠 What I Learned

Through building SoundScape, I practiced:

* Building a complete full-stack application
* Creating REST APIs with Express
* Connecting React applications with backend services
* Working with PostgreSQL databases
* Implementing JWT authentication
* Managing global state in React
* Structuring scalable projects
* Debugging real-world development issues

---

## 🔮 Future Improvements

* Genre and mood-based browsing
* User profile page with avatar and bio
* Follow artists and a personalized feed
* Cloud storage for audio files (currently served from local `/music`)
* Production deployment with a managed database

---

## 👨‍💻 Author

**Khushnood Ahmad**

Full-Stack Developer

Built with React, Node.js, Express, and PostgreSQL.



