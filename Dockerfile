FROM node:16
COPY ./client/package*.json ./
COPY ./client/public/index.html ./public/index.html
COPY ./client/src ./src
RUN npm install
CMD ["npm", "start"]