FROM node:lts AS base_build
WORKDIR /api
COPY . /api


FROM base_build AS dev
ENV NODE_ENV=development
RUN yarn install
CMD ["yarn", "up"]

FROM base_build AS prod
ENV NODE_ENV=production
RUN yarn install --production
CMD ["yarn", "start"]
