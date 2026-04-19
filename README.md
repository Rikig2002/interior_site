# Manish Interior

Premium interior design platform built with React, Vite, Tailwind CSS, and an Express API backend.

## Overview

This project includes:

- A polished public website with Home, Gallery, Design Styles, Packages, Calculator, Book, and Contact pages.
- API-backed lead capture and consultation booking flows.
- An admin area for authentication, leads, bookings, projects, and dashboard analytics.
- Premium mock data fallbacks so the UI stays rich even when an API response is empty.

## Local Development

Install dependencies first:

```bash
npm install
```

Run the frontend only:

```bash
npm run client:dev
```

Run the backend only:

```bash
npm run server
```

Run both together:

```bash
npm run dev:all
```

## Local URLs

- Frontend: http://localhost:3002
- Backend: http://localhost:5000

If a port is already in use, Vite will automatically try the next available port.

## Main Routes

- `/` Home
- `/gallery` Project gallery
- `/styles` Design styles showcase
- `/packages` Interior packages
- `/calculator` Pricing calculator
- `/book` Consultation booking
- `/contact` Dedicated contact page
- `/admin/login` Admin sign in
- `/admin/dashboard` Admin overview

## Demo Credentials

Admin:

- Email: admin@manishinteriors.in
- Password: admin123

Client:

- Email: client@manishinteriors.in
- Password: client123

## Useful API Endpoints

- `POST /auth/login`
- `GET /admin/dashboard`
- `POST /leads`
- `GET /leads`
- `PATCH /leads/:id/status`
- `POST /bookings`
- `GET /bookings`
- `GET /projects`
- `POST /pricing/calculate`

## Environment Variables

Copy `.env.example` to `.env` and update values as needed.

## Notes

- The app uses mock data fallbacks for projects, services, packages, and design styles to keep the interface visually complete.
- The current GitHub repository is set up with the `main` branch.
