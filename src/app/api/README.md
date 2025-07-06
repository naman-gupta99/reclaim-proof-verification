# Reclaim Protocol Integration

This Next.js application demonstrates how to integrate Reclaim Protocol for identity verification.

## Features

- **API Routes**: Backend endpoints for handling Reclaim verification
- **Server Actions**: Form handling with server-side validation
- **Mock Database**: Simple in-memory data store for demonstration
- **Reclaim Integration**: Complete flow for identity verification

## Backend Architecture

### API Routes

1. **`/api/reclaim/generate-config`** - Generate Reclaim verification config
2. **`/api/reclaim/callback`** - Receive and verify proofs from Reclaim

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Test the application**:
   - Visit `http://localhost:3000` to see the main page
   - Click "Start Verification" to begin Reclaim verification

## API Endpoints

### GET /api/reclaim/generate-config
Generates and returns Reclaim verification configuration.

### POST /api/reclaim/callback
Receives and verifies proofs from Reclaim Protocol.
