FROM node:18
COPY ./client/package*.json ./
COPY ./client/public/index.html ./public/index.html
COPY ./client/public/images ./public/images
COPY ./client/public/leaflet.awesome-markers.css ./public/leaflet.awesome-markers.css
COPY ./client/src ./src
RUN npm install
CMD ["npm", "start"]