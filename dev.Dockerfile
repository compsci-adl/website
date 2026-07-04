FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml drizzle.config.ts ./
COPY src/db/schema.ts src/db/schema.ts

RUN npm install -g pnpm@11 && pnpm install --frozen-lockfile

EXPOSE $PORT

CMD ["sh", "-c", "if ! sqlite3 dev.sqlite \".tables\" | grep -q members; then pnpm run db:push; fi && pnpm run dev"]
