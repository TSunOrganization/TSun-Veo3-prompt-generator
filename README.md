# TSun Veo3 Prompt Generator

This is a web application designed to generate creative and detailed stop-motion video prompts for Google's Veo AI model. It takes an initial idea and a custom logo name to produce unique prompts with the logo creatively integrated into each scene.

The application is built with React, TypeScript, and Tailwind CSS, and it uses the Google Gemini API for prompt generation. API calls are securely handled by a Vercel Serverless Function to protect the API key.

**[➡️ View Live Demo](https://tsunveo3.vercel.app/)**



---

## ✨ Features

- **Creative Prompt Generation**: Get unique, whimsical, stop-motion style video prompts.
- **Dynamic Logo Integration**: Automatically embed your brand or logo name creatively within each prompt.
- **Customizable Output**:
    - Choose the number of prompts to generate (3, 6, or 12).
    - Set a character limit for simple prompts (500, 1000, 2000).
    - Select between **Simple** (plain text) and **JSON** (detailed, structured) formats.
- **Secure API Handling**: Uses a backend serverless function to make calls to the Gemini API, keeping your API key safe.
- **Modern UI/UX**:
    - Clean, responsive design built with Tailwind CSS.
    - **Light & Dark Mode** with automatic theme detection and a manual toggle.
    - **Copy to Clipboard**: Easily copy generated prompts with a single click.
- **Built-in Changelog**: A modal displays the application's version history and updates.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/docs) (`gemini-2.5-flash`)
- **Hosting & Backend**: [Vercel](https://vercel.com/) (for hosting and Serverless Functions)

---

## 🚀 Getting Started

This project uses Vite for a fast development experience and robust build process.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/TSunOrganization/TSun-Veo3-prompt-generator.git
    cd TSun-Veo3-prompt-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    - Create a file named `.env.local` in the root of the project.
    - Add your Google Gemini API key to this file:
      ```
      VITE_API_KEY="YOUR_GEMINI_API_KEY"
      ```
    - **Important**: To run locally with `npm run dev`, you must also add your key to a `.env` file for the Vercel CLI to pick it up for the serverless function:
      ```
      API_KEY="YOUR_GEMINI_API_KEY"
      ```

4.  **Run the development server:**
    - Use the Vercel CLI (recommended) to run both frontend and backend. If you don't have it, install with `npm i -g vercel`.
    ```bash
    vercel dev
    ```
    - The server will start on `http://localhost:3000`.

---

## ☁️ Deployment to Vercel

Deploying this application is simple with Vercel.

1.  **Push to a Git Repository:**
    - Push your project code to a new or existing repository on GitHub, GitLab, or Bitbucket.

2.  **Import Project in Vercel:**
    - In your Vercel dashboard, click "Add New..." -> "Project".
    - Import the Git repository. Vercel will automatically detect that it's a Vite project.

3.  **Configure Environment Variables:**
    - In your Vercel project's settings, go to the **Environment Variables** section.
    - Add your Gemini API key:
        - **Name**: `API_KEY`
        - **Value**: `YOUR_GEMINI_API_KEY`
    - Vercel will automatically make this variable available to your Serverless Function.

4.  **Deploy:**
    - Click the **Deploy** button. Vercel will build your Vite application and deploy it along with the serverless function.

---

## 📂 Project Structure

```
/
├── api/
│   └── gemini.ts           # Vercel Serverless Function (backend)
├── src/
│   ├── components/         # Reusable React components
│   ├── contexts/           # Theme context
│   ├── services/           # Client-side service
│   ├── App.tsx             # Main application component
│   └── index.tsx           # React root entry point
├── index.html              # Vite entry HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 👤 Author

- **༯𝙎ค૯𝙀𝘿✘🫀**