# Cache package.json
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS builder

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV CI=true
ENV SKIP_ENV_VALIDATION=true
ENV SKIP_INSTALL_SIMPLE_GIT_HOOKS=1

WORKDIR /app

COPY --from=deps /tmp ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm@11 \
    && pnpm install --frozen-lockfile --config.confirmModulesPurge=false

COPY . .

RUN pnpm run build

# Final deployment image
FROM node:25-trixie-slim@sha256:aabbe39553d15ede8a97cc60c9e1a97034ff772afcf696ea42b94e7f5f2ec71b AS runner

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

# Copy standalone output and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE $PORT

CMD [ "node", "server.js" ]
