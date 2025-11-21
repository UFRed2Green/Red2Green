# Red2Green

Red2Green is a web-based application that provides a streamlined, user-friendly profit and loss tracking for stock investors.

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

### Step 1: Clone the Repository
First, clone the project locally:
```bash
git clone https://github.com/UFRed2Green/Red2Green.git
```
### Step 2: Environment Setup
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

Next, obtain a TwelveData API key for stock market data:
1. Create a free account at [https://twelvedata.com/register](https://twelvedata.com/register)
2. Navigate to your dashboard and copy your API key
3. Add it to your .env file:
```bash
TWELVEDATA_API_KEY=<paste_your_api_key_here>
```

Then within the client directory run the following to create the local environment variable
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

### Step 3: Install Dependencies and Run the App 
```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend / Server

In the server/ directory, run the following command to set up the backend environment.
These only need to be run during the initial setup or when the database schema changes.

Generate the Prisma client
(creates the database client from schema.prisma)
``` bash
npx prisma generate
```

## Learn More
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - reference for core Node APIs and runtime behavior.
- [Prisma Documentation](https://www.prisma.io/docs) - ORM setup guide, schema modeling, and database workflows.
