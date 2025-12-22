# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Prune dev dependencies to keep the image small
RUN npm prune --production

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built application and production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
