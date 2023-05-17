# Use the official Node.js 14 image as the base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY src ./src

# Copy the source code
COPY tsconfig.json ./

# Build the TypeScript app
RUN npm run build

# Expose the desired port
EXPOSE 3001

# Set the command to run the app
CMD ["node", "dist/index.js"]
