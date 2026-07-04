# Cache package.json
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV SKIP_ENV_VALIDATION=true
ENV SKIP_INSTALL_SIMPLE_GIT_HOOKS=1

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm@11 \
    && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS runner

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV NODE_ENV=production

RUN npm install -g pnpm@11

WORKDIR /app

COPY --from=builder /app /app

EXPOSE $PORT

CMD [ "pnpm", "run", "start" ]
