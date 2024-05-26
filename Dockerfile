# Cache package.json
FROM node:18-bookworm-slim AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:18-bookworm-slim AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV SKIP_ENV_VALIDATION=true

# Needed for build
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL="/signin"
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL="/join"
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:18-bookworm-slim AS runner

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV NODE_ENV production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 80

CMD [ "pnpm", "run", "start" ]
