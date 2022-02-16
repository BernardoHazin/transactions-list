FROM node:lts AS base_build
WORKDIR /api 
COPY . /api

FROM base_build AS dev
ENV NODE_ENV=development
ENV DATABASE_URL=postgresql://postgres:somepassword@db:5432/dev
RUN yarn install --prefer-offline --frozen-lockfile --non-interactive
CMD ["yarn", "up"]

FROM base_build AS prod
ARG DATABASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL $DATABASE_URL
RUN yarn install --production
CMD ["yarn", "start"]
