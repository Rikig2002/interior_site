# Manish Interior Decorators Web Platform

React + Vite frontend with an Express API backend for leads, authentication, and CMS modules.

## What is included

- Multi-page React app using route navigation.
- Lead capture forms connected to backend API.
- Admin login and lead pipeline status management.
- CMS sections for projects, testimonials, and blogs.
- JSON-based local data store for quick development.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start frontend and backend together:

```bash
npm run dev:all
```

3. Or run independently:

```bash
npm run server:dev
npm run dev
```

Frontend URL: http://localhost:3000

Backend URL: http://localhost:4001/api

## Demo admin credentials

- Email: admin@manishinteriors.in
- Password: admin123

## Demo client credentials

- Email: client@manishinteriors.in
- Password: client123

Client tracker route: `/client`

## API endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/leads`
- `GET /api/leads` (admin)
- `PATCH /api/leads/:id/status` (admin)
- `GET /api/projects`
- `POST /api/projects` (admin)
- `PATCH /api/projects/:id/progress` (admin)
- `POST /api/projects/:id/gallery` (admin)
- `DELETE /api/projects/:id/gallery/:imageId` (admin)
- `DELETE /api/projects/:id` (admin)
- `GET /api/testimonials`
- `POST /api/testimonials` (admin)
- `DELETE /api/testimonials/:id` (admin)
- `GET /api/blogs`
- `POST /api/blogs` (admin)
- `DELETE /api/blogs/:id` (admin)

## Environment variables

See `.env.example`.
