# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file into the container (make sure it exists in your project root)
COPY .env .env

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]
