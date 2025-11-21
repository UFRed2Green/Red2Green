# Red2Green

Red2Green is a web-based application that provides a streamlined, user-friendly profit and loss tracking for stock investors.

## Getting Started (GitHub)

Follow these steps to set up your environment and work on tasks.

### 1. Clone the Repository
First, clone the project locally:
```bash
git clone https://github.com/UFRed2Green/Red2Green.git
cd Red2Green
```

### Project Structure
```
Red2Green/
├── client/
└── server/
```
| Layer      | Technology |
|-------------|-------------|
| **Frontend** | Next.js, React |
| **Backend**  | Node.js, Express |
| **Database** | Prisma ORM with Supabase (PostgreSQL) |

## Getting Started (Project)

### Step 0. Environment Setup
Before running anything, create a copy of the file .env.example within the server directory and call it .env.
```bash
cp .env.example .env
```

In the .env file, set your JWT secret (a random, private string used to sign authentication tokens).
You can generate one like this:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy that value into your .env under:
```bash
JWT_SECRET=<paste_generated_secret_here>
```

Then within the client directory run the following to create the local environment variable
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

### Step 1. Install Dependencies and Start the App 
```bash
npm install
```
**Before proceeding**, follow the instructions in the [**Backend / Server**](#backend--server). Then, run the app with this command from the root directory. This will start the server and client concurrently.

```bash
npm run dev
```

### Frontend / Client
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Backend / Server

In the server/ directory, run the following command to set up the backend environment.
These only need to be run during the initial setup or when the database schema changes.

Generate the Prisma client
(creates the database client from schema.prisma)
``` bash
npx prisma generate
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - reference for core Node APIs and runtime behavior.
- [Prisma Documentation](https://www.prisma.io/docs) - ORM setup guide, schema modeling, and database workflows.
