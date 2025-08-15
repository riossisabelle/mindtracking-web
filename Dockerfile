# syntax=docker/dockerfile:1

# ========================================
# ESTÁGIO 1: BUILDER - Construção da aplicação
# ========================================

FROM node:20-alpine AS builder

WORKDIR /app

ENV CI=true

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p public \
    && npm run build

# ========================================
# ESTÁGIO 2: RUNNER - Imagem final de produção
# ========================================

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

COPY package*.json ./

# Instala dependências de produção
RUN npm ci --omit=dev

# Instala TypeScript para leitura do next.config.ts (se necessário)
RUN npm install --save-dev typescript

# Ajusta permissão para o usuário node antes de trocar de usuário
RUN chown -R node:node /app

# Copia artefatos do estágio builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Instala libcap para permitir uso da porta 80 sem root
RUN apk add --no-cache libcap \
    && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

# Troca para usuário não-root
USER node

# Expõe porta 80
EXPOSE 80

# Comando para rodar a aplicação Next.js escutando em 0.0.0.0 e porta 80
CMD ["npm", "run", "start"]
