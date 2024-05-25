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

RUN --mount=type=secret,id=CLERK_SECRET_KEY \
    --mount=type=secret,id=DATABASE_AUTH_TOKEN \
    --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_SIGN_IN_URL \
    --mount=type=secret,id=NEXT_PUBLIC_CLERK_SIGN_UP_URL \
    --mount=type=secret,id=NEXT_PUBLIC_DRIVE_LINK \
    --mount=type=secret,id=REDIS_URI \
    --mount=type=secret,id=SQUARE_ACCESS_TOKEN \
    --mount=type=secret,id=SQUARE_LOCATION_ID \
    pnpm run build

# Final deployment image
FROM node:18-bookworm-slim

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV production

EXPOSE 80

CMD [ "pnpm", "run", "start" ]
