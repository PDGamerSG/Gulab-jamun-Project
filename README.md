# Gulab Jamun Project

A full-stack retail analytics dashboard built with **React + Vite** (frontend) and **FastAPI + Pandas** (backend), deployed on **Vercel**.

## Live Demo

- Website: https://gulab-jamun-project.vercel.app/

## Resources

- PPT + Dataset Folder: https://drive.google.com/drive/folders/1HFncrNjqonHvD1UMksvBISbPryu0QoDV?usp=sharing

## Highlights

- Interactive KPI and chart dashboard
- Country, warehouse, delivery, CLV, and stock-risk analysis
- AI chat and AI diagnose/fix actions
- Custom data upload and ingestion flow
- Data quality checks and profiling
- Vercel-ready setup (frontend + serverless API)

## Tech Stack

- Frontend: React, Vite, Recharts, Axios
- Backend: FastAPI, Pandas, Pydantic
- Deployment: Vercel

## Project Structure

```text
.
|-- Frontend/       # React app
|-- Backend/        # FastAPI analytics API
|-- api/            # Vercel serverless Python entrypoint
|-- vercel.json     # Vercel build + routing config
`-- requirements.txt
```

## Local Development

1. Start backend

```bash
cd Backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

2. Start frontend (new terminal)

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and uses `/api` proxy to backend.

## Login Credentials

- Username: `admin`
- Password: `admin123`

## Deployment Notes

- Vercel serves frontend static build and Python API functions.
- If dataset files are unavailable in deployment, backend fallback demo data keeps charts functional.

