# syntax=docker/dockerfile:1
FROM node:latest
LABEL maintainer="pluiz0674@gmail.com"
WORKDIR /usr/src/coniungereEtDeclinare-server
ENV VERSAO="0.2.10-alpha"
COPY . .
RUN npm install
EXPOSE 8080
CMD ["./compile.sh"]
WORKDIR ./build
ENTRYPOINT [ "node","./index.js" ]

