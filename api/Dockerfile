FROM node:lts
COPY . /api
WORKDIR /api
RUN yarn install && yarn run build
