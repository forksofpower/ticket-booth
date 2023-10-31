FROM node:alpine

WORKDIR /app
ENV NODE_ENV=development

COPY package.json .
# COPY .yarn .
# RUN yarn workspaces focus --all --production
RUN yarn install
COPY . .

CMD ["npm", "start"]
