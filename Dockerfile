# =========================
# ESTÁGIO 1: BUILDER
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Variáveis de ambiente
ENV CI=true

# Copia arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências completas
RUN npm ci

# Copia o restante do código
COPY . .

# Build do Next.js
RUN npm run build

# =========================
# ESTÁGIO 2: RUNNER (produção)
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copia apenas arquivos necessários
COPY package*.json ./
RUN npm ci --omit=dev

# Copia artefatos do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./   
COPY --from=builder /app/tsconfig.json ./    

# Ajusta permissões
RUN chown -R node:node /app
USER node

# Porta exposta
EXPOSE 3000

# Comando para rodar
CMD ["npm", "run", "start"]
