# Stage 1: Build the application
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with Node.js using `serve`
FROM node:20-alpine

WORKDIR /app

# Install `serve` globally
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve the app on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

