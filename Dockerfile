# Cache package.json
FROM node:18-bookworm-slim AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:18-bookworm-slim AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV SKIP_ENV_VALIDATION=true

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install

COPY . .

# Needed for build
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/join
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

RUN --mount=type=secret,id=DATABASE_URL,target=/run/secrets/DATABASE_URL \
    --mount=type=secret,id=REDIS_URI,target=/run/secrets/REDIS_URI \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,target=/run/secrets/NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_DRIVE_LINK,target=/run/secrets/NEXT_PUBLIC_DRIVE_LINK \
    DATABASE_URL=$(cat /run/secrets/DATABASE_URL) \
    REDIS_URI=$(cat /run/secrets/REDIS_URI) \
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$(cat /run/secrets/NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) \
    NEXT_PUBLIC_DRIVE_LINK=$(cat /run/secrets/NEXT_PUBLIC_DRIVE_LINK) \
    pnpm run build

# Final deployment image
FROM node:18-bookworm-slim AS runner

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV NODE_ENV production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app /app

EXPOSE $PORT

CMD [ "pnpm", "run", "start" ]
