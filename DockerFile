FROM node:alpine

WORKDIR /Mr-Grape

COPY package*.json ./

RUN npm i --save

CMD ["npm", "start"]
