# Chatbot App
> This project is a simplified chat application with a Next.js frontend and a Ruby on Rails backend. It allows users to start conversations with a chatbot, send messages, switch between conversations, and delete conversations.  
The chatbot always starts with **"How can I help you?"** and responds after a 2-second typing delay with **"This is an AI generated response"**.
---

## 🛠️ Tech Stack

- **Frontend:** Next.js, Material UI, TailwindCSS
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL
- **ORM:** ActiveRecord
- **API Docs:** Rswag + Swagger UI
- **Deployment:** Docker + Docker Compose
---


## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Elisha-Tetteyfio/chatbot_app.git
cd chatbot_app
```

### 2. Configure environment
Create a .env file in the root and set the variables as illustrated in the `.env.example`

### 3. Build and run with Docker
``` bash
docker compose up --build
```
This starts:
- Rails backend on http://localhost:4000
- Next.js frontend on http://localhost:3000
- PostgreSQL on port 5432

### 4. Setup database
Run migrations inside the backend container:
```bash
docker compose exec backend rails db:prepare
```
---

## 📖 API Documentation

Interactive Swagger docs should be available at:
http://localhost:4000/api-docs

---

👨‍💻 Author [@Elisha-Tetteyfio](https://github.com/Elisha-Tetteyfio)