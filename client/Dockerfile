FROM node:22-alpine

WORKDIR /client/

COPY public/ client/public
COPY src/ /client/src
COPY package.json /client/package.json

RUN npm install

CMD ["npm", "start"]