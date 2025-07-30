# TSun Veo3 Prompt Generator

This is a web application designed to generate creative and detailed stop-motion video prompts for Google's Veo AI model. It takes an initial idea and a custom logo name to produce unique prompts with the logo creatively integrated into each scene.

The application is built with React, TypeScript, and Tailwind CSS, and it uses the Google Gemini API for prompt generation. API calls are securely handled by a Vercel Serverless Function to protect the API key.

**[➡️ View Live Demo](https://your-vercel-deployment-url.vercel.app/)** *(Replace with your Vercel deployment URL)*

![TSun Veo3 Prompt Generator Screenshot](https://via.placeholder.com/800x500.png?text=Add+App+Screenshot+Here)
*(Replace the placeholder above with a screenshot or GIF of your application)*

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

- **Frontend**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/docs) (`gemini-2.5-flash`)
- **Hosting & Backend**: [Vercel](https://vercel.com/) (for hosting and Serverless Functions)
- **Frontend Dependencies**: Uses ES Modules via `esm.sh`, requiring no local `node_modules` or build step for development.
- **Backend Dependencies**: Uses [npm](https://www.npmjs.com/) for serverless function dependencies.

---

## 🚀 Getting Started

This project is configured to run without a traditional build step for the frontend, but uses npm for the backend.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- You need the [Vercel CLI](https://vercel.com/docs/cli) to run the serverless function locally.
  ```bash
  npm install -g vercel
  ```

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    - The project now includes a `package.json` for server-side dependencies.
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    - Create a file named `.env.local` in the root of the project.
    - Add your Google Gemini API key to this file:
      ```
      API_KEY="YOUR_GEMINI_API_KEY"
      ```

4.  **Run the development server:**
    - Use the Vercel CLI to start the local server. This will run your frontend and correctly handle the serverless function in the `/api` directory.
    ```bash
    vercel dev
    ```
    - The server will typically start on `http://localhost:3000`.

---

## ☁️ Deployment to Vercel

Deploying this application is simple and highly recommended via Vercel.

1.  **Push to a Git Repository:**
    - Create a new repository on [GitHub](https://github.com/), GitLab, or Bitbucket.
    - Push your project code to the new repository.

2.  **Import Project in Vercel:**
    - Log in to your Vercel account.
    - Click "Add New..." -> "Project".
    - Import the Git repository you just created.

3.  **Configure Environment Variables:**
    - In your Vercel project's settings, go to the **Environment Variables** section.
    - Add your Gemini API key:
        - **Name**: `API_KEY`
        - **Value**: `YOUR_GEMINI_API_KEY`
    - Vercel will automatically make this variable available to your Serverless Function.

4.  **Deploy:**
    - Vercel will automatically detect the `package.json` and install dependencies. Click the **Deploy** button.
    - Your application will be built and deployed. You will receive a live URL for your project.

---

## 📂 Project Structure

```
/
├── api/
│   └── gemini.ts           # Vercel Serverless Function (backend)
├── components/
│   ├── *.tsx               # Reusable React components
│   └── icons/              # SVG icons
├── contexts/
│   └── ThemeContext.tsx    # Theme management (light/dark mode)
├── services/
│   └── geminiService.ts    # Client-side service to call the /api endpoint
├── App.tsx                 # Main application component
├── changelogData.ts        # Data for the changelog
├── constants.tsx           # App-wide constants (e.g., logo SVG)
├── index.html              # Main HTML file with importmap
├── index.tsx               # React root entry point
├── metadata.json           # Application metadata
├── package.json            # <-- NEW: Backend dependencies for Vercel
├── types.ts                # TypeScript type definitions
└── README.md               # This file
```

## 👤 Author

- **༯𝙎ค૯𝙀𝘿✘🫀**