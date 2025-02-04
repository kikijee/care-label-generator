# Use the official Node.js image
FROM node:20.0.0

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g serve


# Copy the rest of your frontend code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

RUN npm run build

# Command to run your React app
CMD ["npm", "run", "start"]
