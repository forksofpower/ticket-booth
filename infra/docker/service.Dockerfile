FROM node:alpine as base
WORKDIR /app
COPY package.json .

FROM base as development
RUN yarn install
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev"]

FROM base as builder
RUN yarn install
COPY . .
RUN yarn run build

FROM base as production
ENV NODE_ENV=production
COPY --from=builder build/ build/
CMD ["npm", "start"]
