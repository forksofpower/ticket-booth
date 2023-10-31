FROM node:alpine as BASE

WORKDIR /app
ENV NODE_ENV=development

COPY package.json .

FROM BASE as development
# COPY .yarn .
# RUN yarn workspaces focus --all --production
RUN yarn install
COPY . .

CMD ["npm", "start"]

FROM BASE as builder
RUN yarn install --production
COPY . .
RUN yarn run build
