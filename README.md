💬 Realtime Chat App
A simple real-time chat application built using the MERN Stack (MongoDB, Express, React, Node.js) and Socket.IO for real-time communication.

This project allows users to chat live with each other through a responsive and interactive interface.

🔗 Live Repo: Chat - GitHub

🛠️ Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Realtime Communication: Socket.IO

Other Tools: CORS, dotenv, axios

✨ Features
⚡ Real-time communication via WebSocket (Socket.IO)

📨 Instant messaging

💾 Message persistence in MongoDB

🔧 Clean and modular code structure

📱 Responsive frontend UI

📦 Installation & Setup
Prerequisites
Node.js and npm

MongoDB (local or Atlas)

Git

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/indrajeet1705/Chat.git
cd Chat
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the backend server:

bash
Copy
Edit
npm start
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
Frontend will run on: http://localhost:3000
Backend will run on: http://localhost:5000

🧠 Project Structure
bash
Copy
Edit
Chat/
├── backend/             # Node.js + Express server
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── index.js         # Entry point with socket.io setup
├── frontend/            # React app
│   ├── src/
│   │   ├── components/
│   │   └── App.js
└── README.md
📷 Screenshots
(Add screenshots of your UI here if available)

🚀 Upcoming Features
✅ Typing indicator

✅ Message timestamps

🛡️ User authentication

👥 Group chats

🖼️ Media file sharing

📱 Mobile UI optimization

🤝 Contributing
If you'd like to contribute, feel free to fork the repo and submit a pull request.

📄 License
This project is licensed under the MIT License.
