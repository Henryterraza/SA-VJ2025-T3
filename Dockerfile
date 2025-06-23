FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD sh -c "node speed.js; npm start"