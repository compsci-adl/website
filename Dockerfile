# Cache package.json
FROM node:25-trixie-slim@sha256:6517bd703147da68ecd657ab1951377c839bcf667c86717ab65ff31600685341 AS deps

WORKDIR /tmp

COPY package.json ./

# Build
FROM node:25-trixie-slim@sha256:6517bd703147da68ecd657ab1951377c839bcf667c86717ab65ff31600685341 AS builder

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
FROM node:25-trixie-slim@sha256:6517bd703147da68ecd657ab1951377c839bcf667c86717ab65ff31600685341 AS runner

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

# Copy standalone output and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE $PORT

CMD [ "node", "server.js" ]
