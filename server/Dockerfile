FROM node:20-alpine

RUN yarn global add nodemon

WORKDIR /server

COPY package.json .

COPY . .

RUN yarn install

EXPOSE 8000

CMD ["yarn" ,"run", "start"]