FROM node:lts AS base_build
WORKDIR /ui 
COPY . /ui
RUN yarn install --prefer-offline --frozen-lockfile --non-interactive

FROM base_build AS dev
ENV NODE_ENV=development
CMD ["yarn", "serve"]

FROM base_build AS base_prod
RUN yarn build

FROM nginx:stable-alpine AS prod
COPY --from=base_prod /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
