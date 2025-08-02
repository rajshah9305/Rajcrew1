# Setup Instructions for CrewAI Dashboard Pro

This guide will help you set up and run the CrewAI Dashboard Pro application locally.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** (Node Package Manager): Comes bundled with Node.js.

## Installation

1.  **Clone the repository:**

    \`\`\`bash
    git clone https://github.com/your-username/crewai-dashboard-pro.git
    cd crewai-dashboard-pro
    \`\`\`

2.  **Install dependencies:**

    Navigate to the project directory and install the required Node.js packages:

    \`\`\`bash
    npm install
    \`\`\`

## Running the Application

To start the development server:

\`\`\`bash
npm run dev
\`\`\`

This will typically start the application on `http://localhost:5173` (or another available port). The console will show you the exact URL.

## Building for Production

To create a production-ready build of the application:

\`\`\`bash
npm run build
\`\`\`

This command compiles the application into the `dist` directory, which can then be deployed to any static hosting service (e.g., Vercel, Netlify, Nginx).

## Docker (Optional)

If you prefer to run the application using Docker:

1.  **Build the Docker image:**

    \`\`\`bash
    docker build -t crewai-dashboard-pro .
    \`\`\`

2.  **Run the Docker container:**

    \`\`\`bash
    docker run -p 80:80 crewai-dashboard-pro
    \`\`\`

    The application will be accessible at `http://localhost` in your browser.

## Environment Variables (Optional)

If your dashboard needs to connect to a backend API or use specific API keys, you can configure environment variables.

1.  Create a `.env` file in the root of your project (copy from `.env.example`):

    \`\`\`bash
    cp .env.example .env
    \`\`\`

2.  Edit the `.env` file and add your variables:

    \`\`\`
    VITE_CREWAI_API_URL=http://localhost:8000/api
    VITE_OPENAI_API_KEY=your_openai_api_key
    \`\`\`

    *Note: Variables prefixed with `VITE_` are exposed to your client-side React application by Vite.*

## Linting

To run ESLint to check for code quality issues:

\`\`\`bash
npm run lint
\`\`\`

## Project Structure

-   `public/`: Static assets like `favicon.png`, `manifest.json`, `robots.txt`.
-   `src/`: Contains the main React application source code.
    -   `App.jsx`: The main application component, handling routing and state.
    -   `index.css`: Global Tailwind CSS styles.
    -   `main.jsx`: Entry point for the React application.
-   `tailwind.config.js`: Tailwind CSS configuration.
-   `vite.config.js`: Vite build tool configuration.
-   `package.json`: Project dependencies and scripts.
-   `Dockerfile`, `docker-compose.yml`, `nginx.conf`: Docker and Nginx configurations for deployment.
-   `.github/workflows/ci-cd.yml`: GitHub Actions for CI/CD.
