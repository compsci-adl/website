# Cache package.json
FROM node:18-bookworm-slim as deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:18-bookworm-slim as build

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm setup && \
    pnpm install

COPY . .

RUN --mount=type=secret,id=SKIP_ENV_VALIDATION \
    pnpm run build

# Final deployment image
FROM node:18-bookworm-slim

RUN npm install -g pnpm && \
    pnpm setup

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV production

EXPOSE 80

CMD [ "pnpm", "run", "start" ]
