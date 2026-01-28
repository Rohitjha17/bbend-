# Gym Booking Backend

A simple, clean NestJS backend for a gym booking system built for evaluation purposes.

## Tech Stack

- **NestJS** (TypeScript)
- **PostgreSQL** (Aiven)
- **TypeORM**
- **JWT Authentication** (simulated Google login)
- **class-validator**
- **@nestjs/config**

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   NODE_ENV=development
   ```

3. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - Simulated Google login

### Gyms
- `POST /gyms` - Create gym (Owner only)
- `GET /gyms` - List all gyms

### Workout Plans
- `POST /gyms/:gymId/plans` - Create workout plan (Owner only)
- `GET /gyms/:gymId/plans` - List workout plans for gym

### Exercises
- `POST /plans/:planId/exercises` - Add exercise to plan (Owner only)
- `GET /plans/:planId/exercises` - List exercises in plan

### Availability
- `POST /gyms/:gymId/availability` - Add availability slot (Owner only)
- `GET /gyms/:gymId/availability` - List availability for gym

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - List user's bookings

## Authentication

The system uses a simplified Google login simulation:

```json
POST /auth/login
{
  "email": "user@gmail.com",
  "name": "User Name"
}
```

Response:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "role": "USER"
  }
}
```

Use the token in Authorization header: `Bearer <token>`

## Database Schema

- **users**: id (uuid), name, email, role (USER|OWNER)
- **gyms**: id, name, address, ownerId
- **workout_plans**: id, gymId, title
- **exercises**: id, planId, name, reps, sets
- **availability**: id, gymId, date, startTime, endTime
- **bookings**: id, userId, availabilityId

## Development

```bash
# Start in development mode
npm run start:dev

# Build for production
npm run build

# Run tests
npm test
```

## Security Features

- JWT Authentication
- Role-based access control (USER/OWNER)
- Input validation with class-validator
- Protected routes with guards