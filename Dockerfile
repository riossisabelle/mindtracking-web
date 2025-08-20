# =========================
# ESTÁGIO 1: BUILDER
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

ENV CI=true

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências completas
RUN npm ci

# Copia o restante do código
COPY . .

# Build do Next.js (compila TypeScript automaticamente)
RUN npm run build


# =========================
# ESTÁGIO 2: RUNNER (produção)
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

# Copia apenas os arquivos necessários para produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copia artefatos de build do estágio anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Ajusta permissões para usuário não-root
RUN chown -R node:node /app

# Troca para usuário não-root
USER node

# Expor porta
EXPOSE 80

# Comando para rodar
CMD ["npm", "run", "start"]
