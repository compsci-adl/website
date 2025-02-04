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

RUN --mount=type=secret,id=NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI,target=/run/secrets/NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI \
    --mount=type=secret,id=NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,target=/run/secrets/NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER \
    --mount=type=secret,id=NEXT_PUBLIC_DRIVE_LINK,target=/run/secrets/NEXT_PUBLIC_DRIVE_LINK \
    --mount=type=secret,id=NEXT_PUBLIC_UMAMI_WEBSITE_ID,target=/run/secrets/NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI=$(cat /run/secrets/NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI) \
    NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER=$(cat /run/secrets/NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER) \
    NEXT_PUBLIC_DRIVE_LINK=$(cat /run/secrets/NEXT_PUBLIC_DRIVE_LINK) \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$(cat /run/secrets/NEXT_PUBLIC_UMAMI_WEBSITE_ID) \
    pnpm run build

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
