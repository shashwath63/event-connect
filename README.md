# 🎫 Event Connect

A full-stack event booking platform (similar to BookMyShow) built with **Spring Boot** and **Next.js**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17+-orange.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)

## ✨ Features

- 🔐 **User Authentication** - JWT-based signup/login
- 🎭 **Event Browsing** - View all events with search and category filters
- 🔥 **Top 3 Most Booked** - Featured events section
- 🎟️ **Ticket Booking** - Book tickets with quantity selection
- 📋 **My Bookings** - View and cancel your bookings
- ⏱️ **Rate Limiting** - 5 bookings per user per minute
- 📱 **Responsive Design** - Works on all devices

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | Spring Boot 3.2, Java 17 |
| **Database** | PostgreSQL 16 |
| **Auth** | JWT (JSON Web Tokens) |
| **Rate Limiting** | Bucket4j |

## 📁 Project Structure

```
event-connect/
├── docker-compose.yml      # Local PostgreSQL setup
├── event-connect-api/      # Spring Boot backend
│   ├── src/main/java/com/eventconnect/
│   │   ├── config/         # Security, JWT, Rate Limiting
│   │   ├── controller/     # REST endpoints
│   │   ├── dto/            # Request/Response objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Database queries
│   │   └── service/        # Business logic
│   └── render.yaml         # Render deployment config
│
└── event-connect-ui/       # Next.js frontend
    └── src/
        ├── app/            # Pages (App Router)
        ├── components/     # UI components
        ├── context/        # Auth context
        └── lib/            # API client, types
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker (for PostgreSQL)

### 1. Start Database
```bash
docker-compose up -d
```

### 2. Start Backend
```bash
cd event-connect-api
./mvnw spring-boot:run
```
Backend runs at `http://localhost:8080`

### 3. Start Frontend
```bash
cd event-connect-ui
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

## 🔗 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/events` | Public | Get all events |
| GET | `/api/events/top` | Public | Top 3 most booked |
| GET | `/api/events/{id}` | Public | Event details |
| GET | `/api/events/search?query=` | Public | Search events |
| POST | `/api/bookings` | JWT | Create booking |
| GET | `/api/bookings/me` | JWT | User's bookings |
| DELETE | `/api/bookings/{id}` | JWT | Cancel booking |

## 🌐 Deployment

### Database (Supabase)
1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database

### Backend (Render)
1. Connect GitHub repo at [render.com](https://render.com)
2. Set Root Directory: `event-connect-api`
3. Add environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS`

### Frontend (Vercel)
1. Import repo at [vercel.com](https://vercel.com)
2. Set Root Directory: `event-connect-ui`
3. Add: `NEXT_PUBLIC_API_URL` = your Render URL

## 📝 Environment Variables

### Backend (`event-connect-api`)
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5435/eventconnect
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (`event-connect-ui`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📄 License

MIT License - feel free to use this project for learning or building your own event platform!
