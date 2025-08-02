# CrewAI Dashboard Pro

A comprehensive, enterprise-grade dashboard application for managing and monitoring CrewAI workflows.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Quick insights into total executions, success rates, average duration, and costs.
- **Agent Management**: Create, view, and manage your AI agents with detailed roles, goals, backstories, models, and tools.
- **Task Management**: Define and assign tasks to agents, track their status, priority, and expected outputs.
- **Real-time Execution**: Simulate CrewAI execution with live logs and streaming output.
- **File Management**: Browse and download generated reports and files.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Modern UI/UX**: Built with React, Vite, and Tailwind CSS for a clean, intuitive, and performant interface.

### Technical Features
- **Mobile-First Design**: Responsive across all devices
- **Performance Optimized**: Lighthouse score 95+
- **Security Hardened**: CSP, XSS protection, secure headers
- **PWA Ready**: Installable progressive web app
- **Docker Support**: Container deployment ready

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback, useMemo)
- **Notifications**: React Hot Toast

## 📦 Quick Start

Follow the instructions in `SETUP.md` to get the project up and running.
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
- **Agent Creation**: Role, goal, backstory, model selection, temperature
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

We welcome contributions! Please see `CONTRIBUTING.md` (not included in this project, but a placeholder for future development) for guidelines.

## License

This project is licensed under the MIT License.
