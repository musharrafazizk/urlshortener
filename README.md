# URL Shortener

A production-ready URL shortener built with **FastAPI**, **React + Vite + TypeScript + Tailwind CSS**, **Supabase**, and deployed on **Vercel**.

## Features

- 🔗 Shorten any URL to a 6-character alphanumeric code
- 📊 Click tracking per short link
- ⚡ Serverless FastAPI backend (Vercel Functions)
- 🎨 Modern React frontend with Framer Motion animations
- 🛡️ Supabase Row-Level Security (RLS) policies

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI (Python 3.12), Pydantic v2 |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel (monorepo) |

## Quick Start

### 1. Database

Run `database/schema.sql` in your Supabase SQL editor.

### 2. Environment Variables

Set the following in Vercel (or a local `.env`):

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=<service_role_key>
FRONTEND_ORIGIN=https://<your-domain>
```

### 3. Deploy

```bash
vercel --prod
```

## Project Structure

```
.
├── api/                  # FastAPI serverless functions
│   ├── index.py          # POST /api/shorten  +  GET /:code
│   ├── db.py             # Supabase client singleton
│   ├── schemas.py        # Pydantic request/response models
│   └── requirements.txt
├── database/
│   └── schema.sql        # urls table + RLS + increment_clicks RPC
├── frontend/             # React + Vite + TypeScript + Tailwind
│   └── src/
│       ├── components/   # Navbar, HeroSection, ShortenForm, Footer
│       ├── hooks/        # useShorten (API call + toast state)
│       ├── lib/          # Axios wrapper
│       └── App.tsx
└── vercel.json           # Routing config
```

