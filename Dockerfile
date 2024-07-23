FROM node:20.10.0-alpine as buildContainer

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN ["npm", "install"]

COPY . /app

RUN ["npm", "run", "build"]

FROM nginx:1.24.0-alpine
COPY --from=buildContainer /app/build /usr/share/nginx/html

EXPOSE 80