# Define a versão da sintaxe do Dockerfile (versão mais recente)
# syntax=docker/dockerfile:1

# ========================================
# ESTÁGIO 1: BUILDER - Construção da aplicação
# ========================================

# Usa Node.js 20 com Alpine Linux como base (imagem leve e segura)
# Alpine é uma distribuição Linux minimalista (~5MB vs ~300MB do Ubuntu)
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Configura variável de ambiente para evitar prompts interativos
# Reduz logs desnecessários durante o build
ENV CI=true

# Copia apenas os arquivos package.json e package-lock.json primeiro
# Isso permite que o Docker use cache das dependências se apenas o código mudar
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies) necessárias para o build
# npm ci é mais rápido e determinístico que npm install
RUN npm ci

# Copia todo o código fonte da aplicação
COPY . .

# Cria a pasta public se ela não existir (evita erro no estágio runtime)
# Garante que a pasta public exista, mesmo que vazia, para evitar falha no COPY do estágio runtime
RUN mkdir -p public \
    && npm run build

# ========================================
# ESTÁGIO 2: RUNNER - Imagem final de produção
# ========================================

# Cria uma nova imagem baseada no Node.js 20 Alpine
# Esta imagem será muito menor pois não inclui dependências de desenvolvimento
FROM node:20-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Configura variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala apenas as dependências de produção (exclui devDependencies)
# Reduz significativamente o tamanho da imagem final
RUN npm ci --omit=dev

# Instala o TypeScript para permitir leitura do next.config.ts em produção
RUN npm install --save-dev typescript

# Copia apenas os artefatos necessários do estágio builder
# .next: pasta com o build otimizado da aplicação Next.js
COPY --from=builder /app/.next ./.next
# public: arquivos estáticos (imagens, favicon, etc.)
COPY --from=builder /app/public ./public
# Copia a config do Next (existe no projeto como next.config.ts)
COPY --from=builder /app/next.config.ts ./

# ========================================
# CONFIGURAÇÕES DE SEGURANÇA
# ========================================

# Instala libcap para gerenciar capabilities do Linux
# Permite que usuário não-root use porta 80 (porta privilegiada)
RUN apk add --no-cache libcap \
    && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

# Muda para o usuário 'node' (não-root) por segurança
# Evita que a aplicação rode com privilégios de root
USER node

# Informa que o container expõe a porta 80
# Documentação para outros desenvolvedores
EXPOSE 80

# Comando que será executado quando o container iniciar
# Inicia a aplicação Next.js em modo de produção
CMD ["npm", "run", "start"]


