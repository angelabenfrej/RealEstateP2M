FROM node:20-alpine

WORKDIR /client

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn","run","dev"]