# Event Connect UI

This is the frontend for the Event Connect (Book My Show) application, built with Next.js 14+ and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API

## Prerequisites
- Node.js 18+
- npm

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure the API URL (optional, defaults to localhost:8080):
Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Running the Application

Development:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:
```bash
npm run build
npm start
```

## Pages

- `/` - Home page with hero, search, featured events (Top 3), and event listing
- `/login` - User login
- `/signup` - User registration
- `/events/[id]` - Event detail with booking form
- `/my-bookings` - User's bookings (authenticated)

## Features

- 🎫 Browse and search events
- 🔥 Top 3 Most Booked Events featured section
- 🎟️ Book tickets with quantity selection
- 📋 View and cancel bookings
- 🔐 JWT-based authentication
- 📱 Fully responsive design
