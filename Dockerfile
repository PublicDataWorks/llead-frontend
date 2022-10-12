ARG BUILD_ENV
ARG MAPBOX_KEY

FROM node:14.15.3-alpine AS deps
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install


# Rebuild the source code only when needed
FROM node:14-alpine AS builder
ARG BUILD_ENV
ARG MAPBOX_KEY
WORKDIR /app
ENV MAPBOX_KEY ${MAPBOX_KEY}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build-${BUILD_ENV}


FROM nginx:1.19.6
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf
