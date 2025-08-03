# 💬 Realtime Chat App

A simple real-time chat application built using the **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for WebSocket-based communication.

This project allows users to chat live with each other through a responsive and interactive interface.

🔗 **Live Repo**: [Chat - GitHub](https://github.com/indrajeet1705/Chat)

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Realtime Communication**: Socket.IO  
- **Other Tools**: Axios, dotenv, CORS

---

## ✨ Features

- ⚡ Real-time communication via WebSocket (Socket.IO)
- 📨 Instant messaging
- 💾 Message persistence in MongoDB
- 🔧 Clean and modular code structure
- 📱 Responsive frontend UI

---

## 📦 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

cd backend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
npm start
cd ../frontend
npm install
npm start

🧠 Project Structure
Chat/
├── backend/             # Node.js + Express server
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── index.js         # Entry point + Socket.IO config
├── frontend/            # React application
│   └── src/
│       ├── components/  # UI Components
│       └── App.js       # Main app file
└── README.md

git clone https://github.com/indrajeet1705/Chat.git
cd Chat
