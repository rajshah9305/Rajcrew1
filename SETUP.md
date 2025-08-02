# CrewAI Dashboard Pro Setup Guide

This document provides detailed instructions for setting up and configuring your CrewAI Dashboard Pro application.

## 1. Environment Setup

Ensure you have the following installed on your system:

*   **Node.js**: Version 16.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager) or **Yarn**: npm comes with Node.js. For Yarn, follow the instructions on [yarnpkg.com](https://yarnpkg.com/).
*   **Git**: For cloning the repository.

## 2. Project Installation

1.  **Clone the repository**:
    Open your terminal or command prompt and run:
    \`\`\`bash
    git clone https://github.com/your-username/crewai-dashboard-pro.git
    \`\`\`
    Replace `your-username` with the actual GitHub username or organization if this is a public repository.
2.  **Navigate into the project directory**:
    \`\`\`bash
    cd crewai-dashboard-pro
    \`\`\`
3.  **Install dependencies**:
    \`\`\`bash
    npm install
    # or if you prefer yarn
    yarn install
    \`\`\`
    This command will download and install all the necessary packages listed in `package.json`.

## 3. Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. The configuration is located in `tailwind.config.js`.
You can customize themes, colors, fonts, and other utility classes here.

\`\`\`javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [],
}
\`\`\`

### Environment Variables

For sensitive information like API keys or database connection strings, use environment variables. A `.env.example` file is provided as a template.

1.  Create a `.env` file in the root of your project:
    \`\`\`bash
    cp .env.example .env
    \`\`\`
2.  Edit the `.env` file and add your specific environment variables. For example:
    \`\`\`
    VITE_CREW_AI_API_KEY=your_crew_ai_api_key_here
    \`\`\`
    *Note: For client-side variables in Vite, they must be prefixed with `VITE_`.*

## 4. Running the Application

### Development Mode

To start the application in development mode with hot-reloading:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`
The application will typically be accessible at `http://localhost:3000`.

### Production Build

To create an optimized production build:
\`\`\`bash
npm run build
# or
yarn build
\`\`\`
This command will output the compiled and minified files to the `dist` directory.

### Preview Production Build Locally

To test the production build locally before deployment:
\`\`\`bash
npm run preview
# or
yarn preview
\`\`\`
This will serve the `dist` directory, simulating a production environment.

## 5. Deployment

### Vercel Deployment

This project is pre-configured for deployment on Vercel.

1.  **Install Vercel CLI** (if you haven't already):
    \`\`\`bash
    npm install -g vercel
    \`\`\`
2.  **Deploy**:
    Navigate to your project directory in the terminal and run:
    \`\`\`bash
    vercel
    \`\`\`
    Follow the interactive prompts. Vercel will automatically detect the Vite project and deploy it.

### Docker Deployment

For containerized deployments, use the provided `Dockerfile` and `docker-compose.yml`.

1.  **Build the Docker image**:
    \`\`\`bash
    docker build -t crewai-dashboard-pro .
    \`\`\`
2.  **Run with Docker Compose**:
    \`\`\`bash
    docker-compose up -d
    \`\`\`
    This will start an Nginx server serving your React application. The dashboard will be available at `http://localhost:80`.

## 6. Troubleshooting

*   **"Cannot find module" errors**: Ensure all dependencies are installed (`npm install` or `yarn install`).
*   **Styling issues**: Verify your `tailwind.config.js` is correctly configured and that `src/index.css` imports Tailwind's base styles.
*   **Preview not loading**: Check your browser's developer console for errors. Ensure the `build` command completed successfully and the `preview` command is serving the correct `dist` directory.

If you encounter persistent issues, please refer to the `package.json` for exact script commands and dependencies, or consult the official documentation for Vite, React, and Tailwind CSS.
