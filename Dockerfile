# Cache package.json
FROM node:20-bookworm-slim AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:20-bookworm-slim AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV SKIP_ENV_VALIDATION=true

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:20-bookworm-slim AS runner

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV NODE_ENV=production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app /app

EXPOSE $PORT

CMD [ "pnpm", "run", "start" ]
