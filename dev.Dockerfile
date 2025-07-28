FROM node:20-bookworm-slim

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /app

COPY package.json pnpm-lock.yaml drizzle.config.ts ./
COPY src/db/schema.ts src/db/schema.ts

RUN npm install -g pnpm && pnpm install

EXPOSE $PORT

CMD ["sh", "-c", "pnpm run db:push && pnpm run dev"]
