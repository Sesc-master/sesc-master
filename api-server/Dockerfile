FROM node:18
WORKDIR /app
COPY /api-server/package*.json ./
RUN yarn install
COPY /api-server/ .
RUN yarn build
ARG PORT
EXPOSE $PORT
CMD [ "yarn", "start" ]