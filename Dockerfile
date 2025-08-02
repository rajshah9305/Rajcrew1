# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
