FROM node:alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json .
COPY .yarn .
RUN yarn workspaces focus --all --production
COPY . .

CMD ["npm", "start"]