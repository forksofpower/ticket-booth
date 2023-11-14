
# Base stage with the common setup
FROM node:alpine as base
RUN apk update && apk add --no-cache yarn
WORKDIR /app
COPY .yarn/ .
COPY yarn.lock .
COPY package.json .

# Argument for specifying the service (directory) to build
ARG SERVICE_DIR

# Install dependencies for all workspaces
FROM base as dependencies
COPY . .
RUN yarn install --frozen-lockfile

# Builder stage - Here we build the specified service
FROM dependencies as builder
RUN yarn workspace $SERVICE_DIR run build

# Development stage - Set up the environment for development
FROM dependencies as development
ENV NODE_ENV=development
CMD yarn workspace $SERVICE_DIR run dev

# Production stage - Install only production dependencies and copy the build artifacts for the specified service
FROM base as production
COPY --from=builder /app/services/$SERVICE_DIR/build ./build
COPY --from=builder /app/services/$SERVICE_DIR/package.json ./package.json
RUN yarn install --frozen-lockfile --production
ENV NODE_ENV=production
CMD ["yarn", "workspace", $SERVICE_DIR, "run", "start"]
