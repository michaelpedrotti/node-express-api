FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN apk update
RUN npm install
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*
EXPOSE 3000
CMD node main.js
# docker build -t pedrotti/node:express .