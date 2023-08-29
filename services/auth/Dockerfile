FROM node:alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json .
# COPY .yarn .
# RUN yarn workspaces focus --all --production
RUN yarn install --production=true
COPY . .

CMD ["npm", "start"]