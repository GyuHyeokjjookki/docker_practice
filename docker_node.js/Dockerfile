FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install express

RUN npm install session

COPY . /app

EXPOSE 3000

CMD ["npm","start"]