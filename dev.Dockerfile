FROM node:20-bookworm-slim

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3

COPY package.json pnpm-lock.yaml drizzle.config.ts ./
COPY src/db/schema.ts src/db/schema.ts

RUN npm install -g pnpm && pnpm install --ignore-scripts

EXPOSE $PORT

CMD ["sh", "-c", "if ! sqlite3 dev.sqlite \".tables\" | grep -q members; then pnpm run db:push; fi && pnpm run dev"]
