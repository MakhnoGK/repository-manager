FROM node:18-alpine AS builder
WORKDIR /repo

COPY package.json package-lock.json turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/client/package.json apps/client/package.json

RUN npm ci
COPY . .
RUN npx turbo run build
RUN npm prune --production

# RUNNER

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /repo/node_modules ./node_modules

COPY --from=builder /repo/apps/api/dist ./dist
COPY --from=builder /repo/apps/client/dist ./client/dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]
