# Use Node.js LTS version
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
