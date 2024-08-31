ARG NODE_IMAGE=node:20.14.0-bookworm-slim

FROM $NODE_IMAGE AS base
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends curl dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS development
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM development AS build
RUN node ace build

FROM base AS production
ENV NODE_ENV=production
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node --from=build /home/node/app/build .

COPY --chown=node:node entrypoint.sh /home/node/app
RUN chmod +x /home/node/app/entrypoint.sh

ENTRYPOINT ["/home/node/app/entrypoint.sh"]
