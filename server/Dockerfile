FROM node:20-alpine

WORKDIR /server

COPY . .

RUN yarn install

EXPOSE 8000

CMD ["yarn" ,"run", "start"]