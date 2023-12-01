FROM node:16-alpine
WORKDIR /app
COPY /frontend .
RUN npm i
RUN npm run build
ENV NODE_ENV production
ENV PORT 3030
EXPOSE 3030
CMD [ "npx", "serve", "-s", "build" ]