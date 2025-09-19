# AGENT.md

Purpose
- This document provides a high-level, agent-friendly overview of the Timebomb monorepo: what it does, how it is structured, and how the frontend and backend interact.

What the project does (Overview)
- Timebomb is structured as a full‑stack web application with a Laravel backend (API/server) and a React frontend (SPA). While the individual READMEs are template-based, the layout indicates a typical setup where:
  - The backend exposes RESTful endpoints, handles persistence, authentication, and business logic.
  - The frontend is a Create React App (CRA) single-page application that consumes the backend API and renders the user-facing UI.
- This repo is organized as a monorepo to keep both services in a single codebase, easing coordinated development, versioning, and CI/CD.

Repository layout
- /backend: Laravel application
  - PHP code organized in standard Laravel structure (app/, routes/, config/, database/, etc.).
  - Uses Composer for PHP dependencies and may optionally use Node tooling for asset pipelines.
  - Environment configuration via /backend/.env (ignored).
- /frontend: React application (Create React App)
  - JavaScript/TypeScript React SPA created with CRA.
  - Dependencies managed via npm/yarn. Supports common CRA scripts: start, test, build, eject.
  - Environment variables via /frontend/.env.* (ignored) for per-environment configuration.

Tech stack
- Backend: Laravel (PHP), Composer; optional Node for asset build.
- Frontend: React (Create React App), Node.js, npm/yarn.
- Tooling: Git; Yarn Berry files are accounted for in .gitignore if used.

Development workflow (typical)
- Backend
  - Install: cd backend && composer install
  - Env: copy .env.example to .env and configure DB/keys; php artisan key:generate
  - Run: php artisan serve (defaults to http://127.0.0.1:8000)
  - Test: php artisan test (or vendor/bin/phpunit)
- Frontend
  - Install: cd frontend && npm install (or yarn)
  - Run: npm start (serves at http://localhost:3000)
  - Build: npm run build (outputs to frontend/build)
  - Test: npm test

Service interaction
- The frontend makes HTTP requests to the backend API. In development, configure the frontend to call the backend URL (e.g., http://127.0.0.1:8000) using an environment variable (e.g., REACT_APP_API_BASE_URL) and reference it in API calls.
- CORS should be enabled on the Laravel side for the frontend origin in development.

Environments & configuration
- Root .gitignore shows ignored env files at both root and package levels.
- Backend: /backend/.env includes sensitive settings (DB credentials, APP_KEY, etc.).
- Frontend: /frontend/.env.local and environment-specific files hold API endpoints and client-only config.

Build and artifacts
- Frontend production assets output to /frontend/build and are ignored by Git (per .gitignore).
- Backend caches/logs and vendor directories are ignored by Git.

Common tasks for agents
- Add a new API endpoint:
  - Backend: define route in /backend/routes/api.php and controller in /backend/app/Http/Controllers.
  - Frontend: create a service function that calls the new endpoint using the base URL env var.
- Update data model:
  - Backend: add/modify Eloquent models and create migrations in /backend/database/migrations.
  - Run migrations: php artisan migrate.
  - Frontend: update types/interfaces and UI components accordingly.
- Adjust CORS:
  - Backend: check config/cors.php and middleware to permit the frontend dev origin.

Project scripts and tooling hints
- Frontend CRA scripts available as documented in frontend/README.md: start, test, build, eject.
- Laravel standard artisan commands apply as in backend/README.md and Laravel docs.

Notes
- The backend/README.md and frontend/README.md are standard templates; consult the actual code and configuration files for precise domain behavior.
- If this app requires authentication or third-party integrations, expect configuration in Laravel config/ and .env; the frontend would coordinate via tokens in requests.

Conventions
- Keep backend domain logic in app/Services or app/Domain (if present) and controllers thin.
- Keep frontend components presentational where possible; isolate data access in services/hooks.

Contact & further documentation
- For deeper Laravel usage, see https://laravel.com/docs.
- For CRA/React guidance, see https://create-react-app.dev and https://react.dev.
