FROM node:8.11.3-alpine

WORKDIR /app

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g vue-cli

EXPOSE 8888

CMD ["/bin/sh"]
