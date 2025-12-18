# Event Connect API

This is the backend service for the Event Connect (Book My Show) application.

## Tech Stack
- **Framework**: Spring Boot 3.2
- **Database**: PostgreSQL
- **Security**: JWT Authentication
- **Rate Limiting**: Bucket4j (5 bookings per user per minute)

## Prerequisites
- Java 17+
- Maven
- PostgreSQL running on port 5432

## Database Setup
Create a PostgreSQL database:
```bash
createdb eventconnect
```

Or update `src/main/resources/application.properties` with your database credentials.

## Running the Application
```bash
# Install dependencies and compile
mvn clean install -DskipTests

# Run the application
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## API Endpoints

### Authentication (Public)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Events (Public)
- `GET /api/events` - List all events
- `GET /api/events/top` - Get top 3 most booked events
- `GET /api/events/{id}` - Get event details
- `GET /api/events/search?query=keyword` - Search events
- `GET /api/events/category/{category}` - Filter by category

### Bookings (Authenticated)
- `POST /api/bookings` - Create a booking (rate limited: 5/min)
- `GET /api/bookings/me` - Get user's bookings
- `GET /api/bookings/{id}` - Get booking details
- `DELETE /api/bookings/{id}` - Cancel a booking

## Testing with cURL

```bash
# Signup
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get all events
curl http://localhost:8080/api/events

# Get top 3 most booked
curl http://localhost:8080/api/events/top

# Create booking (use token from login response)
curl -X POST http://localhost:8080/api/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"eventId":1,"quantity":2}'
```
