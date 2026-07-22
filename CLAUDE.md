# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

REST API backing "Concerts Nostalgia", a web app for logging concerts a user has attended. Node.js/Express, ES modules, MongoDB via Mongoose.

## Commands

- `npm run dev` — start the server with nodemon (auto-restart on file changes).
- `npm test` — not implemented (placeholder script that exits with an error). There is no test suite in this repo.
- No build/lint/typecheck scripts exist.

### Setup

Copy `.env.sample` to `.env` and fill in:
- `PORT` — port the server listens on (README says local dev uses 4000)
- `MONGODB_URI` — MongoDB connection string
- `REACT_APP_URL` — the frontend origin

## Architecture

Standard Express MVC-ish layering, entirely in ES module syntax (`"type": "module"` in package.json):

- `index.js` — app entrypoint. Loads env, calls `connectDB()`, wires middleware (`cors`, `express.json`, `express.urlencoded`), mounts the concerts router at `/concerts`, starts listening on `process.env.PORT`.
- `config/db.config.js` — `connectDB()` connects Mongoose to `MONGODB_URI`; connection errors are caught and logged, not thrown (a failed DB connection does not crash the process).
- `routes/concert.route.js` — maps HTTP verbs/paths to controller functions.
- `controllers/concert.controller.js` — request handlers, one per CRUD operation, calling straight into the Mongoose model. All routes follow the same pattern: try/catch, `res.status(...).json(...)`, 500 on unexpected errors, 404 when a lookup by id misses.
- `models/concert.model.js` — single Mongoose schema/model, `Concert`, with `timestamps: true`. Notable fields: `companion` (array of strings, default `'Alone'`), `rating` (Number restricted via `enum: [1,2,3,4,5]`), `background` (String restricted to 5 preset values used by the frontend for card styling).

There is only one resource (concerts) — no auth, no users, no additional collections. When adding a new resource, mirror the existing three-file pattern (model / route / controller) and mount it in `index.js`.

### API surface

All routes are prefixed with `/concerts`:

| Verb   | Path         | Handler        |
| ------ | ------------ | -------------- |
| GET    | `/`          | `getConcerts`  |
| GET    | `/:id`       | `getConcert`   |
| POST   | `/add`       | `addConcert`   |
| PUT    | `/edit/:id`  | `editConcert`  |
| DELETE | `/delete/:id`| `deleteConcert`|
