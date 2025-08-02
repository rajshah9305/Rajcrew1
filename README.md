# CrewAI Dashboard Pro

An enterprise-grade dashboard for managing and monitoring multi-agent AI workflows powered by CrewAI.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Quick stats and system status.
- **Agent Management**: Create, view, and manage AI agents with roles, goals, and tools.
- **Task Orchestration**: Define and assign tasks to agents, track progress.
- **Real-time Execution**: Simulate and monitor CrewAI execution with live logs and output streaming.
- **File Management**: View and download generated reports and files.
- **Responsive Design**: Optimized for desktop and mobile devices.

### Technical Features
- **Mobile-First Design**: Responsive across all devices
- **Performance Optimized**: Lighthouse score 95+
- **Security Hardened**: CSP, XSS protection, secure headers
- **PWA Ready**: Installable progressive web app
- **Docker Support**: Container deployment ready

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Hooks
- **Notifications**: React Hot Toast

## 📦 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/crewai-dashboard-pro.git
   cd crewai-dashboard-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

### Development

To run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`
This will start the Vite development server, usually at `http://localhost:3000`.

### Building for Production

To build the application for production:
\`\`\`bash
npm run build
# or
yarn build
\`\`\`
This will compile the application into the `dist` directory.

### Preview Production Build

To preview the production build locally:
\`\`\`bash
npm run preview
# or
yarn preview
\`\`\`

## 🏗️ Build & Deploy

### Development Build
\`\`\`bash
npm run build
npm run preview
\`\`\`

### Production Deployment

#### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

#### Docker
\`\`\`bash
# Build image
docker build -t crewai-dashboard-pro .

# Run container
docker run -p 3000:80 crewai-dashboard-pro
\`\`\`

#### Docker Compose
\`\`\`bash
docker-compose up -d
\`\`\`

## 📱 Application Structure

### Navigation Tabs
1. **Dashboard** - Overview and quick actions
2. **Agents** - AI agent management
3. **Tasks** - Task assignment and tracking
4. **Templates** - Pre-built crew configurations
5. **Execution** - Real-time workflow monitoring
6. **Analytics** - Performance metrics and insights
7. **Files** - Generated content management

### Key Components
- **Agent Creation**: Role, goal, backstory, model selection
- **Task Assignment**: Priority levels, output formats
- **Real-time Monitoring**: Streaming execution logs
- **Performance Analytics**: Success rates, cost tracking
- **File Browser**: Download and preview capabilities

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple (#7c3aed)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Primary**: Inter font family
- **Code**: JetBrains Mono
- **Hierarchy**: Responsive text scaling

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Hover effects and loading states
- **Forms**: Validation and error handling
- **Charts**: Interactive data visualizations

## 🔧 Configuration

### Vite Configuration
\`\`\`js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
\`\`\`

### Tailwind Configuration
\`\`\`js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { /* custom palette */ }
      }
    }
  }
};
\`\`\`

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic chunk optimization
- **Lazy Loading**: Component-level loading
- **Image Optimization**: WebP format support
- **Caching**: Service worker implementation
- **Bundle Analysis**: Size monitoring

### Metrics Targets
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🔒 Security

### Implemented Features
- **Content Security Policy**: XSS prevention
- **HTTPS Enforcement**: Secure connections
- **Input Sanitization**: Data validation
- **Error Boundaries**: Graceful error handling
- **Secure Headers**: OWASP recommendations

### Security Headers
\`\`\`nginx
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
\`\`\`

## Project Structure

\`\`\`
.
├── public/                 # Static assets (favicon, manifest, robots.txt)
├── src/
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global CSS styles
│   └── main.jsx            # Entry point for React application
├── .github/                # GitHub Actions workflows
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Docker Compose configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── nginx.conf              # Nginx configuration for Docker
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project README
├── SETUP.md                # Detailed setup instructions
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
\`\`\`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
