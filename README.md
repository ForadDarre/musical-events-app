# musical-events-app

This app is for semi-learning purposes of Next.
The core functionality:

-   Calendar picker
-   Events can be added to a certain date (1 per day)
-   To-do list will be added to every event
    I will use it for my cello classes and practices.

Setup:
✅ Next.js with TypeScript (frontend)

✅ Node.js + Express with TypeScript (backend)

✅ PostgreSQL via Prisma (backend only)

## How to run

1. Make sure PostgreSQL is installed and running locally.

2. In the `backend` folder, create a `.env` file with your database connection string, for example:

DATABASE_URL=postgresql://ma_user:ma_pass@localhost:5432/musicevents

> Note: The `musicevents` database should already exist on your PostgreSQL server. Also user with the pass above should exist - you can check it using, for example, PgAdmin.

3. Open a terminal, navigate to the `backend` folder, and run:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx ts-node-dev src/index.ts

This will apply all migrations and start the backend server at http://localhost:4000.

Open another terminal, navigate to the frontend folder, then run:

npm install
npm run dev

This will start the frontend at http://localhost:3000.

Open http://localhost:3000 in your browser to use the app.
```
