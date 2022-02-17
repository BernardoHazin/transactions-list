FROM node:lts AS base_build
WORKDIR /ui 
COPY . /ui
RUN yarn install --prefer-offline --frozen-lockfile --non-interactive
RUN yarn build

FROM base_build AS dev
ENV NODE_ENV=development
CMD ["yarn", "serve"]

FROM nginx:stable-alpine AS prod
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
