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
- Android install support is available through the built-in service worker and `manifest.webmanifest`.

## Phone Access

To use this on your Android phone or any device:

1. Deploy the frontend to a public host like Vercel or Netlify.
2. Deploy the backend API to Render or Railway.
3. Set `VITE_API_URL` to the public backend URL, for example `https://your-backend-domain.com/api`.
4. Update `CORS_ORIGINS` to include the frontend domain, for example `https://your-frontend-domain.com`.
5. Open the public URL on your phone and use the browser menu to add it to the home screen.

If you deploy both frontend and backend on separate domains, keep the frontend configured with `VITE_API_URL`.
If you deploy them under the same domain with a proxy or rewrite, the app will use `/api` automatically.

## Deployment Notes

- `render.yaml` is included for the backend.
- `vercel.json` and `netlify.toml` are included as starting points for the frontend.
- On Render, do not set `PORT` manually. Render provides it automatically for the running service.
- For Vercel, replace `https://your-backend-domain.com` in `vercel.json` with your deployed API URL if you want rewrites.
- For Netlify, replace `https://your-backend-domain.com` in `netlify.toml` with your deployed API URL if you want redirects.
