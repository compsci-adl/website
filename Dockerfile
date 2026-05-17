# Cache package.json
FROM node:25-trixie-slim AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:25-trixie-slim AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV SKIP_ENV_VALIDATION=true

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm@11 \
    && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:25-trixie-slim AS runner

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV NODE_ENV=production

RUN npm install -g pnpm@11

WORKDIR /app

COPY --from=builder /app /app

EXPOSE $PORT

CMD [ "pnpm", "run", "start" ]
