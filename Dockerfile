# Cache package.json
FROM node:20-bookworm-slim as deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:18-bookworm-slim as build

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:18-bookworm-slim

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV production

EXPOSE 80

CMD [ "pnpm", "run", "start" ]
