FROM node:14.9.0-alpine3.12

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production

COPY src/ .

EXPOSE 8080

CMD ["node", "index.js"]