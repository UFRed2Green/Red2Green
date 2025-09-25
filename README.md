# Red2Green

Red2Green is a web-based application that provides a streamlined, user-friendly profit and loss tracking for stock investors.

## Getting Started GitHub

Follow these steps to set up your environment and work on tasks.

### 1. Clone the Repository
First, clone the project locally:
```bash
git clone https://github.com/UFRed2Green/Red2Green.git
cd Red2Green
```

### 2. Work on Tasks
From the Jira subtask(s) assigned to you, create a branch directly (this ensures the Jira issue links properly with your GitHub branch). Otherwise you have to manually type keywords into branch names for them to be linked with Jira.

### 3. Make Changes

Once you have made code changes:

Add files to staging:

```bash 
git add .
```


Commit changes frequently with clear commit messages (following best practices):

```bash 
git commit -m "Add feature X"
```


Push your changes to the remote branch:

```bash 
git push origin <branch-name>
```

Tip: If you prefer, most of these steps (adding, committing, and pushing) can be done more easily through the VS Code UI, instead of the command line.

### 4. Create Pull Request
To create the pull request for your changes (for someone to review them) go to the "Pull Requests" tab on github, assign a reviewer, and create it.
Upon review, you can merge the pull request into the main branch.

### Project Structure
```
Red2Green/
├── client/      # Frontend (Next.js + React)
└── server/      # Backend (Node.js + Express)
```

## Getting Started

First, run the development server: 

```bash
npm run dev
```

If you don't have npm already install node.js: https://nodejs.org/en/download

### Frontend / Client
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Backend / Server
Open [http://localhost:5000](http://localhost:5000) with your browser.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Express.js Documentation](https://expressjs.com/)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)

