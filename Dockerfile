FROM node:22-alpine

EXPOSE 3000

WORKDIR /app

COPY client/public client/public
COPY client/src client/src
COPY client/package.json client/package.json
COPY client/package-lock.json client/package-lock.json

COPY server/index.js server/index.js
COPY server/Components server/Components
COPY server/package.json server/package.json
COPY server/package-lock.json server/package-lock.json

WORKDIR /app/client

RUN npm install
RUN npm run build

WORKDIR /app/server

RUN cp -r /app/client/build public
RUN npm install
RUN wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
CMD ["node", "./index.js"]