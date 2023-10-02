FROM node:alpine as base

WORKDIR /app

COPY package.json .
RUN yarn install

FROM base AS builder

WORKDIR /app

COPY . .

RUN yarn run build

FROM base as intermediate
COPY . .

# production
FROM node:alpine as production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]

# development
FROM intermediate AS development
CMD ["yarn", "dev"]
