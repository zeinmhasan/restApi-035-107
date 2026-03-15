# Personal Finance API

REST API sederhana untuk transaksi keuangan pribadi dengan fitur:

- GET all transaksi
- GET transaksi by id
- POST transaksi

## Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Docker + Docker Compose

## Menjalankan dengan Docker

```bash
docker compose up --build
```

API berjalan di:

- `http://localhost:3000`

## Status Fitur

### Fitur yang sudah tersedia

- GET /health
- GET /transactions
- GET /transactions/:id
- POST /transactions

### Fitur yang belum tersedia

- PUT /transactions/:id
- DELETE /transactions/:id
- GET /summary

## Endpoint

### 1) Health Check

- `GET /health`

### 2) Transactions

- `GET /transactions`
- `GET /transactions/:id`
- `POST /transactions`

Query params opsional untuk list:

- `type=income|expense`
- `startDate=YYYY-MM-DD`
- `endDate=YYYY-MM-DD`

Body untuk POST:

```json
{
  "type": "income",
  "amount": 1500000,
  "note": "Gaji part-time",
  "date": "2026-03-15"
}
```

## Menjalankan tanpa Docker (opsional, pastikan sudah memiliki postgresql di local)

1. Copy `.env.example` jadi `.env`
2. Install dependency
3. Jalankan mode development

```bash
npm install
npm run dev
```
