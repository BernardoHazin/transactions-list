FROM node:lts AS base_build
WORKDIR /api 
COPY . /api
RUN yarn install --prefer-offline --frozen-lockfile --non-interactive
RUN yarn prisma generate --schema=./src/main/prisma/schema.prisma

FROM base_build AS dev
ENV NODE_ENV=development
CMD ["yarn", "up"]

FROM base_build AS prod
ARG DATABASE_URL
ENV NODE_ENV=production
CMD ["yarn", "start"]
