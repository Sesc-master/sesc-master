FROM node:18
WORKDIR /app
COPY /worker/package*.json ./
RUN yarn install
COPY /worker/ .
RUN yarn build
CMD [ "yarn", "start" ]